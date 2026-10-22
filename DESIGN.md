---
name: Centro Acadêmico de Gestão Pública (CAGP) - FAFICH / UFMG
description: Sistema de design neo-brutalista institucional e tátil para o portal discente e normativo de Gestão Pública da UFMG
colors:
  primary: "#9e2424"
  primary-hover: "#7b1a1a"
  primary-bordeaux: "#8b1e2d"
  secondary: "#0a0a0a"
  dark: "#111111"
  neutral-bg: "#ffffff"
  neutral-warm: "#fbf8f3"
  surface-low: "#f4f5f7"
  surface-mid: "#e5e7eb"
  text-muted: "#4b5563"
  accent-gold: "#e8a317"
  accent-blue: "#1e3f66"
  accent-green: "#2e7d32"
  accent-amber: "#e65100"
typography:
  display:
    fontFamily: "Oswald, Inter, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Oswald, Inter, sans-serif"
    fontSize: "1.55rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  title:
    fontFamily: "Oswald, Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.03em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Oswald, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "3px"
  md: "4px"
  lg: "6px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "0.65rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.md}"
    padding: "0.65rem 1.4rem"
  button-outline:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "0.65rem 1.4rem"
  card:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  badge:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.65rem"
---

# Design System: Centro Acadêmico de Gestão Pública (CAGP) - FAFICH / UFMG

## Overview

**Creative North Star: "O Prumo Republicano"**

O sistema de design do CAGP nasce da convergência entre a autoridade documental da administração pública e a combatividade do movimento estudantil da FAFICH/UFMG. Inspirado pelo monumento "Os Candangos (Dois Guerreiros)" de Bruno Giorgi — símbolo máximo do trabalho coletivo anônimo e da construção republicana —, o sistema adota o neo-brutalismo funcional (Brite System) como postura estética e ética: não há adornos cosméticos, sombras com desfoque artificial ou gradientes assépticos. Cada linha divisória, cada contraste e cada bloco de informação serve ao propósito de desmistificar a burocracia acadêmica e emancipar os discentes.

A experiência equilibra a gravidade institucional exigida pela consulta a atos normativos e resoluções do CEPE com a urgência ergonômica de quem acessa o portal à noite, no intervalo das aulas presenciais (19h00 às 22h30) ou no trajeto do transporte universitário. O resultado é um ambiente tátil, firme e de altíssima legibilidade, onde botões e caixas de diálogo reagem fisicamente à interação, simulando o peso mecânico de documentos autenticados e painéis urbanos de informação pública.

**Key Characteristics:**
- **Neo-Brutalismo Estrutural:** Bordas pretas sólidas de 2px a 3px e sombras duras ortogonais (0px de blur) que conferem presença física a cada elemento.
- **Tipografia de Dupla Força:** Títulos condensados e enérgicos em caixa alta com `Oswald`, ancorados em parágrafos neutros, arejados e confortáveis com `Inter`.
- **Disciplina Cromática Republicana:** O Vinho Candango atua como autoridade dirigente e liderança discente, o Ouro Alerta conduz avisos e acolhimento, e o Preto Nanquim delimita fronteiras cartesianas irredutíveis.
- **Transparência e Acessibilidade:** Conformidade WCAG 2.1 AA/AAA em todos os pares cromáticos, com estados de foco explícitos (outline de 3px) e estrutura navegável por teclado e leitores de tela.

## Colors

A paleta é fundamentada na tradição heráldica da gestão pública universitária mineira, confrontando a austeridade do preto nanquim com a energia do vinho e do ouro.

### Primary
- **Vinho Candango** (`#9E2424` / hover `#7B1A1A`): A cor matriz da entidade discente. Aplicada em botões de ação principal, emblemas hero, divisores destacados e cabeçalhos de advertências estruturais.
- **Vinho Bordeaux Institucional** (`#8B1E2D`): Variação tonal fechada utilizada na faixa superior perene de anúncio institucional e em callouts de importância regimental crítica.

### Secondary
- **Preto Nanquim Estrutural** (`#0A0A0A` / `#111111`): A tinta de impressão de contratos e atas. Define 100% das bordas, sombras projetadas, títulos de navegação e rodapés institucionais.

### Tertiary
- **Ouro Alerta FAFICH** (`#E8A317` / `#D97706`): O tom da madeira de prumo e das lanternas noturnas. Empregado em destaques pedagógicos, callouts de dicas úteis para calouros e marcadores temporais.
- **Azul Reitoria UFMG** (`#1E3F66` / `#1565C0`): Referência direta à identidade oficial da universidade, utilizado em tags departamentais (EST) e callouts de notas informativas oficiais.
- **Verde Extensão Universitária** (`#2E7D32`): Sinalização de conformidade, horas de extensão validadas e departamento parceiro (SOA).
- **Laranja Âmbar Regulamentar** (`#E65100`): Sinalização de prazos decadenciais fatais (como o prazo de 120 dias das AAC) e advertências de trancamento.

### Neutral
- **Branco Puro** (`#FFFFFF`): Fundo padrão da página e tela de contraste para cartões de conteúdo denso.
- **Off-White Quente** (`#FBF8F3`): Fundo exclusivo do Card de Emblema Hero oficial dos Candangos, evocando papel timbrado governamental.
- **Cinza Superfície Suave** (`#F4F5F7` / `#F8F9FA`): Fundo de gavetas retráteis de ementário, tabelas e estados neutros de navegação.
- **Cinza Borda Interna** (`#E5E7EB` / `#CED4DA`): Divisórias secundárias e pontilhados internos que não competem com as bordas pretas estruturais.
- **Cinza Texto Secundário** (`#4B5563`): Metadados, subtítulos e legendas de baixa prioridade hierárquica.

### Named Rules
**A Regra da Autoridade Vermelha.** O Vinho Candango é um marcador de liderança discente e foco resolutivo; ele nunca deve ultrapassar 15% da área cromática de qualquer viewport. Se tudo grita em vermelho, a autoridade se esvai.
**A Regra do Nanquim Irredutível.** Nenhum contêiner, botão ou gaveta existe no vácuo: todo bloco interativo ou de conteúdo possui contorno preto nítido (`#0A0A0A` ou `#111111`), proibindo gradientes suaves de delimitação.

## Typography

**Display Font:** Oswald (com fallbacks `Inter`, sans-serif)  
**Body Font:** Inter (com fallbacks system-ui, -apple-system, sans-serif)  
**Label/Mono Font:** Oswald para badges e botões; monospace de sistema para códigos de percurso curricular (`01-01`, `01-02`, `01-03`) e códigos de disciplinas (`DCP001`, `ECN001`).

**Character:** Tensão harmônica entre o vigor industrial condensado do `Oswald` (lembrando as inscrições cravadas em pedra dos monumentos públicos) e o equilíbrio humanista neutro do `Inter` (projetado para leitura contínua e técnica em dispositivos móveis e desktops).

### Hierarchy
- **Display** (700 bold, `clamp(2rem, 5vw, 3.25rem)`, line-height 1.1, uppercase, tracking `0.02em`): Grandes títulos de hero das páginas principais (`index.qmd`, `documentos.qmd`).
- **Headline** (700 bold, `1.55rem`, line-height 1.2, uppercase, tracking `0.05em`): Título da barra de navegação (`CAGP`) e cabeçalhos de seções H1/H2 principais.
- **Title** (700 bold, `1.25rem` a `1.35rem`, line-height 1.25, uppercase, tracking `0.03em`): Títulos de cartões de serviço, títulos de documentos e títulos de callout.
- **Body** (400 regular / 600 semibold, `0.95rem` [15.2px], line-height 1.65, max line length 75ch): Parágrafos de leitura, descrições regimentais e ementas analíticas.
- **Label** (600 semibold / 700 bold, `0.75rem` a `0.85rem`, uppercase, tracking `0.04em`): Textos de botões táteis, badges de departamentos e metadados de status.

### Named Rules
**A Regra da Caixa Alta nos Títulos.** Todos os títulos H1, H2, H3, botões e badges usam `text-transform: uppercase` e fonte `Oswald`. Parágrafos, ementas e listas nunca usam caixa alta forçada, garantindo fluidez e conforto visual na leitura densa.

## Layout

O sistema opera sobre um grid responsivo de 12 colunas do Bootstrap 5 / Quarto, complementado por um modelo espacial cartesiano rigoroso:

- **Contêineres Centrais:** Largura máxima de conteúdo em 1200px (`max-width: 1200px`), assegurando leitura equilibrada e foco visual.
- **Ritmo Espacial de Espaçamento:** Múltiplos estritos de 4px e 8px: microespaçamento entre ícone e rótulo (`0.5rem` / 8px), padding padrão de cartões (`1.25rem` a `1.5rem`), margem entre blocos (`1.5rem` / 24px) e espaçamento de seções hero (`2.5rem` / 40px).
- **Densidade Informativa:** O portal é projetado para alta densidade útil sem sensação de claustrofobia. O uso de gavetas retráteis (`<details>/<summary>`) e abas (`panel-tabset`) permite compactar 27 ementas obrigatórias e 10 períodos curriculares sem rolagem infinita fatigante.
- **Adaptação Mobile:** Em viewports inferiores a 768px, os botões primários assumem largura total (`width: 100%`), o hero padding reduz-se de 2.5rem para 1.75rem, e as trilhas de linha do tempo estreitam suas margens à esquerda de 2rem para 1.5rem.

## Elevation & Depth

Não existem sombras difusas, simulações de iluminação ambiente ou desfoques de lente no sistema do CAGP. A profundidade é estritamente **tátil, plana e mecânica** (Hard-Shadow Neo-Brutalism).

### Shadow Vocabulary
- **Sombra Nanquim Reduzida** (`box-shadow: 2px 2px 0px #0a0a0a`): Aplicada em badges informativos, pequenos botões de ação e caixas de formulário em repouso.
- **Sombra Nanquim Média** (`box-shadow: 4px 4px 0px #0a0a0a`): A elevação padrão de descanso para todos os `.cagp-card`, callouts do Quarto, tabelas responsivas e cartões de governança.
- **Sombra Nanquim Elevada** (`box-shadow: 6px 6px 0px #0a0a0a` a `7px 7px 0px #0a0a0a`): Aplicada no estado `:hover` de cartões e no card do emblema oficial dos Candangos.
- **Deslocamento Ativo de Impressão** (`box-shadow: 1px 1px 0px #0a0a0a` com `transform: translate(2px, 2px)`): A sensação de carimbo sob pressão mecânica quando um botão tátil é pressionado (`:active`).

### Named Rules
**A Regra da Sombra Dura.** Todas as declarações de `box-shadow` devem conter `0px` de blur radius e cor sólida preta (`#0a0a0a` ou `#111111`). Sombras difusas (`rgba(0,0,0,0.15) 0 4px 12px`) são explicitamente proibidas em qualquer elemento novo.
**A Regra da Gravidade Interativa.** Componentes interativos em hover sobem para o noroeste (`transform: translate(-2px, -2px)`) com projeção de sombra aumentada; ao clique (`:active`), descem para o sudeste (`transform: translate(2px, 2px)`), afundando na página.

## Shapes

O vocabulário geométrico é cartesiano, sólido e contido:

- **Cantos Quase Retos (Sub-rounded):**
  - Botões, cartões padrão e gavetas utilizam raio suave de 4px (`border-radius: 4px`), mantendo a autoridade de blocos impressos sem ferir a ergonomia em telas de toque.
  - Badges e pílulas utilizam raio de 3px (`border-radius: 3px`).
  - Callouts e anúncios utilizam cantos 100% retos (`border-radius: 0px`).
  - Círculos perfeitos (`border-radius: 50%`) são admitidos unicamente nos marcadores numéricos da linha do tempo curricular (`.cagp-timeline-marker`).
- **Bordas Estruturais:** Espessura padrão de 2px (`border: 2px solid #0a0a0a`), expandida para 3px em elementos de máxima autoridade como o Emblema Hero e os Callouts regimentais.
- **Fita Lateral de Assinatura:** Cartões de destaque e o Hero principal exibem uma faixa lateral sólida de 8px em Vinho Candango (`#9E2424`) ou Ouro (`#E8A317`), demarcando a prioridade visual.

## Components

### Buttons
- **Shape:** Retangular com cantos sutilmente contidos (`border-radius: 4px`), borda preta sólida de 2px (`border: 2px solid #0a0a0a`).
- **Primary:** Fundo Vinho Candango (`#9e2424`), texto branco (`#ffffff`), padding de 0.65rem 1.4rem, tipografia `Oswald` 600 bold uppercase com tracking de 0.03em. Sombra sólida de 4px 4px 0px.
- **Hover / Focus:** Hover desloca o botão em `translate(-2px, -2px)` com sombra expandida para `7px 7px 0px #0a0a0a` e cor de fundo Vinho Escuro (`#7b1a1a`). Focus exibe anel de acessibilidade `outline: 3px solid #9e2424` com `outline-offset: 2px`.
- **Active:** `transform: translate(2px, 2px)` com sombra reduzida para `1px 1px 0px #0a0a0a`.
- **Secondary / Outline:** Fundo branco (`#ffffff`) com texto preto (`#0a0a0a`) e borda 2px preta. Ao hover ganha fundo cinza claro (`#f4f5f7`).

### Badges & Tags
- **Style:** Compacto, tipografia `Oswald` 600 bold em caixa alta (`0.75rem` a `0.8rem`), padding de `0.25rem 0.65rem`, borda preta de 1.5px a 2px e sombra sólida de 2px 2px 0px.
- **Departamentos:**
  - `DCP` (Ciência Política / Gestão Pública): Vinho Candango (`#9E2424`) com texto branco.
  - `ECN` (Economia): Preto Nanquim (`#0A0A0A`) com texto branco.
  - `EST` (Estatística): Azul Institucional (`#1565C0`) com texto branco.
  - `SOA` (Sociologia e Antropologia): Verde Floresta (`#2E7D32`) com texto branco.

### Cards / Containers
- **Corner Style:** 4px de raio (`border-radius: 4px`), borda de 2px preta sólida.
- **Background:** Branco puro (`#ffffff`), com fundo off-white quente (`#fbf8f3`) reservado ao Emblema Hero.
- **Shadow Strategy:** 4px 4px 0px em descanso; 7px 7px 0px com deslocamento `-3px, -3px` em hover.
- **Internal Padding:** `1.25rem` a `1.5rem` de respiro interno com flexbox vertical.

### Ementário Interativo (Discipline Drawers)
- **Componente de Assinatura:** Gavetas sanfonadas `<details class="cagp-discipline">` com sumário em `<summary>`.
- **Estrutura:** Borda de 2px preta, fundo branco, sombra dura de 2px.
- **Interação:** O ícone de chevron gira 90° e muda para Vinho Candango quando aberta. O corpo aberto (`.cagp-discipline-body`) ganha fundo cinza suave (`#fbfbfc`) com borda lateral esquerda de 4px sólida em Vinho Candango.

### Quarto Callouts (Neo-Brutalist)
- **Header:** Borda inferior preta de 2px, cantos retos (0px), título em `Oswald` 700 uppercase.
- **Variantes Semânticas:**
  - `callout-important`: Header Vinho Bordeaux (`#8B1E2D`), ícone invertido para branco.
  - `callout-tip`: Header Ouro Alerta (`#E8A317`), ícone preto.
  - `callout-note`: Header Azul UFMG (`#1E3F66`), ícone branco.
  - `callout-warning`: Header Laranja Âmbar (`#E65100`), ícone branco.
  - `callout-caution`: Header Vermelho Alerta (`#B71C1C`), ícone branco.

### Navigation (Navbar & Announcement Banner)
- **Banner de Proposta:** Faixa vermelha superior contínua e não dispensável (`website.announcement`), com badge preto contrastante `PROPOSTA DE CHAPA` e texto destacado em amarelo claro (`#FFD54F`).
- **Navbar:** Fundo branco puro com borda inferior preta de 2px, logotipo oficial dos Candangos com altura fixa de 40px, links com peso 600 que se colorem em Vinho Candango no hover/active.

## Do's and Don'ts

### Do:
- **Do** utilizar bordas pretas sólidas de 2px a 3px (`#0A0A0A` / `#111111`) em todos os botões, cartões, gavetas e caixas de alerta.
- **Do** projetar sombras 100% rígidas com zero desfoque (`box-shadow: 2px 2px 0px #0a0a0a` a `7px 7px 0px #0a0a0a`).
- **Do** utilizar `Oswald` em caixa alta para títulos, manches, cabeçalhos de tabela, botões e badges.
- **Do** manter `Inter` para todo o corpo de texto, descrições normativas e ementas, priorizando legibilidade contínua.
- **Do** assegurar contraste WCAG AAA para leitura crítica e manter foco visível explícito (`outline: 3px solid #9e2424`).
- **Do** utilizar o componente de gaveta retrátil (`<details class="cagp-discipline">`) para conter ementas densas sem poluir o fluxo de página.

### Don't:
- **Don't** utilizar sombras difusas com blur (`box-shadow: 0 4px 20px rgba(0,0,0,0.1)`). O sistema rejeita desfoques que diluem a nitidez tátil.
- **Don't** arredondar cantos em estilo "pílula gigante" em botões ou cartões (`border-radius: 9999px` ou `24px`). O vocabulário formal é estritamente de cantos contidos (0px a 4px).
- **Don't** utilizar gradientes pastéis suaves, efeitos de vidro (glassmorphism/backdrop-filter) ou estéticas corporativas assépticas.
- **Don't** espalhar a cor Vinho Candango por toda a tela como plano de fundo dominante; ela deve servir exclusivamente a pontos de comando, liderança e âncoras focais (≤15% da área).
- **Don't** suprimir o anel de foco de acessibilidade (`outline: none` sem substituto é estritamente proibido).
- **Don't** abreviar títulos regimentais ou eliminar o respaldo normativo dos atos citados nas páginas.
