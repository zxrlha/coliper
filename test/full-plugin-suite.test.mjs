import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('.agents/plugins/coliper');

test('.agents/plugins/coliper/plugin.json exists and is valid JSON', () => {
  const pluginJsonPath = path.join(BASE_PATH, 'plugin.json');
  assert.strictEqual(fs.existsSync(pluginJsonPath), true, 'plugin.json should exist in workspace plugin activation dir');
  const content = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf8'));
  assert.strictEqual(content.name, 'coliper');
  assert.ok(Array.isArray(content.skills));
  assert.ok(Array.isArray(content.agents));
});

test('all 7 skills are present in .agents/plugins/coliper/skills/', () => {
  const skills = [
    'init-deep',
    'ulw-plan',
    'start-work',
    'ulw-loop',
    'review-work',
    'remove-ai-slops',
    'ast-grep'
  ];

  for (const skill of skills) {
    const skillMd = path.join(BASE_PATH, 'skills', skill, 'SKILL.md');
    assert.strictEqual(fs.existsSync(skillMd), true, `Skill ${skill}/SKILL.md should exist under .agents/plugins/coliper/skills/`);
    const content = fs.readFileSync(skillMd, 'utf8');
    assert.ok(content.startsWith('---'), `Skill ${skill} should start with YAML frontmatter`);
  }
});

test('all 7 subagents are present in .agents/plugins/coliper/agents/', () => {
  const agents = ['explorer', 'librarian', 'planner', 'momus', 'metis', 'reviewer', 'implementer'];

  for (const agent of agents) {
    const agentJson = path.join(BASE_PATH, 'agents', `${agent}.json`);
    assert.strictEqual(fs.existsSync(agentJson), true, `Subagent ${agent}.json should exist under .agents/plugins/coliper/agents/`);
    const data = JSON.parse(fs.readFileSync(agentJson, 'utf8'));
    assert.strictEqual(data.name, agent);
  }
});

test('rules file coliper-discipline.md is present in .agents/plugins/coliper/rules/', () => {
  const rulesPath = path.join(BASE_PATH, 'rules', 'coliper-discipline.md');
  assert.strictEqual(fs.existsSync(rulesPath), true, 'coliper-discipline.md should exist under .agents/plugins/coliper/rules/');
  const content = fs.readFileSync(rulesPath, 'utf8');
  assert.ok(content.length > 0, 'coliper-discipline.md should not be empty');
});
