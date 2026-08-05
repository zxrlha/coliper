# Coliper Plugin Design Document

**Date**: 2026-08-05  
**Topic**: Porting LazyCodex into Coliper (Antigravity Plugin)  
**Status**: Approved by User  

---

## 1. Overview & Objectives

**Coliper** is an AI development harness plugin for Antigravity, created by porting and evolving LazyCodex. Its purpose is to bring project memory generation (`/init-deep`), Prometheus strategic planning (`/ulw-plan`), durable Boulder progress plan execution (`/start-work`), Oracle-verified execution loops (`/ulw-loop`), and specialized subagent discipline to Antigravity.

---

## 2. Directory Structure & Architecture

Coliper follows standard Antigravity plugin conventions under `plugins/coliper/` with workspace-level availability via `.agents/`.

```
coliper/
├── plugins/
│   └── coliper/
│       ├── plugin.json
│       ├── skills/
│       │   ├── init-deep/
│       │   │   └── SKILL.md
│       │   ├── ulw-plan/
│       │   │   └── SKILL.md
│       │   ├── start-work/
│       │   │   └── SKILL.md
│       │   ├── ulw-loop/
│       │   │   └── SKILL.md
│       │   ├── review-work/
│       │   │   └── SKILL.md
│       │   ├── remove-ai-slops/
│       │   │   └── SKILL.md
│       │   └── ast-grep/
│       │       └── SKILL.md
│       ├── agents/
│       │   ├── explorer.json
│       │   ├── librarian.json
│       │   ├── planner.json
│       │   ├── momus.json
│       │   ├── metis.json
│       │   └── reviewer.json
│       ├── rules/
│       │   └── coliper-discipline.md
│       └── mcp_config.json
├── .agents/                    # Workspace active customizations link
└── README.md
```

---

## 3. Plugin Manifest & Subagent Definitions

### Plugin Manifest (`plugins/coliper/plugin.json`)
```json
{
  "name": "coliper",
  "version": "0.1.0",
  "description": "Agent harness for complex codebases in Antigravity: project memory, strategic planning, durable execution, and verified completion.",
  "skills": ["skills/*"],
  "agents": ["agents/*"],
  "rules": ["rules/*"]
}
```

### Registered Subagents (`plugins/coliper/agents/`)
Subagent roles use abstract model tiers (`pro`, `flash`, `flash_lite`) and instruction-based reasoning directives:

1. **`explorer`** (`explorer.json`): Read-only codebase navigator for symbol tracing, dependency mapping, and file indexing. (Model tier: `flash` / `pro`).
2. **`librarian`** (`librarian.json`): Documentation and external spec research agent. (Model tier: `flash`).
3. **`planner`** (`planner.json`): Prometheus strategic planner. Writes decision-complete implementation plans into `plans/<slug>.md` without touching product code. (Model tier: `pro`).
4. **`momus`** (`momus.json`): Critical code reviewer evaluating edge cases, unhandled exceptions, and code slop. (Model tier: `pro`).
5. **`metis`** (`metis.json`): Architecture & root-cause diagnostic advisor. (Model tier: `pro`).
6. **`reviewer`** (`reviewer.json`): Oracle verification agent requiring empirical runtime/test evidence before approving task completion. (Model tier: `pro`).

---

## 4. Skill Library

Skills use standard `/` command syntax in Antigravity:

| Skill | Slash Command | Description |
| --- | --- | --- |
| `init-deep` | `/init-deep` | Analyzes codebase structure, scores directory complexity, and creates hierarchical `AGENTS.md` context files near complex code modules. |
| `ulw-plan` | `/ulw-plan` | Prometheus strategic planner. Generates decision-complete implementation plan in `plans/<slug>.md`. |
| `start-work` | `/start-work` | Durable plan execution with Boulder progress tracking. Executes items in `plans/<slug>.md` until all checkboxes are verified complete. |
| `ulw-loop` | `/ulw-loop` | Self-referential loop that continues running until Oracle `reviewer` subagent verifies evidence-based completion. |
| `review-work` | `/review-work` | Multi-angle post-implementation review (correctness, performance, security, cleanliness). |
| `remove-ai-slops` | `/remove-ai-slops` | Behavior-preserving cleanup of AI boilerplate and redundant comments. |
| `ast-grep` | `/ast-grep` | Structural AST search and rewriting instructions using `sg`. |

---

## 5. Rules & Quality Discipline

`coliper-discipline.md` enforces:
- **Evidence Before Assertions**: Verification commands must be executed and confirmed before claiming completion.
- **No Masking Errors**: Prohibits swallowing errors, dummy fallback returns, or deleting failing unit tests.
- **Log Inspection**: Fetch and read full error logs before forming diagnostic hypotheses.
- **Respect Patterns**: Maintain established repo architecture and code style.

---

## 6. Verification Plan

1. **Schema & Parsing Validation**: Verify JSON and YAML frontmatter formatting across all `plugin.json`, `agents/*.json`, and `skills/*/SKILL.md` files.
2. **Antigravity Customization Discovery**: Symlink/copy `plugins/coliper/` into `.agents/plugins/coliper/` and confirm Antigravity loads skills and subagents without errors.
3. **Workflow Dry Run**: Test `/init-deep` and `/ulw-plan` commands to ensure prompt resolution and plan file output.
