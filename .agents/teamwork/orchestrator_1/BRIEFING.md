# BRIEFING — 2026-10-21T22:35:45Z

## Mission
Orchestrate the complete update of the CAGP institutional website according to official curriculum documents and user requirements R1-R5.

## 🔒 My Identity
- Archetype: orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/orchestrator_1/
- Original parent: Sentinel
- Original parent conversation ID: 6904617f-a9e8-4ec7-83aa-2d98e7d0fabb

## 🔒 My Workflow
- **Pattern**: Project Pattern
- **Scope document**: /home/gsathler/Nextcloud/Projects/cagp/PROJECT.md
1. **Decompose**: Decompose requirements into milestones by module/page boundary per Project Pattern.
2. **Dispatch & Execute**:
   - Direct / Delegate: Delegate milestones to sub-orchestrators / specialized workers per Project Pattern.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: N/A (top-level orchestrator must redesign)
4. **Succession**: At 16 spawns, write handoff.md, cancel crons, spawn successor.
- **Work items**:
  1. Survey & Map Scope [in-progress]
  2. PROJECT.md & TEST_INFRA.md decomposition [pending]
  3. Milestone 1: PDFs & Documentos [pending]
  4. Milestone 2: Percurso Curricular N-20229 [pending]
  5. Milestone 3: ACG & Extensão [pending]
  6. Milestone 4: Calouros, Home & Navbar [pending]
  7. Milestone 5: E2E Testing & Final Verification [pending]
- **Current phase**: 0 (Survey)
- **Current focus**: Survey phase to build comprehensive feature inventory

## 🔒 Key Constraints
- Dispatch-only: NEVER write, modify, or create source code files directly.
- NEVER run build/test commands directly.
- NEVER investigate at code level directly; dispatch Explorers/Spec Miners.
- Metadata edits only in `.agents/teamwork/`.
- Quarto render binary: `/usr/share/positron/resources/app/quarto/bin/quarto render`.
- Zero tolerance for integrity violations.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: 6904617f-a9e8-4ec7-83aa-2d98e7d0fabb
- Updated: 2026-10-21T22:33:57Z

## Key Decisions Made
- Selected Project Pattern with Step 0 Survey.
- 3 Survey investigators spawned in parallel.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| spec_miner_docs_1 | teamwork_preview_spec_miner | Survey official docs in documentos_oficiais_do_curso/ | in-progress | 15e1e5e2-8f0b-41c8-a666-01372b9e9ecf |
| explorer_codebase_1 | teamwork_preview_explorer | Survey existing website codebase and gaps | in-progress | a5f73c41-8bfe-4269-bf1c-7e1f39133266 |
| explorer_infra_1 | teamwork_preview_explorer | Survey Quarto build infra and verification | in-progress | 7ad70172-5ff0-4f92-9276-a6f106318f5c |

## Succession Status
- Succession required: no
- Spawn count: 3 / 16
- Pending subagents: 15e1e5e2-8f0b-41c8-a666-01372b9e9ecf, a5f73c41-8bfe-4269-bf1c-7e1f39133266, 7ad70172-5ff0-4f92-9276-a6f106318f5c
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: d11e5fe3-08ff-42aa-91dd-a903b0b2fae9/task-12
- Safety timer: pending
- On succession: kill all timers before spawning successor
- On context truncation: run manage_task(Action="list") — re-create if missing

## Artifact Index
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/ORIGINAL_REQUEST.md — Original User Request
- /home/gsathler/Nextcloud/Projects/cagp/.agents/teamwork/orchestrator_1/DISPATCH.md — Initial dispatch message
