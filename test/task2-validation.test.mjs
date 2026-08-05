import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const skills = [
  { id: 'init-deep', cmd: '/init-deep' },
  { id: 'ulw-plan', cmd: '/ulw-plan' },
  { id: 'start-work', cmd: '/start-work' },
  { id: 'ulw-loop', cmd: '/ulw-loop' }
];

test('core skill files exist and start with YAML frontmatter', () => {
  for (const { id } of skills) {
    const p = path.resolve(`plugins/coliper/skills/${id}/SKILL.md`);
    assert.strictEqual(fs.existsSync(p), true, `${id}/SKILL.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.startsWith('---'), `${id} should start with YAML frontmatter delimiter '---'`);
  }
});

test('core skills contain name, description, and slash commands', () => {
  for (const { id, cmd } of skills) {
    const p = path.resolve(`plugins/coliper/skills/${id}/SKILL.md`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.includes(`name: ${id}`), `${id} frontmatter should contain 'name: ${id}'`);
    assert.ok(content.includes('description:'), `${id} frontmatter should contain 'description:'`);
    assert.ok(content.includes(cmd), `${id}/SKILL.md should reference slash command ${cmd}`);
  }
});
