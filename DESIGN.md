---
name: A semana
description: Site de nutricionista desenhado como a folha de rotina da semana, com a consulta encaixada nos dias de quem visita.
colors:
  papel: "#F2F4F0"
  tinta: "#2443B8"
  tomate: "#C93D22"
  verde: "#183B32"
  grafite: "#1D2321"
  pauta: "#D1D8E7"
  pauta-forte: "#ACB8DD"
  tinta-clara: "#E4E8EC"
  tomate-fundo: "#B43A22"
  texto-suave: "#505553"
  sobre-tinta: "#CDD4E6"
  sobre-verde: "#C2CBC6"
  pauta-tinta: "#5A71C7"
  pauta-verde: "#48645C"
  num-inativo: "#95A4D7"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, -0.6rem + 5.9vw, 5rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 88"
  headline:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.4rem + 2.2vw, 3.25rem)"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 90"
  destaque:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)"
    fontWeight: 500
    fontVariation: "'wdth' 92"
  title:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.35rem + 0.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.03rem + 0.1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'lnum'"
  label:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: "'tnum'"
  grade:
    fontFamily: "Bricolage Grotesque, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    fontFeature: "'tnum'"
rounded:
  foto: "4px"
  botao: "4px"
spacing:
  esp-4: "4px"
  esp-8: "8px"
  esp-12: "12px"
  esp-16: "16px"
  esp-24: "24px"
  esp-32: "32px"
  esp-48: "48px"
  esp-72: "72px"
  secao-movel: "72px"
  secao-desktop: "120px"
  calha-movel: "40px"
  calha-desktop: "96px"
components:
  botao-acao:
    backgroundColor: "{colors.tomate}"
    textColor: "{colors.papel}"
    typography: "{typography.label}"
    rounded: "{rounded.botao}"
    padding: "0 24px"
    height: "48px"
  botao-acao-hover:
    backgroundColor: "{colors.tomate-fundo}"
    textColor: "{colors.papel}"
  botao-linha:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.botao}"
    padding: "0 24px"
    height: "48px"
  botao-linha-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  botao-claro:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.verde}"
    rounded: "{rounded.botao}"
    padding: "0 24px"
    height: "48px"
  botao-claro-hover:
    backgroundColor: "{colors.sobre-verde}"
    textColor: "{colors.verde}"
  botao-compacto:
    rounded: "{rounded.botao}"
    padding: "0 18px"
    height: "44px"
  evento-acao:
    backgroundColor: "{colors.tomate}"
    textColor: "{colors.papel}"
    rounded: "{rounded.botao}"
    padding: "12px 16px"
    height: "78px"
  evento-linha:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.botao}"
    padding: "12px 16px"
    height: "60px"
  opcao-linha:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.title}"
    padding: "16px 16px 16px 12px"
    height: "76px"
  opcao-linha-selecionada:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.papel}"
  opcao-linha-hover:
    backgroundColor: "{colors.tinta-clara}"
  campo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.grafite}"
    padding: "12px 14px"
    height: "52px"
  painel-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  faixa-verde:
    backgroundColor: "{colors.verde}"
    textColor: "{colors.papel}"
---

# Design System: A semana

## Overview

**Creative North Star: "A folha de rotina da semana"**

> **Revisão de 17/11/2026, a pedido do usuário:** a pauta visível saiu do site: linhas verticais dos dias, linha de margem tomate, calha de horas, rótulos de dia e hora do hero, linha do "agora", padrões de semana quadriculados e grade de horários. A grade de 7 colunas continua organizando os blocos, mas não é mais desenhada, e a calha mede 0. O hero virou uma abertura editorial: texto em 7/12 com as duas ações lado a lado e a faixa de fatos com fios verticais; à direita, a foto alta em `figure` com legenda. Novos detalhes: aspas tipográficas tomate na frase de filosofia e nas avaliações, e foto de fundo com véu verde a 86% no convite final (`fotos.trabalho`). Os trechos abaixo que descrevem a pauta, a calha e o hero em faixas de hora valem como história do sistema, não como regra atual.

O site inteiro é uma folha de agenda semanal impressa em papel claro: uma calha de horas à esquerda e sete colunas de dias que descem a página de borda a borda, pautadas em tinta azul. O conteúdo não fica em cards soltos; ele é marcado na grade como compromisso. Títulos ocupam faixas de dias, a foto ocupa um bloco de dias e horas, e a ação principal é uma célula tomate na quinta-feira às 16h. A linha de margem tomate atravessa toda a folha, como no caderno.

A densidade é de papelaria, não de painel: muito papel, fios finos, blocos cheios só onde algo foi "marcado". Uma família tipográfica só (Bricolage Grotesque variável, com eixo de largura) faz tudo, do título de 80px ao rótulo de hora de 12px; a hierarquia vem de tamanho, peso e largura, nunca de uma segunda fonte. A arte abstrata da marca é o padrão de semana 7x5, gerado a partir da mesma grade.

O movimento é o de quem preenche a agenda: as linhas se desenham, os blocos são revelados por máscara e as trocas de estado são secas. No celular a mesma folha vira a vista de um dia, com a calha mantida.

**Key Characteristics:**
- Grade da semana como estrutura: calha de horas + 7 dias no desktop, calha + 1 dia no celular.
- Papel, tinta, tomate, verde e grafite; tons intermediários sempre misturados desses cinco.
- Uma família, Bricolage Grotesque variável, com largura comprimida (86% a 92%) nos títulos.
- Cantos quase retos (4px): botões são blocos de agenda, não pílulas.
- Profundidade plana; o único elevado é a gaveta de detalhe.
- Linhas que se desenham, blocos revelados por máscara, trocas secas; tudo desligado com movimento reduzido.

## Colors

Cinco cores de papelaria, com os intermediários feitos por mistura (`color-mix` em sRGB) entre elas; nenhum componente escreve hex próprio.

### Primary
- **Tinta de Caneta Azul** (tinta): a voz do sistema. Títulos h1 a h3, links, rótulos de dia e hora, fios de seção (2px), botão secundário em contorno, foco e seleção de texto. Também é o fundo cheio da seção de metodologia e do menu do celular. Contraste 7,38:1 sobre o papel.

### Secondary
- **Tomate** (tomate): a cor da ação e do "agora". Botão Agendar consulta, linha de margem vertical (a 55% de opacidade), ponto do dia de hoje, linha e hora do "agora", indicador de navegação ativa, marca do seletor, erros de formulário e a única célula de destaque em cada padrão de semana. Texto papel sobre tomate dá 4,55:1; o hover escurece para **Tomate Fundo** (tomate-fundo, 5,32:1).

### Tertiary
- **Verde Bloco** (verde): o compromisso marcado. Opção selecionada do seletor, células abertas da grade de horários, fundo da foto e do seu espaço reservado, faixa do convite final. Papel sobre verde dá 11,09:1.

### Neutral
- **Papel** (papel): fundo de toda a página, texto sobre blocos cheios, fundo dos campos.
- **Grafite** (grafite): texto corrido (14,43:1 sobre papel).
- **Texto Suave** (texto-suave): apoio, resumos, metadados (6,86:1).
- **Pauta** (pauta): linhas verticais dos dias e linhas de hora no hero.
- **Pauta Forte** (pauta-forte): divisórias de lista, bordas de campo, cabeçalho da grade; é fio decorativo e de borda, nunca texto (1,78:1).
- **Tinta Clara** (tinta-clara): fundo do padrão de semana claro e hover/pressão das opções.
- **Sobre Tinta / Sobre Verde** (sobre-tinta, sobre-verde): texto de apoio sobre os blocos azul (5,51:1) e verde (7,40:1).
- **Pauta Tinta / Pauta Verde** (pauta-tinta, pauta-verde): fios sobre fundo azul e sobre fundo verde.
- **Numeral Inativo** (num-inativo): numerais grandes das etapas não selecionadas sobre azul (3,33:1, só em texto de 64px ou mais).

### Named Rules
**The Cinco Tintas Rule.** Toda cor nova é uma mistura das cinco primitivas (papel, tinta, tomate, verde, grafite). Se não sai delas, não entra.

**The Tomate É Agora Rule.** Tomate marca só a ação de agendar, o tempo presente (hoje, agora, margem) e erros. Em cada padrão de semana, no máximo uma célula tomate.

**The Bloco Cheio Rule.** Preencher uma área de cor significa "marcado": verde para escolhido ou aberto, tinta para seção cheia, tomate para a ação. Vazio é fio claro sobre papel.

## Typography

**Display Font:** Bricolage Grotesque, variável, peso 200 a 800 e largura 75% a 100%, arquivo woff2 próprio (com Segoe UI, system-ui, Helvetica Neue, Arial)
**Body Font:** a mesma família
**Label/Mono Font:** a mesma família, com algarismos tabulares

**Character:** Uma grotesca com tinta de caneta: os títulos comprimem a largura (86% a 92%) e apertam o espaçamento para parecer escritos à mão no quadro do dia; o corpo volta à largura normal e respira em 1,6.

### Hierarchy
- **Display** (650, 44px a 80px, 1; largura 88%, -0,025em): só o h1 do hero e do artigo.
- **Headline** (650, 34px a 52px, 1,05; largura 90%, -0,02em): títulos de seção (h2) e título da gaveta.
- **Destaque** (500, 28px a 40px; largura 92%): a frase de filosofia em Sobre, que acende palavra a palavra.
- **Title** (600, 24px a 28px, 1,15; -0,01em): h3, opções do seletor, títulos de painel.
- **Body** (400, 17px a 18px, 1,6): texto corrido, parágrafos com no máximo 34em (cerca de 70 caracteres); apoio de seção com 46ch.
- **Label** (600 a 650, 15px, 1,3; algarismos tabulares): rótulos, metadados fortes, links de texto, botões compactos; botões normais em 16px/650.
- **Grade** (600, 12px a 13px; algarismos tabulares): dias e horas da folha e da grade de horários.
- **Numerais de etapa** (650, 64px a 96px, 0,9; largura 86%, -0,03em): números da metodologia, onde a sequência é real.

### Named Rules
**The Uma Família Rule.** Bricolage Grotesque faz tudo. Hierarquia vem de tamanho, peso (400, 500, 600, 650) e largura; nunca de uma segunda fonte, itálico decorativo ou caixa alta espaçada.

**The Número de Agenda Rule.** Todo número que cai na grade (hora, dia, CRN, data, etapa) usa algarismos tabulares.

## Layout

**A folha.** Um contêiner de até 1680px centralizado. Atrás de todas as seções corre a pauta: a linha de margem tomate na borda da calha (sempre visível) e, a partir de 1024px, seis linhas verticais de dia em pauta, do fim do cabeçalho até o rodapé.

**A grade da semana.** Colunas: calha + 7 dias iguais no desktop (a partir de 1024px); calha + 1 coluna no celular, que é a vista de um dia. A calha mede 40px no celular e 96px no desktop; o recuo de texto após a margem é 14px/24px, e a borda direita 18px/24px. Blocos de conteúdo se posicionam por dia inicial e final (por exemplo, título de seg a qua, opções de qui a dom), sempre alinhados às linhas de dia.

**O hero.** Linha de cabeçalho de 44px com os dias, cinco faixas de hora (07h a 19h) de no mínimo 118px, altura de até uma tela (máx. 1000px). No desktop o título cobre seg a qui nas três primeiras faixas sobre um bloco de papel próprio; a foto cobre sex a dom por quatro faixas, com a pauta verde desenhada dentro dela até a faixa das 16h; a ação fica na quinta às 16h e o botão secundário logo abaixo. No celular os mesmos blocos empilham dentro da coluna do dia.

**Ritmo.** Escala de espaço em 4, 8, 12, 16, 24, 32, 48 e 72px. Seções abrem com 72px (celular) ou 120px (desktop), começam por um fio de tinta de 2px a partir da margem, com 32px/48px até o título. Seções cheias (metodologia, convite) ocupam a largura toda e repetem o respiro por dentro. No desktop, títulos de seção podem grudar ao rolar.

**Pontos de quebra.** 1024px troca a vista de um dia pela semana inteira; 1100px mostra o menu horizontal; 768px, 640px, 480px e 420px só ajustam detalhes.

### Named Rules
**The Tudo Cai na Linha Rule.** Todo bloco começa e termina numa linha de dia ou de hora. Nada flutua entre colunas.

## Elevation & Depth

O sistema é plano. A profundidade vem de fio e de preenchimento: linhas de pauta, fios de tinta, blocos cheios de cor e o papel do título passando por cima das linhas. O cabeçalho fixo, depois de rolar, ganha papel a 88% com desfoque de 10px e um fio inferior em pauta forte, sem sombra.

### Shadow Vocabulary
- **Gaveta** (`box-shadow: -24px 0 60px -30px color-mix(in srgb, var(--grafite) 45%, transparent)`): só o painel lateral de detalhe das especialidades, com fundo de grafite a 40% atrás. É a única peça que sai do papel.

### Named Rules
**The Papel Plano Rule.** Nada fica elevado em repouso. Só um painel modal, que realmente cobre a folha, ganha sombra.

## Shapes

Cantos quase retos: 4px para fotos, padrões de semana e botões; 2px no anel de foco. Círculos aparecem apenas como marcadores de tempo e de escolha (ponto do dia de hoje, ponto do "agora", marca do seletor). Bordas são fios: 1px de pauta para divisórias, 1,5px para contornos de botão e campo, 2px de tinta para fios de seção e topo do hero. Os espaços reservados de foto têm cantoneiras de álbum de 18px no topo.

### Named Rules
**The Bloco de Agenda Rule.** Botões e controles são células da agenda (raio de 4px), nunca pílulas.

## Components

### Buttons
Blocos de agenda firmes, com leve recuo ao toque.
- **Shape:** quase retos (4px), altura mínima de 48px, 24px de padding lateral, 16px/650, ícone com 10px de espaço.
- **Ação (Agendar consulta):** tomate com texto papel. É o único botão de agendamento do site: mesmo rótulo e mesmo destino em todo lugar, abrindo a agenda online ou o WhatsApp em nova aba.
- **Linha:** contorno de tinta de 1,5px, texto tinta; no hover enche de tinta com texto papel.
- **Claro / Linha clara:** para fundos verde ou azul; papel com texto verde, ou contorno papel que enche no hover.
- **Compacto:** 44px de altura e 18px de padding, no cabeçalho.
- **Hover / Focus:** hover só em ponteiro fino, troca de fundo em 160ms; pressão escala para 0,97 em 140ms; foco com anel de tinta de 2px a 2px de distância (papel sobre fundos escuros).

### Compromisso do hero
A célula da folha que é botão. Preenche a célula inteira, texto alinhado embaixo à esquerda (19px a 24px/650), com uma linha de meta pequena no topo ("Primeira consulta, 60 min"). Versão ação em tomate (no mínimo 78px) e versão linha em contorno de tinta sobre papel.

### Seletor (linhas de agenda)
- **Style:** lista de linhas de 76px separadas por fio de pauta forte, texto title em tinta, círculo de 20px à esquerda.
- **State:** a opção selecionada enche a linha de verde com texto papel e acende o ponto tomate no círculo; hover e pressão em tinta clara. Grupo de rádio acessível; a resposta aparece abaixo do título, separada por fio de tinta de 2px.

### Cards / Containers
- **Corner Style:** sem cartão desenhado. Artigos e especialidades são mídia (4px) + texto direto no papel.
- **Background:** papel; mídia é foto ou padrão de semana.
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** variante em linha usa fio inferior de pauta forte e miniatura de 72px a 96px.
- **Internal Padding:** 20px entre mídia e texto, 10px entre linhas de texto; no hover a mídia aproxima 3%.

### Inputs / Fields
- **Style:** fundo papel, borda de 1,5px em pauta forte, altura mínima de 52px, padding 12px 14px, rótulo acima em 15px/650 tinta.
- **Focus:** borda e anel de 2px em tinta.
- **Error / Disabled:** borda tomate e mensagem tomate em 14px/600 abaixo; botão de envio a 60% de opacidade enquanto envia. Avisos ficam ao lado de um fio tomate vertical à esquerda.

### Navigation
- **Cabeçalho:** fixo, 64px/72px, alinhado à margem da folha; nome em 20px/650 a 90% de largura, CRN em 13px abaixo. Some ao rolar para baixo e volta ao subir; ganha papel translúcido depois de rolar.
- **Menu:** links em 15px/500 grafite, ativo em tinta/650, com um traço tomate de 2px que desliza até o link da seção visível.
- **Celular:** painel em tela cheia de tinta, com a margem tomate preservada, links de 32px/650 separados por fio, revelado de cima para baixo por máscara, e o botão claro de agendar no pé.

### Folha da semana (assinatura)
A grade do hero com dias, horas, linhas de pauta, o ponto do dia de hoje e a linha do "agora" na hora real do visitante: um fio tomate com ponto de 9px na margem, e a hora em tomate tabular num rótulo de papel encostado à esquerda, de modo que o fio começa depois do rótulo.

### Padrão de semana
Arte abstrata da marca: grade 7x5 com fio de pauta e células cheias em tinta e verde, no máximo uma em tomate. Três fundos (claro, tinta, verde), raio de 4px. Substitui foto de banco em especialidades e artigos.

### Grade de horários
Miniatura da semana (até 420px) com células de 14px; horas de atendimento em verde cheio. É decorativa; o texto dos horários fica ao lado para leitores de tela.

### Acordeão e abas
FAQ e metodologia no celular são acordeões com fio inferior, linha de 64px e sinal de mais que gira 45°; abertura por altura de grade em 240ms. Sem JavaScript, ficam abertos. No desktop a metodologia vira abas com numerais grandes e um trilho de 2px cujo progresso desliza (420ms).

### Movimento
- **Curvas:** saída `cubic-bezier(0.23, 1, 0.32, 1)` para quase tudo; entrada e saída `cubic-bezier(0.77, 0, 0.175, 1)` para linhas que se desenham.
- **Durações:** toque 140ms, painel 240ms, trocas de cor 160ms; reveals de 0,6s a 1,5s.
- **Carga do hero:** pauta desce, linhas de hora se desenham, dias e horas aparecem, título sobe por linhas mascaradas, a foto é descoberta por uma cortina de papel, a ação é revelada da esquerda para a direita e o "agora" acende por último.
- **Rolagem:** fios de seção se desenham, títulos sobem por linhas, fotos são reveladas de baixo para cima, padrões de semana se preenchem célula a célula, a frase de filosofia acende palavra a palavra, o convite cresce até a faixa inteira. Rolagem suave com Lenis.
- **Movimento reduzido:** Lenis não liga, nada se desloca, tudo nasce no estado final; restam só trocas de cor e opacidade curtas (até 160ms).

## Do's and Don'ts

### Do:
- **Do** posicionar cada bloco por dia inicial e final da grade (calha 40px/96px, 7 colunas a partir de 1024px).
- **Do** usar tomate só para agendar, para o tempo presente e para erros; uma célula tomate por padrão de semana.
- **Do** desenhar o vazio com fio claro (pauta ou pauta forte) e o escolhido com bloco cheio (verde).
- **Do** manter botões e controles com 4px de raio e alvo mínimo de 44px.
- **Do** usar algarismos tabulares em horas, dias, datas, CRN e etapas.
- **Do** comprimir a largura dos títulos (86% a 92%) em vez de trocar de fonte.
- **Do** fazer o conteúdo nascer visível no CSS e deixar o script esconder só o que vai animar.

### Don't:
- **Don't** usar o arranjo padrão da categoria: título à esquerda, foto arredondada à direita e fileira de cards.
- **Don't** transformar botões em pílulas (999px) nem arredondar cards e fotos além de 4px.
- **Don't** adicionar uma segunda família tipográfica nem rótulos em caixa alta espaçada acima dos títulos.
- **Don't** escrever hex em componentes; toda cor passa pelos tokens.
- **Don't** usar pauta forte como cor de texto.
- **Don't** pôr sombra em elementos em repouso; só a gaveta modal tem sombra.
- **Don't** usar foto de banco ou imagem gerada para representar o profissional ou pacientes; sem foto real, use o espaço reservado ou o padrão de semana.
