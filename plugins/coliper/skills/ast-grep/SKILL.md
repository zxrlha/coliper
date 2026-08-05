---
name: ast-grep
description: Structural AST search and refactoring instructions using `sg` for precise syntax-tree code manipulation.
---

# `ast-grep` - Structural Syntax Tree Search and Refactoring

Use `ast-grep` (invoked via `sg` CLI or AST-grep MCP tools) for syntax-aware pattern matching, structural code search, and precise multi-file refactoring across complex codebases.

## Overview

`ast-grep` parses source code into Abstract Syntax Trees (AST), allowing structural searches that ignore formatting, whitespace, and variable naming differences. Unlike text-based `grep` or regex, `ast-grep` understands code structure across JavaScript, TypeScript, Python, Go, Rust, Java, C/C++, and HTML.

## Key Capabilities & Patterns

### 1. Structural Pattern Matching
Match expressions using `$VAR` wildcards to capture syntax nodes:
- **Function Invocation Match**: `console.log($$$ARGS)`
- **Async/Await Pattern**: `await $FUNC($$$ARGS)`
- **React Hook Pattern**: `useEffect(() => { $$$BODY }, [$$$DEPS])`

### 2. Precise Multi-File Refactoring (`sg rewrite`)
Perform syntax-safe code transformations:
```bash
# Rewrite deprecated API calls across codebase
sg run --pattern 'oldApi($A, $B)' --rewrite 'newApi({ first: $A, second: $B })' --lang typescript
```

### 3. Rules & YAML Configurations
Define custom linting and refactoring rules using YAML files:
```yaml
id: no-direct-eval
language: javascript
rule:
  pattern: eval($EXPR)
message: "Avoid using eval() due to security risks."
severity: error
```

## Integration Workflow

1. **Search**: Use `sg scan` or pattern match queries to locate structural patterns.
2. **Verify**: Preview matches to confirm precision (avoiding false positives from comments or strings).
3. **Rewrite**: Apply AST modifications with `sg run --rewrite` or via MCP tool integration.
4. **Test**: Run verification tests to validate refactored code syntax and behavior.
