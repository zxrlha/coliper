---
name: ultraplan
description: Prometheus strategic planner with Metis gap analysis and Momus plan auditing. Creates a decision-complete implementation plan in .coliper/plans/<slug>.md without touching product code. Execute plans via /start-work.
---

# `/ultraplan` - Prometheus Strategic Planner

Use `/ultraplan` to design architectural strategies, run multi-phase gap analysis and plan auditing, and write decision-complete implementation plans before making any code modifications.

## Overview
`/ultraplan` orchestrates a mandatory **Four-Stage Subagent Review Workflow** powered by **Dual Design Spec Entry Points** (`/ultraplan` autonomous vs `/brainstorm` interactive) and writes to two durable local files:
1. **Design Spec Document**: `.coliper/specs/<slug>-design.md` (ignored by git, local untracked workspace design spec).
2. **Durable Plan Store**: `.coliper/plans/<slug>.md` (ignored by git, local untracked workspace plan & state — execute via `/start-work`).

---

## Guidelines & Instructions

### Subagent Setup (Write Tool Registration)
Before orchestrating the planning phase, you must dynamically register the planner subagent with write permissions:
1. Extract the absolute path of the current workspace from `<user_information>`. Do NOT pass the literal string `<workspace_root>`.
2. Read the planner agent configuration file at `/path/to/workspace/.agents/plugins/coliper/agents/planner.md` via `view_file`. Halt and report immediately if the file is missing.
3. Extract `description` and `model` from the frontmatter, and the `system_prompt` (everything after the second `---` line, making sure to strip any `<line_number>:` prefixes if present). If `description` is missing, use "Subagent for planner". If `model` is missing, use "inherit".
4. Call `define_subagent` for `coliper_planner` using the extracted details and set `enable_write_tools: true, enable_subagent_tools: false, enable_mcp_tools: false`. Treat an "already exists" error as success; halt on any other errors.

### 1. Planning Phase Isolation & Dual Entry Points
- **STRICT CONSTRAINT**: Do NOT modify product code during the planning phase.
- **Dual Entry Points**:
  - **Interactive Entry Point (`/brainstorm`)**: Asks clarifying questions one at a time, presents options, and produces `.coliper/specs/<slug>-design.md` with explicit user approval.
  - **Autonomous Entry Point (`/ultraplan` Stage 0)**: Non-interactively interprets the user's idea at best to generate `.coliper/specs/<slug>-design.md` autonomously.
- Only inspect codebase files, read context documents, and write to `.coliper/specs/<slug>-design.md` and `.coliper/plans/<slug>.md`.

---

### 2. Mandatory Subagent Execution Workflow

#### Stage 0: Design Spec Resolution / Generation
- Determine whether a Design Spec already exists at `.coliper/specs/<slug>-design.md` (e.g. created via `/brainstorm`).
- If starting directly from `/ultraplan` without a pre-existing spec, autonomously interpret the user's idea to generate `.coliper/specs/<slug>-design.md` before invoking Metis.

#### Stage 1: Pre-Planning Spec Gap Analysis (MUST call `invoke_subagent` with `metis`)
- Call `invoke_subagent` with `TypeName: "metis"`.
- Instruct `metis` to load and inspect `.coliper/specs/<slug>-design.md` using `view_file`.
- Instruct `metis` to detect:
  - **Contradictions**: conflicting requirements within `.coliper/specs/<slug>-design.md`.
  - **Ambiguity**: vague terms requiring concrete clarification.
  - **Missing Constraints**: missing auth, rollback, concurrency, or test strategies.
  - **Brownfield & Topology Risks**: integration issues with existing codebase conventions.
- If `metis` returns `GAPS FOUND`, address reported gaps in `.coliper/specs/<slug>-design.md` before proceeding to plan drafting.

#### Stage 2: Strategic Plan Generation (MUST call `invoke_subagent` with `coliper_planner`)
- Call `invoke_subagent` with `TypeName: "coliper_planner"` and explicit `Model: "pro"` parameter.
- Provide `.coliper/specs/<slug>-design.md`, module paths, constraints, and `metis` gap report resolution.
- Instruct `coliper_planner` to read `.coliper/specs/<slug>-design.md` via `view_file` and write the plan **only** to `.coliper/plans/<slug>.md`. Do NOT write to any Antigravity system artifact.

#### Stage 3: Deep Plan Audit (MUST call `invoke_subagent` with `momus`)
- Call `invoke_subagent` with `TypeName: "momus"`.
- Instruct `momus` to verify `.coliper/plans/<slug>.md` against `.coliper/specs/<slug>-design.md` and the codebase:
  - **Reference Verification**: verify that all referenced file paths and symbols actually exist in the codebase.
  - **Executability & Task Granularity**: confirm every task is scoped to 2-5 files max and gives a concrete starting point aligned with `.coliper/specs/<slug>-design.md`.
  - **QA Scenario Executability**: ensure every task specifies exact tool invocations, concrete inputs, expected results, and evidence paths.
- Evaluate `momus` verdict:
  - `OKAY`: Proceed to user presentation.
  - `ITERATE`: Patch identified issues (max 2 rounds) and re-audit with `momus`.
  - `REJECT`: Surface missing critical decisions to the user.

---

### 3. Plan Specification Structure
Every plan generated by `/ultraplan` must include:
- **TL;DR & Overview**: Summary, deliverables, effort, and risk driver.
- **Scope**: Must-Have and Must-NOT-Have boundaries.
- **Execution Strategy**: Parallel execution waves and dependency matrix.
- **Granular Todos**: Step-by-step actionable tasks using checkbox syntax (`- [ ]`). Each task MUST include:
  - **References**: Exact file paths and line numbers.
  - **Acceptance Criteria**: Agent-executable assertions/commands.
  - **QA Scenarios**: Concrete tool invocation, steps, expected output, and evidence path verified by the `qa` subagent (`.coliper/plans/` or `.omo/evidence/`).
  - **Commit Instruction**: Type, scope, message, and files list.
- **Final Verification Wave**: F1 Compliance, F2 Code Quality, F3 Manual/Automated QA (driven by `qa` subagent), F4 Scope Fidelity.
- **Subagent Registry**: Recognized subagents for plan execution include `coliper_planner`, `coliper_implementer`, `coliper_qa`, `coliper_librarian` as write subagents and `metis`, `momus`, `reviewer`, `explorer` as read-only.
