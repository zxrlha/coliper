import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('.agents/plugins/coliper');

test('plugin.json exists and is valid', () => {
  const pluginPath = path.join(BASE_PATH, 'plugin.json');
  assert.strictEqual(fs.existsSync(pluginPath), true);
  const data = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  assert.strictEqual(data.name, 'coliper');
  assert.ok(Array.isArray(data.skills));
  assert.ok(Array.isArray(data.agents));
});

test('subagent md files exist and contain valid roles', () => {
  const agents = ['explorer', 'librarian', 'planner', 'momus', 'metis', 'reviewer', 'implementer', 'qa'];
  for (const agent of agents) {
    const p = path.join(BASE_PATH, 'agents', `${agent}.md`);
    assert.strictEqual(fs.existsSync(p), true, `${agent}.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    const parts = content.split('---');
    assert.ok(parts.length >= 3, `${agent}.md should have frontmatter and body`);
    assert.ok(parts[1].includes(`name: ${agent}`), `Agent ${agent} frontmatter should state name`);
    const body = parts.slice(2).join('---').trim();
    assert.ok(body.length > 0, `Agent ${agent} should have non-empty prompt body`);
  }
});
