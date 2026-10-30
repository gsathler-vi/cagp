# Ledger de Estado Inicial do Repositório — Fase 0

**Data:** 2026-10-29  
**Branch de Execução:** `plano-v2-execucao`  
**Referência Canônica:** [`AGENTS.md`](file:///home/gsathler/Nextcloud/Projects/cagp/AGENTS.md) (Seção 7)

---

## Tabela de Fechamento do Ledger Inicial

| Item / Arquivo | Estado Auditado | Comando de Verificação no Repositório | Resultado Observado | Pendência a Executar na Fase Correspondente |
| :--- | :---: | :--- | :--- | :--- |
| **`_quarto.yml`** | **Parcial** | `grep -c "brand: _brand.yml"` | 1 ocorrência (`format.html.brand: _brand.yml` ativo). | Adicionar metadados Open Graph e Twitter Card; ajustar altura do anúncio (Fase 2). |
| **`_includes/super-app-header.html`** | **Parcial** | `grep -c "CAGP_TAXONOMY_V1"` | 7 ocorrências (Taxonomia canônica declarada no cabeçalho). | Ativar acionador do sino do campus, avatar único 44×44px e suprimir resize redundante (Fase 2). |
| **`_includes/super-app-router.html`** | **Parcial** | `grep -c "cagpRouteProgress.done"` | 1 ocorrência (linha 750). | Substituir `.done()` por `.finish()`; blindar `popstate` com verificação de `currentPath` (Fase 2). |
| **`_includes/pwa-install.html`** | **Pendente** | `grep -c "CAGP_TAXONOMY_V1"` | 0 ocorrências. | Unificar as 5 abas inferiores nos 5 Eixos; fluxo de 2 toques no clear; backup CRC32 (Fase 2). |
| **`acg.qmd`** | **Feito** | `grep -c "n20229-print-sheet"` | 0 ocorrências (Espelho sintético removido); HUD linear presente. | Manter links aos formulários autênticos na aba 3 (Fase 3a). |
| **`documentos.qmd`** | **Feito** | `grep -c "cagp-offline-status-strip"` | 1 ocorrência (Faixa inline offline de 44px presente). | Alinhar chamadas de busca chamando `cagpActivateWorkspaceView('v2')` sem argumentos quebrados (Fase 3a). |
| **`percurso.qmd`** | **Parcial** | `grep -c "cagp-normative-details"` | 0 ocorrências (Callout de 145 palavras ainda exposto). | Encapsular callout em `<details>`; implantar roving tabindex no SVG (Fase 3a). |
| **`index.qmd`** | **Feito** | `grep -c "row-cols-lg-5"` | 1 ocorrência (Bento grid já usa classes nativas Bootstrap). | Completar `data-ws-hash` no botão Ver Tudo (Fase 3a). |
| **10 `.qmd` Restantes** | **Pendente** | `grep -c "cagp-tab-label-short"` | 0 ocorrências nos 10 arquivos. | Migração mecânica da barra de abas: spans full/short, IDs canônicos, ARIA e Ver Tudo externo (Fase 1). |
| **`sw.js`** | **Parcial** | `grep -c "cagp-pwa-v5"` | 1 ocorrência (v5 ativo; timeout 1500ms e 503 implementados). | Incrementar para `v6`; pré-cache tolerante com `Promise.allSettled()` para `site_libs`; Stale-While-Revalidate para PDFs (Fase 2). |
| **`styles.css`** | **Parcial** | `grep -n "cagp-workspace-bar"` | Bloco presente, mas ainda com regras rígidas móveis. | Substituir pelo Controle Segmentado por N; eliminar `!important` conflitantes; alvos 44px (Fase 1). |
| **Scripts de Auditoria** | **Feito** | `ls _designs/evidencias_v2/` | `audit.js`, `passo0.sh`, `gerar_matriz.py`, `check_fatos.sh` criados e testados. | Prontos para uso em todos os Gates. |
| **Testes Obsoletos** | **Feito** | `ls tests/ docs/tests/` | Diretórios removidos com sucesso. | Nenhuma dependência legada restante. |
