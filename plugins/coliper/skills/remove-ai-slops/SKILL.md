---
name: remove-ai-slops
description: Behavior-preserving code cleanup skill to remove redundant AI comments, overly verbose scaffolding, and unnecessary wrapper code.
---

# `remove-ai-slops` - Behavior-Preserving Code Cleanup Skill

Use `remove-ai-slops` to scrub AI-generated code artifacts ("slop"), unnecessary boilerplate wrappers, overly narrative comments, and redundant abstractions while strictly preserving runtime behavior and test passes.

## Overview

AI-generated code often introduces verbose boilerplate, restatements of code logic in obvious comments, unused utility wrappers, and defensive micro-scaffolding that clutters codebases. `remove-ai-slops` systematically identifies and removes these noise elements.

## Target Cleanup Categories

### 1. Narrative & Trivial Comments
- **Obvious Inline Explanations**: Remove comments that merely rephrase the code (e.g. `// increment counter by 1` above `count++`).
- **AI Conversation Leaks**: Remove prompt responses, "Here is the implementation", or "Task completed" comments embedded in source files.
- **Outdated Todo / Debug Markers**: Clean up temporary debug print statements (`console.log`, `print`, `logger.debug`) left during development.

### 2. Overly Verbose Scaffolding & Wrappers
- **Pass-through Helper Functions**: Eliminate 1-liner functions that only call another function without adding abstraction value.
- **Redundant Try/Catch Blocks**: Remove try-catches that catch an error only to log it and rethrow without transformation.
- **Unnecessary Type Casting & Assertion Noise**: Simplify redundant type casts or excessive nullish assertion chains where types are statically known.

### 3. Redundant Code & Dead Artifacts
- **Unused Imports & Variables**: Strip dead imports, unused local variables, and unreachable code branches.
- **Duplicate Fallback Logic**: Remove redundant default assignments that duplicate existing default parameters or schema definitions.

## Preservation Rules & Safety Guarantees

1. **Behavioral Invariance**: Code behavior, public API contracts, and runtime output MUST remain strictly identical.
2. **Preserve Domain Comments**: Do NOT remove comments documenting complex algorithms, non-obvious invariants, security warnings, or external protocol quirks.
3. **Mandatory Test Verification**: Run the project test suite after cleanup to guarantee zero regressions.
