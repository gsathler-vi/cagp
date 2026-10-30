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
| **G2** | Fase 2 | Casca global unificada nos 5 Eixos; router SPA blindado; backup CRC32 testado; Service Worker `cagp-pwa-v6` com cold-offline e timeout de 1500ms aprovados. | *Pendente Fase 2* | *Em Espera* | — | — |
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
