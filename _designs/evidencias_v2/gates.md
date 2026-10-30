# Registro Formal de Gates de Aprovação — Super App CAGP UFMG

**Documento Operacional:** [`AGENTS.md`](file:///home/gsathler/Nextcloud/Projects/cagp/AGENTS.md)  
**Branch Ativo:** `plano-v2-execucao`  
**Data de Início:** 2026-10-29

---

## Tabela de Gates e Status de Homologação

| Gate | Fase | Requisitos Canônicos | Evidências Arquivadas | Status | Aprovador | Data |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: |
| **G0** | **Fase 0** | 1. Snapshot git de proteção criado.<br>2. `passo0.sh` exit 0 (55 caminhos de skills válidos).<br>3. `check_fatos.sh` exit 0 (149 fatos preservados).<br>4. `quarto render` exit 0.<br>5. Remoção de `tests/` e `docs/tests/`.<br>6. Teste de capacidades documentado.<br>7. Ledger inicial registrado.<br>8. Camada A (60 células de baseline) registrada. | • `_designs/evidencias_v2/fase0/git_status.txt`<br>• `_designs/evidencias_v2/fase0/capacidades.md`<br>• `_designs/evidencias_v2/fase0/ledger.md`<br>• `_designs/evidencias_v2/fase0/findings.jsonl`<br>• `_designs/evidencias_v2/matriz_celulas.csv` | **APROVADO** | Gestão CAGP | 2026-10-29 |
| **G1** | Fase 1 | Camada A das rotas `acg`, `calouros` e `estagio` auditadas; M1, M2, M4, M5, M7 aprovados; M8 `<= 4`; protótipo interativo gerado; barras migradas nos 14 `.qmd`. | *Pendente Fase 1* | *Em Espera* | — | — |
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
