// Comportamento funcional do site (sem animação). Tudo aqui é melhoria progressiva:
// sem JavaScript o conteúdo continua visível e os links continuam funcionando.

const $ = <T extends Element = HTMLElement>(s: string, raiz: ParentNode = document) => raiz.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, raiz: ParentNode = document) => Array.from(raiz.querySelectorAll<T>(s));
const avisa = (nome: string) => document.dispatchEvent(new CustomEvent(nome));

/* ---------- Header: fundo ao rolar, some ao descer, volta ao subir ---------- */
const topo = $('[data-topo]');
if (topo) {
  let ultimo = window.scrollY;
  let marcado = false;
  const atualiza = () => {
    marcado = false;
    const y = window.scrollY;
    topo.classList.toggle('rolou', y > 24);
    const descendo = y > ultimo && y > 320;
    if (Math.abs(y - ultimo) > 6) {
      topo.classList.toggle('oculto', descendo && !document.documentElement.classList.contains('menu-aberto'));
      ultimo = y;
    }
  };
  window.addEventListener('scroll', () => { if (!marcado) { marcado = true; requestAnimationFrame(atualiza); } }, { passive: true });
  topo.addEventListener('focusin', () => topo.classList.remove('oculto'));
  atualiza();
}

/* ---------- Indicador de seção ativa ---------- */
const linksNav = $$<HTMLAnchorElement>('[data-nav]');
const indicador = $('[data-indicador]');
const moveIndicador = (link?: HTMLAnchorElement) => {
  if (!indicador) return;
  if (!link) { indicador.style.transform = 'translateX(0) scaleX(0)'; return; }
  const pai = indicador.parentElement!.getBoundingClientRect();
  const r = link.getBoundingClientRect();
  indicador.style.transform = `translateX(${r.left - pai.left}px) scaleX(${r.width})`;
};
if (linksNav.length && 'IntersectionObserver' in window) {
  const alvos = linksNav.map((l) => document.getElementById(l.dataset.nav!)).filter(Boolean) as HTMLElement[];
  let ativo = '';
  const define = (id: string) => {
    if (id === ativo) return;
    ativo = id;
    let escolhido: HTMLAnchorElement | undefined;
    linksNav.forEach((l) => {
      const sim = l.dataset.nav === id;
      if (sim) { l.setAttribute('aria-current', 'true'); escolhido = l; } else l.removeAttribute('aria-current');
    });
    moveIndicador(escolhido);
  };
  if (alvos.length) {
    const visiveis = new Map<string, number>();
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => visiveis.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
      const melhor = [...visiveis.entries()].filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])[0];
      define(melhor ? melhor[0] : '');
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.5, 1] });
    alvos.forEach((a) => io.observe(a));
    window.addEventListener('resize', () => moveIndicador(linksNav.find((l) => l.getAttribute('aria-current') === 'true')));
  }
}

/* ---------- Menu no celular: foco preso, Esc fecha, foco volta ao botão ---------- */
const menu = $('[data-menu]');
const abre = $<HTMLButtonElement>('[data-abre-menu]');
if (menu && abre) {
  const focaveis = () => $$<HTMLElement>('a[href], button:not([disabled])', menu);
  const fechar = (devolveFoco = true) => {
    if (menu.hidden) return;
    menu.classList.remove('aberto');
    abre.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-aberto');
    avisa('rolagem:solta');
    const fim = () => { menu.hidden = true; };
    matchMedia('(prefers-reduced-motion: reduce)').matches ? fim() : setTimeout(fim, 220);
    if (devolveFoco) abre.focus();
  };
  const abrir = () => {
    menu.hidden = false;
    abre.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-aberto');
    avisa('rolagem:trava');
    requestAnimationFrame(() => { menu.classList.add('aberto'); focaveis()[0]?.focus(); });
  };
  abre.addEventListener('click', () => (menu.hidden ? abrir() : fechar()));
  $('[data-fecha-menu]', menu)?.addEventListener('click', () => fechar());
  menu.addEventListener('click', (ev) => { if ((ev.target as HTMLElement).closest('a')) fechar(false); });
  menu.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { ev.preventDefault(); fechar(); return; }
    if (ev.key !== 'Tab') return;
    const f = focaveis();
    const primeiro = f[0], ultimo = f[f.length - 1];
    if (ev.shiftKey && document.activeElement === primeiro) { ev.preventDefault(); ultimo.focus(); }
    else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primeiro.focus(); }
  });
  matchMedia('(min-width: 1100px)').addEventListener('change', (m) => { if (m.matches) fechar(false); });
}

/* ---------- Acordeão ---------- */
$$('[data-acordeao]').forEach((grupo) => {
  const unico = grupo.hasAttribute('data-unico');
  const itens = $$('.ac-item', grupo);
  const define = (item: HTMLElement, aberto: boolean) => {
    item.classList.toggle('aberto', aberto);
    $('.ac-botao', item)?.setAttribute('aria-expanded', String(aberto));
  };
  itens.forEach((item) => {
    $('.ac-botao', item)?.addEventListener('click', () => {
      const abrir = !item.classList.contains('aberto');
      if (unico || grupo.closest('[data-metodo]')) itens.forEach((o) => o !== item && define(o, false));
      define(item, abrir);
      document.dispatchEvent(new CustomEvent('layout:mudou'));
    });
  });
});

/* ---------- Abas da metodologia (setas, Home e End) ---------- */
$$('[role="tablist"]').forEach((lista) => {
  const abas = $$<HTMLButtonElement>('[role="tab"]', lista);
  const progresso = $('[data-progresso]', lista);
  const seleciona = (i: number, foca = false) => {
    abas.forEach((aba, n) => {
      const sim = n === i;
      aba.setAttribute('aria-selected', String(sim));
      aba.tabIndex = sim ? 0 : -1;
      const painel = document.getElementById(aba.getAttribute('aria-controls')!);
      if (painel) {
        painel.hidden = !sim;
        if (sim) painel.dispatchEvent(new CustomEvent('painel:mostra', { bubbles: true }));
      }
    });
    if (progresso) progresso.style.transform = `scaleX(${(i + 1) / abas.length})`;
    if (foca) abas[i].focus();
  };
  abas.forEach((aba, i) => {
    aba.addEventListener('click', () => seleciona(i));
    aba.addEventListener('keydown', (ev) => {
      const mapa: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: abas.length - 1 };
      if (!(ev.key in mapa)) return;
      ev.preventDefault();
      seleciona((mapa[ev.key] + abas.length) % abas.length, true);
    });
  });
});

/* ---------- Seletor de objetivo: grupo de rádio, nada é registrado ---------- */
$$('[data-seletor]').forEach((sec) => {
  const opcoes = $$<HTMLButtonElement>('[data-opcao]', sec);
  const resposta = $('[data-resposta]', sec);
  if (!opcoes.length || !resposta) return;
  opcoes.forEach((o, i) => (o.tabIndex = i === 0 ? 0 : -1));
  const escolhe = (i: number, foca = false) => {
    opcoes.forEach((o, n) => {
      o.setAttribute('aria-checked', String(n === i));
      o.tabIndex = n === i ? 0 : -1;
    });
    const id = opcoes[i].dataset.opcao;
    resposta.classList.add('escolhida');
    $$('[data-resp]', resposta).forEach((r) => {
      const sim = r.dataset.resp === id;
      r.classList.toggle('ativa', sim);
      if (sim) r.dispatchEvent(new CustomEvent('painel:mostra', { bubbles: true }));
    });
    if (foca) opcoes[i].focus();
    document.dispatchEvent(new CustomEvent('layout:mudou'));
  };
  opcoes.forEach((o, i) => {
    o.addEventListener('click', () => escolhe(i));
    o.addEventListener('keydown', (ev) => {
      const mapa: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: opcoes.length - 1 };
      if (!(ev.key in mapa)) return;
      ev.preventDefault();
      escolhe((mapa[ev.key] + opcoes.length) % opcoes.length, true);
    });
  });
});

/* ---------- Painel lateral de especialidade ---------- */
$$<HTMLAnchorElement>('[data-abre-detalhe]').forEach((link) => {
  const dialogo = document.getElementById(link.dataset.abreDetalhe!) as HTMLDialogElement | null;
  if (!dialogo || typeof dialogo.showModal !== 'function') return;
  link.addEventListener('click', (ev) => {
    ev.preventDefault();
    dialogo.showModal();
    avisa('rolagem:trava');
  });
  dialogo.addEventListener('click', (ev) => { if (ev.target === dialogo) dialogo.close(); });
  dialogo.addEventListener('close', () => { avisa('rolagem:solta'); link.focus(); });
});

/* ---------- Mapa: o Google Maps só carrega depois do clique ---------- */
$$('[data-mapa]').forEach((mapa) => {
  $('[data-ver-mapa]', mapa)?.addEventListener('click', () => {
    const quadro = document.createElement('iframe');
    quadro.src = mapa.dataset.src!;
    quadro.title = mapa.dataset.titulo || 'Mapa';
    quadro.loading = 'lazy';
    quadro.referrerPolicy = 'no-referrer-when-downgrade';
    quadro.setAttribute('allowfullscreen', '');
    quadro.tabIndex = 0;
    $('[data-fachada]', mapa)?.replaceWith(quadro);
    quadro.focus();
  });
});

/* ---------- Formulário de contato ---------- */
$$<HTMLFormElement>('[data-form]').forEach((form) => {
  const estado = $('[data-estado]', form)!;
  const botao = $<HTMLButtonElement>('[data-enviar]', form)!;
  const rotulo = botao.textContent || 'Enviar mensagem';
  const campo = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement;
  const regras: Record<string, (v: string, el: any) => string> = {
    nome: (v) => (v.trim().length < 2 ? 'Escreva seu nome.' : ''),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Escreva um e-mail válido, como nome@exemplo.com.'),
    telefone: (v) => (v.trim() === '' || v.replace(/\D/g, '').length >= 10 ? '' : 'Inclua o DDD, com 10 ou 11 dígitos.'),
    mensagem: (v) => (v.trim().length < 10 ? 'Escreva uma mensagem com pelo menos 10 caracteres.' : ''),
    consentimento: (_v, el) => (el.checked ? '' : 'Marque a caixa para concordar com a Política de Privacidade.'),
  };
  const valida = (n: string) => {
    const el = campo(n);
    const msg = regras[n](el.value, el);
    const erro = $(`[data-erro="${n}"]`, form)!;
    erro.textContent = msg;
    msg ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid');
    return !msg;
  };
  Object.keys(regras).forEach((n) => {
    const el = campo(n);
    el?.addEventListener('blur', () => { if (el.value || el.getAttribute('aria-invalid')) valida(n); });
    el?.addEventListener('input', () => { if (el.getAttribute('aria-invalid')) valida(n); });
    el?.addEventListener('change', () => { if (n === 'consentimento') valida(n); });
  });
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const invalidos = Object.keys(regras).filter((n) => !valida(n));
    if (invalidos.length) { campo(invalidos[0]).focus(); return; }
    if ((campo('_gotcha') as HTMLInputElement).value) return; // spam
    botao.disabled = true;
    botao.textContent = 'Enviando…';
    estado.className = 'estado';
    estado.textContent = '';
    try {
      if (form.hasAttribute('data-simulado')) {
        await new Promise((r) => setTimeout(r, 900));
      } else {
        const resp = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!resp.ok) throw new Error(String(resp.status));
      }
      form.reset();
      estado.classList.add('ok');
      estado.textContent = 'Mensagem enviada. Respondo em dias úteis.';
    } catch {
      estado.classList.add('falha');
      estado.textContent = 'Não foi possível enviar agora. Tente de novo ou use o WhatsApp.';
    } finally {
      botao.disabled = false;
      botao.textContent = rotulo;
    }
  });
});

/* ---------- Filtro de artigos por categoria, com URL compartilhável ---------- */
const filtro = $('[data-filtro]');
if (filtro) {
  const cartoes = $$('[data-lista-artigos] [data-categoria]');
  const vazio = $('[data-vazio-artigos]');
  const links = $$<HTMLAnchorElement>('[data-cat]');
  const aplica = (cat: string) => {
    let visiveis = 0;
    cartoes.forEach((c) => {
      const mostra = !cat || c.dataset.categoria === cat;
      c.hidden = !mostra;
      if (mostra) visiveis++;
    });
    if (vazio) vazio.hidden = visiveis > 0;
    $$<HTMLAnchorElement>('[data-cat]', filtro).forEach((l) => (l.dataset.cat === cat ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    document.dispatchEvent(new CustomEvent('layout:mudou'));
  };
  const daUrl = () => new URLSearchParams(location.search).get('categoria') || '';
  links.forEach((l) => l.addEventListener('click', (ev) => {
    ev.preventDefault();
    const cat = l.dataset.cat || '';
    history.pushState({}, '', cat ? `?categoria=${cat}` : location.pathname);
    aplica(cat);
  }));
  window.addEventListener('popstate', () => aplica(daUrl()));
  aplica(daUrl());
}

/* ---------- Copiar link do artigo ---------- */
$$<HTMLButtonElement>('[data-copiar]').forEach((b) => {
  const rotulo = $('[data-copiar-rotulo]', b)!;
  const estado = $('[data-copiar-estado]');
  b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copiar!);
      rotulo.textContent = 'Link copiado';
      if (estado) estado.textContent = 'Link copiado';
    } catch {
      rotulo.textContent = 'Não foi possível copiar';
    }
    setTimeout(() => { rotulo.textContent = 'Copiar link'; if (estado) estado.textContent = ''; }, 2400);
  });
});

/* ---------- Progresso de leitura ---------- */
const barra = $('[data-progresso-leitura]');
if (barra) {
  let marcado = false;
  const mede = () => {
    marcado = false;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
  };
  window.addEventListener('scroll', () => { if (!marcado) { marcado = true; requestAnimationFrame(mede); } }, { passive: true });
  mede();
}

/* ---------- Hero: o dia de hoje e a linha do "agora" ---------- */
const grade = $('[data-hero]');
if (grade) {
  const agora = new Date();
  const dia = (agora.getDay() + 6) % 7; // segunda = 0
  $(`[data-dia="${dia}"]`, grade)?.classList.add('hoje');
  const movel = $('[data-hoje-movel]', grade);
  if (movel) movel.textContent = `hoje, ${agora.toLocaleDateString('pt-BR', { weekday: 'long' })}`;
  const linha = $('[data-agora]', grade);
  const posiciona = () => {
    if (!linha) return;
    const d = new Date();
    const h = d.getHours() + d.getMinutes() / 60;
    const cabeca = $('.dia', grade)?.getBoundingClientRect().height || 44;
    const altura = grade.getBoundingClientRect().height - cabeca;
    if (h < 7 || h >= 22 || altura <= 0) { linha.hidden = true; return; }
    linha.hidden = false;
    linha.style.transform = `translateY(${Math.round(cabeca + ((h - 7) / 15) * altura)}px)`;
    const rotulo = $('[data-agora-hora]', linha);
    if (rotulo) rotulo.textContent = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  posiciona();
  window.addEventListener('resize', posiciona);
  setInterval(posiciona, 60000);
}

/* ---------- Botão flutuante do WhatsApp: aparece depois do hero e some perto do convite e do contato ---------- */
const flutuante = $('[data-flutuante]');
if (flutuante && 'IntersectionObserver' in window) {
  const evita = [$('.hero'), $('[data-convite]'), $('#contato'), $('.rodape')].filter(Boolean) as HTMLElement[];
  const dentro = new Set<Element>();
  const io = new IntersectionObserver((ens) => {
    ens.forEach((en) => (en.isIntersecting ? dentro.add(en.target) : dentro.delete(en.target)));
    flutuante.classList.toggle('visivel', dentro.size === 0);
  }, { threshold: 0.05 });
  evita.forEach((el) => io.observe(el));
}

export {};
