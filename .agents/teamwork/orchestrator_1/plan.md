# Master Orchestration Plan: CAGP Website Update

## Objective
Update the CAGP (Centro Acadêmico de Gestão Pública - FAFICH / UFMG) website built with Quarto CLI to match official curriculum documents (`documentos_oficiais_do_curso/`) and fulfill all requirements R1 to R5 with rigorous verification.

## Execution Pattern: Project Pattern (Dual Track)
- **Phase 0: Survey**:
  - Dispatch 3 investigators:
    - Investigator 1 (`teamwork_preview_spec_miner`): Deep inspection of `documentos_oficiais_do_curso/` (PPC, Regulamento, Ementário, Matriz Curricular N-20229, AAC tables, etc.).
    - Investigator 2 (`teamwork_preview_explorer`): Codebase survey of existing `.qmd`, `_quarto.yml`, styles, and layout.
    - Investigator 3 (`teamwork_preview_explorer`): Analysis of dependencies, assets, build environment, and cross-module contracts.
  - Synthesize reports into `PROJECT.md § Feature Inventory` and `TEST_INFRA.md`.

- **Phase 1: Decomposition & Dual Track Setup**:
  - Implementation Milestones:
    - M1: Central de Documentos & PDF Resources (`documentos.qmd`, `_quarto.yml` resources, navbar).
    - M2: Percurso Curricular N-20229 (`percurso.qmd`, 10 semestres, 3 percursos, estágios A/B, TCC I/II).
    - M3: Atividades Acadêmicas Complementares (AAC) & Formação em Extensão (`acg.qmd`, 300h extensão, códigos SIGA).
    - M4: Calouros, Home & Navbar (`calouros.qmd`, `index.qmd`, turno Noturno, dados FAFICH, visual/a11y check).
  - E2E Testing Track:
    - Opaque-box verification suite covering Tiers 1-4.

- **Phase 2: Milestone Iteration & Execution**:
  - For each milestone: Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> Gate check.

- **Phase 3: Final E2E Test Suite Pass & Adversarial Hardening (Tier 5)**:
  - Phase 1: 100% pass of E2E test suite.
  - Phase 2: Adversarial coverage hardening.

- **Phase 4: Final Hand-off to Sentinel**:
  - Compile final handoff report with Quarto render confirmation and verification artifacts.
