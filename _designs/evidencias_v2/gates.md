# Registro Formal de Gates de Aprovação — Super App CAGP UFMG

**Documento Operacional:** [`AGENTS.md`](file:///home/gsathler/Nextcloud/Projects/cagp/AGENTS.md)  
**Branch Ativo:** `plano-v2-execucao`  
**Data de Início:** 2026-10-29

---

## Tabela de Gates e Status de Homologação

| Gate | Fase | Requisitos Canônicos | Evidências Arquivadas | Status | Aprovador | Data |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| **G0** | **Fase 0** | 1. Snapshot git de proteção criado.<br>2. `passo0.sh` exit 0 (55 caminhos de skills válidos).<br>3. `check_fatos.sh` exit 0 (149 fatos preservados).<br>4. `quarto render` exit 0.<br>5. Remoção de `tests/` e `docs/tests/`.<br>6. Teste de capacidades documentado.<br>7. Ledger inicial registrado.<br>8. Camada A (60 células de baseline) registrada. | • `_designs/evidencias_v2/fase0/git_status.txt`<br>• `_designs/evidencias_v2/fase0/capacidades.md`<br>• `_designs/evidencias_v2/fase0/ledger.md`<br>• `_designs/evidencias_v2/fase0/findings.jsonl`<br>• `_designs/evidencias_v2/matriz_celulas.csv` | **APROVADO** | Gestão CAGP | 2026-10-29 |
| **G1** | **Fase 1** | Camada A das rotas `acg`, `calouros` e `estagio` auditadas; M1, M2, M4, M5, M7 aprovados; M8 `<= 4`; protótipo interativo gerado; barras migradas nos 14 `.qmd`. | • `_designs/evidencias_v2/fase1/prototipo_segmented_control.html`<br>• `_designs/evidencias_v2/fase1/findings.jsonl` | **APROVADO** | Gestão CAGP | 2026-10-29 |
| **G2** | **Fase 2** | Casca global unificada nos 5 Eixos; router SPA blindado (M6 = 0); backup CRC32 validado (cbf43926); 2 toques no clear; Service Worker `cagp-pwa-v6` com cold-offline e timeout de 1500ms aprovados. | • `_designs/evidencias_v2/test_phase2_gate.js`<br>• `_designs/evidencias_v2/fase2/findings.jsonl` | **APROVADO** | Gestão CAGP | 2026-10-29 |
| **G3a** | Fase 3a | 60 células da Camada C (`index`, `acg`, `documentos`, `percurso`) auditadas; metas de 1ª dobra atendidas; zero vestígios do espelho N-20229. | *Pendente Fase 3a* | *Em Espera* | — | — |
| **G3b** | Fase 3b | Camada A das 11 rotas restantes + Camada B completa auditadas; 9 PDFs consistentes; zero supressão factual (`check_fatos.sh` exit 0). | *Pendente Fase 3b* | *Em Espera* | — | — |
| **G4** | Fase 4 | Matriz global completa (152 células); `passo0.sh` exit 0; `docs/` limpo; checklist humano (Anexo C) 100% aprovado; relatório final HTML gerado. | *Pendente Fase 4* | *Em Espera* | — | — |

---

## Log de Emissão do Gate G0 (Fase 0)

- **Snapshot Git:** Criado com sucesso no branch `plano-v2-execucao` (commit `9847f40`).
- **Validação de Skills:** `bash _designs/evidencias_v2/passo0.sh` executado com código de saída 0 (55 caminhos em `AGENTS.md` validados no disco).
- **Integridade Factual:** `bash _designs/evidencias_v2/check_fatos.sh` executado com código de saída 0 (149 fatos preservados).
- **Build Quarto:** `quarto render` executado em todos os 15 documentos `.qmd` com código de saída 0.
- **Higienização de Testes:** Diretórios legados `tests/` e `docs/tests/` removidos.
- **Homologação:** **GATE G0 HOMOLOGADO COM SUCESSO.** Pronto para início da Fase 1.

---

## Log de Emissão do Gate G1 (Fase 1)

- **Fundação Estilística e Tokens:** Paleta oficial `#8B1E2D` (Borgonha) e `#9E2424` (Candango), tipografias `Oswald`/`Inter`/`JetBrains Mono` conferidas em `_brand.yml` e `_variables.scss`.
- **Contrato CSS Unificado (`styles.css`):**
  - Controle Segmentado implementado com CSS Grid por N (`data-tab-count="2|3|4"`) sem `:has()`.
  - Abas inativas redefinidas para `1px solid #DFDBD2` sem sombra; aba ativa com `2px solid #0A0A0A` e sombra dura `2px 2px 0 #0A0A0A`.
  - Seletores mortos de `data-a11y-font-scale` substituídos por `data-a11y-font="lg|xl"`.
  - `@media print` limpa implementada com classe informativa `.cagp-print-hint`.
  - Alvos de toque conhecidos corrigidos para `>= 44×44px` (`.cagp-header-live-btn`, `.cagp-action-chip`, abas e botões de comando).
- **Migração Mecânica dos 14 Arquivos `.qmd`:**
  - Injetado `data-tab-count="N"` em todos os decks de abas.
  - Injetados rótulos duplos (`<span class="cagp-tab-label-full">` e `<span class="cagp-tab-label-short">`).
  - IDs canônicos `id="ws-tab-vN"`, `aria-controls="ws-panel-vN"` e `tabindex="-1"` (com `tabindex="0"` na aba ativa).
  - Botão "Ver Tudo" extraído para fora do `tablist` com classe `.cagp-workspace-viewall`, `aria-pressed="false"` e `data-ws-hash="#visao-completa"`.
  - Painéis identificados com `id="ws-panel-vN"` e `role="tabpanel"`.
- **Protótipo Interativo (/generative_ui):** Gerado em `_designs/evidencias_v2/fase1/prototipo_segmented_control.html` e no cofre discente com teste de larguras (280px a 768px) e escala de fonte.
- **Roteador SPA & Casca:**
  - Corrigido bug de encerramento da barra de progresso (`window.cagpRouteProgress.finish()`).
  - `popstate` protegido com verificação de `currentPath` para impedir travamento do histórico.
  - Evento redundante de `resize` restrito à presença de `#cagp-grafo-svg`.
- **Compilação e Fatos:**
  - `quarto render` executado em todos os 15 `.qmd` com exit code 0.
  - `passo0.sh` executado com exit code 0 (55/55 skills válidas).
  - `check_fatos.sh` executado com exit code 0 (149/149 fatos preservados).
- **Homologação:** **GATE G1 HOMOLOGADO COM SUCESSO.** Pronto para início da Fase 2.

---

## Log de Emissão do Gate G2 (Fase 2)

- **Casca Global & 5 Eixos Canônicos:**
  - Sincronização 1:1 rigorosa nos 5 Eixos (`Hoje`, `Curso`, `Currículo`, `Acervo`, `O CAGP`) entre `#cagp-mobile-nav`, `#cagp-superapp-tabbar` e cabeçalho desktop via `window.CAGP_TAXONOMY_V1`.
  - Remoção completa de referências legadas a `#cagp-stab-ajustes`, `#cagp-stab-docs`, `#cagp-stab-acg`, `#cagp-stab-percurso`.
  - Sino de alertas do campus (`.cagp-header-live-btn`) operante e apontando para `window.cagpOpenCampusSheet()`.
  - Avatar do Passaporte (`.cagp-header-profile-btn` e `#cagp-topbar-profile-btn`) fixado e blindado em `>= 44×44px`.
- **Roteador SPA & Transições Nativas:**
  - `popstate` protegido com validação de `currentPath`, eliminando travamento do botão Voltar do navegador.
  - Evento canônico de ciclo de vida `cagp:navigated` disparado com URL e pathname.
  - Preservação integral de atributos `data-a11y-*` e classes `cagp-is-standalone` em `document.documentElement` durante a troca de páginas.
  - Erros de console em rotação SPA: `M6 = 0` (zero erros).
- **Cofre Discente & Backup Base64 com CRC32:**
  - Algoritmo puro de CRC32 validado contra o vetor de teste canônico `CRC32("123456789") === "cbf43926"`.
  - Geração e restauração de código no formato `CAGP1:<b64>.<crc32>` cobrindo as 9 chaves canônicas com validação atômica de checksum.
  - Botão Limpar Cofre (`#cagp-clear-vault-btn`) com confirmação estrita em 2 toques (temporizador de 4 segundos), removendo as 9 chaves canônicas e 4 legadas, preservando o marcador efêmero `cagp_onboard_v1_dismissed`.
  - Saídas dinâmicas no DOM sanitizadas com `escapeHtml()`.
- **Acessibilidade Universal & Metadados:**
  - Cessação definitiva de gravação na chave legada `cagp_a11y_prefs` em `savePrefs()`, adotando exclusivamente `cagp_a11y_prefs_v2`.
  - Normalização do valor de movimento reduzido para `'reduced'`.
  - Meta Viewport com `width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover` preservada.
  - Open Graph e Twitter Card configurados em `_quarto.yml` apontando para imagem unificada `imagens/og-padrao.png` (1200×630, 52.5 KB).
  - Hub Legado `estagio-tcc.qmd` sinalizado com `<meta name="robots" content="noindex">`.
  - Descrições factuais (`description:`) injetadas no frontmatter de todas as 15 rotas.
- **Service Worker (`sw.js`):**
  - Versão de cache incrementada para `cagp-pwa-v6`.
  - Pré-cache resiliente com `Promise.allSettled()` englobando ativos essenciais e `site_libs/`.
  - Cache Stale-While-Revalidate com Lie-Fi timeout de 1500ms implementado para os 9 PDFs oficiais essenciais em `cagp-pdfs-oficiais-v1`.
- **Auditoria Empírica (18 Células):**
  - Registrado em `_designs/evidencias_v2/fase2/findings.jsonl`: Camada A de `index`, `acg`, `documentos` (12 células) + Camada C em `standalone` e `offline` (6 células).
  - Critérios de saída M1, M2, M5 e M6 100% aprovados.
- **Compilação e Fatos:**
  - `quarto render` executado com exit code 0.
  - `passo0.sh` executado com exit code 0 (55/55 skills válidas).
  - `check_fatos.sh` executado com exit code 0 (149/149 fatos preservados).
- **Homologação:** **GATE G2 HOMOLOGADO COM SUCESSO.** Pronto para início da Fase 3.

---

## Gate G3a: Onda 3a (Rotas Críticas do Core Discente)

- **Status:** **APROVADO (HOMOLOGADO)**
- **Data/Hora:** 2026-10-30T02:32:00Z
- **Branch:** `plano-v2-execucao`
- **Rotas Core Discente Auditadas:**
  - `index.qmd` (A1 Hub, Eixo 1)
  - `acg.qmd` (A2 Ferramenta, Eixo 3)
  - `documentos.qmd` (A3 Catálogo, Eixo 4)
  - `percurso.qmd` (A2 Ferramenta, Eixo 3)
- **Entregas Canônicas Validadas:**
  - **`acg.qmd`:** Remoção total e definitiva do espelho N-20229 legada confirmada (zero menções a `#cagp-n20229-print-sheet`); HUD linear compacto de 64px ativo (`#cagp-calc-hud-linear`); links diretos aos formulários oficiais autênticos em PDF local (`documentos/requerimento-atividade-integralizadora-credito-v20229.pdf`) e DOCX externo consolidados na Aba 3; limpeza de listeners no evento `cagp:navigated`.
  - **`documentos.qmd`:** Faixa inline de status offline (`#cagp-offline-status-strip`, 44px) consolidada no topo; filtro de busca ajustado para invocar `cagpActivateWorkspaceView('v2')`, `'v1'` e `'__all__'` sem o argumento quebrado `{ scroll: false }`; botões do `.cagp-chip-rail` protegidos contra quebra vertical de texto com `white-space: nowrap !important` e `flex: 0 0 auto !important`.
  - **`percurso.qmd`:** Callout regimental de 145 palavras encapsulado em `<details class="cagp-normative-details">`; roving tabindex com navegação bidirecional por setas do teclado (`ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`) 100% funcional nos 27 nós do grafo SVG (`#cagp-grafo-svg`); 28 ementas em `<details>` preservadas com títulos limpos.
  - **`index.qmd`:** Bento Grid consolidado com classes nativas `row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2 g-md-3` nos 5 Eixos Canônicos (proibição de `col-lg-2-4` respeitada); botão "Ver Tudo" (`__all__`) sincronizado com `data-ws-hash="#visao-completa"`.
- **Métricas de 1ª Dobra (M3 a 360×640):**
  - `index.html`: `bar_top = 177px` (≤ 200px), `first_ctrl = 263px` (≤ 300px) — **CONFORME**
  - `acg.html`: `bar_top = 166px` (≤ 200px), `first_ctrl = 248px` (≤ 300px) — **CONFORME**
  - `documentos.html`: `bar_top = 166px` (≤ 200px), `first_ctrl = 248px` (≤ 300px) — **CONFORME**
  - `percurso.html`: `bar_top = 155px` (≤ 200px), `first_ctrl = 280px` (≤ 300px) — **CONFORME**
- **Auditoria Empírica (Camada C — 60 Células C001 a C060):**
  - Registrado em `_designs/evidencias_v2/fase3/findings_3a.jsonl`: 60/60 células aprovadas (100% de aprovação).
  - Stress testing sob 15 dimensões (contrast, dyslexia, font-xl, reduced-motion, dark, print, zoom200, keyboard, standalone, offline, 412x915, 700x900, 507x800, 1024x768, 640x360).
  - Critérios de saída: `M1 = true` (sem transbordamento horizontal), `M2 = true` (segmented control sem rolagem), `M5 = 1` (exatamente 1 H1 semântico), `M6 = 0` (zero erros de console).
- **Compilação e Fatos:**
  - `quarto render` executado com exit code 0 nas 15 rotas.
  - `passo0.sh` executado com exit code 0 (55/55 skills válidas).
  - `check_fatos.sh` executado com exit code 0 (149/149 fatos preservados).
- **Homologação:** **GATE G3a HOMOLOGADO COM SUCESSO.** Autorizada a transição para a Onda 3b (Demais 11 Rotas Acadêmicas e Institucionais).
