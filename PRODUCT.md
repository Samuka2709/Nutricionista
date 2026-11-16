# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (preferência declarada no briefing), site estático para Vercel, Netlify ou Cloudflare Pages. Artigos em Markdown com Content Collections. Movimento com GSAP + ScrollTrigger e Lenis.

## Users

Pessoa que ainda não conhece o nutricionista e chega pelo Instagram, pelo Google ou por indicação, quase sempre no celular (inferido: o briefing não diz o canal). Quer saber, em menos de um minuto, quem ele é, como trabalha e como marcar consulta. O público exato vem do campo `publico`; na falta dele, a linguagem é neutra ("você", "pacientes").

Segundo usuário: o próprio profissional (ou quem cuida do site para ele), que precisa preencher e revisar dados e textos sem mexer em componentes.

## Product Purpose

Site pessoal de um nutricionista. Sucesso é o visitante sair com confiança suficiente para agendar, pelo WhatsApp ou pela agenda online.

## Positioning

Nutrição baseada em ciência, construída para a realidade de quem é atendido. O site não promete resultado: mostra método, formação comprovada e a pessoa por trás do atendimento.

## Operating Context

- Agendamento por WhatsApp (`wa.me`) ou por link de agenda online, o mesmo destino em todos os botões.
- Atendimento presencial e/ou online (telenutrição, Resolução CFN nº 760/2023, cadastro no e-Nutricionista).
- Publicidade de profissional de saúde: Código de Ética do Nutricionista (Resolução CFN nº 599/2018 e, a partir de 23/01/2027, nº 856/2026) e LGPD.
- Conteúdo educativo em artigos, com referências reais.

## Capabilities and Constraints

- Todos os dados pessoais vêm de um único arquivo de configuração. Campo vazio = elemento oculto; seção sem dados some do site e do menu.
- Modo de pré-visualização (`?preview=1`) mostra o que falta preencher; nunca aparece em produção.
- Proibido: antes e depois, dados corporais ou exames de pacientes, promessa de resultado, sorteio, desconto, urgência artificial, imagem ou voz gerada por IA simulando pessoas, associação a marcas não validadas.
- Formulário sem campos de saúde, com consentimento não pré-marcado e página `/privacidade`.
- Mapa e scripts de terceiros só após clique ou consentimento.
- Em aberto: todos os dados reais do profissional (nome, CRN, especialidades, endereço, fotos, FAQ).

## Brand Commitments

- Sensação: revista de saúde bem editada. Autoridade calma, ciência legível, proximidade humana. Não é clínica, academia nem loja de suplementos.
- O elemento memorável é fotografia editorial do profissional com tipografia grande; o resto fica quieto.
- O briefing propõe verde profundo #183B32, off-white #F3F0E8, grafite #222827, bronze #B58C5A e DM Serif Display + Manrope. Em 16/11/2026 o usuário liberou ousar mais: fontes e paleta podem mudar se o site ficar mais marcante.
- Exceção registrada: o briefing (seção 7.1) pede o header "transparente sobre o hero; ao rolar, ganha fundo off-white com leve desfoque e borda inferior fina". Esse desfoque do header é a única exceção à regra de não usar glassmorphism.
- Evitar: folhas, saladas, maçã com fita métrica, estetoscópio; visual de academia; kit de cards SaaS; rótulo em caixa alta acima de título; palavra do título em itálico ou outra cor; seta em todo botão; "01/02/03" fora de sequência real; gradiente decorativo; glassmorphism; emojis.
- Movimento: nível "agência, elegante" (escolha do usuário em 16/11/2026). Sem WebGL, partículas ou cursor personalizado.

## Evidence on Hand

Nenhum dado real ainda. Não há nome, CRN, formação, avaliações nem fotos. O site usa um profissional fictício claramente marcado como demonstração (escolha do usuário) e espaços reservados "Foto: [tipo]". Nada disso pode ir para produção. Referências dos artigos: somente fontes reais e verificáveis.

## Product Principles

1. Só o que é comprovado aparece. Sem dado, sem elemento.
2. Informar antes de convencer: tom informativo, nenhuma promessa.
3. Um caminho para agendar, com o mesmo nome e o mesmo destino em todo o site.
4. A pessoa vem antes do sistema: fotografia real e voz em primeira pessoa.
5. O profissional consegue manter o site sozinho, editando um arquivo de dados.

## Accessibility & Inclusion

WCAG 2.2 nível AA. Navegação completa por teclado, foco visível, `prefers-reduced-motion` respeitado, conteúdo legível sem JavaScript, áreas de toque de 44px.
