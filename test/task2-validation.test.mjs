import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('.agents/plugins/coliper');

const skills = [
  { id: 'init-deep', cmd: '/init-deep' },
  { id: 'ultraplan', cmd: '/ultraplan' },
  { id: 'start-work', cmd: '/start-work' }
];

test('core skill files exist and start with YAML frontmatter', () => {
  for (const { id } of skills) {
    const p = path.join(BASE_PATH, 'skills', id, 'SKILL.md');
    assert.strictEqual(fs.existsSync(p), true, `${id}/SKILL.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.startsWith('---'), `${id} should start with YAML frontmatter delimiter '---'`);
  }
});

test('core skills contain name and description', () => {
  for (const { id } of skills) {
    const p = path.join(BASE_PATH, 'skills', id, 'SKILL.md');
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.includes(`name: ${id}`), `${id} frontmatter should contain 'name: ${id}'`);
    assert.ok(content.includes('description:'), `${id} frontmatter should contain 'description:'`);
  }
});

test('start-work skill specifies execution sequence and review-work integration', () => {
  const p = path.join(BASE_PATH, 'skills', 'start-work', 'SKILL.md');
  const content = fs.readFileSync(p, 'utf8');
  assert.ok(content.includes('start-work'), 'start-work should define skill content');
  assert.ok(content.includes('review-work'), 'start-work should integrate review-work skill');
});
