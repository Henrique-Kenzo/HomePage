# Handoff: Cartão de Visitas — kenzo.dev (redesign da home como página única)

## Overview
Redesign do site kenzo.dev como **cartão de visitas de uma página só**: posicionamento "eu resolvo a causa, não o sintoma", voltado a converter clientes PJ/freelance (indústrias, ERP, automação) e recrutadores. CTA principal: WhatsApp.

## About the Design Files
Os arquivos deste pacote são **referências de design em HTML** — protótipos que mostram aparência e comportamento pretendidos, NÃO código de produção para copiar. A tarefa é **recriar este design no codebase existente** (TanStack Start + React + Tailwind v4, pasta \`HomePage\`), usando os padrões já estabelecidos: rotas file-based em \`src/routes/\`, componentes em \`src/components/site/\`, tokens no \`styles.css\`.

⚠️ **REGRA INEGOCIÁVEL**: o fundo 3D/rede neural interativa (\`FxNeural.tsx\`, já existente no codebase) **NUNCA deve ser removido**. Ele permanece como fundo fixo (\`position:fixed; inset:0; z-index:0\`) atrás de todo o conteúdo, em todas as páginas. O \`fx-neural.js\` deste pacote é apenas o porte do mesmo efeito para o protótipo — no codebase, use o \`FxNeural.tsx\` existente.

## Fidelity
**High-fidelity (hifi).** Cores, tipografia, espaçamentos e copy são finais. Recriar pixel-perfect com Tailwind usando os tokens já existentes no repo.

## Estrutura da página (única, index.tsx)
A intenção é substituir a home multi-seção atual por esta página única. Decidir com o dono do site o destino das outras rotas (\`/sobre\`, \`/stack\`, \`/projetos\`, etc.) — a direção acordada é "cartão de visitas: 1 página forte, sem lista de projetos". Sugestão: redirecionar rotas antigas para as âncoras equivalentes.

### 1. Nav (sticky)
- \`position:sticky; top:0\`; fundo \`rgba(7,9,7,0.7)\` + \`backdrop-blur(24px)\`; borda inferior \`rgba(255,255,255,0.06)\`; padding \`20px 48px\`.
- Logo: \`kenzo\` (branco) + \`.dev\` (verde), JetBrains Mono 15px bold, link para \`#topo\`.
- Links à direita (gap 28px): \`./resolvo\`, \`./processo\` — JetBrains Mono 11px, letter-spacing 0.18em, cor \`rgba(241,245,236,0.6)\`, hover verde \`#b6f34a\`.
- Botão \`chamar_no_whatsapp()\`: fundo \`#b6f34a\`, texto \`#070907\`, JetBrains Mono 11px bold, padding \`10px 16px\`, sem border-radius; hover \`#d3ff7d\`.

### 2. Hero (\`#topo\`) — min-height: 100vh − nav
- Container max-width 1200px, centralizado verticalmente, gap 28px.
- Badge de status: borda \`rgba(182,243,74,0.35)\`, padding \`7px 14px\`, dot verde 6px piscando (keyframe opacity 1↔0.25, 1.6s), texto JetBrains Mono 10px uppercase ls 0.28em verde: \`rede ativa · londrina-pr · disponível\` (ou \`em projeto\` — ver State).
- H1: Space Grotesk 700, \`clamp(48px, 6.5vw, 92px)\`, line-height 1, ls −0.03em, max-width 15ch: **"Sintoma qualquer um vê. Eu resolvo _a causa._"** ("a causa." em \`#b6f34a\`).
- Parágrafo: 19px, lh 1.6, \`rgba(241,245,236,0.6)\`, max-width 52ch: "Henrique Kenzo · engenharia full-stack. ERPs industriais, automação, integrações e pipelines de IA — sistemas que continuam funcionando depois que o deploy acaba. Node, Python e React, do banco ao pixel."
- CTAs (flex gap 14px):
  - Primário \`me_conta_o_problema()\`: fundo \`#b6f34a\`, texto \`#070907\`, JetBrains Mono 13px bold, padding \`16px 28px\`; hover \`#d3ff7d\` + glow \`0 0 34px rgba(182,243,74,0.45)\`.
  - Secundário \`ver_o_que_eu_resolvo()\` → \`#resolvo\`: borda \`rgba(241,245,236,0.25)\`, texto claro; hover borda+texto verdes.
- Rodapé do hero (linha entre extremos, JetBrains Mono 10px ls 0.18em):
  - Esq. \`rgba(241,245,236,0.35)\`: \`LAT -23.3103 · LON -51.1628 · nó: cartao/01 · sinapses: 118\`
  - Dir. \`rgba(182,243,74,0.6)\`: \`mova o mouse · clique para propagar um pulso · scroll ↓\`
- Entrada animada: fadeUp (translateY 24px→0 + opacity), 0.7s \`cubic-bezier(0.16,1,0.3,1)\`, delays escalonados 0 / 0.08s / 0.16s / 0.24s.

### 3. ./resolvo (\`#resolvo\`)
- Seções internas: \`border-top: 1px solid rgba(255,255,255,0.07)\`, padding \`120px 48px\`, container 1200px, gap 56px.
- Kicker: JetBrains Mono 11px uppercase ls 0.3em verde: \`./resolvo — do problema ao sistema\`.
- H2: Space Grotesk 700 \`clamp(34px,4vw,52px)\` ls −0.02em: "Se está te custando tempo, dá pra virar sistema."
- Grid \`repeat(auto-fit, minmax(250px, 1fr))\`, gap 14px — 4 cards. Card: borda \`rgba(255,255,255,0.08)\`, fundo \`rgba(255,255,255,0.012)\`, padding 26px, hover borda \`rgba(182,243,74,0.45)\`; conteúdo em coluna gap 16px:
  - tag (JetBrains Mono 10px uppercase ls 0.25em verde) / problema (18px bold lh 1.3) / saída (14px lh 1.6, \`rgba(241,245,236,0.65)\`) / stack (\`→ …\`, mono 11px, \`rgba(241,245,236,0.5)\`, empurrado ao fundo com margin-top:auto).
  1. **operação manual** — "A planilha virou o sistema — e virou o gargalo." / "Sistema web com dono, autenticação, histórico e regra de negócio no lugar certo. A planilha volta a ser planilha." / Node.js · Next.js · PostgreSQL
  2. **sistemas isolados** — "ERP, e-commerce e financeiro que não se falam." / "Integrações via API e webhooks que sincronizam sozinhas — sem redigitar nada, sem 'esperar o fechamento do mês'." / APIs REST · Webhooks · Python
  3. **sem visibilidade** — "Decisão tomada no escuro, número descoberto tarde." / "Painéis e ERP com o número certo na tela, em tempo real. Quem opera enxerga; quem decide confia." / React · FastAPI · PostgreSQL
  4. **tarefa repetitiva** — "Horas de gente boa gastas em copiar-e-colar." / "Automação e pipelines de IA (incluindo visão computacional) medidos em horas economizadas por mês." / Python · IA · Visão computacional

### 4. ./producao (\`#producao\`) — opcional via flag
- Kicker: \`./producao — não é mockup\`; H2: "Sistemas rodando agora, com usuário de verdade."
- Grid \`auto-fit minmax(380px,1fr)\` gap 14px. Cada card é uma "janela de terminal": header com 3 dots (vermelho \`rgba(255,95,86,0.7)\`, amarelo \`rgba(255,189,46,0.7)\`, verde \`rgba(39,201,63,0.7)\`, 8px) + label mono 10px; screenshot full-width; rodapé com nome (20px bold) + descrição (13.5px, \`rgba(241,245,236,0.65)\`).
  - **MinhaFabrica** (label \`minhafabrica.com · online\` + badge LIVE verde piscante): "Operação industrial sem visibilidade centralizada → painel completo com autenticação, usuários e produtos. Node.js · Next.js · MongoDB." — imagem \`assets/minhafabrica-dashboard.webp\`.
  - **Vision Pro** (label \`visionprod · dashboard\`): "Dados corporativos sem ferramenta robusta → plataforma de gestão e monitoramento. Python · FastAPI · PostgreSQL · Docker." — imagem \`assets/visionprod-dashboard.webp\`.

### 5. ./processo (\`#processo\`)
- Kicker \`./processo — o pipeline\`; H2 "Descobrir → modelar → construir → medir."
- Grid \`auto-fit minmax(230px,1fr)\`, row-gap 32px. Cada etapa: \`border-left: 2px solid\` com verde em opacidade decrescente (\`#b6f34a\` / 0.5 / 0.3 / 0.15), padding \`6px 24px 6px 22px\`; número+nome em mono 12px verde; texto 14px lh 1.6 \`rgba(241,245,236,0.7)\`:
  1. **01 descobrir** — "Entendo o processo real antes do código. O problema certo vale mais que a solução elegante."
  2. **02 modelar** — "Arquitetura, dados e regras de negócio no papel. Camadas claras: controllers, services, models."
  3. **03 construir** — "Entregas curtas, deploy cedo. Sistema em produção ensina mais que sistema em staging."
  4. **04 medir** — "O que o sistema economizou, automatizou ou destravou. Sem número, não acabou."

### 6. Contato (\`#contato\`)
- Padding \`140px 48px 100px\`; grid \`7fr 5fr\`, gap 64px, itens centralizados verticalmente.
- Coluna esquerda: kicker \`./contato — handshake\`; H2 \`clamp(40px,5vw,68px)\` lh 1.02 ls −0.03em: "Me conta o problema. O diagnóstico é _comigo._" ("comigo." verde); parágrafo 18px \`rgba(241,245,236,0.6)\`: "Uma mensagem descrevendo o que está travando sua operação já é o suficiente pra começar. Full-stack, sistemas e integrações — PJ, freelance ou remoto."
- Botões (mesmos estilos do hero): \`chamar_no_whatsapp()\` (primário) + \`e-mail\` (mailto:henrique.silvatte2@gmail.com) + \`github ↗\` (https://github.com/Henrique-Kenzo) + \`linkedin ↗\` (outline).
- Coluna direita: janela de terminal (mesmo header de dots, label \`kenzo@rede:~\`), corpo JetBrains Mono 13px lh 2.1:
  - \`$ iniciar_conexao --via whatsapp\` / \`resolvendo nó… ok\` / \`handshake… ok\` / \`latência: Londrina-PR → você: 0ms\` (linhas cinza \`rgba(241,245,236,0.5)\`) / \`$ status\` / linha final verde \`disponível para novos sistemas\` + cursor de bloco 8×15px piscando.

### 7. Footer
- Borda superior \`rgba(255,255,255,0.07)\`, fundo \`rgba(7,9,7,0.7)\`, padding \`28px 48px\`, mono 11px ls 0.14em \`rgba(241,245,236,0.45)\`:
  - Esq.: \`© 2026 kenzo.dev — renderizado em tempo real · 60fps\`
  - Dir.: \`Henrique Kenzo Silvatte · Londrina-PR\`

## Interactions & Behavior
- **Fundo neural** (\`FxNeural.tsx\` existente): fixo atrás de tudo, 118 nós, atração ao mouse, pulso propagante ao clique. Sobre ele, overlay \`radial-gradient(ellipse at 30% 40%, transparent 30%, rgba(7,9,7,0.55) 100%)\` com \`pointer-events:none\`.
- Scroll suave para âncoras (\`scroll-behavior: smooth\`).
- Hovers: cards escurecidos → borda verde (transition 0.2s); botões conforme acima.
- Link do WhatsApp: \`https://wa.me/5543996773272?text=<mensagem urlencoded>\` — mensagem padrão: "Oi Henrique! Vi seu site e tenho um problema que queria te mostrar." Abrir em nova aba (\`target=_blank rel=noopener\`).
- Animações do hero: fadeUp escalonado apenas na carga; respeitar \`prefers-reduced-motion\` (o FxNeural já respeita).

## State Management
Três flags de configuração (constantes ou config do site, não precisa de estado runtime):
- \`disponivel: boolean\` (default true) — alterna badge do hero ("disponível" / "em projeto") e última linha do terminal de contato ("disponível para novos sistemas" / "em projeto — respondo em até 24h").
- \`mostrarSistemas: boolean\` (default true) — exibe/oculta a seção ./producao.
- \`mensagemWhatsApp: string\` — texto pré-preenchido do link wa.me.

## Design Tokens
(usar os equivalentes já definidos no \`styles.css\` do repo)
- Fundo: \`#070907\` · Texto: \`#f1f5ec\` (paper) · Acento: \`#b6f34a\` · Acento hover: \`#d3ff7d\`
- Texto secundário: \`rgba(241,245,236,0.6/0.65/0.7)\` · terciário: \`0.35–0.5\`
- Bordas: \`rgba(255,255,255,0.06–0.10)\`; hover \`rgba(182,243,74,0.4–0.45)\`
- Superfícies: \`rgba(10,13,10,0.85)\` + blur 10px (janelas) · \`rgba(255,255,255,0.012)\` (cards)
- Fontes: Space Grotesk (títulos/corpo) · JetBrains Mono (labels, botões, terminal)
- Sem border-radius em botões/cards (estética quadrada); dots 99px
- Glow: \`0 0 34px rgba(182,243,74,0.45)\`
- Seções: padding-y 120px · container 1200px · gap de grids 14px

## Assets
- \`assets/minhafabrica-dashboard.webp\` e \`assets/visionprod-dashboard.webp\` — já existem no repo em \`src/assets/\`.
- Fontes já configuradas no repo.

## Files
- \`cartao-de-visitas.html\` — protótipo hifi completo (abrir no navegador junto com \`support.js\` e \`fx-neural.js\` na mesma pasta). Estilos inline; ignorar a mecânica de template (\`{{ }}\`, \`sc-if\`, \`sc-for\`) — é o motor do protótipo, não padrão a seguir.
- \`fx-neural.js\` — porte do efeito neural usado só pelo protótipo; no codebase, usar o \`FxNeural.tsx\` existente.
- \`assets/\` — screenshots dos sistemas.
