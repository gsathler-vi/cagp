# Stage 6: Comprehension Test Report

* **Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md)
* **Lente:** `egm-comprehension`
* **Escopo:** FeatureRange (linhas 1..336) & DetailedRange (linhas 337..475)
* **Status:** Concluído

## Análise de Carga Cognitiva & Interpretabilidade
O documento é técnico, bem escrito e contextualizado na realidade discente da FAFICH. Contudo, foram identificadas ambiguidades críticas que forçarão agentes autônomos ou desenvolvedores a adivinhar intenções de design.

## Achados de Compreensão:
1. **[MAJ-04] Indefinição das Diretivas de Hidratação das Ilhas (`client:load` vs `client:idle` vs `client:visible`):**
   - As ilhas reativas são rotuladas genericamente como `client:idle / client:visible`. Falta especificação para cada componente (`BottomSheet.tsx` e `LinearHud.tsx` devem ser `client:load`, enquanto `CurriculumGraph.tsx` deve ser `client:visible`).
2. **[MAJ-02] Falha de Ergonomia nos Detents: Unidade `vh` vs `dvh` e Safe Area no iOS Safari:**
   - Detents prescritos em `50vh` e `90vh`. Em iOS Safari mobile, a barra de endereços retrátil dinâmica causa saltos bruscos na altura da folha modal. A unidade correta obrigatória é `dvh` (`50dvh` e `90dvh`), com `padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px))`.
3. **[NIT-03] Omissão da Estratégia de Ícones:**
   - O documento menciona "Sino de Alertas", "Avatar 44px" e os ícones dos 5 eixos (`bi-compass`, etc.), mas não detalha se os ícones serão importados via CSS do Bootstrap Icons, pacote `astro-icon`, `lucide-react` ou SVGs embutidos.
