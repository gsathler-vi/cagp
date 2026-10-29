# AGENTS.md — Manual de Arquitetura, Governança e Roteamento de Skills
**Repositório:** Portal Institucional & Super App Discente — Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG)  
**Documentos Relacionados:** [`PRODUCT.md`](file:///home/gsathler/Nextcloud/Projects/cagp/PRODUCT.md) • [`DESIGN.md`](file:///home/gsathler/Nextcloud/Projects/cagp/DESIGN.md) • [`RELATORIO.md`](file:///home/gsathler/Nextcloud/Projects/cagp/RELATORIO.md) • [`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml)

---

## 1. Regras Inegociáveis de Conteúdo Factual e Marca (Cláusulas Pétreas)

1. **Integridade Factual Absoluta (100% Zero Invenção / Zero Supressão):**
   - Todos os dados acadêmicos, regras regimentais (PPC 2020, Regulamento do Curso Versão `N-20229`, Regimento Interno do CAGP de `14/10/2024`, Resoluções CEPE/UFMG), cargas horárias (`3.000h` totais, `2.880h` Núcleo Específico, `120h` Formação Livre, `300h` Extensão Obrigatória, até `300h` AAC, `300h` Estágio Supervisionado A+B), códigos e ementas das `27` disciplinas obrigatórias e `68` optativas, prazos fatais (`120 dias corridos` para protocolo de Eventos I e Anais em AAC — Art. 15, § 4º; final do `2º período letivo` para aproveitamento de estudos — Res. CEPE 06/2019), horários operacionais (`RU II Setorial`, linhas do Circular Interno, `Secretaria Sala F-2039` com Norma Guedes, `CEAG FAFICH` das 08h às 22h), links oficiais e arquivos em `documentos/` e `_referencias/` **estão 100% corretos e verificados**.
   - **Proibição Estrita:** Nenhum agente pode inventar dados, alterar cargas horárias, suprimir regras regimentais, modificar códigos de matérias ou alterar links/nomes reais dos PDFs da pasta `documentos/`.
2. **Identidade Gráfica Base Soberana — Neo-Brutalismo Brite / CAGP:**
   - Governada por [`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml), [`manual-de-identidade-visual-cagp-ufmg.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/identidade-visual/manual-de-identidade-visual-cagp-ufmg.md) e [`DESIGN.md`](file:///home/gsathler/Nextcloud/Projects/cagp/DESIGN.md):
     - **Bordas:** Sólidas em Preto Candango `#0A0A0A` (`2px` em controles/chips/inputs; `3px` em cards, barras, tabelas e modais).
     - **Sombras:** Duras e deslocadas com **`0px` de blur** (`2px 2px 0px #0A0A0A`, `4px 4px 0px #0A0A0A`, `6px 6px 0px #0A0A0A`).
     - **Cantos:** Retos ou micro-contidos (`0px` a `4px`). **Proibido** usar `border-radius > 4px` ou `9999px` (exceto em indicadores circulares estritos como pinos numerados de tutorial ou avatar redondo com borda `#0A0A0A`).
     - **Zero Glassmorphism:** **Proibido** usar `backdrop-filter: blur()` em qualquer barra, modal, drawer ou card. Toda superfície elevada é 100% opaca.
     - **Tipografia:** `Oswald` (700, uppercase, para títulos/display/cabeçalhos), `Inter` (400/500/600/700 para leitura corrida e controles) e `JetBrains Mono` (para códigos de disciplinas, contadores tabulares e chaves).
     - **Paleta:** Vinho Candango `#9E2424` / Institucional `#8B1E2D`, Ouro `#E8A317`, Creme Papel `#FBF8F3`, Preto `#0A0A0A` e cores semânticas dos sistemas UFMG (SIGA `#9E2424`, MinhaUFMG `#005A9C`, Moodle `#D9531E`, SEI `#1E6B3A`, BU `#5B2C6F`).

---

## 2. Regra de Arbitragem em 3 Camadas (Brite + Apple HIG + M3 Expressive)

Quando diretrizes das skills `impeccable`, `apple-design` e `m3-expressive` parecerem divergir, aplique obrigatoriamente esta hierarquia de 3 camadas:

### Camada 1 — Pele, Geometria e Marca (Soberana: 100% Brite / CAGP)
- Define cores, tipografia, bordas pretas (`2px`–`3px`), sombras duras (`0px` blur), cantos retos (`0px`–`4px`) e opacidade sólida (`100%`).
- **Poder de Veto:** Veta qualquer sugestão de *Liquid Glass* / `backdrop-filter: blur` ou cantos arredondados (`12px`–`24px`) da skill `apple-design`, e veta cantos *pill* (`9999px`), sombras difusas de elevação ou paletas pastel estranhas à marca vindas da skill `m3-expressive`.

### Camada 2 — Ergonomia, Navegação Espacial e Física (`apple-design`)
- Define a arquitetura do Shell Web/Standalone, zonas de alcance do polegar (*Thumb Zones* com alvos de toque mínimos de `48x48px`), respeito às *Safe Areas* (`viewport-fit=cover` + `env(safe-area-inset-*)`), adaptação do Spotlight ao teclado virtual (`window.visualViewport`), componentes espaciais (Top Command Bar de `52px`, Bottom Tab Bar de `60px` com no máximo 5 abas, Bottom Sheets com *grabber*, Segmented Controls) e curvas de mola física (`cubic-bezier(0.32, 0.72, 0, 1)` com fallback instantâneo em `prefers-reduced-motion: reduce`).

### Camada 3 — Contenção, Densidade e Estados Operacionais (`m3-expressive`)
- Define como organizar dados densos sem poluição visual:
  - **Hierarquia Tonal de Superfícies (Proibição de `nested-cards`):** Nunca coloque um `.cagp-card` com borda e sombra dura dentro de outro `.cagp-card` com sombra dura. Use níveis tonais de superfície (`--cagp-surface-base: #FBF8F3`, `--cagp-surface-card: #FFFFFF`, `--cagp-surface-low: #F4F1EA`, `--cagp-surface-high: #EAE5DC`) e divisores internos (`1px` ou `2px solid #0A0A0A`).
  - **Barras de Chips Deslizantes no Mobile:** Grupos de filtros (como períodos `1ºP`–`10ºP` ou departamentos) devem usar rolagem horizontal suave (`overflow-x: auto; flex-wrap: nowrap; scroll-snap-type: x mandatory`) em telas móveis, evitando muros de botões empilhados.
  - **Feedback de Estado:** Barras de progresso com metas numéricas explícitas (`300h`, `600h`), carimbos brutais de status (`DEFERIDO`, `TETO`, `TRAVA SIGA`) e estados vazios (*empty states*) pedagógicos com botão de reset em 1 clique.

---

## 3. Roteamento Cirúrgico de Skills (Como Ler Sem Estourar a Janela de Contexto)

> [!CAUTION]
> **Regra de Ouro de Contexto:** NUNCA leia todos os arquivos das pastas `references/` ou `reference/` de uma skill de uma só vez. Carregue apenas o `SKILL.md` e o arquivo específico exigido pela subtarefa abaixo:

| Tarefa / Domínio | Skill Principal | Arquivos Permitidos para Leitura Inicial |
| :--- | :--- | :--- |
| **Orquestração de UI/UX, Auditoria Visual, Polimento e Validação de `DESIGN.md` / `PRODUCT.md`** | [`impeccable`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md) | 1. `.agents/skills/impeccable/SKILL.md`<br>2. `.agents/skills/impeccable/reference/routing.md`<br>3. Apenas 1 arquivo de comando por vez (`doctor.md`, `audit.md`, `critique.md`, `distill.md`, `polish.md`, `harden.md`, `typeset.md`). |
| **Navegação Mobile/Standalone, Tab Bar, Bottom Sheets, Safe Areas, Spotlight e Física** | [`apple-design`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md) | 1. `.agents/skills/apple-design/SKILL.md`<br>2. `.agents/skills/apple-design/references/hig-lookup.md`<br>3. `.agents/skills/apple-design/references/cross-platform.md`<br>4. `.agents/skills/apple-design/references/code-audit.md` |
| **Calculadoras, Filtros, Chips Deslizantes, Listas Segmentadas e Superfícies Tonais** | [`m3-expressive`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/SKILL.md) | 1. `.agents/skills/m3-expressive/SKILL.md`<br>2. Sob demanda: `references/components-core.md` ou `references/motion-and-tokens.md`. |
| **Estrutura Quarto, YAML, Callouts, Pandoc Divs e Build `docs/`** | [`quarto-authoring`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/quarto-authoring/SKILL.md) | 1. `.agents/skills/quarto-authoring/SKILL.md` |
| **Tokens de Marca e Sincronização `_brand.yml` <-> SCSS/CSS** | [`brand-yml`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/brand-yml/SKILL.md) | 1. `.agents/skills/brand-yml/SKILL.md` |
| **Auditoria de Textos Alternativos (`alt`, `fig-alt`, `aria-label`)** | [`alt-text`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/alt-text/SKILL.md) | 1. `.agents/skills/alt-text/SKILL.md` |
| **Governança de Customizações, Skills e Rules do Antigravity** | `agy-customizations` (Built-in) | 1. `~/.gemini/antigravity/builtin/skills/agy-customizations/SKILL.md` |
| **Auditoria E2E, Runtime, Console JS e Multi-Viewport (4 Classes de Tela)** | Subagente Nativo `/browser` (`invoke_subagent` `TypeName: "browser"`) | Uso obrigatório do subagente `/browser` sobre servidor HTTP local servindo `docs/` (substitui `playwright-core`). |

---

## 4. Contratos Técnicos Obrigatórios (Arquitetura JS, SPA Router, Cofre e CSS)

### 4.1. Contrato do Roteador SPA ([`_includes/super-app-router.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html))
1. **Proibição de Eventos Globais Sintéticos:** O roteador SPA **JAMAIS** deve disparar `document.dispatchEvent(new Event('DOMContentLoaded'))` ou `window.dispatchEvent(new Event('load'))` durante trocas de página (`applyPageSwap`), pois isso re-executa listeners acumulados de páginas anteriores e vaza memória.
2. **Evento Canônico de Navegação (`cagp:navigated`):** A cada transição concluída, disparar `window.dispatchEvent(new CustomEvent('cagp:navigated', { detail: { url: targetUrl } }))` e `document.dispatchEvent(new CustomEvent('cagp:navigated', { bubbles: true, detail: { url: targetUrl } }))`.
3. **Blindagem de Includes Persistentes:** Scripts pertencentes a componentes persistentes na raiz do `<body>` (`_includes/super-app-header.html`, `_includes/accessibility.html`, `_includes/pwa-install.html`, `_includes/spotlight-search.html`, `_includes/app-launcher.html`, `_includes/back-to-top.html`) devem possuir guarda de idempotência (`if (window.__cagpHeaderMounted) return;`) e/ou atributo `data-cagp-persistent-script="true"` ignorado por `executePageScripts(currentMain)`.
4. **Inicialização de Scripts de Página (`.qmd`):** Todo script inline de página (`.qmd`) deve executar sua função `initPage()` imediatamente caso `document.readyState !== 'loading'` (o que permite re-execução limpa via `executePageScripts(currentMain)` na troca de página SPA sem depender de `DOMContentLoaded`) e nunca anexar listeners em `window` ou `document` sem antes remover o listener anterior ou verificar uma flag global.

### 4.2. Contrato de Chaves do Cofre Acadêmico (`localStorage` & `CacheStorage`)
Qualquer leitura ou escrita de dados locais do estudante deve usar **exclusivamente** as seguintes chaves canônicas:

| Recurso / Micro-App | Chave Canônica no `localStorage` | Formato do Valor | Consumidores Sincronizados |
| :--- | :--- | :--- | :--- |
| **Calculadora 600h (Extensão + AAC)** | `cagp_calc_ext_aac_v1` | JSON Object (`{ "ext_lab_a": 90, "aac_5": 90, ... }`) | [`acg.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) (escrita/leitura) e [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`refreshVaultData` + `#cagp-clear-vault-btn` + `cagpSync`) |
| **Guardião de 120 Dias das AAC (Art. 15, § 4º)** | `cagp_aac_120d_certs_v1` | JSON Array (`[{ id, title, mod, date, hours }]`) | [`acg.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) (`#guardiao-120-dias` + Espelho N-20229), [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`setAppBadge` + `refreshVaultData` + `cagpSync`) e [`_includes/super-app-header.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html) (`Campus Agora`) |
| **Alertas & Sobrevivência Noturna (Notificações)** | `cagp_notifications_prefs_v1` | JSON Object (`{ ru1815, circular2230, aac120d, lastFired }`) | [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`window.cagpNotifications` + `cagpSync`) e [`sw.js`](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js) (`SHOW_NOTIFICATION` + `notificationclick`) |
| **Checklist do Calouro (6 Passos)** | `cagp_calouro_checklist_v1` | JSON Object/Array de IDs | [`calouros.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/calouros.qmd) (escrita/leitura) e [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`refreshVaultData` + `#cagp-clear-vault-btn` + `cagpSync`) |
| **Simulador / Termômetro de Percurso** | `cagp_percurso_quiz_v1` | String (`"01-01"`, `"01-02"` ou `"01-03"`) | [`percurso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd) (escrita/leitura) e [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`refreshVaultData` + `#cagp-clear-vault-btn`) |
| **Minha Grade (27 Obrigatórias + 68 Optativas)** | `cagp_minha_grade_v1` | JSON Object (`{ "completed": ["DCP124", ...], "favorites": ["DCP001", ...] }`) | [`percurso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd), [`optativas.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/optativas.qmd) (escrita/leitura) e [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`refreshVaultData` + `#cagp-clear-vault-btn` + `cagpSync`) |
| **Checklist de Dispensa de Estágio (Art. 41)** | `cagp_art41_checklist_v1` | JSON Object (`{ "srv_1": true, ... }`) | [`estagio.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/estagio.qmd), [`estagio-tcc.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/estagio-tcc.qmd) (escrita/leitura) e [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`refreshVaultData` + `#cagp-clear-vault-btn` + `cagpSync`) |
| **Preferências de Acessibilidade** | `cagp_a11y_prefs_v2` | JSON Object (`{ font, contrast, dyslexia, spacing, motion, links, ruler, readingMask }`) | [`_includes/accessibility.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/accessibility.html) e [`_includes/super-app-router.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html) (preserva atributos `data-a11y-*` em `<html>`) |
| **Perfil & Passaporte Acadêmico Discente** | `cagp_student_profile_v1` | JSON Object (`{ name, pronouns, period, entrySemester, pathway, avatarMode, avatarPreset, photoDataUrl, prideFlag, updatedAt }`) | [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html) (`window.cagpProfile` + `<canvas>` 256×256 WebP + `#cagp-settings-sheet` + `#cagp-clear-vault-btn` + `cagpSync`), [`_includes/super-app-header.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html) (`#cagp-header-profile-btn` + `#cagp-topbar-profile-btn`), [`index.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/index.qmd) (Passaporte Acadêmico + Bússola), [`percurso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd) (destaque de período/percurso) e [`acg.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) (cabeçalho do Espelho Oficial N-20229) |
| **Cofre de 8 PDFs Normativos Offline** | CacheStorage: `cagp-pdfs-oficiais-v1` | 8 URLs exatas da pasta `documentos/`:<br>1. `documentos/ppc-gestao-publica-ufmg.pdf`<br>2. `documentos/regulamento-gestao-publica-ufmg.pdf`<br>3. `documentos/ementario-gestao-publica-ufmg.pdf`<br>4. `documentos/percurso-bacharelado-nucleo-geral.pdf`<br>5. `documentos/percurso-bacharelado-nucleo-complementar.pdf`<br>6. `documentos/percurso-bacharelado-nucleo-avancado.pdf`<br>7. `documentos/termo-aceite-orientador-tcc.pdf`<br>8. `documentos/regimento-interno-cagp-ufmg.pdf` | [`documentos.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd) e [`sw.js`](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js) |

### 4.3. Escala Unificada de `z-index` (Proibido Inflacionar Valores)
Nenhum componente pode inventar valores arbitrários como `9999999`. Toda camada posicionada deve obedecer à escada de 10 níveis definida em [`DESIGN.md`](file:///home/gsathler/Nextcloud/Projects/cagp/DESIGN.md):
- `1020`: Régua de leitura e barra de progresso de topo (`.cagp-reading-progress`, `.cagp-reading-ruler`)
- `1030`: Banners de aviso no fluxo superior (`#quarto-announcement`, `#cagp-chapa-banner`) e botões flutuantes secundários (`.cagp-back-to-top`, `.cagp-a11y-trigger`)
- `1040`: Navegação primária fixa (`.cagp-superapp-header`, `.cagp-mobile-nav`, `.cagp-superapp-topbar`, `.cagp-superapp-tabbar`, `.cagp-pwa-banner`)
- `1050`: Menus dropdown do cabeçalho (`.cagp-island-dropdown-menu`)
- `1060`: Gaveta de navegação mobile off-canvas (`.cagp-mobile-drawer`) e Modal do App Launcher (`.cagp-launcher-modal`)
- `1070`: Modal do Spotlight / Command Palette (`.cagp-spotlight-modal`, `.cagp-spotlight-dialog`)
- `1080`: Backdrop de Bottom Sheets / Acessibilidade (`.cagp-a11y-backdrop`)
- `1090`: Painéis e Bottom Sheets modais (`.cagp-a11y-panel`, `#cagp-settings-sheet`, `#cagp-ios-sheet`, `#cagp-global-bottom-sheet`) — **sempre acima do Launcher e do Drawer para poderem ser abertos a partir deles**
- `1100`: Toasts de feedback rápido (`.cagp-toast`) e Skip Links em `:focus` (`.cagp-skip-link:focus`)

---

## 5. Protocolo Oficial de Verificação Obrigatória (Tríade A + B + C)

1. **Idioma e Viewport no Quarto:**
   - [`_quarto.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml) deve manter `lang: pt-BR`.
   - [`_includes/pwa-meta.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-meta.html) deve garantir via script síncrono que a `<meta name="viewport">` renderizada pelo Quarto receba `viewport-fit=cover`.
2. **Tríade Oficial de Verificação Obrigatória após Alterações (Zero Uso de `playwright-core`):**
   - **Passo A — Build Limpo & Impeccable CLI:**
     ```bash
     rm -rf docs && quarto render
     .agents/skills/impeccable/scripts/impeccable doctor
     .agents/skills/impeccable/scripts/impeccable detect --json docs/*.html
     ```
   - **Passo B — Integridade de Links, Ativos e Âncoras (`#hash`) via Python:**
     - Executar script Python sobre `docs/*.html` comprovando `0` arquivos ausentes e `0` âncoras internas ou cruzadas (`#hash`) quebradas.
   - **Passo C — Auditoria Multi-Viewport e Runtime com Subagente Nativo `/browser`:**
     - Subir servidor HTTP local servindo `docs/` em background (`python3 -m http.server 8765 --directory docs --bind 127.0.0.1`) e acionar o subagente nativo `/browser` (`invoke_subagent` com `TypeName: "browser"`) para inspecionar o DOM renderizado, console JS (`0` erros), roteador SPA e responsividade nas **4 classes de tela**:
       1. **Classe A — Mobile Smartphone:** `320x568`, `375x812`, `430x932`
       2. **Classe B — Foldable (Dobrável):** `360x800` (fechado), `680x840` e `840x900` (aberto)
       3. **Classe C — Tablet:** `768x1024` (retrato), `991x800` (limite de transição) e `1024x768` (paisagem)
       4. **Classe D — Desktop & Widescreen:** `1280x800`, `1440x900`, `1920x1080`
