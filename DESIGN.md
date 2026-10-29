---
name: "CAGP FAFICH/UFMG — Neo-Brutalismo Brite & Super App"
description: "Sistema de Design Neo-Brutalista Brite do Centro Acadêmico de Gestão Pública da UFMG, combinando geometria brutalista soberana, ergonomia espacial Apple HIG e contenção tonal Material 3 Expressive."
colors:
  candango-wine: "#9E2424"
  candango-bordeaux: "#8B1E2D"
  candango-wine-hover: "#7A1B1B"
  candango-gold: "#E8A317"
  candango-amber: "#E65100"
  ufmg-blue: "#005A9C"
  sei-green: "#2E7D32"
  moodle-orange: "#D9531E"
  bu-purple: "#5B2C6F"
  candango-black: "#0A0A0A"
  surface-cream: "#FBF8F3"
  surface-card: "#FFFFFF"
  surface-low: "#F4F1EA"
  surface-high: "#EAE5DC"
  text-charcoal: "#222222"
  text-muted: "#4A4A4A"
typography:
  display:
    fontFamily: "'Oswald', 'Roboto Condensed', sans-serif"
    fontSize: "clamp(1.85rem, 3.5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Oswald', 'Roboto Condensed', sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.02em"
  title:
    fontFamily: "'Oswald', 'Roboto Condensed', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.015em"
  body:
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
  dyslexia:
    fontFamily: "'OpenDyslexic', 'Comic Sans MS', 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.candango-wine}"
    textColor: "{colors.surface-card}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.candango-wine-hover}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.candango-black}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  chip-filter:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.candango-black}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
    height: "40px"
  chip-filter-active:
    backgroundColor: "{colors.candango-wine}"
    textColor: "{colors.surface-card}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
    height: "40px"
  card-brutalist:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-charcoal}"
    rounded: "{rounded.md}"
    padding: "20px"
  input-search:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.candango-black}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
    height: "48px"
---

# Design System: CAGP FAFICH/UFMG — Neo-Brutalismo Brite & Super App

## Overview

**Creative North Star: "O Prumo Republicano dos Candangos (Neo-Brutalismo Cívico)"**

O sistema visual do **Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG)** traduz a força escultórica do monumento *"Os Candangos"* (Bruno Giorgi, 1959) e o rigor documental da administração pública brasileira em uma interface **Neo-Brutalista Brite** autêntica, tátil e acessível. Cada elemento parece impresso ou carimbado sobre papel creme editorial (`#FBF8F3`), delimitado por linhas estruturais pretas sólidas (`#0A0A0A`) e projetado no espaço por sombras duras sem qualquer desfoque (`0px` blur).

Para operar simultaneamente como **Portal Institucional Web** e **Super App Universitário Instalável (PWA)** sem conflitos entre referências de design, o sistema é regido pela **Regra de Arbitragem em 3 Camadas**:
1. **Camada 1 — Pele, Geometria e Marca (Soberana: 100% Brite / CAGP):** Governa cores, tipografia (`Oswald` + `Inter` + `JetBrains Mono`), bordas pretas sólidas (`2px`–`3px`), sombras duras (`0px` blur) e cantos retos/contidos (`0px`–`4px`). **Veta terminantemente** qualquer efeito de vidro (`backdrop-filter: blur`), superfícies translúcidas, sombras difusas e cantos arredondados estilo iOS (`> 4px`) ou pílula (`9999px`).
2. **Camada 2 — Ergonomia, Navegação Espacial e Física (Apple HIG):** Governa a clareza de hierarquia (*Clarity, Deference, Depth sem blur*), o respeito às áreas seguras de tela (`viewport-fit=cover` e `env(safe-area-inset-*)`), a zona de alcance do polegar (*Thumb Zones* `>= 48px`), o posicionamento do Spotlight sobre o teclado virtual (`visualViewport`), a arquitetura de barras/gavetas (Top Command Bar, Bottom Tab Bar de 5 itens, Bottom Sheets com *grabber*, Segmented Controls) e a física de movimento por molas (`cubic-bezier(0.32, 0.72, 0, 1)`).
3. **Camada 3 — Contenção, Densidade e Estados Operacionais (Material 3 Expressive):** Governa a organização de alta densidade informacional através de **níveis tonais de superfície** (proibindo *nested cards* com sombras duplicadas), **barras de chips horizontalmente deslizantes** no mobile e indicadores expressivos de progresso e validação regimental (`DEFERIDO`, `TETO`, `TRAVA SIGA`).

**Key Characteristics:**
- **Geometria Brutalista de Prumo Reto:** Bordas sólidas de `2px` a `3px` em `#0A0A0A`, cantos de `0px` a `4px` e sombras gráficas rígidas (`0px` blur).
- **Contraste Editorial Quente (WCAG 2.1 AAA):** Fundo base em Creme Candango (`#FBF8F3`) combinado com cartões brancos puros (`#FFFFFF`) e tinta preta (`#0A0A0A`), eliminando o cansaço visual da leitura noturna prolongada.
- **Tactilidade Mecânica de Carimbo:** Botões e cartões interativos respondem ao toque e ao clique com deslocamento físico real (`transform: translate(-2px, -2px)` na elevação e compressão na ativação).
- **Hierarquia Tonal sem Aninhamento de Sombras:** Sub-blocos internos utilizam degraus tonais (`#F4F1EA` e `#EAE5DC`) e linhas divisórias secas em vez de cartões aninhados.
- **Ergonomia Mobile-First para o Turno Noturno:** Alvos mínimos de `48x48px`, fontes de formulário travadas em `>= 16px` (zero zoom acidental) e navegação inferior dedicada.

## Colors

A paleta combina a sobriedade institucional do **Vinho Candango** e do **Preto Gráfico** com o calor do **Creme Papel** e acentos semânticos de alto contraste inspirados nos sistemas oficiais da UFMG.

### Primary
- **Vinho Candango Operacional** (`#9E2424`): Cor primária de ação, cabeçalhos de destaque, selos principais, links ativos e indicadores de trava regimental no SIGA.
- **Vinho Candango Institucional** (`#8B1E2D`): Tom heráldico oficial do manual de marca do CAGP, empregado em insígnias institucionais, timbres e cabeçalhos solenes.
- **Vinho Candango Profundo (Hover)** (`#7A1B1B`): Estado de acionamento e foco profundo para botões primários.

### Secondary
- **Ouro Candango (Destaque & Alerta)** (`#E8A317`): Cor de destaque secundário usada em emblemas de governança (Junta Eleitoral, Presidência), indicadores de pré-requisito recomendado no grafo e alertas de atenção; sempre combinada com texto e borda em `#0A0A0A` para garantir contraste AAA.
- **Âmbar de Prazo Regimental** (`#E65100`): Empregado em alertas de prazos decadenciais (como os 120 dias de AAC) e avisos operacionais.

### Tertiary
- **Azul Institucional MinhaUFMG / ICEx** (`#005A9C`): Identifica o ecossistema MinhaUFMG, o Departamento de Estatística (`EST`), o Percurso Avançado (`01-03`) e links de sistemas acadêmicos.
- **Verde SEI / Deferimento Regimental** (`#2E7D32`): Indica status aberto/deferido, cumprimento de metas de horas (`300h`/`600h`), o Departamento de Sociologia (`SOA`) e o sistema SEI! UFMG.
- **Laranja Moodle UFMG** (`#D9531E`): Identificador semântico exclusivo do ambiente virtual Moodle.
- **Roxo Biblioteca Universitária (BU)** (`#5B2C6F`): Identificador semântico do sistema Pergamum e bibliotecas da UFMG.

### Neutral
- **Preto Candango Estrutural** (`#0A0A0A`): Cor obrigatória de todas as bordas (`2px`/`3px`), sombras duras (`0px` blur), títulos principais e fundo do cabeçalho soberano.
- **Creme Candango (Superfície Base)** (`#FBF8F3`): Plano de fundo global do portal (`--cagp-surface-base`), proporcionando conforto óptico superior ao branco frio.
- **Branco Puro de Cartão** (`#FFFFFF`): Superfície primária de cartões, modais, inputs e painéis elevados (`--cagp-surface-card`).
- **Areia Tonal Baixa** (`#F4F1EA`): Superfície de contenção interna (`--cagp-surface-low`) usada dentro de ferramentas e calculadoras para agrupar linhas sem usar `box-shadow`.
- **Areia Tonal Alta** (`#EAE5DC`): Superfície de contraste interno (`--cagp-surface-high`) para cabeçalhos de tabelas, barras de abas segmentadas e blocos de código.
- **Carvão de Leitura** (`#222222`): Cor padrão do texto corrido sobre superfícies claras (contraste `> 14:1`).
- **Cinza Grafite Secundário** (`#4A4A4A`): Metadados, subtítulos e legendas secundárias (contraste `> 7:1` AAA).

### Named Rules
**The Solid Ink Border Rule.** Todo componente de superfície, botão, badge, input ou modal deve ser delimitado por uma borda sólida em Preto Candango (`#0A0A0A`) de `2px` ou `3px`; bordas cinzas translúcidas ou invisíveis descaracterizam a linguagem Brite.

**The Semantic System Color Rule.** As cores de sistemas externos (`#005A9C` MinhaUFMG, `#D9531E` Moodle, `#2E7D32` SEI, `#5B2C6F` BU) e departamentos (`DCP`, `ECN`, `SOA`, `EST`) são estritamente semânticas e jamais devem ser trocadas de significado.

## Typography

**Display Font:** `Oswald` (com fallback `'Roboto Condensed', sans-serif`)
**Body Font:** `Inter` (com fallback `system-ui, -apple-system, sans-serif`)
**Label/Mono Font:** `JetBrains Mono` (com fallback `monospace`)

**Character:** A combinação contrapõe a autoridade vertical e condensada da `Oswald` em caixa-alta (inspirada na verticalidade do monumento *Os Candangos* e em manchetes de diários oficiais) com a legibilidade neutra da `Inter` para textos normativos longos e a precisão tabular da `JetBrains Mono` para códigos de disciplinas (`DCP 032`, `ECN 140`) e contadores de horas (`300h / 20 cr`).

### Hierarchy
- **Display** (`700`, `clamp(1.85rem, 3.5vw, 2.75rem)`, `line-height: 1.12`, `uppercase`): Títulos de Hero (`.cagp-hero-title`) e chamadas inaugurais de página.
- **Headline** (`700`, `clamp(1.35rem, 2.4vw, 1.85rem)`, `line-height: 1.2`, `uppercase`): Cabeçalhos de seção (`h2`) acompanhados de ícone semântico e linha divisória inferior de `2px solid #0A0A0A`.
- **Title** (`700`, `1.15rem`, `line-height: 1.25`, `uppercase`): Títulos de cartões (`h3`, `.cagp-card-title`), cabeçalhos de micro-apps (`.cagp-tool-header`) e botões principais.
- **Body** (`400` / `600`, `1rem` = `16px`, `line-height: 1.65`): Texto regimental corrido, ementas e descrições, com largura de linha confortável (`60ch`–`75ch`).
- **Label** (`700`, `0.8125rem` = `13px`, `letter-spacing: 0.04em`, `uppercase`, `font-variant-numeric: tabular-nums`): Badges, carimbos de status, códigos de disciplinas, contadores de créditos e atalhos de teclado (`⌘K`).

### Named Rules
**The 16px Input Floor Rule.** Todo elemento de entrada (`input`, `select`, `textarea`, `.cagp-search-input`, `.cagp-sitemap-input`) deve ter `font-size: max(16px, 1rem)` em todos os breakpoints (`320px` a `1440px+`) para impedir qualquer zoom automático acidental no iOS/iPadOS e Android.

**The Tabular Metric Rule.** Todo contador numérico dinâmico (horas de extensão/AAC, créditos, relógio ao vivo, progresso do cofre e códigos de disciplinas) deve aplicar `font-variant-numeric: tabular-nums` (`.cagp-tabular`) para evitar trepidação horizontal durante atualizações.

## Layout

O sistema espacial opera em um container máximo de `1280px` centrado, com padding horizontal fluido (`16px` em mobile `320px`–`767px`, `24px` em tablet `768px`–`991px`, `32px` em desktop `>= 992px`) e ritmo vertical múltiplos de `8px` (`8px`, `16px`, `24px`, `32px`, `48px`).

- **Breakpoints Canônicos de Auditoria:** `320px` (mobile compacto / iPhone SE), `375px` (mobile padrão), `768px` (tablet / iPad mini), `992px` (transição de navegação mobile para desktop) e `1440px` (desktop amplo).
- **Separação Estrita entre Modo Web e Modo Standalone (`html.cagp-is-standalone`):**
  - **Modo Web:** Exibe a barra soberana `#cagp-superapp-header` (`52px`) no topo e a `#cagp-mobile-nav` (apenas `< 992px`) na base.
  - **Modo Standalone Instalado (`html.cagp-is-standalone`):** Oculta obrigatoriamente `#quarto-announcement`, `#cagp-chapa-banner`, `#cagp-superapp-header` e `#cagp-mobile-nav`, ativando a `#cagp-superapp-topbar` (com suporte a `env(safe-area-inset-top)`) e a `#cagp-superapp-tabbar` (com suporte a `env(safe-area-inset-bottom)`), além de evitar duplicação entre `#cagp-mobile-superapp-hub` e `#micro-apps-hub`.
- **Contenção Horizontal de Filtros (Camada 3 — M3 Expressive):** Em telas `< 768px`, barras de chips de filtro (`.cagp-filter-group`, seletor de trilhas do grafo e subnavs) devem usar `display: flex; flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch`, evitando empilhamento vertical de mais de 2 linhas.

## Elevation & Depth

A profundidade no sistema CAGP é **100% estrutural, opaca e gráfica (Camada 1 + Camada 2 sem blur)**. Não existem sombras difusas nem transparências esfumaçadas: a elevação de um elemento é comunicada pela combinação de **plano de cor sólido + borda `#0A0A0A` + deslocamento de sombra dura (`0px` blur)**. Para elementos internos dentro de um mesmo container (Camada 3), a profundidade é expressa por **degraus tonais de superfície** (`#FFFFFF` sobre `#F4F1EA` sobre `#FBF8F3`), sem adicionar novas sombras.

### Shadow Vocabulary
- **Sombra de Controle / Chip (`--cagp-shadow-sm`)** (`box-shadow: 2px 2px 0px #0A0A0A`): Aplicada a botões compactos, chips de filtro, badges interativos e botões de passo (`-` / `+`).
- **Sombra de Cartão / Container (`--cagp-shadow-md`)** (`box-shadow: 4px 4px 0px #0A0A0A`): Elevação padrão em repouso para `.cagp-card`, `.cagp-tool-box`, callouts e blocos de diretoria.
- **Sombra de Elevação Ativa / Modal (`--cagp-shadow-lg`)** (`box-shadow: 6px 6px 0px #0A0A0A`): Estado `:hover` de cartões interativos, Hero principal e caixas de diálogo modais (Spotlight, App Launcher).
- **Estado Comprimido (`:active`)** (`box-shadow: 0px 0px 0px #0A0A0A; transform: translate(2px, 2px)`): Resposta tátil imediata ao clique/toque.

### Escala Unificada de `z-index` (10 Níveis Blindados)
1. `1020`: `.cagp-reading-progress`, `.cagp-reading-ruler`
2. `1030`: `#quarto-announcement`, `#cagp-chapa-banner`, `.cagp-back-to-top`, `.cagp-a11y-trigger`
3. `1040`: `.cagp-superapp-header`, `.cagp-mobile-nav`, `.cagp-superapp-topbar`, `.cagp-superapp-tabbar`, `.cagp-pwa-banner`
4. `1050`: `.cagp-island-dropdown-menu`
5. `1060`: `.cagp-mobile-drawer`, `.cagp-launcher-modal`
6. `1070`: `.cagp-spotlight-modal`, `.cagp-spotlight-dialog`
7. `1080`: `.cagp-a11y-backdrop`
8. `1090`: `.cagp-a11y-panel`, `#cagp-settings-sheet`, `#cagp-ios-sheet` *(sempre acima do Launcher e do Drawer)*
9. `1100`: `.cagp-toast`, `.cagp-skip-link:focus`

### Named Rules
**The Zero-Blur Rule.** `backdrop-filter: blur()` e `box-shadow` com raio de desfoque maior que `0px` são estritamente proibidos em todo o repositório; toda sombra tem `0px` de blur e toda superfície flutuante tem `100%` de opacidade.

**The No-Nested-Shadow Rule.** Um componente com `--cagp-shadow-md` ou `--cagp-shadow-lg` jamais pode conter filhos que também apliquem `--cagp-shadow-md`; sub-containers internos usam apenas fundo tonal (`#F4F1EA`) e borda seca (`1px` ou `2px solid #0A0A0A`).

## Shapes

A linguagem formal é retangular, arquitetônica e disciplinada:
- **Cantos de Controles e Chips (`--cagp-radius-sm: 2px`):** Botões, inputs, chips, badges e células de código.
- **Cantos de Cartões e Painéis (`--cagp-radius-md: 4px`):** Cartões `.cagp-card`, caixas de ferramentas `.cagp-tool-box` e modais.
- **Bordas Superiores deBottom Sheets (`12px 12px 0 0` apenas na borda externa do Sheet mobile):** Única concessão ergonômica da Camada 2 para sinalizar uma folha deslizante inferior com *grabber* horizontal (`40px x 4px` em `#0A0A0A`), mantendo `border-top: 3px solid #0A0A0A`.
- **Animações Separadas por Eixo & Sistema Físico de Tokens Cinéticos (Apple HIG + M3 Expressive + Brite):**
  - **Spatial Springs (Geometria, Posição, Escala, Altura, Chevron):**
    - `--cagp-spring: cubic-bezier(0.32, 0.72, 0, 1)` (Apple HIG — navegação espacial, sheets e drill-down `0.98 ↔ 1.0`).
    - `--cagp-m3-spatial-fast: cubic-bezier(0.42, 1.67, 0.21, 0.90)` (`350ms` — micro-interações táteis, botões `+`/`-`, carimbos e rotação elástica de chevrons).
    - `--cagp-m3-spatial-default: cubic-bezier(0.38, 1.21, 0.22, 1.00)` (`500ms` — preenchimento elástico de barras de progresso e pulso de `100%`).
    - `--cagp-m3-spatial-standard: cubic-bezier(0.27, 1.06, 0.18, 1.00)` (`320ms` — interpolação fluida de altura `grid-template-rows: 0fr -> 1fr` em gavetas e acordeões).
  - **Effects Springs (Opacidade, Cor, Borda — Zero Overshoot conforme M3 Expressive):**
    - `--cagp-m3-effects-fast: cubic-bezier(0.31, 0.94, 0.34, 1.00)` (`150ms`).
    - `--cagp-m3-effects-default: cubic-bezier(0.34, 0.80, 0.34, 1.00)` (`200ms`).
  - **Transições Direcionais de Rota & Sub-Views:** Deslizamento lateral (`±18px` + crossfade `220ms`) entre abas irmãs da barra principal; escala de profundidade (`0.98 ↔ 1.0` com `--cagp-spring`) em navegações *Drill-Down* / `[← Hub]`; e deslizamento direcional suave (`±14px`) entre Sub-Views de um Workspace com estabilização de altura.
  - **Coreografia Escalonada (`--stagger-index: 0..7` × `35ms`), Odômetro `requestAnimationFrame` (`280ms`), Háptica (`navigator.vibrate(8)`) e Skeletons Brite:** Entrada escalonada limitada aos primeiros 8 cards visíveis; contadores numéricos animados em `280ms`; barra superior de progresso de rota (`#cagp-route-progress-bar`, `z-index: 1020`); e respeito integral a `@media (prefers-reduced-motion: reduce)` e `html[data-a11y-motion="reduced"]`.
  - `@keyframes cagpDrawerSlide`: Revelação vertical (`translateY(-4px)` -> `translateY(0)`) exclusiva para acordeões de ementas, gavetas da calculadora, etapas de quiz e detalhes do grafo.
  - `@keyframes cagpOffcanvasSlide`: Deslizamento horizontal (`translateX(100%)` -> `translateX(0)`) exclusivo para o painel lateral `.cagp-mobile-drawer-panel`.

## Components

### Buttons
Botões táteis, assertivos e com área mínima de toque de `48px` de altura.
- **Shape:** Cantos micro-contidos (`2px` radius) com borda sólida `2px solid #0A0A0A` e sombra dura `2px 2px 0px #0A0A0A`.
- **Primary (`.cagp-btn-primary`, `.cagp-doc-btn-primary`):** Fundo Vinho Candango (`#9E2424`), texto branco (`#FFFFFF`), tipografia `Oswald` `700` uppercase, padding `12px 20px`.
- **Hover / Focus:** Elevação mecânica `transform: translate(-1px, -1px)` com sombra `3px 3px 0px #0A0A0A` e fundo `#7A1B1B`; anel de foco `:focus-visible` com `outline: 3px solid #E8A317; outline-offset: 2px`.
- **Secondary / Outline (`.cagp-btn-outline`, `.cagp-doc-btn-outline`):** Fundo branco (`#FFFFFF`), texto `#0A0A0A`, borda `2px solid #0A0A0A`; no `:hover`, recebe fundo `#F4F1EA`.

### Chips
Filtros rápidos e seletores de categoria inspirados na contenção M3 Expressive com pele Brite.
- **Style:** Fundo `#FFFFFF`, texto `#0A0A0A`, borda `2px solid #0A0A0A`, raio `2px`, altura mínima `40px` (`44px` em barras de toque mobile), sombra `2px 2px 0px #0A0A0A`.
- **State:**Quando selecionado (`.is-active` ou `aria-pressed="true"`), assume fundo `#9E2424` (ou `#0A0A0A`), texto `#FFFFFF` e peso `700`.

### Cards / Containers
Unidades modulares de informação institucional e ferramentas interativas.
- **Corner Style:** Cantos contidos (`4px` radius).
- **Background:** Branco puro (`#FFFFFF`) sobre o canvas creme (`#FBF8F3`), ou superfície tonal areia (`#F4F1EA`) para sub-painéis internos.
- **Shadow Strategy:** `4px 4px 0px #0A0A0A` para cartões de primeiro nível; zero sombra para sub-containers aninhados.
- **Border:** `2px solid #0A0A0A` (`3px solid #0A0A0A` em `.cagp-hero` e `.cagp-tool-box`).
- **Internal Padding:** `20px` (`16px` em viewports `< 576px`).

### Inputs / Fields
Campos de busca instantânea e filtragem de matrizes/documentos.
- **Style:** Borda `2px solid #0A0A0A`, fundo `#FFFFFF`, raio `2px`, altura mínima `48px`, `font-size: 16px` (`1rem`) obrigatório.
- **Focus:** `outline: none`, `border-color: #9E2424`, `box-shadow: 4px 4px 0px #9E2424`.
- **Error / Disabled:** Fundo `#EAE5DC`, opacidade `0.65` e cursor `not-allowed` quando desabilitado.

### Navigation
Arquitetura de navegação adaptativa Web + Super App sem sobreposição de barras.
- **Desktop Header (`#cagp-superapp-header`):** Barra fixa de `52px` em `#0A0A0A` com borda inferior `3px solid #9E2424`, links em `Oswald` uppercase, 3 menus dropdown idempotentes (`Jornada Acadêmica`, `Acervo & Ajuda`, `O CAGP`), gatilho do Spotlight (`⌘K`), App Launcher e Acessibilidade.
- **Mobile Bottom Bar (`#cagp-mobile-nav` / `#cagp-superapp-tabbar`):** Barra inferior de `60px` + `env(safe-area-inset-bottom)` com 5 alvos de `>= 48x48px` e indicador ativo em Vinho Candango (`#9E2424`) ou Ouro (`#E8A317`).
- **Segmented Control (`.cagp-segmented-nav`):** Alternador de visão de página (ex.: `A Gestão em Exercício` vs `O Centro Acadêmico`) posicionado acima do conteúdo mutável, com fundo tonal `#EAE5DC`, borda `2px solid #0A0A0A` e aba ativa elevada em `#9E2424`.

### Signature Components (Micro-Apps, Passaporte Acadêmico & Acordeões de Ementa)
- **Passaporte / Crachá Acadêmico CAGP (`.cagp-passport-card`):** Componente de identidade persistente (`cagp_student_profile_v1`) inspirado na Carteira Estudantil da UFMG e nos cartões Apple Wallet / Nubank Ultravioleta com pele Neo-Brutalista Brite. Combina fundo com micro-grid técnico pontilhado (`radial-gradient(#0A0A0A 1px, transparent 1px)` em baixa opacidade), avatar `72x72px` (`256x256px` WebP gerado via `<canvas>` client-side ou presets ilustrados Brite), **Pin Esmaltado de Orgulho LGBTQIAPN+** (`.cagp-pride-pin`) no canto inferior direito do avatar, **Tag Editorial de Bandeira + Pronomes** (`.cagp-pride-tag`), barra dupla de integralização (`%` das 27 obrigatórias + `%` das 600h de ACG) e carimbo dinâmico de situação acadêmica.
- **Hierarquia Editorial de Bordas & Superfícies Tonais:** Molduras principais de Workspaces, Passaporte, Modais e Tool Boxes usam borda estrutural `3px solid #0A0A0A`; cartões clicáveis, botões e chips interativos usam `2px solid #0A0A0A` com sombra deslocada; divisores internos, células de tabelas e sub-linhas dentro de painéis tonais (`#F4F1EA` e `#EAE5DC`) usam bordas suavizadas de `1.5px solid #0A0A0A` ou `1px solid rgba(10, 10, 10, 0.22)` e zero sombra projetada, criando contraste imediato entre container de fundo estático e controle clicável.
- **Acordeão de Disciplina (`.cagp-discipline`):** Elemento `<details>` com cabeçalho flexível exibindo badge de departamento (`DCP`, `ECN`, `SOA`, `EST`), código em `JetBrains Mono`, carga horária (`60h • 4 cr`) e corpo de ementa com abertura vertical suave (`@keyframes cagpDrawerSlide`).
- **Linha de Calculadora Regimental (`.cagp-calc-row`):** Linha estruturada com título, teto máximo em créditos, gaveta expansível *"O que conta / O que não conta"*, botões passo a passo (`-` / `+` de `40x40px` mín.) e carimbo automático `TETO` ao atingir o limite do Art. 15.

## Do's and Don'ts

### Do:
- **Do** aplicar a **Regra de Arbitragem em 3 Camadas**: pele 100% Brite/CAGP (Camada 1), ergonomia e física Apple HIG (Camada 2) e contenção de densidade/superfícies tonais M3 Expressive (Camada 3).
- **Do** manter `font-size: max(16px, 1rem)` em todos os inputs de busca e formulário em qualquer resolução para evitar auto-zoom acidental.
- **Do** usar degraus tonais (`#F4F1EA` e `#EAE5DC`) e divisores de `1px`/`2px solid #0A0A0A` para organizar o interior de calculadoras e ferramentas sem criar `nested-cards`.
- **Do** usar barras de chips com rolagem horizontal (`overflow-x: auto; flex-wrap: nowrap`) em telas móveis quando houver mais de 4 filtros.
- **Do** garantir que toda animação utilize `cubic-bezier(0.32, 0.72, 0, 1)` e seja desativada em `@media (prefers-reduced-motion: reduce)`.

### Don't:
- **Don't** usar `backdrop-filter: blur()`, glassmorphism, gradientes suaves ou sombras com blur (`> 0px`) em nenhum componente.
- **Don't** usar cantos arredondados maiores que `4px` em cartões/botões ou formato pílula (`9999px`) em chips e botões.
- **Don't** aninhar um cartão com `box-shadow` duro dentro de outro container que já possua `box-shadow` duro (`nested-cards`).
- **Don't** reutilizar o mesmo nome de `@keyframes` para animações de eixos diferentes (`cagpDrawerSlide` é estritamente vertical; `cagpOffcanvasSlide` é estritamente horizontal).
- **Don't** exibir `#quarto-announcement` ou `#cagp-chapa-banner` quando o aplicativo estiver rodando em modo instalado (`html.cagp-is-standalone`).
