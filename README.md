# Coliper Plugin for Antigravity

**Coliper** is an AI development harness plugin natively built for Google Antigravity (AGY), ported from LazyCodex and Superpowers workflows. It provides structured planning, systematic debugging, test-driven development, automated code review, and strict subagent disciplines to guide AI-assisted software engineering.

---

## Key Slash Commands

Coliper equips your workspace with specialized slash commands for every phase of the development lifecycle:

→ See [WORKFLOW.md](WORKFLOW.md) for the full lifecycle walkthrough.

- **`/init-deep`**: Deep codebase research and repository analysis. Maps architecture, conventions, and dependencies to initialize workspace memory context before starting major work.
- **`/ultraplan`**: Prometheus strategic plan generation. Breaks complex feature requests into actionable, verifiable, step-by-step implementation plans.
- **`/brainstorm`**: Interactive spec authoring. Refines user ideas into fully formed design spec documents before plan drafting.
- **`/start-work`**: Executes implementation plans with test-driven development (TDD), strict subagent delegation, and continuous verification.
- **`/ulw-loop`**: An iterative task execution loop that handles multi-step implementation plans with automated checkpoint validation.
- **`/review-work`**: Conducts multi-dimensional code reviews checking functionality, test coverage, safety, edge cases, and architectural compliance.
- **`/remove-ai-slops`**: Scans the codebase to detect and clean up boilerplate AI slop, such as verbose/redundant comments, defensive try-catch wrappers, and dummy fallbacks.
- **`/ast-grep`**: Performs syntax-aware AST pattern matching and structural search across the repository.

---

## Discipline Subagents

Coliper includes 6 specialized subagents designed for distinct development roles:

- **`explorer`**: Codebase Researcher — maps project file structures, traces code paths, and locates relevant symbols without mutating files.
- **`librarian`**: External Documentation Specialist — retrieves, verifies, and summarizes external API docs, library references, and framework guides.
- **`planner`**: System Architect & Implementation Planner — creates detailed, step-by-step execution specs and milestone plans.
- **`momus`**: Design Critic & Requirement Auditor — challenges assumptions, reviews plan feasibility, and audits requirement completeness.
- **`metis`**: Systematic Debugger — investigates bug tracebacks, analyzes runtime failure logs, and pinpoints root causes empirically.
- **`reviewer`**: Quality & Safety Inspector — performs rigorous post-implementation code review before finishing branches.

---

## Plugin Structure

```
plugins/coliper/
├── plugin.json             # Manifest defining skills and subagents
├── mcp_config.json         # MCP server tool configuration (ast-grep)
├── skills/                 # Skill instructions with YAML frontmatter
│   ├── init-deep/
│   ├── ultraplan/
│   ├── start-work/
│   ├── ulw-loop/
│   ├── review-work/
│   ├── remove-ai-slops/
│   ├── ast-grep/
│   └── brainstorm/
├── agents/                 # Specialized subagent definitions
│   ├── explorer.json
│   ├── librarian.json
│   ├── planner.json
│   ├── momus.json
│   ├── metis.json
│   └── reviewer.json
└── rules/                  # Workspace discipline guidelines
    └── coliper-discipline.md
```

---

## Installation & Workspace Activation

### Workspace Activation (Recommended)
To activate Coliper for a specific project workspace, create a symlink under `.agents/plugins/`:

```bash
mkdir -p .agents/plugins
ln -s ../../plugins/coliper .agents/plugins/coliper
```

### Global Installation
To make Coliper available across all workspaces globally in Antigravity, copy the plugin folder into your global configuration root:

```bash
mkdir -p ~/.gemini/config/plugins
cp -r plugins/coliper ~/.gemini/config/plugins/coliper
```

---

## Running Tests

Run the test suite using Node.js native test runner:

```bash
node --test test/*.test.mjs
```
