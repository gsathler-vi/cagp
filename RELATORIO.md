# Relatório Completo do Diagnóstico Forense Independente (Zero Viés)
**Projeto:** Portal Institucional & Super App Discente — Centro Acadêmico de Gestão Pública (CAGP FAFICH/UFMG)  
**Data da Auditoria:** 28 de outubro de 2026  
**Escopo Auditado:** `.agents/skills/*`, `_brand.yml`, `_quarto.yml`, `_variables.scss`, `styles.css` (8.581 linhas), `_includes/*.html` (9 módulos), `sw.js`, `manifest.webmanifest`, as 11 páginas-fonte `*.qmd` e os 11 artefatos compilados em `docs/*.html`.

---

## 1. Sumário Executivo da Perícia

Após 53 ciclos incrementais de desenvolvimento, o repositório do **Portal & Super App do CAGP FAFICH/UFMG** consolidou um acervo factual, regimental e utilitário de altíssimo valor público para os estudantes do turno noturno do Bacharelado em Gestão Pública da UFMG. Os dados acadêmicos, regras do PPC 2020 e do Regulamento (Versão Curricular `N-20229`), prazos regimentais (como o prazo decadencial de `120 dias` para protocolo de certificados de eventos/anais em AAC e o limite do `2º período` para aproveitamento de estudos), horários operacionais (`RU II`, linhas do Circular, `Secretaria F-2039`, `CEAG`) e documentos oficiais em `documentos/` estão **100% íntegros e fidedignos**.

Contudo, a inspeção técnica forense ("Zero Viés") sobre o código-fonte e sobre o DOM realmente compilado em `docs/*.html` revelou **falhas silenciosas de alta criticidade** introduzidas pela sobreposição de camadas ao longo dos 53 ciclos:

1. **Quebra dos Menus Dropdown no Desktop após a 1ª Navegação SPA:** O script de [`_includes/super-app-header.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L288-L370) é renderizado pelo Quarto dentro de `<main class="content">` e re-executado pelo roteador SPA ([`_includes/super-app-router.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L240-L274)) a cada troca de página, anexando listeners duplicados nos botões `.cagp-island-dropdown-btn` que abrem e fecham o menu no mesmo clique (`0ms`).
2. **Vazamento de Memória por Re-disparo Global de `DOMContentLoaded` e `load`:** O roteador SPA dispara artificialmente `new Event('DOMContentLoaded')` em `document` e `new Event('load')` em `window` a cada navegação, re-executando todos os callbacks acumulados das páginas anteriores e re-registrando `sw.js`.
3. **Evento `cagp:navigated` Morto na Raiz:** Disparado em `document` sem `{ bubbles: true }` (`super-app-router.html:273`), nunca alcançando os ouvintes registrados em `window.addEventListener('cagp:navigated', ...)` no cabeçalho, no Cofre PWA e no Spotlight.
4. **"Meu Cofre Acadêmico" 100% Inoperante (Dessincronia Total de Chaves do `localStorage`):** Os 3 indicadores do Cofre Offline em [`_includes/pwa-install.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L351-L390) leem chaves inexistentes (`cagp_acg_total_horas`, `cagp_calouros_checklist`, `cagp_percurso_quiz_resultado`), enquanto as páginas salvam em `cagp_calc_ext_aac_v1` (`acg.qmd`), `cagp_calouro_checklist_v1` (`calouros.qmd`) ou sequer salvam no `localStorage` (`percurso.qmd`).
5. **Falha Atômica (`404 Not Found`) no Cofre de PDFs Offline (`documentos.qmd`):** Dois dos 8 arquivos listados no array `PDF_URLS` (`regulamento-curso-gestao-publica-ufmg.pdf` e `termo-aceite-orientacao-tcc.pdf`) divergem dos nomes reais em `documentos/` (`regulamento-gestao-publica-ufmg.pdf` e `termo-aceite-orientador-tcc.pdf`), fazendo `cache.addAll(PDF_URLS)` abortar sempre.
6. **Remoção Silenciosa de `viewport-fit=cover` pelo Quarto e `<html lang="en">` em `docs/*.html`:** O pós-processador do Quarto descarta a `<meta name="viewport">` de [`_includes/pwa-meta.html`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-meta.html#L2) (anulando `env(safe-area-inset-*)` e as travas de zoom em todos os HTMLs compilados) e renderiza `<html lang="en">` por ausência de `lang: pt-BR` em [`_quarto.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml).
7. **Colisão Global de `@keyframes cagpDrawerSlide` (`styles.css`):** Definida na linha `4202` como revelação vertical (`translateY(-4px)`) para acordeões/ementas/calculadora e sobrescrita na linha `7680` como slide horizontal (`translateX(100%)`) para o menu mobile, fazendo todas as 95 ementas de disciplinas e gavetas da calculadora entrarem deslizando lateralmente da direita.

---

## 2. Mapeamento Inteligente de Skills & Regra de Arbitragem em 3 Camadas

Para harmonizar o **Neo-Brutalismo Brite/CAGP** com as skills [`impeccable`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md), [`apple-design`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md) e [`m3-expressive`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/SKILL.md), a governança visual e interativa obedece estritamente à **Regra de Arbitragem em 3 Camadas**:

### 2.1. Arquitetura das 3 Camadas e Vetos Cruzados

| Camada Hierárquica | Fonte de Verdade | Domínio Soberano | Regras de Veto (O que esta camada proíbe nas demais) |
| :--- | :--- | :--- | :--- |
| **Camada 1: Pele, Geometria e Marca** *(Soberana)* | [`_brand.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_brand.yml) & [`manual-de-identidade-visual-cagp-ufmg.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_referencias/identidade-visual/manual-de-identidade-visual-cagp-ufmg.md) | • Bordas sólidas `#0A0A0A` (`2px` em botões/chips/inputs; `3px` em cards/modais/barras)<br>• Sombras duras deslocadas (`0px` blur: `2px 2px 0`, `4px 4px 0`, `6px 6px 0 #0A0A0A`)<br>• Cantos retos/contidos (`0px` a `4px`)<br>• Tipografia `Oswald` (títulos/display uppercase) + `Inter` (corpo) + `JetBrains Mono` (códigos/métricas)<br>• Paleta Vinho Candango (`#9E2424`/`#8B1E2D`), Ouro (`#E8A317`), Off-white (`#FBF8F3`) e cores oficiais UFMG | 🚫 **Veta do Apple HIG:** `backdrop-filter: blur()`, Liquid Glass, superfícies translúcidas e cantos arredondados estilo iOS (`12px`–`24px`).<br>🚫 **Veta do M3 Expressive:** Cantos *pill* (`9999px`) em botões/cards, sombras difusas Material e cores pastel dinâmicas fora da paleta CAGP. |
| **Camada 2: Ergonomia, Navegação Espacial e Física** | [`apple-design`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md) (`hig-lookup.md`, `cross-platform.md`, `code-audit.md`) | • **Clarity, Deference, Depth (sem blur):** hierarquia visual clara e elevação por plano sólido + sombra dura<br>• **Safe Areas & Viewport:** `viewport-fit=cover`, `env(safe-area-inset-*)` e `visualViewport` para teclado virtual no Spotlight<br>• **Thumb Zones:** alvos de toque mínimos de `48x48px` (`44pt` HIG / `48dp` M3)<br>• **Shell Nativo:** Top Command Bar (`52px`), Bottom Tab Bar (`60px` + safe-area, máx. 5 abas), Bottom Sheets com *grabber* e Segmented Controls<br>• **Física de Movimento:** curvas de mola `cubic-bezier(0.32, 0.72, 0, 1)` + respeito integral a `prefers-reduced-motion: reduce` | 🚫 Proibido empilhar barras de navegação concorrentes no mesmo viewport.<br>🚫 Proibido exceder 5 itens na Bottom Tab Bar.<br>🚫 Proibido animar abertura de acordeões de conteúdo no eixo horizontal (`translateX`). |
| **Camada 3: Contenção, Densidade e Estados Operacionais** | [`m3-expressive`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/SKILL.md) | • **Hierarquia Tonal de Superfícies (Zero Nested Cards):** degraus tonais (`--cagp-surface-base: #FBF8F3`, `--cagp-surface-card: #FFFFFF`, `--cagp-surface-low: #F4F1EA`, `--cagp-surface-high: #EAE5DC`) e divisores internos em vez de aninhar `.cagp-card` dentro de `.cagp-card`<br>• **Barras de Chips Deslizantes:** `overflow-x: auto; flex-wrap: nowrap; scroll-snap-type: x mandatory` no mobile para filtros<br>• **Estados Operacionais:** barras de progresso com metas claras, *empty states* instrutivos e carimbos (`DEFERIDO`, `TETO`, `TRAVA SIGA`) | 🚫 Proibido aninhar containers com `box-shadow` duro dentro de outros containers com `box-shadow` duro (`nested-cards`).<br>🚫 Proibido criar paredões de filtros com `flex-wrap: wrap` ocupando mais de 2 linhas em telas móveis. |

### 2.2. Roteamento Cirúrgico das 7 Skills Instaladas (`.agents/skills/`)

| Skill | Arquivos de Leitura Obrigatória (Sem Estourar Contexto) | Quando Acionar |
| :--- | :--- | :--- |
| **[`impeccable`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/impeccable/SKILL.md)** | `SKILL.md`, `reference/routing.md` + apenas a referência da tarefa (`audit.md`, `critique.md`, `distill.md`, `polish.md`, `harden.md`, `doctor.md`) | Auditoria de anti-padrões (`impeccable detect`), validação de artefatos (`impeccable doctor`), simplificação de densidade e polimento tipográfico/espacial. |
| **[`apple-design`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/apple-design/SKILL.md)** | `SKILL.md`, `references/hig-lookup.md`, `references/cross-platform.md`, `references/code-audit.md` | Revisão do Shell PWA/Standalone, Topbar, Bottom Tab Bar, Bottom Sheets, Segmented Controls, Spotlight (`visualViewport`) e Safe Areas. |
| **[`m3-expressive`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/m3-expressive/SKILL.md)** | `SKILL.md` (e sob demanda `references/components-core.md`, `references/motion-and-tokens.md`) | Desenho de calculadoras, tabelas regimentais, filtros deslizantes de disciplinas, contenção tonal sem `nested-cards` e indicadores de progresso. |
| **[`quarto-authoring`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/quarto-authoring/SKILL.md)** | `SKILL.md` | Edição de `.qmd`, `_quarto.yml`, blocos Pandoc `:::`, callouts e pipeline de renderização `quarto render`. |
| **[`brand-yml`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/brand-yml/SKILL.md)** | `SKILL.md` | Manutenção e sincronização de tokens de marca em `_brand.yml` com `_variables.scss` e `DESIGN.md`. |
| **[`alt-text`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/alt-text/SKILL.md)** | `SKILL.md` | Auditoria e redação de `alt` / `fig-alt` / `aria-label` para emblemas, SVGs cartográficos e prints anotados de formulários. |
| **[`playwright-core`](file:///home/gsathler/Nextcloud/Projects/cagp/.agents/skills/playwright-core/SKILL.md)** | `SKILL.md` | Testes E2E de navegação SPA, ausência de overflow em `320px`/`375px`/`768px`/`1440px`, persistência no `localStorage` e acessibilidade. |

---

## 3. Auditoria Forense de Código (JS, Roteador SPA, Cofre Offline e PWA)

### 3.1. Tabela Consolidada de Bugs Críticos de JavaScript & PWA

| ID | Severidade | Arquivo e Linhas | Descrição Técnica do Bug e Impacto no Usuário | Solução Arquitetural Recomendada |
| :--- | :---: | :--- | :--- | :--- |
| **JS-01** | **CRÍTICA** | [`_includes/super-app-router.html:240-274`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L240-L274)<br>[`_includes/super-app-header.html:288-370`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L288-L370) | **Duplicação de Listeners no Header + Re-disparo Global de `DOMContentLoaded` e `load`:**<br>1. O Quarto injeta `super-app-header.html` (incluindo sua tag `<script>`) dentro de `<main class="content">`. No swap SPA, `super-app-router.html` remove `#cagp-superapp-header` de `newMain`, mas **mantém a tag `<script>` do header dentro de `newMain`**.<br>2. `executePageScripts(currentMain)` re-executa o script do header a cada navegação, anexando novo `addEventListener('click', ...)` nos botões `.cagp-island-dropdown-btn` do header persistente. Na 1ª navegação SPA, clicar em *"Jornada Acadêmica"*, *"Acervo & Ajuda"* ou *"O CAGP"* executa 2 listeners seguidos (o 1º abre `.is-open` e o 2º fecha no mesmo microssegundo!), **travando os dropdowns no desktop**.<br>3. As linhas `271-272` disparam `document.dispatchEvent(new Event('DOMContentLoaded'))` e `window.dispatchEvent(new Event('load'))`, re-executando todos os listeners acumulados das páginas já visitadas, multiplicando `hashchange` (`index.qmd:570`) e re-registrando o Service Worker (`pwa-install.html:266`). | 1. Adicionar guarda de idempotência `if (window.__cagpHeaderInitialized) return; window.__cagpHeaderInitialized = true;` no script do header (ou marcar `<script data-cagp-once="true">`).<br>2. **Remover imediatamente** `document.dispatchEvent(new Event('DOMContentLoaded'))` e `window.dispatchEvent(new Event('load'))` de `super-app-router.html`.<br>3. Nos scripts das páginas `.qmd`, substituir `document.addEventListener('DOMContentLoaded', init)` por uma função imediata que também escuta `cagp:navigated` (ou que roda diretamente via `executePageScripts(currentMain)` quando `document.readyState !== 'loading'`). |
| **JS-02** | **CRÍTICA** | [`_includes/super-app-router.html:273`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L273) | **Alvo Incompatível do Evento `cagp:navigated` (`document` vs `window`):**<br>O router dispara `document.dispatchEvent(new CustomEvent('cagp:navigated', { detail: { url: targetUrl } }))` sem `bubbles: true`. Porém, [`super-app-header.html:441`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-header.html#L441), [`pwa-install.html:631`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L631) e [`spotlight-search.html:439`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/spotlight-search.html#L439) escutam em `window.addEventListener('cagp:navigated', ...)`. O evento nunca chega a `window`. | Disparar `new CustomEvent('cagp:navigated', { bubbles: true, detail: { url: targetUrl } })` tanto em `document` (que com `bubbles: true` sobe para `window`) quanto diretamente se necessário. |
| **JS-03** | **CRÍTICA** | [`_includes/pwa-install.html:351-390, 607-618`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L351-L390)<br>[`acg.qmd:1174`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L1174)<br>[`calouros.qmd:192`](file:///home/gsathler/Nextcloud/Projects/cagp/calouros.qmd#L192)<br>[`percurso.qmd:2304`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd#L2304) | **"Meu Cofre Acadêmico" 100% Quebrado (Chaves Divergentes no `localStorage`):**<br>• **Horas AAC:** `pwa-install.html` lê `cagp_acg_total_horas`, mas `acg.qmd` grava um JSON de categorias em `cagp_calc_ext_aac_v1`.<br>• **Checklist Calouro:** `pwa-install.html` lê `cagp_calouros_checklist`, mas `calouros.qmd` grava um array de IDs em `cagp_calouro_checklist_v1`.<br>• **Percurso Simulado:** `pwa-install.html` lê `cagp_percurso_quiz_resultado`, mas `percurso.qmd` **não salva nada no `localStorage`**.<br>• **Limpar Cofre (`#cagp-clear-vault-btn`):** remove apenas as chaves erradas, não limpando `cagp_calc_ext_aac_v1` nem `cagp_calouro_checklist_v1`. | Sincronizar `refreshVaultData()` e `#cagp-clear-vault-btn` em `pwa-install.html` para ler/limpar `cagp_calc_ext_aac_v1` (somando `ext` até 300h + `aac` até 300h), `cagp_calouro_checklist_v1` e `cagp_percurso_quiz_v1` (adicionando `localStorage.setItem('cagp_percurso_quiz_v1', topChoice)` em `percurso.qmd`). |
| **JS-04** | **CRÍTICA** | [`documentos.qmd:99-120`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd#L99-L120) | **Falha Atômica (`404`) no Botão "Baixar Acervo Completo Offline" (8 PDFs):**<br>Na linha 101, `PDF_URLS` pede `'documentos/regulamento-curso-gestao-publica-ufmg.pdf'` (o arquivo real é `'documentos/regulamento-gestao-publica-ufmg.pdf'`) e na linha 107 pede `'documentos/termo-aceite-orientacao-tcc.pdf'` (o arquivo real é `'documentos/termo-aceite-orientador-tcc.pdf'`). Como `cache.addAll(PDF_URLS)` falha se qualquer URL retornar 404, o download offline falha 100% das vezes. | Corrigir os 2 caminhos em `PDF_URLS` de `documentos.qmd` para `'documentos/regulamento-gestao-publica-ufmg.pdf'` e `'documentos/termo-aceite-orientador-tcc.pdf'`. |
| **JS-05** | **MÉDIA** | [`_includes/pwa-install.html:277-283`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-install.html#L277-L283)<br>[`_includes/spotlight-search.html:373, 406-439`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/spotlight-search.html#L373)<br>[`_includes/super-app-router.html:166-176`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/super-app-router.html#L166-L176) | **APIs e Seletores Defasados entre Ciclos:**<br>• `pwa-install.html:277` mapeia IDs antigos (`cagp-mnav-acg`, `cagp-mnav-faq`) e ignora `documentos.html`, `gestao.html` e `sobre.html`.<br>• `spotlight-search.html:373` chama `window.cagpNavigate` (inexistente; o correto é `window.cagpRouter.navigate`) e tenta injetar botão na `.navbar` morta do Quarto (`injectNavbarSearchButton`).<br>• `super-app-router.html:166` verifica `document.body.classList.contains('cagp-dyslexia')`, mas `accessibility.html` usa `document.documentElement.getAttribute('data-a11y-dyslexia')`.<br>• `back-to-top.html:22` e `pwa-install.html:245` duplicam o listener global de `[data-copy]`. | Unificar chamadas para `window.cagpRouter.navigate`, remover `injectNavbarSearchButton`, remover listener duplicado de `[data-copy]` em `pwa-install.html` e alinhar os IDs da `#cagp-mobile-nav`. |
| **JS-06** | **MÉDIA** | [`sw.js:1-106`](file:///home/gsathler/Nextcloud/Projects/cagp/sw.js#L1-L106) | **Cache Stale-While-Revalidate Retendo CSS Antigo:**<br>`CACHE_NAME = 'cagp-pwa-v1'` serve `styles.css` do cache antes de atualizar em segundo plano. Sem versionamento de `CACHE_NAME`, usuários recorrentes veem estilos defasados após novos deploys. | Atualizar `CACHE_NAME` a cada release estrutural (ex.: `'cagp-pwa-v2'`) e usar *Network-First* (ou cache-busting) para `styles.css` quando online. |

---

## 4. Auditoria Forense de Mobile, Viewport, Safe Areas e Acessibilidade (`docs/*.html`)

1. **Descarte Silencioso da Meta Tag `viewport` pelo Quarto (`docs/*.html`):**
   - **Evidência:** [`_includes/pwa-meta.html:2`](file:///home/gsathler/Nextcloud/Projects/cagp/_includes/pwa-meta.html#L2) declara `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">`. Contudo, na compilação de todos os 11 arquivos em `docs/*.html` (linha 7), o Quarto remove a segunda meta tag `viewport` e mantém apenas `<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">`.
   - **Consequência:** `viewport-fit=cover` **não existe no HTML final entregue ao navegador**, fazendo `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` retornarem `0px` em aparelhos iOS/Android e anulando o bloqueio de zoom acidental no modo WebApp!
   - **Correção:** Em `_includes/pwa-meta.html`, adicionar um micro-script síncrono de `<head>` que localiza `document.querySelector('meta[name="viewport"]')` e atualiza seu atributo `content` para incluir `viewport-fit=cover` (e `maximum-scale=1.0, user-scalable=no` quando em modo standalone/mobile).
2. **Violação WCAG 3.1.1 — Idioma da Página Definido como Inglês (`lang="en"`):**
   - **Evidência:** Na linha 2 de todos os arquivos `docs/*.html`, consta `<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">` e strings em inglês no JSON de busca (`"No results"`, `"Search"`).
   - **Causa:** Falta a chave `lang: pt-BR` no topo de [`_quarto.yml`](file:///home/gsathler/Nextcloud/Projects/cagp/_quarto.yml).
3. **Inputs com `font-size < 16px` Fora da Media Query Mobile:**
   - `.cagp-sitemap-input` ([`styles.css:3837`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L3837)) define `font-size: 0.95rem` (`15.2px`) e `#aac-table-search` ([`acg.qmd:751`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd#L751)) usa `.input-group-sm .form-control` (`14px`). Em tablets/iPads (`>= 768px`), não são cobertos pela regra de `@media (max-width: 767.98px)` da linha `5601`, podendo disparar zoom automático ao focar. Todos os inputs (`input`, `select`, `textarea`) devem ter `font-size: max(16px, 1rem)` em qualquer viewport.

---

## 5. Auditoria Forense de CSS (`styles.css` — 8.581 linhas, 525 `!important`)

### 5.1. Colisões Diretas de Seletores e Keyframes entre os 53 Ciclos

1. **Colisão Crítica de `@keyframes cagpDrawerSlide`:**
   - [`styles.css:4202`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L4202): `@keyframes cagpDrawerSlide { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }` — usada por `.cagp-discipline[open] .cagp-discipline-body` (linha 4199), `.cagp-calc-drawer.is-open` (linha 5801), `.cagp-quiz-step.is-active` (linha 5871) e `.cagp-grafo-detail` (linha 6178).
   - [`styles.css:7680`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L7680): `@keyframes cagpDrawerSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }` — declarada no Ciclo 49 para `.cagp-mobile-drawer-panel`.
   - **Efeito Colateral:** Como o CSS aplica a última regra `@keyframes` de mesmo nome, abrir qualquer ementa nas páginas `percurso.html` ou gaveta em `acg.html` faz o conteúdo entrar deslizando da borda direita (`translateX(100%)`)!
2. **Sobrescrita de `.cagp-bg-*` (Ciclo 47 vs Ciclo 49):**
   - [`styles.css:6493-6498`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L6493-L6498) define `.cagp-bg-gold`, `.cagp-bg-bordeaux`, `.cagp-bg-blue`, `.cagp-bg-green`, `.cagp-bg-charcoal`, `.cagp-bg-sand` como tons pastel suaves.
   - [`styles.css:7878-7906`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L7878-L7906) sobrescreve as mesmas classes com fundos sólidos escuros e `color: #FFFFFF !important`, exigindo re-sobrescritas específicas em `.cagp-pocket-icon-wrap.cagp-bg-*` (`7204-7217`) e `.cagp-microapp-icon-badge.cagp-bg-*` (`8514-8527`).
3. **Colisão em `.cagp-video-play-btn` e `.cagp-nav-search-*`:**
   - `.cagp-video-play-btn` na linha `2767` é um botão circular centralizado (`border-radius: 50%`, `position: absolute`, `transform: translate(-50%, -50%)`), mas na linha `3461` é redefinido com `border-radius: var(--cagp-radius-sm)`, `margin-bottom: 0.5rem` e `:hover { transform: scale(1.08); }` (que destrói o `translate(-50%, -50%)` quando usado em posicionamento absoluto!).
   - `.cagp-nav-search-btn` e sub-elementos aparecem duplicados nas linhas `6222-6282`, `7512-7551` e `7626-7636`.
4. **Código Morto da `.navbar` Nativa do Quarto:**
   - Mais de 200 linhas em `_variables.scss` e `styles.css` (`183-255`, `1645-1671`, `4960-4975`, `6834-6866`) estilizam `.navbar`, `.navbar-brand` e `.navbar-nav`, que foram desativados e ocultados pelo `#cagp-superapp-header`.

### 5.2. Guerra e Inversão de `z-index`

| Camada Atual | Valor `z-index` | Seletores em `styles.css` | Diagnóstico Forense |
| :--- | :---: | :--- | :--- |
| Bottom Nav Web / Banner | `1030` | `.cagp-mobile-nav`, `.cagp-chapa-banner` | OK |
| Header / Announcement / FABs | `1040` | `#quarto-announcement`, `.cagp-superapp-header`, `.cagp-back-to-top`, `.cagp-a11y-trigger` | Colisão de mesmo nível entre header fixo e botões flutuantes |
| Topbar / Tabbar Standalone | `1045` | `.cagp-pwa-banner`, `.cagp-superapp-topbar`, `.cagp-superapp-tabbar` | OK |
| Dropdowns & A11y Backdrop | `1050` | `.cagp-island-dropdown-menu`, `.cagp-a11y-backdrop` | **BUG:** O backdrop (`1050`) fica abaixo do Launcher (`10000`) e do Mobile Drawer (`10050`) |
| Painéis A11y, Ajustes & iOS Sheet | `1055` | `.cagp-a11y-panel` (inclui `#cagp-settings-sheet` e `#cagp-ios-sheet`) | **BUG CRÍTICO:** Se o usuário abrir Ajustes/Cofre (`1055`) ou Guia iOS (`1055`) a partir do Launcher (`10000`) ou Mobile Drawer (`10050`), **o painel abre invisível atrás do modal!** |
| App Launcher Modal | `10000` | `.cagp-launcher-modal` | Desproporcional à escala `1030–1055` |
| Spotlight & Mobile Drawer | `10050` / `10051` | `.cagp-spotlight-modal`, `.cagp-mobile-drawer`, `.cagp-spotlight-dialog` | Empate exato (`10050`) entre Spotlight e Mobile Drawer |
| Régua, Skip Links, Toast, Progress | `99998` a `9999999` | `.cagp-reading-ruler`, `.cagp-skip-link`, `.cagp-toast`, `.cagp-reading-progress` | Inflação extrema de `z-index` |

### 5.3. Colisões entre Modo Web e Modo Standalone (`html.cagp-is-standalone`)

1. **Banner de Campanha Visível no Modo Standalone:** [`styles.css:8347`](file:///home/gsathler/Nextcloud/Projects/cagp/styles.css#L8347) oculta `#cagp-chapa-banner`, mas o Quarto renderiza o aviso no elemento `#quarto-announcement` (que possui `display: flex !important` na linha `1261`). Resultado: no app instalado, o banner vermelho continua aparecendo acima da Topbar nativa.
2. **Duplicação de Hubs na Home (`index.qmd`):** `.cagp-mobile-superapp-hub` tem `display: block` tanto no mobile quanto no desktop (`styles.css:6881`), e no modo Standalone coexiste com `#micro-apps-hub.cagp-superapp-only` logo abaixo, exibindo dois catálogos de ferramentas quase idênticos na mesma tela.

---

## 6. Diagnóstico de UI/UX e Disposição das 11 Páginas (`*.qmd`)

1. **[`index.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/index.qmd) (Início / Hub):**
   - Excesso de seções de roteamento empilhadas (7 blocos concorrentes: Hub de Bolso, Hero Institucional, Bússola de 4 Perfis, Catálogo de 8 Micro-Apps em Standalone, Vitrine dos 6 Eixos, Vídeo, Central de 6 Sistemas UFMG e Representação Tripartite).
   - O Cofre Acadêmico na Home (`#cagp-hub-vault-*`) exibe permanentemente zeros devido ao Bug JS-03.
2. **[`curso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/curso.qmd) (O Curso):**
   - A seção `#grupos-pesquisa` (11 núcleos do DCP) renderiza 11 cards extensos sem filtro rápido por eixo temático, gerando alta fadiga de rolagem em telas móveis.
   - Duplicação integral da composição do Colegiado e NDE com `sobre.qmd`.
3. **[`calouros.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/calouros.qmd) (Guia do Calouro):**
   - Tripla barra de navegação inicial (Breadcrumb + Hero + `.cagp-subnav` com 7 pills empilhados + TOC lateral).
   - Checklist interativo dos 30 dias não sincroniza com o Cofre do Super App (`cagp_calouro_checklist_v1` vs `cagp_calouros_checklist`).
4. **[`percurso.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/percurso.qmd) (Percurso Curricular & Ementas):**
   - **Redundância Tripla na Escolha de Percurso (`#simulador-percurso`):** Apresenta em sequência imediata o *"Termômetro Vocacional em 3 Cliques"*, a *"Árvore de Decisão (Qual dos 3 percursos é melhor para você?)"* e a *Tabela Comparativa dos 3 Percursos*.
   - **Paredão de Chips no Mobile:** No explorador da grade (`#explorador-grade`), os 5 botões de departamento + 11 botões de período com `flex-wrap: wrap` ocupam 4 a 5 linhas verticais antes do primeiro resultado (violando a Camada 3 — M3 Expressive, que exige barra horizontal deslizante).
   - **Slide Horizontal Acidental:** Abrir qualquer uma das 27 obrigatórias ou 68 optativas aciona `translateX(100%)` devido à colisão de `@keyframes cagpDrawerSlide`.
5. **[`acg.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/acg.qmd) (Extensão & Horas AAC):**
   - **Aninhamento Excessivo (`nested-cards`):** `.cagp-tool-box` > `.cagp-compass-panel.cagp-panel-boxed` > `.cagp-calc-row` > `.cagp-calc-drawer` > `.cagp-drawer-section`, gerando 4 níveis de bordas em telas de `320px`–`375px`.
   - **Duplicação de Explicações:** As regras de cada modalidade já estão detalhadas dentro das gavetas *"O que conta nisso?"* da calculadora, mas são repetidas logo abaixo em dois cards longos + tabela.
6. **[`estagio-tcc.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/estagio-tcc.qmd) (Estágio & TCC):**
   - Simulador do Art. 41 e guia visual do TCE são excelentes, mas os cards de passos do tutorial anotado sofrem com aninhamento de bordas e subnav empilhada no mobile.
7. **[`documentos.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/documentos.qmd) (Documentos & Formulários):**
   - Botão *"Baixar Acervo Completo Offline"* falha com erro 404 (Bug JS-04).
   - Quatro blocos de controle antes do primeiro documento (Cofre Offline + Busca Global + Subnav + Grid de 8 PDFs).
8. **[`faq.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/faq.qmd) (Dúvidas Frequentes):**
   - A seção de Acessibilidade Digital (`#acessibilidade`) está acoplada ao final do FAQ regimental, competindo com o painel nativo de acessibilidade do Super App.
9. **[`sobre.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/sobre.qmd) (O Centro Acadêmico):**
   - Falta o *Segmented Control* no topo para alternar simetricamente com `gestao.qmd` (`O Centro Acadêmico` <-> `A Gestão em Exercício`).
10. **[`gestao.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/gestao.qmd) (Gestão em Exercício):**
    - O *Segmented Control* (`#cagp-tab-gestao` / `#cagp-tab-sobre`) está posicionado **abaixo** do Hero de "Gestão em Exercício"; ao alternar para a aba *"O Centro Acadêmico"*, o título principal da página continua exibindo *"GESTÃO EM EXERCÍCIO & NOSSA EQUIPE"*.
11. **[`mapa-do-site.qmd`](file:///home/gsathler/Nextcloud/Projects/cagp/mapa-do-site.qmd) (Mapa do Site):**
    - Input `#sitemap-search-input` com `font-size: 0.95rem` (`15.2px`) fora da trava global de `16px`.

---

## 7. Roteiro Estruturado para as Próximas Fases (Pós-Fase 1)

1. **Fase 2 — Saneamento da Infraestrutura (JS, Router SPA, PWA, Viewport & CSS):**
   - Adicionar `lang: pt-BR` em `_quarto.yml` e script síncrono de `viewport-fit=cover` em `_includes/pwa-meta.html`.
   - Blindar `_includes/super-app-header.html` contra re-execução e refatorar `_includes/super-app-router.html` (remover `DOMContentLoaded`/`load` sintéticos, adicionar `{ bubbles: true }` em `cagp:navigated`).
   - Sincronizar as 3 chaves do Cofre Offline em `_includes/pwa-install.html` e `percurso.qmd`, e corrigir os 2 nomes de PDFs em `documentos.qmd`.
   - Separar `@keyframes cagpDrawerSlide` (vertical) de `@keyframes cagpOffcanvasSlide` (horizontal), unificar a escala de `z-index` em 10 níveis sem inversão e ocultar `#quarto-announcement` em `html.cagp-is-standalone`.
2. **Fase 3 — Refinamento de UI/UX nas 11 Páginas (`.qmd`):**
   - Aplicar a Regra de Arbitragem em 3 Camadas: barras de chips deslizantes no mobile (`m3-expressive`), eliminação de `nested-cards` via superfícies tonais, consolidação de ferramentas duplicadas em `index.qmd` e `percurso.qmd`, e simetria entre `sobre.qmd` e `gestao.qmd`.
3. **Fase 4 — Verificação Automatizada (`playwright-core` + `impeccable` + `quarto render`):**
   - Validação de build limpo em `docs/` e testes em `320px`, `375px`, `768px` e `1440px`.
