# Stage 8: Intermediate Zoom Out Report

* **Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md)
* **Lente:** `egm-zoom-out`
* **Escopo:** Documento Completo (linhas 1..476)
* **Status:** Concluído

## Reavaliação Pós-Crítica & Riscos de Transição
1. **[MAJ-06] Complexidade YAGNI do Módulo `pointerGestures.ts` (< 140 linhas):**
   - Implementar uma máquina de estados de arrasto tátil para *bottom sheets* com inércia, detents, limiar de velocidade (*velocity flick* de 0.5 px/ms) e bloqueio de scroll nativo em menos de 140 linhas sem bibliotecas é altamente arriscado.
   - O risco de travar o scroll vertical de listas longas (como na seleção de optativas) dentro da folha modal é elevado.
   - *Recomendação:* Isolar o manipulador de arrasto vertical exclusivamente à área do *grabber handle* da folha (`.cagp-sheet-grabber`) através da propriedade CSS `touch-action: none`, permitindo que o corpo do modal mantenha `touch-action: pan-y` com rolagem nativa suave e sem conflito de eventos.
2. **[MAJ-03] Extravio de Documentos e PDFs Estáticos (`documentos/`):**
   - No Quarto, os arquivos PDF de formulários e termos residem na pasta raiz `documentos/`. No Astro, o roteador estático serve arquivos não compilados a partir de `public/`.
   - A ausência de instrução para migrar `documentos/` para `public/documentos/` causará links quebrados em toda a plataforma. Mover o acervo factual para `public/documentos/`.
