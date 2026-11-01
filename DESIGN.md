---
name: CAGP Super App UFMG
description: Sistema de design Brite Institucional Refinado para o Super App Discente do Centro Acadêmico de Gestão Pública da FAFICH/UFMG.
colors:
  primary: "#8B1E2D"
  primary-candango: "#9E2424"
  neutral-bg: "#FBF8F3"
  surface-low: "#F4F1EA"
  surface-high: "#EAE5DC"
  border: "#DFDBD2"
  dark: "#0A0A0A"
  white: "#FFFFFF"
  black: "#000000"
  gold: "#E8A317"
  warning: "#B45309"
  success: "#15803D"
  info: "#005A9C"
  high-contrast-bg: "#000000"
  high-contrast-text: "#FFFF00"
  high-contrast-highlight: "#FFFF88"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontWeight: 700
    lineHeight: 1.35
    textTransform: "uppercase"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 500
    fontSize: "0.9em"
  micro:
    fontSize: "0.75rem"
  subcaption:
    fontSize: "11px"
  nano:
    fontSize: "10px"
  caption:
    fontSize: "10px"
rounded:
  none: "0px"
  xs: "2px"
  badge: "3px"
  sm: "4px"
  button: "4px"
  input: "4px"
  tab: "4px"
  md: "6px"
  card: "6px"
  container: "6px"
  box: "6px"
  lg: "6px"
  xl: "6px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-candango}"
  tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
---

# Design System — Brite Institucional Refinado

## Overview

O sistema visual do **CAGP UFMG** materializa a seriedade institucional republicana do curso de Gestão Pública combinada com o dinamismo de um centro acadêmico ativo e a usabilidade ergonômica de um Super App discente moderno. Baseia-se no tema Brite da Bootswatch calibrado com as cores heráldicas da UFMG/FAFICH, rigor de contraste WCAG AA/AAA e contenção geométrica (anti-over-boxing).

## Colors

- **Borgonha Institucional (`#8B1E2D`):** Cor de marca primária do CAGP, usada em cabeçalhos, botões de ação primária, abas ativas e ênfases de liderança.
- **Vinho Candango (`#9E2424`):** Matiz secundária e de hover, remetendo à identidade histórica discente da FAFICH e ao monumento Os Candangos.
- **Preto Candango (`#0A0A0A`):** Cor de texto principal, bordas ativas e sombras duras. Garante contraste máximo e leitura nítida sob qualquer iluminação.
- **Creme Papel (`#FBF8F3`):** Fundo predominante do portal e das superfícies de leitura, oferecendo conforto visual para sessões noturnas de estudo.
- **Superfícies Tonais (`#F4F1EA` / `#EAE5DC`):** Camadas de fundo secundárias para agrupamentos de formulários, cards neutros e caixas de notas regimentais.
- **Bordas Estruturais (`#DFDBD2`):** Delimitação padrão de `1px solid` para contenção sem poluição visual.
- **Cores Semânticas:** Sucesso Verde Amazônia (`#15803D`), Alerta Ouro Velho (`#B45309`), Notificação Dourado (`#E8A317`), Informação Azul UFMG (`#005A9C`).
- **Alto Contraste AAA:** Inversão para preto puro (`#000000`) e amarelo canário (`#FFFF00`).

## Typography

- **Títulos e Display — Oswald (Google Fonts):** Utilizado sempre em caixa-alta (`text-transform: uppercase`) e peso 700 para dar peso institucional, solidez e distinção de cabeçalhos.
- **Texto Corrido e Controles — Inter (Google Fonts):** Utilizado no corpo da página, labels, inputs, tabelas e avisos informativos. Proporciona máxima legibilidade em densidades elevadas de dados.
- **Dados Técnicos e Contadores — JetBrains Mono (Google Fonts):** Utilizado estritamente em códigos de matérias (ex.: `DCP035`), cargas horárias (ex.: `3.000h`, `60h`), datas, hashes de backup `CAGP1:...` e valores tabulares.

## Layout

- **Hierarquia de 1ª Dobra:** Em telas móveis de referência (`360×640px`), o topo do controle interativo principal deve estar posicionado em **`y <= 200px`** e o primeiro elemento acionável em **`y <= 300px`**.
- **Controle Segmentado Sem Rolagem:** As barras de sub-views de cada página (`.cagp-workspace-bar`) devem exibir todas as abas simultaneamente sem transbordamento ou barra de rolagem horizontal em larguras de `280px` a `1440px`.
- **Grids Responsivos:** Bento Grids e matrizes de cards devem usar grids fluidos (1 coluna em `< 768px`, 2 colunas em `>= 768px`, 3+ colunas em `>= 1200px`).
- **Áreas Seguras (Safe Areas):** Respeito absoluto a `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` na barra superior e na barra de navegação inferior.

## Elevation & Depth

- **Brite Institucional Flat-Structured:** A esmagadora maioria dos cartões, tabelas e caixas utiliza fundo plano e borda sutil de `1px solid #DFDBD2` sem sombra difusa.
- **Sombra Dura de Ação (Brite Accent):** Borda de `2px solid #0A0A0A` combinada com sombra dura deslocada `2px 2px 0 #0A0A0A` (desfoque 0px) é reservada **exclusivamente** para:
  1. Botões de ação primária (`.cagp-btn-primary`, `.btn-primary`);
  2. Aba atualmente selecionada no controle segmentado;
  3. Modal e Bottom Sheet abertos.
- **Sem Glassmorphism:** É estritamente proibido o uso de `backdrop-filter: blur()`, fundos semitransparentes desbotados ou gradientes difusos decorativos.

## Shapes

- **Cantos Estruturais Sólidos:** Os componentes principais (cards, seções, tabelas, abas) utilizam cantos retos (`0px`) ou raio sutil de `4px` (`rounded-sm`).
- **Pílulas e Círculos Restritos:** O raio de `9999px` (`rounded-full`) é restrito a:
  - Avatares de perfil discente circulares (`28px`, `40px`, `72px`);
  - Badges de contagem numérica e status (ex.: `Pendente`, `Integralizado`);
  - Chips de ação rápida e marcadores de bandeiras/pins.
- Form containers, formulários e blocos de conteúdo devem manter retidão visual sólida.

## Components

- **Passaporte Acadêmico & Carteira Discente:** Card institucional com faixa superior oficial FAFICH/UFMG, avatar com badge de edição rápida, anel de integralização percentual, barras de progresso duplo (27 obrigatórias e 600h AAC) e dados regimentais.
- **Controle Segmentado (`.cagp-workspace-bar`):** Container que distribui igualmente as N abas (`data-tab-count="N"`), com aba ativa em destaque Borgonha com texto branco e botão lateral compacto "Ver Tudo" (`44×44px`).
- **Grouped Lists com Chevrons:** Listas categorizadas no padrão moderno de super apps (benchmark mobile), com ícone de leading, título semântico, subtítulo explicativo e chevron `bi-chevron-right` indicador de navegação.
- **Bottom Sheets e Gavetas:** Paineis que sobem fluidamente a partir do rodapé com manipulador de arraste (`grabber`), acessibilidade de foco e fechamento em `Esc` ou backdrop.

## Do's and Don'ts

### Do's:
- Manter alvos de toque com tamanho mínimo de `44×44px` (ideal `48×48px`).
- Usar caixas expansíveis `<details class="cagp-normative-details">` para notas regulamentares extensas e notas de rodapé institucionais.
- Preservar integridade de cores do tema em Alto Contraste AAA.
- Utilizar `JetBrains Mono` com `font-variant-numeric: tabular-nums` para tabelas de horas.

### Don'ts:
- Nunca criar caixas dentro de caixas (*over-boxing*) empilhando bordas de 2px e sombras duras decorativas na mesma tela.
- Nunca usar cantos pill (`9999px`) em cartões retangulares de conteúdo.
- Nunca esconder abas de navegação atrás de barras de rolagem invisíveis sem pista visual.
- Nunca alterar ou inventar dados curriculares ou normativos da UFMG.
