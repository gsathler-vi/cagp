# Diagnóstico Factual e Auditoria Empírica de DOM, Impressão e Ergonomia — Super App CAGP UFMG

* **Data da Auditoria:** 2026-10-29
* **Ambiente Auditado:** `./docs/*.html` compilado via Quarto CLI sobre Chromium Headless (Playwright, `deviceScaleFactor: 2`) nos viewports `360×800`, `375×812`, `412×915`, `768×1024` e `1440×900` (modos **Web Browser** e **PWA Standalone** `html.cagp-is-standalone`).
* **Evidências Visuais Confrontadas:**
  * Evidência Factual Mobile (`412×915` Standalone): [a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg](file:///home/gsathler/Nextcloud/Projects/cagp/a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg)
  * Benchmark Ergonômico A (Home Super App & Contenção Tonal): [1000361583.jpg](file:///home/gsathler/Nextcloud/Projects/cagp/1000361583.jpg)
  * Benchmark Ergonômico B (Menu Agregador "Todos" & Busca Contextual): [6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg](file:///home/gsathler/Nextcloud/Projects/cagp/6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg)

---

## 1. Diagnóstico Crítico da Exportação do Espelho Oficial N-20229 (`acg.qmd` + `styles.css`)

### 1.1 Reprodução Empírica da Falha (`window.print()`)
Ao simular um perfil discente real (`7º Período`, `225h` de Extensão + `195h` de AAC = `420h / 28 créditos` em `cagp_calc_ext_aac_v1` e 2 certificados monitorados em `cagp_aac_120d_certs_v1`), acionar `#btn-gerar-resumo-n20229` em [acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1991-L2044) e executar a rotina de impressão (`@media print` + geração de PDF A4):

| Métrica Empírica (`@media print` / PDF A4) | Valor Medido | Comportamento Esperado (Padrão SEI / Sala F-2039) |
| :--- | :--- | :--- |
| **Total de páginas A4 geradas** | **9 páginas A4** (`484.162 bytes`) | **1 página A4** (máx. 2 se houver >15 certificados individuais) |
| **Altura total do fluxo impresso** | **`5.382 px`** | `~1.050 px` (1 folha A4 limpa e isolada) |
| **Posição vertical (`top`) onde o Espelho inicia** | **`4.084 px` (Página 7 de 9)** | **`0 px` (Topo da Página 1)** |
| **Controles interativos vazados no PDF** | **46 botões/inputs** (`+`, `-`, `Zerar`, `Compactar ▲`) | **0 controles de interface** |
| **Corte do texto SEI dentro de `<textarea rows="5">`** | **`457 px` ocultos** (`clientHeight: 125px` vs `scrollHeight: 582px` — **78,5% cortado**) | Bloco textual ou tabela integral sem barra de rolagem |
| **Existência de regra `@page` no CSS** | **`false` (ausente)** | `@page { size: A4 portrait; margin: 12mm 15mm; }` |

### 1.2 Causas-Raiz no Código-Fonte
1. **Ausência de isolamento da árvore de impressão ([styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9622-L9653)):** A bloco `@media print` oculta apenas barras de navegação (`#cagp-superapp-header`, `#cagp-superapp-topbar`, `#cagp-global-bottom-sheet`), mas **não oculta** `#quarto-announcement`, `.cagp-workspace-header`, a calculadora interativa de 3.699 px de altura nem `footer.footer`.
2. **Vazamento do Banner Eleitoral no Topo da Página 1 ([_quarto.yml](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml#L36-L42)):** O primeiro elemento impresso na Página 1 do PDF é o banner vermelho `#quarto-announcement` (*"PROPOSTA DE CHAPA — Este portal é uma proposta e projeto da Chapa [Nome da Chapa a Definir]..."*) com o botão `[ COMPACTAR ▲ ]`, inviabilizando a juntada institucional do PDF em processo no SEI/UFMG ou protocolo na Secretaria (Sala F-2039).
3. **Injeção do container no meio do DOM ([acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1160)):** `<div id="cagp-n20229-print-sheet">` está posicionado na linha 1160, abaixo de toda a View 1 da calculadora.
4. **Regra CSS autodestrutiva ([styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9646-L9648)):** `.cagp-workspace-view[hidden] { display: block !important; }` força sub-views ocultas a reaparecerem durante qualquer impressão.
5. **Reaproveitamento cru de HTML de modal ([acg.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1918-L1997)):** `printContainer.innerHTML = mirrorHtml` reutiliza o snippet do Bottom Sheet (com badges coloridos de UI e `<textarea id="cagp-n20229-sei-textarea" rows="5" readonly>`) em vez de um documento formal A4 com cabeçalho institucional UFMG/FAFICH/Colegiado, campos de matrícula/identificação discente, demonstrativo de horas brutas vs. horas aproveitadas pós-teto regimental e bloco formal de data/assinatura.

---

## 2. Overflow Horizontal e Oclusão da Barra de Sub-Views (`.cagp-workspace-bar`)

### 2.1 Confronto com a Evidência Real (`a0bca2e3-1b49-4e71-898b-60a330800baa.jpeg`)
A captura enviada pelo usuário corresponde exatamente ao viewport **`412×915` em modo PWA Standalone** em `documentos.html`, onde `.cagp-workspace-tabs` possui apenas **`300 px` de largura interna útil** (`248 px` em telas de `360 px`), enquanto a soma das 4 abas exige **`1.072 px`** (`overflowRatio: 3,57×` em `412 px` e `4,32×` em `360 px`).

### 2.2 Censo Completo nas 14 Rotas em `360×800`
Em **14 de 14 páginas** do portal (`100%`), **nem sequer a Aba 1 cabe inteira na tela** (`tabsVisibleFully: 0`, `firstTabClipped: true`):

| Página (`docs/*.html`) | `clientWidth` (`360px` VP) | `scrollWidth` Total | Overflow Oculto (`px`) | Nº de Abas | Abas 100% Visíveis | Visibilidade da Aba 1 (`360px` / `412px`) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `calouros.html` | `248 px` | `1.377 px` | `+1.129 px` (5,55×) | 5 | **0** | Cortada na 1ª aba |
| `index.html` | `248 px` | `1.363 px` | `+1.115 px` (5,50×) | 4 | **0** | **64%** / **78%** (explode até em `1440px`!) |
| `curso.html` | `248 px` | `1.348 px` | `+1.100 px` (5,44×) | 5 | **0** | Cortada na 1ª aba |
| `sobre.html` | `248 px` | `1.336 px` | `+1.088 px` (5,39×) | 4 | **0** | Cortada na 1ª aba |
| `gestao.html` | `248 px` | `1.326 px` | `+1.078 px` (5,35×) | 4 | **0** | Cortada na 1ª aba |
| `acg.html` | `248 px` | `1.104 px` | `+856 px` (4,45×) | 4 | **0** | **74%** / **90%** |
| `documentos.html` | `248 px` | `1.072 px` | `+824 px` (4,32×) | 4 | **0** | **74%** / **90%** |
| `pesquisa.html` | `248 px` | `1.011 px` | `+763 px` (4,08×) | 4 | **0** | Cortada na 1ª aba |
| `percurso.html` | `248 px` | `1.010 px` | `+762 px` (4,07×) | 4 | **0** | **87%** / **100%** (Aba 2: **3%**) |
| `mapa-do-site.html` | `248 px` | `867 px` | `+619 px` (3,50×) | 3 | **0** | Cortada na 1ª aba |
| `faq.html` | `248 px` | `859 px` | `+611 px` (3,46×) | 3 | **0** | Cortada na 1ª aba |
| `tcc.html` | `248 px` | `844 px` | `+596 px` (3,40×) | 3 | **0** | Cortada na 1ª aba |
| `estagio.html` | `248 px` | `820 px` | `+572 px` (3,31×) | 3 | **0** | Cortada na 1ª aba |
| `optativas.html` | `248 px` | `740 px` | `+492 px` (2,98×) | 3 | **0** | Cortada na 1ª aba |

**Causas-Raiz ([styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9776-L9973)):**
1. **Perda severa de largura horizontal por aninhamento de caixas:** Container externo da página (`~24px`) + `.cagp-workspace-header` (`border: 6px` + `padding-inline: 36,8px`) + `.cagp-workspace-bar` (`border: 4px` + `padding-inline: 17,6px`) + `.cagp-workspace-tabs` (`padding: 4px`) consomem **`112 px` de largura horizontal** antes da primeira aba começar (`360px - 112px = 248px`).
2. **Rótulos verbosos + badges internos + numeração ordinal:** Cada botão `.cagp-workspace-tab` combina ícone + prefixo numérico + título longo em `Oswald` caixa-alta (`white-space: nowrap`) + sub-badge `.cagp-ws-badge` com borda própria (ex.: `[ 📄 1. ATOS NORMATIVOS & 3 PERCURSOS [8 PDFS] ]` = `333,5 px` de largura para um único botão).
3. **Ausência de affordance de rolagem:** `scroll-snap-type: x mandatory` combinado com uma Aba 1 mais larga que o container impede o *peek* (espiada parcial da Aba 2), ocultando completamente a existência das demais ferramentas da página.

---

## 3. Consumo Excessivo da 1ª Dobra (Falta de Conteúdo Imediato)

Medição da coordenada `Y` onde surge o **primeiro elemento funcional/acionável real** da página versus a altura útil do viewport (`usableH = viewportHeight - bottomTabbarHeight`):

| Página | Viewport & Modo | Altura Útil (`usableH`) | Início do 1º Conteúdo Útil (`firstActionY`) | Consumo da 1ª Dobra por Meta-Chrome | Telas de Rolagem até o Conteúdo |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **`documentos.html`** *(1º PDF)* | `360×800` Standalone | `740 px` | **`1.332 px`** | **180%** | **1,8 telas** |
| **`documentos.html`** *(1º PDF)* | `360×800` Web Mobile | `738 px` | **`1.586 px`** | **215%** | **2,1 telas** |
| **`documentos.html`** *(1º PDF)* | `412×915` Standalone | `855 px` | **`1.287 px`** | **151%** | **1,5 telas** |
| **`documentos.html`** *(1º PDF)* | `1440×900` Desktop | `900 px` | **`1.046 px`** | **116%** | **1,2 telas** |
| **`acg.html`** *(1º botão `+`/`-`)* | `360×800` Standalone | `740 px` | **`2.272 px`** | **307%** | **3,1 telas** |
| **`acg.html`** *(1º botão `+`/`-`)* | `360×800` Web Mobile | `738 px` | **`2.525 px`** | **342%** | **3,4 telas** |
| **`acg.html`** *(1º botão `+`/`-`)* | `1440×900` Desktop | `900 px` | **`1.391 px`** | **155%** | **1,5 telas** |
| **`percurso.html`** *(Grafo SVG)* | `360×800` Standalone | `740 px` | **`2.856 px`** | **386%** | **3,9 telas** |
| **`percurso.html`** *(Grafo SVG)* | `360×800` Web Mobile | `738 px` | **`3.118 px`** | **422%** | **4,2 telas** |
| **`index.html`** *(1º Card Ação)* | `360×800` Standalone | `740 px` | **`1.583 px`** | **214%** | **2,1 telas** |

**Anatomia do desperdício vertical (exemplo `acg.html` e `documentos.html`):**
* **Tripla repetição de cabeçalhos:** `h1.cagp-workspace-title` dentro do hero card → imediatamente seguido por `## H2` repetindo o tema → seguido por `.cagp-tool-box > .cagp-tool-header > h3` repetindo o tema pela terceira vez.
* **Empilhamento vertical de 3 a 4 badges decorativos** no topo de `.cagp-workspace-header` (consumindo `110 px–145 px` verticais em telas estreitas).
* **Blocos explicativos de infraestrutura antes da ferramenta:** Em [documentos.qmd](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd#L56-L78), `#cagp-spotify-vault` ocupa `~360 px` na 1ª dobra para explicar como funciona o cache offline e expor o identificador interno `cagp-pdfs-oficiais-v1` antes mesmo da barra de busca `#doc-search-input` e antes de qualquer PDF.

---

## 4. Over-Boxing, Poluição Visual, Acessibilidade Cognitiva e Contraste WCAG

### 4.1 Censo de Over-Boxing na 1ª Dobra
A combinação das regras globais do tema Brite em [_variables.scss](file:///home/gsathler/Nextcloud/Projects/cagp/_variables.scss#L260-L341) (`--bs-border-width: 2px; --bs-border-color: #0a0a0a; box-shadow: 3px 3px 0 0 #0a0a0a`) com os wrappers de [styles.css](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9776-L9980) gera:
* **14 a 22 caixas com borda preta grossa (`>= 1.5px`)** visíveis simultaneamente apenas na 1ª dobra móvel (`24 caixas` na 1ª dobra desktop de `index.html`).
* **13 a 22 sombras duras deslocadas (`box-shadow: 2px..4px 0 #0a0a0a`)** competindo pela atenção foveal na mesma tela.
* **3 a 5 níveis de aninhamento de bordas pretas** (Ex.: `.cagp-workspace-header [3px + sombra 4px]` → `.cagp-workspace-bar [2px]` → `.cagp-workspace-tab [2px + sombra 3px]` → `.cagp-ws-badge [1.5px]`).

### 4.2 Auditoria de Áreas de Toque (Violação Apple HIG `44×44 pt` / M3 `48×48 dp`)
| Componente | Seletor / Arquivo | Dimensão Medida | Requisito Mínimo | Severidade |
| :--- | :--- | :---: | :---: | :---: |
| Botões da Topbar Standalone (Busca / A11y) | `.cagp-topbar-tool-btn` ([styles.css:8022](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L8022-L8037)) | **`32 × 32 px`** | `44 × 44 px` | **Crítica** |
| Avatar da Topbar Standalone | `#cagp-topbar-profile-btn` ([super-app-header.html:274](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L274-L280)) | **`34 × 34 px`** | `44 × 44 px` | **Crítica** |
| Botões do Header Web Mobile (Busca / A11y / Menu) | `.cagp-nav-search-btn`, `.cagp-island-tool-btn`, `.cagp-mobile-menu-btn` | **`36 × 36 px`** | `44 × 44 px` | **Alta** |
| Avatar do Header Web Mobile | `#cagp-header-profile-btn` | **`38,4 × 38,4 px`** | `44 × 44 px` | **Alta** |
| Botão Compactar Banner da Chapa | `.cagp-chapa-toggle-btn` ([styles.css:9742](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L9742-L9759)) | **`98,2 × 22,2 px`** | `44 × 44 px` altura | **Alta** |

### 4.3 Auditoria de Contraste Luminoso (WCAG 2.2 AA & AAA) e Jargão Exposto
* **Reprovação WCAG AA (`< 4.5:1`):**
  * Botão `#btn-calc-reset.cagp-chip` (*"ZERAR SIMULAÇÃO"* em `acg.html`): texto `#6B7280` sobre fundo `#F4F5F7` = **`4,43 : 1`** (reprova AA `4.5:1` e AAA `7.0:1`).
* **Gaps para WCAG AAA (`< 7.0:1` em texto normal no tema padrão):**
  * `.cagp-badge-green` (`#FFFFFF` sobre `#2E7D32`, `12,8 px` bold): **`5,13 : 1`** (aprova AA, reprova AAA `7.0:1`).
  * Leitura numérica verde `#1E6B3A` sobre creme `#F4F1EA` (`17,9 px` bold em `acg.html`): **`5,78 : 1`** (abaixo de AAA `7.0:1`).
  * Textos secundários `#4B5563` sobre `#F4F1EA` (`12 px–13,1 px` em breadcrumbs e labels): **`6,70 : 1`** (próximo de AAA `7.0:1`, corrigível escurecendo token muted para `#374151`).
  * Vermelho primário `#9E2424` sobre creme `#F4F1EA` (`13,1 px–15,2 px`): **`6,82 : 1`** (atinge `7,64 : 1` AAA sobre `#FFFFFF`, mas cai para `6,82 : 1` sobre `#F4F1EA`).
* **Jargões técnicos de implementação expostos ao estudante:**
  * `cagp-pdfs-oficiais-v1` em [documentos.qmd:76](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd#L76).
  * `Canvas 256×256 WebP` em [_includes/pwa-install.html:204](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L204).
  * `Sub-View:` em [percurso.qmd:44](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd#L44).

---

## 5. Inconsistências de Navegação, Duplicação de Perfil e Estudo Comparativo dos Benchmarks

### 5.1 Armadilha de Navegação no Modo PWA Standalone
1. **Duplicação redundante de Perfil (`2` a `3` gatilhos simultâneos na mesma tela):** Em modo PWA Standalone, o botão de avatar `[data-cagp-open-passport="true"]` aparece no canto superior direito (`#cagp-topbar-profile-btn`) **e** na 5ª aba da barra inferior (`#cagp-stab-ajustes` — *"GABRIEL"*), ambos abrindo o exato mesmo `#cagp-settings-sheet`. Na `index.html`, um 3º gatilho aparece dentro do card do cofre (`avatars: 3`).
2. **Beco sem saída para 10 das 14 rotas em Standalone (`hasMenuBtn: false`):** Em [styles.css:8187](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L8187), `html.cagp-is-standalone #cagp-superapp-header { display: none !important; }` remove o botão hambúrguer do `#cagp-mobile-drawer`, enquanto `#cagp-superapp-topbar` não possui gatilho de menu e `#cagp-superapp-tabbar` ocupa o 5º slot com o avatar duplicado. Como consequência, **10 rotas inteiras (`curso`, `pesquisa`, `calouros`, `optativas`, `estagio`, `tcc`, `faq`, `sobre`, `gestao`, `mapa-do-site`) ficam sem nenhum menu de navegação primária ou secundária no aplicativo instalado**.
3. **Divergência entre Web Mobile e Standalone PWA:** No navegador móvel (`#cagp-mobile-nav`), a 5ª aba aponta para `O CAGP` (`gestao.html`); no PWA instalado (`#cagp-superapp-tabbar`), a 5ª aba vira `Passaporte` (modal), quebrando a memória muscular do estudante.
4. **Motor de Notificações Órfão de Interface:** O código em [_includes/pwa-install.html:1843-1965](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L1843-L1965) já computa alertas críticos (Jantar RU II `18h15`, Último Circular `22h30` e vencimento de certificados em `120 dias`), mas dispara apenas toasts efêmeros de `4,2s` sem nenhum ícone de sino / Central de Notificações persistente no cabeçalho.

### 5.2 Síntese Comparativa com os Benchmarks Ergonômicos (`1000361583.jpg` e `6cff1478-c95b-4dc2-a175-5aafe64af947.jpeg`)

| Dimensão Ergonômica | Estado Atual CAGP (`a0bca2e3...jpeg`) | Padrão dos Benchmarks A & B (`1000361583.jpg` / `6cff14...jpeg`) | Oportunidade Estrutural |
| :--- | :--- | :--- | :--- |
| **Papel do Avatar / Perfil** | Duplicado no topo direito (`34px`) e na 5ª aba inferior (`GABRIEL`). | **Único no cabeçalho superior**, liberando a 5ª aba inferior para navegação. | Consolidar Passaporte/Avatar exclusivamente no topo (`>=44×44px`). |
| **5ª Aba da Bottom Tab Bar** | Abre modal de Perfil (Standalone) ou rota isolada `gestao.html` (Web). | Aba agregadora **`Todos` (`☰`)**, dando acesso estruturado a 100% dos módulos. | Unificar Web Mobile + Standalone com 5ª aba **`Todos / Menu`** para as 14 rotas. |
| **Busca Contextual** | Empurrada abaixo de `900 px` de caixas ou escondida em ícone `32×32 px`. | **Pílula de busca proeminente logo abaixo do header** na Home e na aba `Todos`. | Elevar busca global/local para o topo imediato da 1ª dobra. |
| **Contenção Visual** | Over-boxing (3 níveis de bordas pretas `2–3px` + sombras duras `4px`). | **Contenção tonal** (superfícies suaves sem bordas aninhadas; métrica principal direto no canvas; listas limpas com *chevron* `>`). | Substituir caixas dentro de caixas por superfícies tonais (`--cagp-paper`, `--cagp-surface-low`, `--cagp-white`) e reservar borda/destaque para 1 elemento focal. |
| **Densidade da 1ª Dobra** | `0` ações finais visíveis; `100%` consumido por títulos repetidos e explicações. | **4 camadas úteis na 1ª dobra**: Header+Busca → Card de Jornada → Métrica+Pílulas → Bento Grid de 3 colunas. | Garantir ferramenta primária (PDFs, Calculadora, Grafo, Atalhos) visível nos primeiros `300 px` do viewport móvel. |
