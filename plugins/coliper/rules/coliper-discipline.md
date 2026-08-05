# Coliper Quality Discipline Rules

1. **Evidence Before Assertions**: Never claim a task or bugfix is complete without running verification commands and confirming clean output.
2. **No Masking Errors**: Do not swallow exceptions, return dummy fallback data, comment out broken assertions, or delete failing tests.
3. **Log Inspection**: Read full, un-truncated logs and tracebacks before diagnosing runtime or build failures.
4. **Codebase Respect**: Preserve existing architectural patterns, code style, and maintain concise, unbloated code.
5. **Design Spec First**: Non-trivial feature requests and architecture plans MUST start with a Design Spec written to `.coliper/specs/<slug>-design.md` (created either autonomously via `/ultraplan` or interactively via `/brainstorm`).
6. **Spec Analysis Discipline**: Before generating an implementation plan, `metis` MUST read and analyze `.coliper/specs/<slug>-design.md` using `view_file` to surface gaps, contradictions, and missing constraints.
