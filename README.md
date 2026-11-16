# Site do nutricionista — "A semana"

Site pessoal em Astro, estático, pronto para Vercel, Netlify ou Cloudflare Pages.

## Rodar

```bash
npm install
```

```bash
npm run dev:demo
```

Abre em `http://localhost:4321` com um profissional fictício, só para ver o layout completo.

```bash
npm run dev
```

Abre com os dados reais (`src/data/profissional.json`). Acrescente `?preview=1` ao endereço para ver, marcado na página, cada campo que ainda falta preencher.

```bash
npm run build
```

Gera o site final em `dist/`. Só os dados reais entram nesse build; as marcações de pré-visualização não existem nele.

## Onde editar

| O quê | Arquivo |
|---|---|
| Dados do profissional (nome, CRN, contatos, especialidades, FAQ) | `src/data/profissional.json` |
| Textos editoriais (título do hero, metodologia, princípios) | `src/data/textos.json` |
| Artigos | `src/content/artigos/*.md` |
| Fotos | `src/assets/fotos/` (no arquivo de dados vai só o nome do arquivo) |
| Cores, tipografia e espaçamentos | `src/styles/global.css` |
| Endereço final do site | campo `siteUrl` em `profissional.json` |

Regra geral: campo vazio some do site. Seção sem dados some do site e do menu.

## Fotos

Coloque os arquivos em `src/assets/fotos/` e escreva o nome nos campos `fotos.retrato`, `fotos.sobre`, `fotos.consultorio` e em `especialidades[].imagem`. O build gera AVIF e WebP em vários tamanhos. Enquanto não houver foto, aparece um bloco "Foto: [tipo]".

Use apenas fotos reais do profissional e do consultório. O código de ética do CFN proíbe imagem gerada ou manipulada por IA simulando pessoas, e fotos de "antes e depois".

## Agendamento

Todos os botões "Agendar consulta" têm o mesmo destino: `linkAgendamento`, se preenchido; senão, o WhatsApp (`whatsapp` + `mensagemWhatsapp`).

## Formulário de contato

Preencha `formulario.endpoint` com o endereço do serviço (por exemplo, `https://formspree.io/f/SEU_ID`). Sem ele, o formulário fica oculto. O formulário não tem campo de saúde, exige consentimento e tem campo invisível contra spam.

## Artigos

Um arquivo `.md` por artigo, com este cabeçalho:

```md
---
titulo: "Título"
categoria: "Alimentação"   # Nutrição, Saúde, Performance, Alimentação, Ciência ou Hábitos alimentares
resumo: "Uma ou duas frases."
data: 2026-11-10
tempoLeitura: 5
rascunho: true              # mostra a marca de rascunho e bloqueia indexação; remova ao publicar
referencias:
  - titulo: "Fonte real e verificável"
    url: "https://..."
---
```

## Antes de publicar

1. Preencher `profissional.json` e conferir com `?preview=1` que nada importante ficou pendente.
2. Revisar `textos.json`, a página `/privacidade` (é um modelo) e os dois artigos de exemplo.
3. Definir `siteUrl` e `formulario.endpoint`.
4. Em caso de dúvida sobre os textos, validar com o CRN da região.

Mais detalhes: `docs/01-plano-de-design.md` e `docs/02-relatorio-final.md`.
