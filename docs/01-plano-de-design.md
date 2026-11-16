# Fase 1 — Plano de design: "A semana"

Direção escolhida em 16/11/2026: o site é a folha de rotina da semana. A nutrição aparece encaixada nos dias de quem visita, não acima deles. O material é o do caderno e da agenda brasileira: pauta azul, linha de margem vermelha, papel claro.

O briefing pedia off-white, verde, bronze e DM Serif Display + Manrope. Com a liberação para ousar, paleta e fonte mudaram; estrutura de seções, regras éticas, LGPD, acessibilidade, dados em arquivo único e comportamento do agendamento continuam exatamente como no briefing.

## 1. Tokens

### Cor

| Token | Hex | Papel |
|---|---|---|
| `--papel` | `#F2F4F0` | Fundo da folha |
| `--tinta` | `#2443B8` | Pauta, títulos, links, foco, seções "preenchidas" em azul |
| `--verde` | `#183B32` | Blocos cheios: foto reservada, convite final, opção selecionada |
| `--tomate` | `#C93D22` | A ação (Agendar consulta), a margem e o "agora" |
| `--grafite` | `#1D2321` | Texto corrido |

Derivados por `color-mix`: `--pauta` (tinta 16% no papel, linhas da grade), `--pauta-forte` (tinta 34%), `--tinta-clara` (tinta 7% no papel, fundo alternado), `--texto-suave` (grafite 76% no papel), `--sobre-escuro` (papel 78% sobre o fundo escuro, texto de apoio).

Contrastes calculados (WCAG):

| Par | Razão | Uso liberado |
|---|---|---|
| grafite / papel | 14,4:1 | qualquer texto |
| verde / papel | 11,1:1 | qualquer texto |
| tinta / papel | 7,4:1 | qualquer texto |
| papel / tinta | 7,4:1 | qualquer texto em seção azul |
| papel / verde | 11,1:1 | qualquer texto em seção verde |
| papel / tomate | 4,5:1 | texto de botão (16px bold ou maior) |
| tomate / papel | 4,5:1 | só rótulos curtos e fios; nunca parágrafo |

O bronze do briefing saiu da paleta; a regra "bronze nunca como texto" vira "tomate nunca como parágrafo".

### Tipografia

Uma família só: Bricolage Grotesque variável (eixos de peso, largura e tamanho óptico), auto-hospedada. O eixo óptico deixa o corpo calmo e o título com caráter, sem precisar de uma segunda fonte.

| Papel | Ajuste | Desktop | Mobile | Altura |
|---|---|---|---|---|
| H1 | peso 650, largura 88 | 80px | 44px | 1.0 |
| H2 | peso 650, largura 90 | 52px | 34px | 1.05 |
| H3 | peso 600 | 28px | 24px | 1.15 |
| Frase de destaque | peso 500 | 40px | 28px | 1.2 |
| Corpo | peso 400 | 18px | 17px | 1.6 |
| Rótulos da grade (dias, horas) | peso 600, numerais tabulares | 15px | 15px | 1.3 |
| Artigo | peso 400 | 19px | 18px | 1.7 |

Medida máxima: 70 caracteres (68 no artigo). Nada de caixa alta espaçada.

### Grade: a semana

- Desktop (1024px+): calha de horas de 96px + 7 colunas iguais (seg a dom), de borda a borda, até 1680px. As linhas verticais dos dias descem a página inteira em fio claro; a linha de margem tomate separa a calha.
- Mobile e tablet: a semana vira o dia (como numa agenda): tira com os sete dias, calha de 40px com as horas e a margem tomate, e os blocos empilhados nas faixas de hora.
- Seções se compõem em vãos de dias: 4 + 3 ou 3 + 4. Cada seção abre com um fio de tinta de 2px.
- Espaço entre seções: 120px (desktop) / 72px (mobile). Raio: 4px em fotos e botões (os botões são blocos da agenda; o briefing pedia pílula, basta trocar `--raio-botao` para 999px). Sem sombras, exceto a do painel lateral.

## 2. Wireframes

### Header
```
Nome                      Sobre  Especialidades  Metodologia  Atendimento  Conteúdos  Contato   (Agendar consulta)
Nutricionista, CRN-X 0000        ▔▔▔▔▔ indicador desliza até a seção ativa
══════════════════════════════════════════════════════════════════════════ fio de tinta
```

### Hero (1440x900): a folha da semana
```
      │ seg    │ ter    │ qua    │ qui    │ sex ●  │ sáb    │ dom    │
 07h  │ Nutrição baseada em ciência,      │                          │
 10h  │ feita para caber na sua semana.   │      FOTO                │
 13h  │ descrição em duas linhas          │      retrato 4:5         │──── Nutricionista
 16h  │ Nome, CRN │ 60 min │ BH e online  │■ Agendar│                │     CRN-X 00000
 ─────┼─── linha tomate do "agora" ────────────────────────────────────
 19h  │ Espec. 1  │ Espec. 2 │ Espec. 3   │□ Conhecer│      │        │
```
A coluna do dia de hoje ganha um ponto tomate e a linha do "agora" cruza a grade na hora real do visitante. Células vazias também são desenhadas.

Mobile (375x812): calha estreita com a margem tomate; título, descrição, os dois botões, faixa de fatos e, na dobra, a foto.

### Faixa de credenciais
```
══════════════════════════════════════════════════════════════
▔▔▔▔▔▔▔▔▔▔▔▔▔    ▔▔▔▔▔▔▔▔▔▔▔▔▔    ▔▔▔▔▔▔▔▔▔▔▔▔▔    ▔▔▔▔▔▔▔▔▔▔▔▔▔
◇ Formação        ◇ Especialização  ◇ Registro        ◇ Associação
  apoio             apoio             CRN-X 00000       apoio
```

### Como posso ajudar você?
```
seg ─────── qua              qui ───────────────── dom
Como posso                   ○ Melhorar a alimentação no dia a dia
ajudar você?                 ─────────────────────────────────────
┌ resposta ────────┐         ■ Performance esportiva   (linha cheia, verde)
│ 2 a 3 linhas     │         ─────────────────────────────────────
│ link (Agendar)   │         ○ Organizar a rotina alimentar
```

### Especialidades
```
seg ──────────── qui         sex ──────── dom
┌──────────────────┐         ▦ Título            Saiba como…
│ padrão de semana │         ───────────────────────────────
│ ou foto 4:3      │         ▦ Título            Saiba como…
└──────────────────┘         ───────────────────────────────
Título grande, duas linhas   ▦ Título            Saiba como…
```
Sem foto real, cada especialidade recebe um "padrão de semana": uma grade 7x5 com células preenchidas de um jeito próprio.

### Sobre
```
seg ─────── qua              qui ───────────────── dom
┌─────────────┐              Sobre
│   FOTO      │              Texto em primeira pessoa. [RASCUNHO]
│   3:4       │              ┃ "Frase de filosofia grande,
└─────────────┘              ┃  com a linha de margem ao lado."
Trajetória (ano mais recente por cima)
2021 ─ Especialização · Instituição
2016 ─ Graduação · Instituição
```

### Metodologia (seção inteira em tinta azul)
```
Como funciona meu acompanhamento
1                2                3                4
Primeira         Avaliação        Planejamento     Acompanhamento
consulta         nutricional      nutricional
●━━━━━━━━━━━━━━━━○────────────────○────────────────○
Resumo da etapa        Antes        Durante       Depois
```
Mobile: acordeão.

### Recursos
```
Recursos do            ◇ Plano alimentar     ◇ Materiais educativos
acompanhamento         ◇ Lista de compras    ◇ Comunicação entre consultas
```

### Atendimento (fundo tinta-clara)
```
┌ Presencial ───────────────┐   ┌ Online ────────────────────┐
│ foto do consultório 3:2   │   │ padrão de semana 3:2       │
│ endereço, horários        │   │ plataforma, o que é preciso│
│ [Ver no mapa]             │   │ cadastro e-Nutricionista   │
└───────────────────────────┘   └────────────────────────────┘
```

### Conteúdos
```
Conhecimento que transforma a maneira de cuidar da alimentação.
┌ artigo recente 16:10 ─────┐   ▦ categoria, data, leitura / título
└───────────────────────────┘   ▦ categoria, data, leitura / título
título grande, resumo           Ver todos os conteúdos
```

### Princípios, Perguntas frequentes, Contato
```
seg ─────── qua              qui ───────────────── dom
Título da seção              linha 1 (princípio, pergunta ou campo)
(fixo ao rolar)              ─────────────────────────────────────
                             linha 2
```

### Convite final (verde, centralizado) e rodapé (tinta azul)
```
      Comece a construir uma relação mais
      consciente com a sua alimentação.
      (Agendar consulta)  (Falar pelo WhatsApp)
──────────────────────────────────────────────
Nome Completo em display
Nutricionista, CRN, cidade │ navegação │ redes │ privacidade │ © ano
```

## 3. Componentes

Base: `Base.astro`, `Header`, `Rodape`, `BotaoAgendar`, `Icone`, `Foto` (foto real otimizada ou espaço reservado), `PadraoSemana` (arte abstrata), `Preencher` (pré-visualização), `Mapa` (sob demanda).
Seções: `Hero`, `Credenciais`, `Seletor`, `Especialidades`, `Sobre`, `Metodologia`, `Recursos`, `Atendimento`, `Conteudos`, `Reputacao`, `Faq`, `Convite`, `Contato`.
Conteúdo: `CartaoArtigo`, filtro de categorias, progresso de leitura, sumário, bloco do autor, compartilhar.
Dados: `profissional.json` (real, vazio), `profissional.exemplo.json` (fictício, só demonstração), `textos.json` (textos editoriais revisáveis).

## 4. Títulos para o hero (nenhum promete resultado)

1. "Nutrição baseada em ciência, feita para caber na sua semana." (padrão)
2. "Nutrição baseada em ciência, construída para a sua realidade." (direção do briefing)
3. "Ciência da nutrição, traduzida para a vida que você leva."
4. "Um cuidado nutricional que começa por entender como você vive."

## 5. Movimento

Momento autoral: a folha se preenche. No carregamento, as linhas da grade se desenham, os dias aparecem e os compromissos "são marcados": título linha a linha, foto revelada de baixo para cima, célula de agendar por último. Detalhe vivo: ponto no dia de hoje e linha do "agora" na hora real.

Apoio: rolagem suave (Lenis + GSAP na mesma fonte de tempo); fio de tinta de cada seção se desenha ao entrar; títulos H2 por linhas mascaradas; fotos por `clip-path` com parallax leve; padrões de semana que se preenchem; frase de filosofia que acende palavra a palavra; linha de progresso da metodologia; convite final que cresce de cartão a faixa inteira; nome do rodapé subindo; transição entre páginas (View Transitions em CSS). Trocas de estado (abas, seletor) são secas, sem deslocamento. O botão magnético e a cascata genérica de itens saíram na revisão, por fugirem da gramática da folha.

Limites mantidos: sem WebGL, partículas ou cursor personalizado; `prefers-reduced-motion` desliga Lenis e deslocamentos; conteúdo legível sem JavaScript.

## 6. Revisão do plano contra o briefing

- A primeira versão do plano era off-white + serifada + verde: o visual que quase todo site de saúde tem. Trocada pela folha da semana.
- Especialidades era grade de cards iguais: virou destaque + lista com fios.
- Princípios eram cards com ícone: viraram linhas de agenda.
- Rótulos em caixa alta, setas em botões e "01/02/03" fora da metodologia: removidos.
- A célula de agendar tinha um horário fictício ("qui, 16h"): removido, porque sugeria uma vaga que não existe.
- Bronze como texto deixou de existir; o tomate segue a mesma disciplina (ação e fios, nunca parágrafo).
- Fontes condensadas agressivas são proibidas pelo briefing: a largura do título fica em 88, nunca abaixo.
