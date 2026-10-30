# Acervo de Design, Diagnóstico e Arquitetura — Super App CAGP UFMG

Este diretório contém o ciclo completo de auditoria empírica, brainstorming multi-perspectiva (EGM), prototipação interativa, alinhamento de requisitos e o documento técnico final aprovado para modernização da plataforma.

---

## 🗺️ Mapa de Documentos

| Documento | Etapa / Função | Descrição |
| :--- | :--- | :--- |
| **[diagnostico_auditoria.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/diagnostico_auditoria.md)** | Etapa 1: Auditoria Diagnóstica | Métricas DOM Playwright (`360px`, `412px`, `768px`, `1440px`), corte de sub-views, profundidade da 1ª dobra, *over-boxing*, análise de quebra do espelho N-20229 e falhas WCAG AA/AAA. |
| **[propostas_brainstorm_egm.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/propostas_brainstorm_egm.md)** | Etapa 2: Brainstorm Multi-Lente EGM | Síntese integrada dos 6 subagentes especializados (`egm-design`, `egm-zoom-out`, `egm-codebase-details`, `egm-structural`, `egm-comprehension`, `egm-implementation-readiness`). |
| **[galeria_prototipos.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/galeria_prototipos.md)** | Etapa 3: Protótipos Interativos | Galeria e documentação de uso dos 3 artefatos interativos em HTML (`prototipo_a_espelho_n20229.html`, `prototipo_b_dobra1_subviews.html`, `prototipo_c_navegacao_superapp.html`). |
| **[concepts_brief.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/concepts_brief.md)** | Etapa 4: RFC de Decisão (`/grill-me`) | Registro formal das decisões locked, alternativas analisadas e deliberação humana de remoção do espelho N-20229. |
| **[plano_mestre_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/plano_mestre_superapp_cagp.md)** | **Plano Mestre v2 (vigente)** | Site inteiro (15 rotas) por arquétipo, 7 eixos de formato, matriz de verificação em 3 camadas com `/browser` + `/generative_ui`, roteamento de skills em 3 níveis e Errata do v1. **Status: Draft v2 em revisão `/egm`.** |
| **[modernizacao_superapp_cagp.md](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/modernizacao_superapp_cagp.md)** | Plano v1 (SUPERSEDED — Anexo A do v2) | Especificações por arquivo da casca e de 4 páginas; Playwright revogado. |
| **[arquivo_v1/](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/arquivo_v1)** | Arquivo | Relatórios de revisão EGM e rascunho (`design_draft.md`) que avaliaram o v1. |

---

## 🔒 Princípios Inegociáveis de Arquitetura

1. **Zero Supressão Factual:** Todas as ementas, artigos regimentais, telefones, e-mails de colegiado/secretarias, cargas horárias e regras de integralização são integralmente preservadas. Textos extensos usam revelação progressiva (`<details>`).
2. **Contrato de Estado Intacto:** Compatibilidade retroativa absoluta com as 9 chaves de `localStorage` discentes e sincronização Base64 (`CAGP1:...`).
3. **Decomissionamento do Espelho N-20229:** Eliminação de geradores client-side sintéticos; redirecionamento explícito aos formulários oficiais autênticos (PDF/DOCX) da Sala F-2039.
4. **Design Adaptativo Multiformato:** Experiência consistente e ergonômica em Smartphones (`360px`), Foldables (`280px` dobrado / `700px` desdobrado), Tablets (`768px`–`1024px`) e Desktop (`1440px+`).
