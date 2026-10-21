# BRIEFING — 2026-10-21T22:36:00Z

## Mission
Extract and document all authoritative facts, structures, course codes, hours, credits, percursos, AAC tables, extension rules, official documents, and Colegiado information from official course documents into `spec_report.md`.

## 🔒 My Identity
- Archetype: Specification Miner
- Roles: Curriculum Specification Miner
- Working directory: /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/spec_miner_docs_1/
- Original parent: d11e5fe3-08ff-42aa-91dd-a903b0b2fae9
- Milestone: Milestone 1 - Discovery & Specification Mining

## 🔒 Key Constraints
- Read-only on application codebase; do NOT implement website changes.
- Probe authoritative sources (`documentos_oficiais_do_curso/`, official PDFs, `ORIGINAL_REQUEST.md`).
- Write comprehensive findings in tables and structured format to `spec_report.md`.
- Provide self-contained `handoff.md` with 5 sections: Observation, Logic Chain, Caveats, Conclusion, Verification Method.

## Current Parent
- Conversation ID: d11e5fe3-08ff-42aa-91dd-a903b0b2fae9
- Updated: not yet

## Task Summary
- **What to build**: Specification report (`spec_report.md`) covering curriculum N-20229, 6 official PDFs, Percurso Padrão/Complementar/Avançado, Estágios, TCC, Extensão (300h), AAC table & rules, Colegiado info.
- **Success criteria**: 100% accurate, complete extraction of course data without hallucinations, fully cross-checked against source documents.
- **Interface contracts**: /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/ORIGINAL_REQUEST.md
- **Code layout**: .agents/teamwork/spec_miner_docs_1/ (metadata and spec report only)

## Key Decisions Made
- Mining directly from official files in `documentos_oficiais_do_curso/` and `ORIGINAL_REQUEST.md`.

## Artifact Index
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/spec_miner_docs_1/DISPATCH.md — Dispatch instructions
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/spec_miner_docs_1/progress.md — Progress and liveness log
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/spec_miner_docs_1/spec_report.md — Authoritative curriculum specification report
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/spec_miner_docs_1/handoff.md — 5-component handoff report
