# Stage 9: Implementation Readiness Test Report

* **Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md)
* **Lentes:** `egm-implementation-readiness`, `egm-codebase-details`, `egm-style`
* **Escopo:** DetailedRange (linhas 337..475)
* **Status:** Concluído

## Viabilidade dos Gates e Execução Zero-Decisão
1. **[BLK-03] Violação da Regra de Zero-Decisão: Indecisão na Integração Tailwind:**
   - Na linha 358: `"@tailwindcss/vite (ou @astrojs/tailwind)"`.
   - Na linha 230: a folha `global.css` usa a sintaxe `@theme { ... }` (exclusiva do Tailwind CSS v4).
   - O `@astrojs/tailwind` suporta apenas Tailwind v3 e exige `tailwind.config.mjs`. Se instalado, o build quebrará imediatamente ao processar `@theme`.
   - **Resolução mandatória:** Eliminar a conjunção alternativa ("ou"). Travar estritamente no **Tailwind v4 via `@tailwindcss/vite`** como plugin do Vite no `astro.config.mjs`.
2. **[BLK-04] Ausência de Dependências e Scripts para Homologação dos Gates:**
   - O Gate G3 estipula: *"Testes unitários comprovam persistência e recuperação correta dos dados do cofre"*.
   - No entanto, a lista de dependências de `package.json` não inclui `vitest`, `@testing-library/react` nem biblioteca de CRC32. Os scripts listam apenas `dev`, `build`, `preview`, `typecheck`.
   - **Resolução mandatória:** Adicionar `vitest` e `@types/node` às dependências em `package.json`, incluir o script `"test": "vitest run"` e documentar a inclusão da função CRC32 em `backupVault.ts`.
3. **[NIT-01] Risco de Estouro de Orçamento de Linhas em `CurriculumGraph.tsx` (< 240 linhas):**
   - Grafo Curricular SVG com 27 nós, *roving tabindex* e destaque de pré-requisitos. Decompor em `CurriculumGraph.tsx` (~130 linhas), `CourseNode.tsx` (~80 linhas) e `graphLayout.ts` (~80 linhas).
4. **[NIT-02] Caminho do Arquivo de Configuração do Content Layer no Astro 7:**
   - A linha 368 indica `src/content/config.ts`. No Astro 7 / Content Layer API, a convenção oficial é `src/content.config.ts`.
