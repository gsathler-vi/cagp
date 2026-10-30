# Relatório de Crítica Antagônica (Critic Review) — Super App CAGP UFMG

* **Documento Auditado:** [modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md) (Linhas 1..332 — `FeatureRange`)
* **Padrão de Referência:** [feature-spec-standard.md](file:///home/gsathler/.gemini/config/plugins/egm/resources/document_standards/feature-spec-standard.md)
* **Revisores:** Design Critic (`egm-design`), Structural Architect (`egm-structural`), Technical Copy Editor (`egm-style`)
* **Data:** 2026-10-29

---

## 1. Síntese Executiva

A auditoria antagônica tripartite avaliou o escopo conceitual e arquitetural (`FeatureRange`) sob as lentes de viabilidade de design/UX, conformidade com o blueprint estrutural e rigor editorial da escrita técnica.

* **Conformidade Geral:** O documento apresenta excelente maturidade conceitual, forte fundamentação empírica e resolução lógica das dores do usuário.
* **Achados Críticos:**
  - **1 Blocker Estrutural Unânime:** Ausência da seção obrigatória `## Risks & Limits` / `## Risks & Mitigations` antes da linha 333 (exigida pelo *Feature Specification Standard*). Modos de falha estavam dispersos pelos pilares, sem consolidação arquitetural.
  - **9 Majors:** Inconsistência na contagem de PDFs offline (8 vs. 9 ao incluir o requerimento N-20229); risco de ilegibilidade do controle segmentado a 280px e com ampliação de fonte (125%–150%); ponto único de falha e condição de corrida em `window.CAGP_TAXONOMY_V1`; riscos de evicção do WebKit (7 dias no Safari) e corrupção de Base64 no WhatsApp sem checksum; latência excessiva do timeout de 3500ms em *lie-fi*; juízos de valor subjetivos/pejorativos sobre código legado; jargões metafóricos/gamers ("HUD", "Cofre", "Destilação"); hipérboles e absolutismos ("crônico", "armadilha", "resolve 100%"); e uso indevido de termos de segurança ("Hardening", "Blindagem") para estilização CSS.
  - **12 Nits:** Ausência de sincronização de hash na URL nas sub-views; vazamento cromático de classes utilitárias no Alto Contraste AAA; inconsistências menores de formatação, pleonasmos e marcadores markdown.

---

## 2. Tabela de Rastreabilidade de Achados

| ID | Dimensão | Severidade | Revisor | Escopo | Descrição do Achado |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **C-01** | Estrutura | 🔴 **Blocker** | Design / Structural | L1..L332 | **Ausência da Seção Obrigatória de Riscos, Limites e Mitigações**: Falta o cabeçalho consolidado `## Risks & Mitigations` exigido pelo padrão. |
| **C-02** | Consistência | 🟡 **Major** | Design | L15, L63, L178, L352 | **Contagem Inconsistente de PDFs (8 vs. 9)**: Adicionar o formulário N-20229 eleva o acervo a 9 PDFs; hardcodear "8 PDFs" quebra contadores dinâmicos. |
| **C-03** | Responsividade | 🟡 **Major** | Design | L37, L182, L272 | **Gargalo a 280px e Font Scaling (125%–150%)**: Controle segmentado de 3 abas sem quebra pode truncar rótulos em telas dobradas estreitas ou com fontes aumentadas. |
| **C-04** | Resiliência | 🟡 **Major** | Design | L220–L227 | **Ponto Único de Falha na Taxonomia Global**: `window.CAGP_TAXONOMY_V1` pode ser invocado antes da carga do header; requer padrão Singleton defensivo com fallback. |
| **C-05** | Persistência | 🟡 **Major** | Design | L47, L114, L242 | **Risco de Evicção WebKit (7 dias) e Corrupção Base64**: Ausência de checksum no payload `CAGP1:...` e vulnerabilidade à limpeza automática do Safari sem standalone. |
| **C-06** | Performance | 🟡 **Major** | Design | L48, L352, L447 | **Latência Excessiva no Timeout de Rede**: Aguardar 3500ms no subsolo da FAFICH antes de servir o cache causa sensação de travamento; calibrar para 1200ms–1500ms. |
| **C-07** | Estilo Técnico | 🟡 **Major** | Style | L17, L27, L160, L298 | **Juízos de Valor Subjetivos e Pejorativos**: Uso de termos emocionais ("quebrada e obsoleta", "poluídas", "frágil") no lugar de descrições técnicas de defeitos. |
| **C-08** | Terminologia | 🟡 **Major** | Style | L15, L68, L143, L166 | **Jargão Metafórico e Gamer ("HUD", "Cofre", "Destilação")**: Emprego de termos informais em vez de nomenclatura canônica de UI ("painel linear de status", "CacheStorage"). |
| **C-09** | Precisão | 🟡 **Major** | Style | L17, L29, L318, L326 | **Hipérboles e Absolutismos Não Mensuráveis**: "corte horizontal crônico", "armadilha do PWA", "resolve 100% do over-boxing", "dissonância cognitiva". |
| **C-10** | Linguagem | 🟡 **Major** | Style | L38, L208, L219, L263 | **Uso Indevido de Termos de Segurança para CSS**: Emprego de "Hardening" e "Blindagem" para estilização de alto contraste e layout responsivo. |
| **C-11** | Navegação | 🟢 **Nit** | Design | L178, L187 | **Ausência de Sincronização de Hash nas Sub-Views**: Falta de deep linking por URL hash (`#acervo`, `#formularios`) ao alternar abas segmentadas. |
| **C-12** | Acessibilidade | 🟢 **Nit** | Design | L208–L218 | **Vazamento Cromático de Classes Utilitárias no Alto Contraste**: Classes `.text-danger` e `.text-primary` perdem visibilidade em fundo preto; forçar `#FFFF00`. |
| **C-13** | Nomenclatura | 🟢 **Nit** | Structural | L21 | Cabeçalho `## The Problem` em vez de `## Problem Statement`. |
| **C-14** | Formatação | 🟢 **Nit** | Structural | L282 | Mistura de marcadores de lista (`*` e `-`). |
| **C-15** | Estilo | 🟢 **Nit** | Style | Várias | Pleonasmos ("aprovado e validado", "formulários oficiais autênticos") e narrativa dispensável ("no subsolo da FAFICH"). |

---

## 3. Recomendações Prioritárias para Resolução

1. **Inserir Seção `## Risks & Mitigations` antes da Linha 333:** Cobrir explicitamente (a) Invalidação de Service Worker, (b) Timeout de lie-fi (1200ms–1500ms), (c) Evicção Safari / Standalone, (d) Checksum para backup Base64, e (e) Degradação suave em fontes ampliadas / 280px.
2. **Atualizar Contagem Oficial de PDFs para 9:** Sincronizar badges, textos e `sw.js` com a lista real de 9 documentos normativos.
3. **Definir Fallback Defensivo para Taxonomia:** `const taxonomy = window.CAGP_TAXONOMY_V1 || DEFAULT_FALLBACK_TAXONOMY;`.
4. **Higienização Editorial:** Substituir metáforas informais ("HUD", "Cofre", "Destilação") por termos canônicos de engenharia e eliminar adjetivos pejorativos ou hiperbólicos.
