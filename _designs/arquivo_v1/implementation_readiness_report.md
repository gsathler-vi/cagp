# Relatório Consolidado de Prontidão de Implementação (Stage 9) — Super App CAGP UFMG

* **Documento Auditado:** [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md) (Linhas 359 a 516: "Detailed Implementation Plan")
* **Padrão de Conformidade:** [implementation-readiness-standard.md](file:///home/gsathler/.gemini/config/plugins/egm/resources/document_standards/implementation-readiness-standard.md)
* **Revisores:**
  - `egm-implementation-readiness` (Tech Lead — Zero-Decisão e Fases)
  - `egm-codebase-details` (Auditor de Código — Fidelidade Linha a Linha ao Repositório)
  - `egm-style` (Editor Técnico de Estilo — Clareza Imperativa e Eliminação de Fluff)
* **Data:** 2026-10-29
* **Status:** ✅ **RESOLVIDO & APROVADO (PASS — CONFORME AO PADRÃO DE ZERO-DECISÃO)**

---

## 1. Visão Geral e Veredito Executivo

A seção "Detailed Implementation Plan" cobre com precisão os objetivos da modernização e o roteiro arquitetural. Contudo, sob o padrão formal de **Prontidão de Implementação**, o plano transfere decisões de codificação, marcação HTML, assinaturas de funções e regras de CSS para o implementador, e omite a divisão em Fases Lógicas & Checkpoints Incrementais.

Para garantir que a implementação seja **100% determinística na primeira tentativa (First-Time Right)**, os três revisores identificaram e forneceram as soluções exatas para sanar os apontamentos antes da autorização do código de produção.

---

## 2. Consolidação de Achados por Gravidade

### 🔴 Blockers (Quebra da Regra de Zero-Decisão e Ambiguidade Técnica)

1. **[IR-B1] Ausência de Fases e Checkpoints Incrementais:**
   - *Descrição:* O plano lista 13 arquivos e salta diretamente para a verificação. O padrão exige particionamento em fases lógicas onde o código permaneça compilável (`quarto render` com exit code 0) a cada etapa.
   - *Correção:* Estruturar em 4 Fases: Fase 1 (Tokens & Estilos Base), Fase 2 (Casca Global, Taxonomia & PWA), Fase 3 (Workspaces, Dobra & Descontinuação do Espelho), Fase 4 (Testes Automatizados).

2. **[IR-B2] Especificação Nominal e Código de `window.CAGP_TAXONOMY_V1`:**
   - *Descrição:* O plano prescreve o consumo de `window.CAGP_TAXONOMY_V1 || DEFAULT_FALLBACK_TAXONOMY`, mas não fornece o objeto JavaScript congelado nem o fallback.
   - *Correção:* Inserir o snippet JS exato mapeando os 5 eixos canônicos e as 14 rotas ativas (mais a rota-ponte legada `estagio-tcc.html`).

3. **[CD-B1 / IR-M1] Atribuição Incorreta do Arquivo de `ROUTE_PATH_LABELS`:**
   - *Descrição:* O plano instrui refatorar `ROUTE_PATH_LABELS` em `_includes/super-app-router.html`. Porém, no repositório real, esse objeto reside em `_includes/super-app-header.html#L938-L955`.
   - *Correção:* Mover a especificação de refatoração de `ROUTE_PATH_LABELS` para o escopo de `_includes/super-app-header.html`.

4. **[IR-B3 / ST-B4] Indefinição do Algoritmo CRC32 e Confirmação do Clear Vault:**
   - *Descrição:* O plano cita CRC32 em JS vanilla sem definir o algoritmo (IEEE 802.3 `0xEDB88320`) nem se incide sobre Base64 ou JSON. O fluxo de confirmação em 2 toques do `#cagp-clear-vault-btn` não possui código de máquina de estados.
   - *Correção:* Fornecer a função pura de CRC32 sobre a string Base64 e o snippet com temporizador de 4 segundos para confirmação.

5. **[IR-B4] Omissão de Markup HTML e Atualização JS do HUD Linear de 64px em `acg.qmd`:**
   - *Descrição:* A remoção do painel antigo (`#cagp-hours-bank-dashboard`) sem fornecer o markup do novo HUD de 64px e os ajustes na função `render()` quebraria a reatividade do cálculo de 600h.
   - *Correção:* Fornecer a estrutura HTML exata com IDs `#hud-ext-bar`, `#hud-aac-bar`, `#hud-ext-val`, `#hud-aac-val` e o bloco de código correspondente na função `render()`.

6. **[IR-B5] Regras de CSS do Controle Segmentado e `data-label-short` Incompletas em `styles.css`:**
   - *Descrição:* Não resetava `overflow-x: auto` e `flex-wrap: nowrap` de `.cagp-workspace-tabs` (linhas 9906–9917), mantendo o transbordamento. O chaveamento de `data-label-short` não possuía suporte semântico em CSS.
   - *Correção:* Fornecer as regras de CSS em Grid de 3 colunas e markup com classes `.cagp-tab-label-full` / `.cagp-tab-label-short`.

7. **[IR-B6] Premissa Factual Incorreta de Timeout em `sw.js` e Incremento de Versão:**
   - *Descrição:* O plano cita substituição de timeout de 3500ms por 1500ms, mas o código atual não possui timeout. O incremento da versão de cache para `cagp-pwa-v5` foi omitido.
   - *Correção:* Fornecer o bloco exato de Network-First com `AbortController(1500)` e declarar a alteração para `CACHE_NAME = 'cagp-pwa-v5'`.

8. **[ST-B1] Ambiguidade na Definição de Token Primário em `_brand.yml`:**
   - *Descrição:* O uso de `#8B1E2D / #9E2424` transfere decisão cromática ao programador.
   - *Correção:* Fixar nominalmente `primary: '#8B1E2D'` (ou `#9E2424`), `success: '#15803D'` e `warning: '#B45309'`.

9. **[ST-B2] Instrução Vaga de Borda em `_variables.scss`:**
   - *Descrição:* Expressão "componentes genéricos" é ambígua.
   - *Correção:* Especificar alteração na variável global `--#{$prefix}border-width: 1px` e seletores concretos (`.table`, `.navbar`, `.nav-pills .nav-link`).

10. **[ST-B3] Inversão Lógica no Estado do Botão de Anúncio:**
    - *Descrição:* O banner compacto (36px) não pode exibir `[COMPACTAR ▲]`.
    - *Correção:* Iniciar compacto com rótulo `[EXPANDIR ▼]` e alternar para `[COMPACTAR ▲]` ao expandir.

---

### 🟡 Majors (Precisão de Código e Execução)

1. **[CD-M1 / ST-B5] IDs DOM Desalinhados em `documentos.qmd`:**
   - Corrigir referências: substituir `#cagp-vault-sync-pill` e `#cagp-vault-status-indicator` pelos alvos reais das linhas 834–863 (`#cagp-offline-vault-badge` vs `#cagp-vault-status-badge`, `#cagp-btn-cache-pdfs` vs `#btn-cache-all-docs`, e criação do nó `#cagp-offline-pdf-status`). Fornecer o HTML exato da faixa de 44px.
2. **[CD-M2 / ST-M5] Cinemática de Sombra e `transform` em `_variables.scss`:**
   - Ao reduzir a sombra de `3px 3px` para `2px 2px 0 #0A0A0A`, ajustar simultaneamente `transform: translate(-2px, -2px)` e `:hover { transform: translate(-1px, -1px); }`.
3. **[IR-M3 / ST-M3] Especificação Concreta do Bento Grid em `index.qmd`:**
   - Substituir a menção ao arquivo de foto `1000361583.jpg` por classes Bootstrap concretas (`row g-2 g-md-3`, `col-6 col-md-4 col-lg-2-4`) e documentar que a faixa `.cagp-axis-pill-strip` é injetada dinamicamente pelo header.
4. **[IR-M4] Ambiente de Execução do Playwright:**
   - Declarar dependências de desenvolvimento mínimas em `package.json` (`@playwright/test`, `@axe-core/playwright`) e comando exato `npx playwright test tests/playwright_audit.spec.mjs`.
5. **[ST-M10] Sincronização Bidirecional de Hash na URL:**
   - Especificar tanto UI ➔ Hash (`history.replaceState`) quanto Hash ➔ UI (leitura de `location.hash` no `DOMContentLoaded` e `popstate`).
6. **[ST-M15] Asserção DOM no Teste Playwright em Vez de Parsing de PDF Binário:**
   - Substituir a asserção sobre o buffer de `page.pdf()` por asserção no DOM sob `emulateMedia({ media: 'print' })`: `expect(page.locator('#cagp-n20229-print-sheet')).toHaveCount(0)`.

---

### 🟢 Nits (Polimento e Convenções)

1. Padronizar link de `tests/playwright_audit.spec.mjs` na tabela.
2. Preservar atributos ARIA (`role="tabpanel"`, `aria-labelledby`) nas Fenced Divs de `acg.qmd`.
3. Fornecer os seletores CSS exatos para ocultação em `@media print`.
4. Higienizar estilo textual: converter descrições para verbos imperativos no infinitivo e remover emojis do corpo da especificação.

---

## 3. Resolução Aplicada e Status de Aprovação

Todas as correções especificadas pelos três revisores foram aplicadas integralmente na seção `## Detailed Implementation Plan` de [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md):
1. **Estrutura de Fases 1 a 4:** Implementada com diagrama Mermaid e checkpoints de compilação/teste com critérios de saída estritos.
2. **Injeção de Código Canônico Determinístico:** Adicionados os snippets completos para `window.CAGP_TAXONOMY_V1`, algoritmo puro de CRC32 (IEEE 802.3 `0xEDB88320`), máquina de estados de confirmação em 4s do Clear Vault, markup e lógica reativa do HUD linear de 64px, faixa de 44px de status offline, reset de CSS Grid no Controle Segmentado e Network-First com `AbortController(1500)`.
3. **Alinhamento com a Base de Código Real:** Corrigida a localização de `ROUTE_PATH_LABELS` para `super-app-header.html`, sanados os IDs reais de `documentos.qmd` e sincronizada a cinemática de `transform` e sombra em `_variables.scss`.
4. **Higienização de Estilo e Asserções E2E:** Todos os passos foram convertidos para verbos imperativos no infinitivo e as asserções Playwright foram calibradas para inspeção do DOM sob mídia impressa.

**Resultado:** O documento atende 100% ao *Implementation Readiness Standard* com **Zero Decisões Pendentes** para o implementador.
