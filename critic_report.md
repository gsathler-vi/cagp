# Stage 7: Critic Review Report

* **Documento Auditado:** [`_designs/refatoracao_astro7_superapp_cagp.md`](file:///home/gsathler/Nextcloud/Projects/cagp/_designs/refatoracao_astro7_superapp_cagp.md)
* **Lentes:** `egm-design`, `egm-structural`, `egm-style`
* **Escopo:** FeatureRange (linhas 1..336)
* **Status:** Concluído

## 1. Crítica de Design e Ergonomia (`egm-design`)
- **Conformidade Apple HIG:** A especificação de alvos de toque `>= 44×44px` (ideal `48×48px`), inputs com `font-size: 16px` (`text-base`) para bloquear auto-zoom e curva de física `cubic-bezier(0.32, 0.72, 0, 1)` está exemplar.
- **Microinterações:** A menção de `active:scale-[0.98]` deve vir acompanhada da restrição de aceleração por hardware (`transform: scale(...)` com `will-change: transform`).

## 2. Crítica Estrutural e Integridade de Domínio (`egm-structural`)
- **[MAJ-01] Incompatibilidade de Schemas Zod com o Cofre Discente (AGENTS.md):**
  - Na tabela da Seção 7.6: `cagp_notifications_prefs_v1` foi simplificado para `z.object({ ru1815, circular2230, aac120d })`, omitindo a propriedade obrigatória `lastFired` (usada no Service Worker para rate limiting de notificações de horário do Circular e RU).
  - `cagp_student_profile_v1` omite campos complementares previstos no AGENTS.md.
  - Se o schema Zod do Astro for mais estrito ou diferente do formato gravado pelo portal legado no `localStorage`, a função `safeParse()` falhará e resetará os dados salvos do discente, violando a Cláusula Pétrea de compatibilidade retroativa.

## 3. Crítica de Estilo e Padrões (`egm-style`)
- **[NIT-04] Mistura de Idiomas nos Cabeçalhos:**
  - Títulos de seção misturam inglês técnico ("Overview", "The Problem", etc.) com texto e subtítulos em português formal. Recomenda-se harmonizar títulos em português formal.
