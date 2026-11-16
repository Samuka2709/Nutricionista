// Camada de movimento. Uma única fonte de tempo: Lenis roda dentro do ticker do GSAP.
// Regras: o conteúdo nasce visível no CSS (estados iniciais são definidos aqui, pelo script);
// com prefers-reduced-motion nada se desloca e o Lenis não é ligado.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global { interface Window { __introFalha?: number } }

const raiz = document.documentElement;
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const liberaIntro = () => { clearTimeout(window.__introFalha); raiz.classList.remove('intro'); };

const deslocamento = () => {
  const cs = getComputedStyle(raiz);
  return -(parseFloat(cs.getPropertyValue('--header-h')) + parseFloat(cs.getPropertyValue('--aviso-h') || '0') + 12);
};

function ancoras(rola: (alvo: HTMLElement) => void) {
  document.addEventListener('click', (ev) => {
    const a = (ev.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.hasAttribute('data-abre-detalhe') || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || url.hash.length < 2) return;
    const alvo = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!alvo) return;
    ev.preventDefault();
    history.pushState({}, '', url.hash);
    rola(alvo);
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    alvo.focus({ preventScroll: true });
  });
}

if (reduz) {
  // Sem deslocamentos: tudo aparece no estado final; âncoras pulam direto.
  liberaIntro();
  ancoras((alvo) => window.scrollTo(0, alvo.getBoundingClientRect().top + window.scrollY + deslocamento()));
} else {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create('saida', '0.23,1,0.32,1');
  CustomEase.create('mov', '0.77,0,0.175,1');
  gsap.defaults({ ease: 'saida', duration: 0.6 });

  /* ---------- Rolagem suave ---------- */
  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ancoras((alvo) => lenis.scrollTo(alvo, { offset: deslocamento(), duration: 1.1 }));
  document.addEventListener('rolagem:trava', () => lenis.stop());
  document.addEventListener('rolagem:solta', () => lenis.start());
  document.addEventListener('layout:mudou', () => requestAnimationFrame(() => { lenis.resize(); ScrollTrigger.refresh(); }));
  if (location.hash.length > 1) {
    const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo) requestAnimationFrame(() => lenis.scrollTo(alvo, { offset: deslocamento(), immediate: true }));
  }

  /* ---------- Hero: a folha se preenche ---------- */
  const hero = $('[data-hero]');
  const comIntro = hero && raiz.classList.contains('intro') && window.scrollY < 40;
  const entradaHero = () => {
    if (!hero) return;
    const h1 = $('[data-titulo-hero]', hero)!;
    const foto = $('[data-foto-hero]', hero)!;
    const cortina = document.createElement('span');
    cortina.setAttribute('aria-hidden', 'true');
    cortina.style.cssText = 'position:absolute;inset:-1px;z-index:2;background:var(--papel);transform-origin:top;';
    foto.append(cortina);
    const dentro = $('img, .reservado', foto);
    const divisao = SplitText.create(h1, { type: 'lines', mask: 'lines', linesClass: 'ln' });
    const resto = $$('[data-entrada]', hero).filter((el) => el !== h1);
    const itens = [...$$('.b-fatos li', hero), ...$$('.b-esp li', hero)];
    const cta = $('.b-cta .evento', hero);

    gsap.set(resto, { opacity: 0, y: 12 });
    gsap.set(itens, { opacity: 0, y: 10 });
    gsap.set([$('.b-fatos', hero), $('.b-esp', hero)], { opacity: 1, y: 0 });
    gsap.set($$('[data-linha]', hero), { scaleX: 0 });
    gsap.set($$('[data-pauta]'), { scaleY: 0 });
    gsap.set($$('.dia span, .hora', hero), { opacity: 0, y: 6 });
    gsap.set(divisao.lines, { yPercent: 110 });
    if (cta) gsap.set(cta, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(h1, { opacity: 1 });
    liberaIntro();

    const tl = gsap.timeline({ onComplete: () => { divisao.revert(); cortina.remove(); ScrollTrigger.refresh(); } });
    tl.to($$('[data-pauta]'), { scaleY: 1, duration: 1.2, ease: 'mov', stagger: 0.04 }, 0)
      .to($$('[data-linha]', hero), { scaleX: 1, duration: 0.9, ease: 'mov', stagger: 0.05 }, 0.05)
      .to($$('.dia span, .hora', hero), { opacity: 1, y: 0, duration: 0.4, stagger: 0.025 }, 0.25)
      .to(divisao.lines, { yPercent: 0, duration: 0.95, stagger: 0.09 }, 0.3)
      .to(cortina, { scaleY: 0, duration: 1.15, ease: 'mov' }, 0.35)
      .fromTo(dentro, { scale: 1.14 }, { scale: 1, duration: 1.5, ease: 'saida' }, 0.35)
      .to(resto, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.75)
      .to(itens, { opacity: 1, y: 0, duration: 0.45, stagger: 0.05 }, 0.9);
    if (cta) tl.to(cta, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'mov', clearProps: 'clipPath' }, 1.0);
    const agora = $('[data-agora]', hero);
    if (agora) tl.fromTo(agora, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.4);
  };
  if (comIntro) {
    // Espera a fonte (no máximo 500 ms) para a quebra de linhas do título sair certa.
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 500))]).then(entradaHero, liberaIntro);
  } else liberaIntro();

  // A foto do hero desliza um pouco dentro da moldura enquanto a folha sobe
  if (hero) {
    const dentro = $('[data-foto-hero] img, [data-foto-hero] .reservado', hero);
    if (dentro && matchMedia('(min-width: 1024px)').matches) {
      gsap.to(dentro, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- Seções ---------- */
  // Fio de tinta que se desenha
  $$('[data-fio]').forEach((fio) => {
    gsap.from(fio, { scaleX: 0, duration: 1.1, ease: 'mov', scrollTrigger: { trigger: fio, start: 'top 90%', once: true } });
  });

  // Títulos por linhas mascaradas
  $$('[data-titulo]').forEach((titulo) => {
    SplitText.create(titulo, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 108, duration: 0.9, stagger: 0.08,
        scrollTrigger: { trigger: titulo, start: 'top 86%', once: true },
      }),
    });
  });

  // Mídia: foto revelada de baixo para cima; padrão de semana que se preenche
  $$('[data-revela]').forEach((bloco) => {
    const st = { trigger: bloco, start: 'top 84%', once: true };
    const celulas = $$('svg rect', bloco);
    const foto = $('[data-foto] img, [data-foto] .reservado', bloco);
    if (foto) {
      gsap.from(bloco, { clipPath: 'inset(100% 0 0 0)', duration: 1.15, ease: 'mov', clearProps: 'clipPath', scrollTrigger: st });
      gsap.from(foto, { scale: 1.16, duration: 1.5, scrollTrigger: st });
    } else if (celulas.length) {
      gsap.from(bloco, { opacity: 0, duration: 0.4, scrollTrigger: st });
      gsap.from(celulas, { opacity: 0, duration: 0.3, stagger: { each: 0.035, from: 'start' }, delay: 0.15, scrollTrigger: st });
    } else {
      gsap.from(bloco, { opacity: 0, y: 12, duration: 0.5, scrollTrigger: st });
    }
  });

  // Parallax leve dentro da moldura (só fotos)
  $$('[data-foto] [data-parallax]').forEach((el) => {
    const moldura = el.closest('[data-foto]') as HTMLElement;
    gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: moldura, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Frase de filosofia: as palavras acendem com a rolagem
  $$('[data-acende]').forEach((frase) => {
    SplitText.create(frase, {
      type: 'words', autoSplit: true,
      onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.16 }, {
        opacity: 1, ease: 'none', stagger: 0.4,
        scrollTrigger: { trigger: frase, start: 'top 82%', end: 'bottom 52%', scrub: true },
      }),
    });
  });

  // Metodologia: numerais sobem em sequência e o trilho se desenha
  const metodo = $('[data-metodo]');
  if (metodo) {
    const st = { trigger: $('.tablist', metodo) || metodo, start: 'top 82%', once: true };
    gsap.from($$('.aba', metodo), { opacity: 0, y: 28, duration: 0.7, stagger: 0.08, scrollTrigger: st });
    gsap.from($('.trilho', metodo), { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'mov', scrollTrigger: st });
  }

  // Trocas de painel (abas e seletor): transição curta, acionada pelo usuário
  document.addEventListener('painel:mostra', (ev) => {
    const painel = ev.target as HTMLElement;
    gsap.fromTo(painel, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: 'none', overwrite: true });
  });

  // Convite final: o bloco cresce de cartão a faixa inteira
  const caixa = $('[data-convite-caixa]');
  if (caixa) {
    gsap.fromTo(caixa, { clipPath: 'inset(10% 7% 10% 7% round 28px)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: caixa, start: 'top 92%', end: 'top 28%', scrub: 0.4 },
    });
  }

  // Rodapé: o nome sobe letra a letra
  const nomeRodape = $('[data-nome-rodape]');
  if (nomeRodape && nomeRodape.textContent?.trim()) {
    SplitText.create(nomeRodape, {
      type: 'chars', autoSplit: true,
      onSplit: (self) => gsap.from(self.chars, {
        yPercent: 105, duration: 0.8, stagger: 0.022,
        scrollTrigger: { trigger: nomeRodape, start: 'top 94%', once: true },
      }),
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export {};
