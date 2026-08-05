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
