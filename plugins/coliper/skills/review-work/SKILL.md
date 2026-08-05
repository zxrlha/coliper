---
name: review-work
description: Multi-angle post-implementation code reviewer evaluating correctness, edge-case safety, security, and performance.
---

# `review-work` - Multi-Angle Post-Implementation Code Reviewer

Use `review-work` after feature implementation or bug fixes to perform rigorous, multi-angle code reviews evaluating correctness, edge cases, security vulnerabilities, and performance implications.

## Overview

`review-work` orchestrates specialized review personas (such as `reviewer` and `momus` subagents) to scrutinize code changes against original requirements, architectural patterns, and quality discipline rules before work is considered complete.

## Core Review Angles

### 1. Correctness & Behavioral Compliance
- **Requirement Verification**: Verify that the code satisfies all specified user requirements and functional specs.
- **API Contracts**: Ensure method signatures, parameters, return types, and interface contracts remain intact without breaking callers.
- **Logic & Flow Control**: Trace conditional branches, state transitions, and asynchronous control flows for logic errors.

### 2. Edge-Case Safety & Defeasibility
- **Boundary Conditions**: Test handling of empty collections, null/undefined states, zero values, and max limits.
- **Error & Exception Handling**: Ensure exceptions are caught, handled cleanly, and never swallowed or masked.
- **Concurrency & State**: Evaluate race conditions, thread safety, and mutation side-effects on shared state.

### 3. Security Audit
- **Input Sanitization & Injection**: Check for injection risks (SQL, Command, Path Traversal, XSS).
- **Authentication & Authorization**: Verify access control checks are enforced on all paths.
- **Data Protection & Secret Handling**: Ensure no secrets, API keys, or sensitive credentials are hardcoded or leaked into logs.

### 4. Performance & Resource Efficiency
- **Algorithmic Complexity**: Identify unnecessary \(O(N^2)\) loops, redundant DOM recalculations, or heavy synchronous ops on main loops.
- **Memory & Resource Leakage**: Verify open handles, sockets, timers, and event listeners are properly cleaned up.
- **Caching & I/O Overhead**: Check for redundant disk reads or network roundtrips.

## Workflow

1. **Diff Extraction**: Gather `git diff` or list of modified/created files.
2. **Subagent Delegation**:
   - Invoke `reviewer` subagent to audit correctness and verification evidence.
   - Invoke `momus` subagent to perform adversarial edge-case analysis.
3. **Synthesis & Feedback**:
   - Categorize findings into Critical Blockers, Major Suggestions, and Minor Polish.
   - Require concrete code fixes for all Critical and Major issues.
