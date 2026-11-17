// Captura de revisão: emula o dispositivo via CDP (sem dependências), com movimento reduzido,
// e grava a primeira tela e a página inteira em .impeccable/review/.
// Uso: node .impeccable/capturar.mjs [url-base]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.argv[2] || 'http://localhost:4321';
const saida = join(process.cwd(), '.impeccable', 'review');
mkdirSync(saida, { recursive: true });
const candidatos = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
];
const navegador = candidatos.find((c) => existsSync(c));
if (!navegador) throw new Error('Edge ou Chrome não encontrado.');

const porta = 9337;
const perfil = mkdtempSync(join(tmpdir(), 'captura-'));
const proc = spawn(navegador, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, 'about:blank'], { stdio: 'ignore' });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

let alvo;
for (let i = 0; i < 40 && !alvo; i++) {
  await espera(250);
  try {
    const lista = await (await fetch(`http://127.0.0.1:${porta}/json`)).json();
    alvo = lista.find((t) => t.type === 'page');
  } catch {}
}
if (!alvo) { proc.kill(); throw new Error('Não foi possível conectar ao navegador.'); }

const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let seq = 0;
const pendentes = new Map();
const eventos = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pendentes.has(d.id)) { const { r, j } = pendentes.get(d.id); pendentes.delete(d.id); d.error ? j(new Error(d.error.message)) : r(d.result); }
  else if (d.method && eventos.has(d.method)) { eventos.get(d.method)(d.params); eventos.delete(d.method); }
};
const cdp = (method, params = {}) => new Promise((r, j) => { const id = ++seq; pendentes.set(id, { r, j }); ws.send(JSON.stringify({ id, method, params })); });
const quando = (method) => new Promise((r) => eventos.set(method, r));

await cdp('Page.enable');
await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

const alvos = [
  { nome: 'desktop', width: 1440, height: 900, mobile: false, caminho: '/' },
  { nome: 'mobile', width: 390, height: 844, mobile: true, caminho: '/' },
  { nome: 'artigo-desktop', width: 1440, height: 900, mobile: false, caminho: '/conteudos/comida-de-verdade-no-dia-a-dia' },
  { nome: 'artigo-mobile', width: 390, height: 844, mobile: true, caminho: '/conteudos/comida-de-verdade-no-dia-a-dia' },
];
const resumo = [];
for (const a of alvos) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: a.width, height: a.height, deviceScaleFactor: 1, mobile: a.mobile });
  if (a.mobile) await cdp('Emulation.setTouchEmulationEnabled', { enabled: true });
  else await cdp('Emulation.setTouchEmulationEnabled', { enabled: false });
  const carregou = quando('Page.loadEventFired');
  await cdp('Page.navigate', { url: base + a.caminho });
  await carregou;
  await espera(1200);
  await cdp('Runtime.evaluate', { expression: "document.querySelectorAll('img').forEach(i=>i.loading='eager')" });
  await espera(3500);
  if (process.env.DBG) {
    const dbg = await cdp('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify([...document.querySelectorAll('#sobre img, #especialidades img')].slice(0,2).map(i=>({c:i.complete,nw:i.naturalWidth,src:(i.currentSrc||'').slice(-50),ld:i.loading,w:Math.round(i.getBoundingClientRect().width),h:Math.round(i.getBoundingClientRect().height),op:getComputedStyle(i).opacity,clip:getComputedStyle(i.closest('[data-revela]')||i).clipPath})))` });
    console.log(a.nome, dbg.result.value);
    for (const sel of ['#sobre', '#especialidades', '#atendimento', '#metodologia', '#conteudos', '#avaliacoes', '#perguntas', '[data-convite]', '#contato']) {
      await cdp('Runtime.evaluate', { expression: `window.scrollTo(0, document.querySelector('${sel}').getBoundingClientRect().top + scrollY - 60)` });
      await espera(1500);
      const t = await cdp('Page.captureScreenshot', { format: 'png' });
      writeFileSync(join(saida, `${a.nome}-tela-${sel.replace(/[^a-z]/g, '')}.png`), Buffer.from(t.data, 'base64'));
    }
    await cdp('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });
    await espera(800);
  }
  const tela = await cdp('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(saida, `${a.nome}-primeira-tela.png`), Buffer.from(tela.data, 'base64'));
  const { cssContentSize } = await cdp('Page.getLayoutMetrics');
  const medidas = await cdp('Runtime.evaluate', { returnByValue: true, expression: 'JSON.stringify({iw: innerWidth, sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight})' });
  const inteira = await cdp('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: a.width, height: Math.ceil(cssContentSize.height), scale: 1 },
  });
  writeFileSync(join(saida, `${a.nome}.png`), Buffer.from(inteira.data, 'base64'));
  resumo.push({ nome: a.nome, altura: Math.ceil(cssContentSize.height), ...JSON.parse(medidas.result.value) });
}
console.log(JSON.stringify(resumo));
ws.close();
proc.kill();
