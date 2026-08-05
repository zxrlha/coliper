---
name: init-deep
description: Hierarchical project context generator that scans codebase directories, scores complexity, and writes AGENTS.md context files near complex code modules.
---

# `/init-deep` - Hierarchical Project Context Generator

Use `/init-deep` to generate and maintain hierarchical project context files (`AGENTS.md`) across complex codebases.

## Overview
`/init-deep` scans the codebase, measures complexity across directories, and creates localized context landmarks to help AI coding agents navigate and understand complex code modules without exceeding context limits.

## Guidelines & Instructions

### 1. Directory Structure Scanning
- Recursively scan the project tree from the workspace root.
- Ignore build artifacts, dependencies (`node_modules`, `vendor`, `.git`, `dist`, `build`, etc.), and temporary files.
- Map out key architectural modules, entry points, and module boundaries.

### 2. Directory Complexity Scoring
Score directory complexity using the following heuristics:
- **File Count & Lines of Code**: Number of source files and line count density.
- **Dependency & Import Graph**: Number of internal/external dependencies imported or exported.
- **Architectural Significance**: High-churn modules, core business logic, or complex control flows.
- **Complexity Tiering**:
  - **High Complexity**: Warrants a dedicated local `AGENTS.md` file in that directory.
  - **Medium/Low Complexity**: Summarized in parent or root `AGENTS.md`.

### 3. Writing Local `AGENTS.md` Context Files
In each high-complexity directory, write a targeted `AGENTS.md` containing:
- **Module Purpose**: Concise explanation of what this directory/module does.
- **Key Files & Entry Points**: List of primary source files with brief responsibilities.
- **Architecture & Design Patterns**: Core data structures, state flow, and design patterns used.
- **Gotchas & Constraints**: Non-obvious invariants, threading models, performance constraints, or edge cases.

### 4. Updating Root `AGENTS.md` Landmarks
- Maintain a high-level sitemap in the root `AGENTS.md`.
- Include relative links to all localized `AGENTS.md` files (e.g., `[Core Module](file:///path/to/module/AGENTS.md)`).
- Provide architectural summary and global guidelines for subagents operating in the repository.

### 5. Execution Workflow
1. Run discovery using `explorer` subagent or codebase search tools.
2. Calculate complexity scores for all major directories.
3. Generate or update local `AGENTS.md` files where complexity threshold is met.
4. Update the main root `AGENTS.md` file with updated navigation landmarks.
