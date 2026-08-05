# Coliper Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the **coliper** plugin for Antigravity, porting LazyCodex capabilities (project memory `/init-deep`, strategic planning `/ulw-plan`, durable plan execution `/start-work`, verified completion `/ulw-loop`, and discipline subagents).

**Architecture:** Coliper is structured as a native Antigravity plugin under `plugins/coliper/` with skills in standard `SKILL.md` format, registered subagent JSON manifests using abstract model tiers (`pro`, `flash`, `flash_lite`), workflow discipline rules, and a workspace activation link in `.agents/`.

**Tech Stack:** Antigravity Plugin Specification (JSON manifests, YAML frontmatter Markdown skills, Node.js test runner for validation).

## Global Constraints

- Skills use slash command syntax (`/init-deep`, `/ulw-plan`, `/start-work`, `/ulw-loop`).
- Subagent definitions use abstract model tiers (`pro`, `flash`, `flash_lite`).
- Every `SKILL.md` file must contain valid YAML frontmatter with `name` and `description`.
- All JSON manifest files must be valid, parseable JSON.

---

### Task 1: Plugin Manifest, Quality Discipline Rules, and Registered Subagents

**Files:**
- Create: `plugins/coliper/plugin.json`
- Create: `plugins/coliper/rules/coliper-discipline.md`
- Create: `plugins/coliper/agents/explorer.json`
- Create: `plugins/coliper/agents/librarian.json`
- Create: `plugins/coliper/agents/planner.json`
- Create: `plugins/coliper/agents/momus.json`
- Create: `plugins/coliper/agents/metis.json`
- Create: `plugins/coliper/agents/reviewer.json`
- Create: `test/task1-validation.test.mjs`

**Interfaces:**
- Produces: Base plugin configuration and registered subagent roles (`explorer`, `librarian`, `planner`, `momus`, `metis`, `reviewer`).

- [ ] **Step 1: Write test to validate plugin.json and agent JSON manifests**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('plugin.json exists and is valid', () => {
  const pluginPath = path.resolve('plugins/coliper/plugin.json');
  assert.strictEqual(fs.existsSync(pluginPath), true);
  const data = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  assert.strictEqual(data.name, 'coliper');
  assert.ok(Array.isArray(data.skills));
  assert.ok(Array.isArray(data.agents));
});

test('subagent json files exist and contain valid roles', () => {
  const agents = ['explorer', 'librarian', 'planner', 'momus', 'metis', 'reviewer'];
  for (const agent of agents) {
    const p = path.resolve(`plugins/coliper/agents/${agent}.json`);
    assert.strictEqual(fs.existsSync(p), true, `${agent}.json should exist`);
    const content = JSON.parse(fs.readFileSync(p, 'utf8'));
    assert.ok(content.name, `Agent ${agent} should have a name`);
    assert.ok(content.system_prompt || content.prompt, `Agent ${agent} should have prompt instructions`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/task1-validation.test.mjs`  
Expected: FAIL (files missing)

- [ ] **Step 3: Implement plugin.json, rules, and subagent JSON definitions**

Create `plugins/coliper/plugin.json`:
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

Create `plugins/coliper/rules/coliper-discipline.md`:
```markdown
# Coliper Quality Discipline Rules

1. **Evidence Before Assertions**: Never claim a task or bugfix is complete without running verification commands and confirming clean output.
2. **No Masking Errors**: Do not swallow exceptions, return dummy fallback data, comment out broken assertions, or delete failing tests.
3. **Log Inspection**: Read full, un-truncated logs and tracebacks before diagnosing runtime or build failures.
4. **Codebase Respect**: Preserve existing architectural patterns, code style, and maintain concise, unbloated code.
```

Create subagents (`explorer.json`, `librarian.json`, `planner.json`, `momus.json`, `metis.json`, `reviewer.json`) with detailed system prompts and model tiers.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/task1-validation.test.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add plugins/coliper test/task1-validation.test.mjs
git commit -m "feat(coliper): add plugin manifest, discipline rules, and registered subagents"
```

---

### Task 2: Core Workflow Skills (`init-deep`, `ulw-plan`, `start-work`, `ulw-loop`)

**Files:**
- Create: `plugins/coliper/skills/init-deep/SKILL.md`
- Create: `plugins/coliper/skills/ulw-plan/SKILL.md`
- Create: `plugins/coliper/skills/start-work/SKILL.md`
- Create: `plugins/coliper/skills/ulw-loop/SKILL.md`
- Create: `test/task2-validation.test.mjs`

**Interfaces:**
- Consumes: Subagent definitions from Task 1 (`planner`, `reviewer`, `explorer`).
- Produces: Four core workflow skills callable via slash commands `/init-deep`, `/ulw-plan`, `/start-work`, `/ulw-loop`.

- [ ] **Step 1: Write test to validate frontmatter and structure of core skills**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('core skills have valid frontmatter and contents', () => {
  const skills = ['init-deep', 'ulw-plan', 'start-work', 'ulw-loop'];
  for (const skill of skills) {
    const p = path.resolve(`plugins/coliper/skills/${skill}/SKILL.md`);
    assert.strictEqual(fs.existsSync(p), true, `${skill}/SKILL.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.startsWith('---'), `${skill} should start with YAML frontmatter`);
    assert.ok(content.includes(`name: ${skill}`), `${skill} should state name in frontmatter`);
    assert.ok(content.includes('description:'), `${skill} should include description in frontmatter`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/task2-validation.test.mjs`  
Expected: FAIL (skills missing)

- [ ] **Step 3: Implement core workflow skills (`init-deep`, `ulw-plan`, `start-work`, `ulw-loop`)**

- `/init-deep`: Scans directories, scores complexity, generates hierarchical `AGENTS.md` context files.
- `/ulw-plan`: Prometheus strategic planner. Spawns `planner` subagent, writes `plans/<slug>.md`, never touches product code.
- `/start-work`: Durable plan execution. Reads `plans/<slug>.md`, executes items sequentially, maintains Boulder progress tracking.
- `/ulw-loop`: Iterative completion loop. Executes work until Oracle `reviewer` verifies completion with concrete empirical evidence.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/task2-validation.test.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add plugins/coliper/skills test/task2-validation.test.mjs
git commit -m "feat(coliper): implement core workflow skills (init-deep, ulw-plan, start-work, ulw-loop)"
```

---

### Task 3: Specialized Skills & Tool Configurations

**Files:**
- Create: `plugins/coliper/skills/review-work/SKILL.md`
- Create: `plugins/coliper/skills/remove-ai-slops/SKILL.md`
- Create: `plugins/coliper/skills/ast-grep/SKILL.md`
- Create: `plugins/coliper/mcp_config.json`
- Create: `test/task3-validation.test.mjs`

**Interfaces:**
- Consumes: Registered subagents (`momus`, `reviewer`).
- Produces: Multi-angle post-review, AI code cleanup, and ast-grep AST search skills.

- [ ] **Step 1: Write test for specialized skills and mcp_config.json**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('specialized skills and mcp_config are valid', () => {
  const skills = ['review-work', 'remove-ai-slops', 'ast-grep'];
  for (const skill of skills) {
    const p = path.resolve(`plugins/coliper/skills/${skill}/SKILL.md`);
    assert.strictEqual(fs.existsSync(p), true, `${skill}/SKILL.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.includes(`name: ${skill}`));
  }
  const mcpPath = path.resolve('plugins/coliper/mcp_config.json');
  assert.strictEqual(fs.existsSync(mcpPath), true);
  JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/task3-validation.test.mjs`  
Expected: FAIL

- [ ] **Step 3: Implement specialized skills and mcp_config.json**

Create `review-work/SKILL.md`, `remove-ai-slops/SKILL.md`, `ast-grep/SKILL.md`, and `mcp_config.json`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test test/task3-validation.test.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add plugins/coliper/skills plugins/coliper/mcp_config.json test/task3-validation.test.mjs
git commit -m "feat(coliper): implement specialized skills and mcp_config"
```

---

### Task 4: Workspace Activation, Integrated Validation & Documentation

**Files:**
- Create: `.agents/plugins/coliper` (Directory symlink or workspace copy)
- Create: `test/full-plugin-suite.test.mjs`
- Modify: `README.md`

**Interfaces:**
- Consumes: Entire `plugins/coliper/` plugin hierarchy.
- Produces: Fully active workspace plugin and complete project documentation.

- [ ] **Step 1: Write comprehensive test for complete plugin suite and workspace integration**

```javascript
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

test('full coliper plugin structure is valid and linked in .agents', () => {
  const activePlugin = path.resolve('.agents/plugins/coliper/plugin.json');
  assert.strictEqual(fs.existsSync(activePlugin), true, '.agents plugin link should exist');
  
  const manifest = JSON.parse(fs.readFileSync(activePlugin, 'utf8'));
  assert.strictEqual(manifest.name, 'coliper');

  const expectedSkills = [
    'init-deep', 'ulw-plan', 'start-work', 'ulw-loop',
    'review-work', 'remove-ai-slops', 'ast-grep'
  ];

  for (const skill of expectedSkills) {
    const p = path.resolve(`.agents/plugins/coliper/skills/${skill}/SKILL.md`);
    assert.strictEqual(fs.existsSync(p), true, `Skill ${skill} should be present in .agents`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/full-plugin-suite.test.mjs`  
Expected: FAIL

- [ ] **Step 3: Create .agents plugin activation, update README.md**

1. Set up `.agents/plugins/coliper` linking/copying `plugins/coliper`.
2. Write root `README.md` detailing Coliper installation, features, subagent roles, and slash commands (`/init-deep`, `/ulw-plan`, `/start-work`, `/ulw-loop`).

- [ ] **Step 4: Run full test suite to verify everything passes**

Run: `node --test test/*.test.mjs`  
Expected: PASS (all test files pass cleanly)

- [ ] **Step 5: Commit**

```bash
git add .agents README.md test/full-plugin-suite.test.mjs
git commit -m "feat(coliper): enable workspace plugin activation, full test suite, and README documentation"
```
