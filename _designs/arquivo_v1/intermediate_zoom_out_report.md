# Relatório de Revisão Zoom Out Intermediária (Stage 8) — Super App CAGP UFMG

* **Documento Auditado:** [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md) (Linhas 1..517)
* **Padrão Aplicado:** [zoom-out-standard.md](file:///home/gsathler/.gemini/config/plugins/egm/resources/document_standards/zoom-out-standard.md)
* **Revisor:** Skeptical Architect (Zoom Out Goldfish)
* **Data:** 2026-10-29

---

## 1. Executive Summary of Intermediate Architectural Assessment

A revisão intermediária do documento [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md) confirma uma evolução substancial na qualidade arquitetural, precisão técnica e maturidade de engenharia após a incorporação das recomendações das fases de Comprehension e Critic.

### Avaliação das 4 Frentes Solicitadas:

1. **Seção Estruturada `## Risks & Mitigations`:**
   A inclusão da seção consolidada resolve o Blocker Estrutural C-01 do relatório anterior. A calibração do timeout de *lie-fi* para `1500ms`, a estratégia de resiliência ao ITP do Safari (promoção de PWA Standalone) e a salvaguarda de layout para `280px`/font-scaling via `data-label-short` seguem rigorosamente o princípio de simplicidade sem introduzir bibliotecas externas ou complexidade desnecessária.
2. **Especificação Nominal do `ClientState` (9 Chaves Canônicas + Cache de 9 PDFs):**
   O diagrama e o contrato de dados agora nomeiam individualmente as 9 chaves de `localStorage`, mantendo alinhamento 1:1 com a constante `CANONICAL_VAULT_KEYS` em `_includes/pwa-install.html#L2064-L2074`. Contudo, a lista detalhada de nomes de arquivo dos PDFs em `sw.js` apresenta uma divergência crítica em relação aos arquivos reais do repositório (ver Achado 🟡 Major 1).
3. **Padrão Defensivo de Taxonomia e Refinamento Editorial:**
   A taxonomia unificada nos 5 Eixos Canônicos com fallback defensivo (`const taxonomy = window.CAGP_TAXONOMY_V1 || DEFAULT_FALLBACK_TAXONOMY;`) blinda o roteador SPA contra ordens assíncronas de script. Toda a linguagem foi higienizada com sucesso: termos pejorativos ("quebrada e obsoleta"), jargões informais ("HUD", "Cofre", "Destilação") e hipérboles foram completamente substituídos por vocabulário canônico de engenharia de software e padrões W3C.
4. **Simplicidade, YAGNI e Foco na Causa-Raiz:**
   O plano mantém integridade ao rejeitar complexidade client-side (sem engines de compilação PDF como `jsPDF` ou `html2pdf.js`, sem servidores ou microsserviços), preservando a operação 100% estática via Quarto CLI e Service Worker nativo.

Não foram encontrados **🔴 Blockers**. Foram identificados **2 achados 🟡 Major** e **3 achados 🟢 Nit**, com recomendações acionáveis detalhadas a seguir.

---

## 2. Categorized Findings & Recommendations

### 🔴 Blocker
*Nenhum blocker identificado.* O plano é estruturalmente coerente, não introduz acoplamentos inviáveis nem dead-ends arquiteturais.

---

### 🟡 Major

#### Achado 1: Divergência Crítica nos Nomes dos 9 PDFs no `sw.js` com Risco de Falha Fatal de Instalação do Service Worker
* **Affected Scope:** [modernizacao_superapp_cagp.md#L476-L485](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L476-L485) (Seção 12: `sw.js`)
* **Simplicity & Codebase Rationale:**
  - A lista proposta nas linhas 476–485 continha caminhos fictícios/inexistentes no disco (ex.: `calendario-academico-ufmg-2024.pdf`).
  - Na implementação real de `sw.js#L35-L44` e em `documentos.qmd`, os 8 PDFs autênticos já cacheados são:
    1. `documentos/ppc-gestao-publica-ufmg.pdf`
    2. `documentos/regulamento-gestao-publica-ufmg.pdf`
    3. `documentos/ementario-gestao-publica-ufmg.pdf`
    4. `documentos/percurso-bacharelado-nucleo-geral.pdf`
    5. `documentos/percurso-bacharelado-nucleo-complementar.pdf`
    6. `documentos/percurso-bacharelado-nucleo-avancado.pdf`
    7. `documentos/termo-aceite-orientador-tcc.pdf`
    8. `documentos/regimento-interno-cagp-ufmg.pdf`
  - Como a instalação do Service Worker executa `cache.addAll(OFFICIAL_PDFS)` atomicamente, um único erro 404 faz a instalação falhar integralmente.
* **Recomendação Arquitetural:**
  - Corrigir a lista para os 8 arquivos autênticos do repositório mais o 9º PDF: `documentos/requerimento-atividade-integralizadora-credito-v20229.pdf`.

#### Achado 2: Risco de Regressão de Compatibilidade Retroativa no Parser de Backup Base64 (`CAGP1:...` sem Checksum)
* **Affected Scope:** [modernizacao_superapp_cagp.md#L48](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L48), [L258](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L258), [L351](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L351), [L441](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L441)
* **Simplicity & Architectural Rationale:**
  - Backups existentes dos discentes utilizam a sintaxe legada `CAGP1:<payload>` sem o delimitador `.` nem checksum CRC32.
  - Se a nova rotina de importação exigir estritamente a presença de checksum para qualquer payload, todos os backups gerados anteriormente serão rejeitados, violando o Non-Goal 3 (compatibilidade retroativa).
* **Recomendação Arquitetural:**
  - O parser de importação deve bifurcar: se o código possuir `.`, valida o checksum CRC32 antes da importação; se não possuir `.`, restaura como payload legado com notificação informativa ao usuário.

---

### 🟢 Nit

#### Achado 3: "Modal Fantasma de Pré-Visualização" na Tabela de Riscos (YAGNI)
* **Affected Scope:** [modernizacao_superapp_cagp.md#L351](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L351)
* **Simplicity Rationale:**
  - A tabela cita um modal de pré-visualização das 9 chaves não desenhado em nenhuma seção ou CUJ. Manter a validação de schema atômica com confirmação direta ou toast.

#### Achado 4: Persistência de Queda de Altitude nos Pilares Arquiteturais
* **Affected Scope:** [modernizacao_superapp_cagp.md#L219-L224](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L219-L224)
* **Simplicity Rationale:**
  - Manter a Seção 1 focada em conceitos arquiteturais, reservando referências a hexadecimais pontuais para a Seção 3.

#### Achado 5: Restrição Explícita contra Dependências Externas para CRC32
* **Affected Scope:** [modernizacao_superapp_cagp.md#L441](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md#L441)
* **Simplicity Rationale:**
  - Deixar explícito que a rotina de checksum CRC32 deve ser uma função pura inline em JavaScript vanilla (~15 linhas), sem importar pacotes externos como `crc-32`.
