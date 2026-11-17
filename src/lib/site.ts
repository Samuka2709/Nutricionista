// Fonte única da verdade: todos os componentes leem os dados por aqui.
// Dados reais: src/data/profissional.json. Demonstração (fictícia): npm run dev:demo.
import real from '../data/profissional.json';
import exemplo from '../data/profissional.exemplo.json';
import textos from '../data/textos.json';

export const demo = import.meta.env.MODE === 'demo';
export const p: any = demo ? exemplo : real;
export const t: any = textos;

/** As marcações "[preencher: campo]" só entram no HTML em desenvolvimento ou com PUBLIC_PREVIEW=1. */
export const previewDisponivel = import.meta.env.DEV || import.meta.env.PUBLIC_PREVIEW === '1';

export const tem = (v: unknown): boolean => {
  if (Array.isArray(v)) return v.some(tem);
  if (v && typeof v === 'object') return Object.values(v).some(tem);
  return v !== undefined && v !== null && v !== false && String(v).trim() !== '';
};

export const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Identidade
export const nome: string = p.nomeExibicao || p.nome || '';
export const nomeCompleto: string = p.nome || p.nomeExibicao || '';
export const crn: string = tem(p.crn?.regiao) && tem(p.crn?.numero) ? `${p.crn.regiao} ${p.crn.numero}` : '';
export const identificacao: string = ['Nutricionista', crn].filter(Boolean).join(', ');

// Modalidades
const modalidades: string[] = p.modalidades || [];
export const presencial = modalidades.includes('presencial');
export const online = modalidades.includes('online');
export const cidade: string = p.cidade || '';
export const cidadeCurta: string = cidade.split('/')[0].trim();
export const modalidadesTexto: string =
  presencial && online ? `Atendimento presencial${cidadeCurta ? ` em ${cidadeCurta}` : ''} e online`
  : presencial ? `Atendimento presencial${cidadeCurta ? ` em ${cidadeCurta}` : ''}`
  : online ? 'Atendimento online' : '';

// Agendamento: o mesmo destino em todos os botões do site
const digitos = String(p.whatsapp || '').replace(/\D/g, '');
export const whatsappUrl: string = digitos
  ? `https://wa.me/${digitos}?text=${encodeURIComponent(p.mensagemWhatsapp || '')}`
  : '';
export const agendarUrl: string = p.linkAgendamento || whatsappUrl;
export const whatsappExibicao: string = digitos.length >= 12
  ? `+${digitos.slice(0, 2)} (${digitos.slice(2, 4)}) ${digitos.slice(4, digitos.length - 4)}-${digitos.slice(-4)}`
  : digitos;

export const instagramUrl: string = p.instagram
  ? (String(p.instagram).startsWith('http') ? p.instagram : `https://www.instagram.com/${String(p.instagram).replace(/^@/, '')}`)
  : '';
export const instagramExibicao: string = p.instagram ? `@${String(p.instagram).replace(/^@|^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')}` : '';

// Endereço e mapa
const e = p.endereco || {};
export const enderecoLinhas: string[] = [e.rua, [e.bairro, e.cidade].filter(tem).join(', '), e.cep ? `CEP ${e.cep}` : ''].filter(tem);
export const enderecoTexto: string = [e.rua, e.bairro, e.cidade, e.cep].filter(tem).join(', ');
export const temEndereco = tem(e.rua);
export const mapsUrl: string = e.mapsUrl || (temEndereco ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoTexto)}` : '');
export const mapsEmbed: string = temEndereco ? `https://www.google.com/maps?q=${encodeURIComponent(enderecoTexto)}&output=embed` : '';

// Especialidades e seletor de objetivo
export const especialidades: any[] = (p.especialidades || [])
  .filter((x: any) => tem(x.titulo))
  .map((x: any) => ({ ...x, id: slug(x.titulo) }));
export const objetivos: any[] = especialidades.filter((x) => tem(x.comoTrabalho)).slice(0, 6);

// Perguntas com resposta
export const faq: any[] = (p.faq || []).filter((x: any) => tem(x.pergunta) && tem(x.resposta));

// Avaliações: só com origem pública e sem menção a resultado corporal, peso ou exame
const vetado = /\b(kg|quilos?|emagrec\w*|perdi|perdeu|peso|exames?|gordura|medidas?|barriga|cintura)\b/i;
export const avaliacoes: any[] = (p.avaliacoesPublicas || [])
  .filter((a: any) => tem(a.texto) && tem(a.url) && !vetado.test(a.texto))
  .slice(0, 3);

// Trajetória: o mais recente por cima
export const trajetoria: any[] = [...(p.formacao || []), ...(p.especializacoes || []), ...(p.experiencias || [])]
  .filter((x: any) => tem(x.titulo))
  .sort((a: any, b: any) => Number(b.ano || 0) - Number(a.ano || 0));

// Faixa de credenciais: no máximo 4 itens, todos comprovados
const f0 = (p.formacao || []).find((x: any) => tem(x.titulo));
const e0 = (p.especializacoes || []).find((x: any) => tem(x.titulo));
const a0 = (p.associacoes || []).find((x: any) => tem(x.nome));
const pub0 = (p.publicacoes || []).find((x: any) => tem(x.titulo));
export const credenciais: { icone: string; titulo: string; apoio: string }[] = [
  f0 && { icone: 'formacao', titulo: f0.titulo, apoio: [f0.instituicao, f0.ano].filter(tem).join(', ') },
  e0 && { icone: 'especializacao', titulo: e0.titulo, apoio: [e0.instituicao, e0.ano].filter(tem).join(', ') },
  crn && { icone: 'registro', titulo: crn, apoio: 'Registro no Conselho Regional de Nutricionistas' },
  a0 ? { icone: 'associacao', titulo: a0.nome, apoio: a0.descricao || '' }
    : pub0 && { icone: 'publicacao', titulo: pub0.titulo, apoio: [pub0.veiculo, pub0.ano].filter(tem).join(', ') },
].filter(Boolean) as any;

// Formulário
export const formEndpoint: string = p.formulario?.endpoint || '';

// Quais seções existem (seção sem dados some do site e do menu)
export const temContato = tem(whatsappUrl) || tem(p.email) || tem(instagramUrl) || temEndereco || tem(formEndpoint);
export const secoes = {
  sobre: tem(nome),
  especialidades: especialidades.length > 0,
  seletor: objetivos.length >= 2,
  metodologia: (t.metodologia?.etapas || []).length > 0,
  recursos: tem(p.recursosAcompanhamento),
  atendimento: presencial || online,
  contato: temContato,
};

export const nav = (temArtigos: boolean) => [
  { id: 'sobre', rotulo: 'Sobre', visivel: secoes.sobre },
  { id: 'especialidades', rotulo: 'Especialidades', visivel: secoes.especialidades },
  { id: 'metodologia', rotulo: 'Metodologia', visivel: secoes.metodologia },
  { id: 'atendimento', rotulo: 'Atendimento', visivel: secoes.atendimento },
  { id: 'conteudos', rotulo: 'Conteúdos', visivel: temArtigos },
  { id: 'contato', rotulo: 'Contato', visivel: secoes.contato },
].filter((x) => x.visivel);

export const dataBR = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const tituloSite: string = nome
  ? `${nome} — Nutricionista${cidadeCurta ? ` em ${cidadeCurta}` : ''}${crn ? ` | ${crn}` : ''}`
  : 'Nutricionista';
export const descricaoSite: string = [
  nome ? `${nome}, nutricionista${crn ? ` (${crn})` : ''}.` : '',
  modalidadesTexto ? `${modalidadesTexto}.` : '',
  t.hero.descricao,
].filter(Boolean).join(' ');

/** Títulos editoriais: trechos entre *asteriscos* viram ênfase em itálico. O resto é escapado. */
export const enfase = (s: string): string =>
  String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
export const semEnfase = (s: string): string => String(s || '').replace(/\*/g, '');
