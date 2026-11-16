# Fase 4 — Relatório final

Data: 16/11/2026. Direção visual: "A semana". Build testado: demonstração (`npm run build:demo`) e real (`npm run build`).

## 1. O que mudou em relação ao briefing

Mudanças feitas por decisão sua durante o trabalho:

| Briefing | Entregue | Motivo |
|---|---|---|
| Off-white, verde profundo, bronze | Papel `#F2F4F0`, tinta azul `#2443B8`, verde `#183B32`, tomate `#C93D22` | Você liberou ousar e escolheu a direção "A semana" |
| DM Serif Display + Manrope | Bricolage Grotesque (uma família, variável) | Mesma decisão; as duas fontes do briefing são as mais comuns em sites gerados por IA |
| Hero com foto em 5 colunas e texto em 6 | Hero em grade semanal (calha de horas + 7 dias) | É a primeira tela da direção escolhida |
| Grid de 12 colunas, máximo 1280px | Calha + 7 colunas, de borda a borda, até 1680px | A grade da semana estrutura a página inteira |
| Movimento discreto | Nível "agência, elegante" | Você pediu as melhores animações |
| Botões em pílula | Botões retangulares com raio de 4px, como blocos de agenda | Na direção escolhida os controles são células da folha. Para voltar à pílula, troque `--raio-botao` para `999px` em `src/styles/global.css` |
| Cards com raio de 12px | Sem cards: painéis abrem com um fio de tinta | Mesma razão |
| "Nutricionista · CRN-X 00000" | "Nutricionista, CRN-X 00000" | O ponto médio como separador é um vício de layout gerado |
| Título "…construída para a sua realidade." | "…feita para caber na sua semana." | Liga o título à direção; o original está em `textos.json` como alternativa |

Mantido exatamente como no briefing: ordem e conteúdo das seções, regras éticas do CFN, LGPD, dados em arquivo único, campo vazio = elemento oculto, modo `?preview=1`, comportamento único do agendamento, acessibilidade, SEO, páginas e estrutura do projeto.

## 2. Checklist de entrega

| Item | Status | Como foi verificado |
|---|---|---|
| Nenhum dado pessoal inventado; todos vêm do arquivo de configuração | Passou | `profissional.json` está vazio. Os dados de demonstração ficam em arquivo separado, com aviso fixo na tela, `noindex` e `robots.txt` bloqueando tudo |
| Seções e itens sem dados somem, inclusive do menu | Passou | Com os dados reais vazios restam hero, metodologia, conteúdos, princípios e convite; o menu mostra só Metodologia e Conteúdos |
| Marcação de pré-visualização nunca aparece em produção | Passou | O build real não contém nenhuma ocorrência de "preencher" |
| Nenhum antes e depois, número de resultado, promessa, desconto, sorteio ou urgência | Passou | Busca no HTML gerado; avaliações que citam peso, quilos ou exames são descartadas no código |
| Nenhuma imagem gerada por IA do profissional ou de pacientes | Passou | Só espaços reservados "Foto: [tipo]" e padrões abstratos em SVG |
| CRN visível no hero e no rodapé | Passou | Legenda da foto no hero, assinatura do header e rodapé |
| Formulário sem campos de saúde, com consentimento e link para a privacidade | Passou | Campos: nome, e-mail, telefone (opcional), mensagem, consentimento não pré-marcado, campo invisível contra spam |
| Bronze nunca como texto sobre fundo claro | Não se aplica | O bronze saiu da paleta. A regra equivalente vale para o tomate: só em botão, fio e rótulo curto, todos com 4,5:1 ou mais |
| Sem emojis; ícones SVG consistentes | Passou | Lucide com traço 1,5 em todo o site |
| Responsivo em 375, 768, 1024 e 1440px, sem rolagem horizontal | Passou | Largura de rolagem igual à da janela nas quatro medidas |
| Primeira tela com os dois botões visíveis em 1440x900 e 375x812 | Passou | Medido: 900px no desktop e 647px no celular |
| `prefers-reduced-motion` respeitado | Passou | Capturas com movimento reduzido emulado: tudo no estado final, Lenis desligado |
| Conteúdo legível sem JavaScript | Passou | Build de produção aberto com JavaScript desativado: todas as seções visíveis, acordeões abertos |
| Botões de agendamento com o mesmo nome e o mesmo destino | Passou | Todos os botões do site têm o texto "Agendar consulta" e um único endereço |
| Navegação por teclado | Passou | Abas com setas, Home e End; seletor como grupo de rádio; menu com foco preso e Esc; acordeão; link "Pular para o conteúdo" |
| Mapa só após o clique | Passou | Nenhum iframe na página antes do botão "Ver no mapa"; zero requisições a terceiros no carregamento |
| Fotos em AVIF/WebP com `srcset` e `fetchpriority` no hero | Passou | Testado com uma foto temporária, depois removida |
| Metas de Lighthouse (Performance 90+, LCP, CLS, INP) | Não medido | A execução do Lighthouse foi bloqueada neste ambiente. Ver seção 3 |

## 3. Desempenho

Não consegui rodar o Lighthouse aqui, então as metas do briefing não estão confirmadas. O que foi medido no build de produção:

- Peso total da página inicial: cerca de 165 kB transferidos (fonte 78 kB, JavaScript 60 kB comprimido, CSS 9 kB, HTML).
- Nenhuma requisição a terceiros. Fonte auto-hospedada com `preload` e `font-display: swap`.
- Animações em `transform`, `opacity` e `clip-path`; nenhum WebGL.

Para medir na sua máquina:

```bash
npm run build:demo
```

```bash
npx astro preview
```

```bash
npx lighthouse http://localhost:4321 --form-factor=mobile --view
```

Ponto de atenção: o título do hero entra por animação. Com foto real, o LCP passa a ser a foto, que é pintada desde o primeiro quadro. Enquanto a foto for espaço reservado, o LCP é o título e depende do JavaScript carregar.

## 4. Pendências: o que o profissional precisa enviar

1. Nome de exibição, número e região do CRN, e se tem cadastro no e-Nutricionista.
2. Formação e especializações, com ano e instituição.
3. Especialidades reais, com descrição de duas linhas e um parágrafo de "como eu trabalho" para cada uma.
4. Público atendido, cidade, modalidades, endereço, horários e plataforma do atendimento online.
5. WhatsApp ou link da agenda online.
6. Duração da consulta, como funcionam os retornos e a comunicação entre consultas.
7. Recursos que oferece de fato.
8. Fotos reais: retrato, retrato vertical, consultório e atendimento.
9. Frase de filosofia de trabalho.
10. Avaliações públicas que autoriza usar, com link de origem (se houver).
11. Respostas das perguntas frequentes, incluindo plano de saúde e recibo para reembolso.
12. Endereço final do site (`siteUrl`) e o endereço do serviço de formulário (`formulario.endpoint`).

## 5. Pendências de revisão

- Texto de "Sobre": é um rascunho montado só com os dados; precisa ser reescrito em primeira pessoa pelo profissional (`sobre.paragrafos`, depois `sobre.revisado: true`).
- Textos de `textos.json`: metodologia, princípios e requisitos do online foram escritos como base e precisam de revisão.
- Os dois artigos estão marcados como rascunho e fora da indexação.
- `/privacidade` é um modelo: falta a data e a conferência dos prazos de guarda.
- A imagem de compartilhamento (`/og.png`) usa fonte do sistema, não a Bricolage Grotesque.
- Horários no formato do Google: preencha `horarios[].schema` (por exemplo, `Mo-Th 08:00-18:00`) para entrarem nos dados estruturados.

## 6. Conformidade

O site segue as regras de publicidade descritas no briefing (Resoluções CFN nº 599/2018, nº 760/2023 e a nº 856/2026 citada no briefing, que não conferi na fonte) e a LGPD. Em caso de dúvida sobre os textos finais, o profissional deve validá-los com o CRN da sua região.

## 7. Referências dos artigos

As três foram conferidas hoje: o PDF do Guia Alimentar (Ministério da Saúde) e a página da OMS responderam normalmente; o DOI do artigo de Monteiro e colaboradores redireciona para a Cambridge University Press.
