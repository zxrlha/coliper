---
name: ulw-loop
description: Oracle-verified iterative execution loop for open-ended tasks. Runs until the reviewer subagent verifies completion through empirical evidence.
---

# `/ulw-loop` - Oracle-Verified Iterative Execution Loop

Use `/ulw-loop` to run autonomous, iterative execution loops for complex or open-ended tasks until completion is empirically verified by an Oracle reviewer.

## Overview
`/ulw-loop` continuously iterates on a goal by performing incremental changes, running diagnostic checks, and spawning the `reviewer` subagent after each cycle. The loop persists until empirical evidence confirms the objective is satisfied.

## Guidelines & Instructions

### 1. Iteration Limits & Modes
- **Normal Mode Cap**: Capped at maximum 100 iterations.
- **Ultrawork Mode Cap**: Capped at maximum 500 iterations when operating under explicit ultrawork directives.
- Each cycle consists of: Planning micro-step -> Executing code edits -> Verification -> Oracle review.

### 2. Empirical Verification Requirement
- Never accept self-reported completion from implementers or text claims.
- Require concrete empirical evidence for verification:
  - Test runner output logs (e.g., passing unit/integration tests).
  - Build/compilation logs with 0 exit code.
  - Runtime execution logs or diagnostic outputs.

### 3. Oracle Reviewer Subagent Invocation
- At the end of each iteration cycle, spawn the `reviewer` subagent (Oracle).
- Pass the full context, user requirements, current diff, and verification execution logs.
- The `reviewer` evaluates whether the goal is 100% achieved based on evidence.

### 4. Loop Control Flow
1. Check current iteration counter against max cap (100 in normal mode, 500 in ultrawork mode). If cap reached without success, stop and request user guidance.
2. Perform next logical implementation or fix step.
3. Run verification test suite / build.
4. Call `reviewer` subagent to audit result.
5. If `reviewer` returns `VERIFIED_COMPLETE`, exit loop and report success.
6. If `reviewer` returns `INCOMPLETE` with feedback, incorporate feedback and proceed to next iteration.

### 5. Loop Halting Criteria
- Exits ONLY when:
  - Oracle `reviewer` confirms completion with verifiable evidence (`VERIFIED_COMPLETE`).
  - Max iteration limit (100 / 500) is reached.
  - Unrecoverable environment error occurs.
