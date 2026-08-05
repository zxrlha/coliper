import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const skills = [
  { id: 'init-deep', cmd: '/init-deep' },
  { id: 'ultraplan', cmd: '/ultraplan' },
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

test('start-work skill specifies Final Verification Wave and F1-F4 audit execution', () => {
  const p = path.resolve('plugins/coliper/skills/start-work/SKILL.md');
  const content = fs.readFileSync(p, 'utf8');
  assert.ok(content.includes('Final Verification Wave Execution Sequence'), 'start-work should define Final Verification Wave Execution Sequence');
  assert.ok(content.includes('F1: Plan Compliance Audit'), 'start-work should specify F1 Plan Compliance Audit');
  assert.ok(content.includes('F2: Code Quality & Discipline Review'), 'start-work should specify F2 Code Quality Review');
  assert.ok(content.includes('F3: System & Integration QA'), 'start-work should specify F3 System Integration QA');
  assert.ok(content.includes('F4: Scope Fidelity Audit'), 'start-work should specify F4 Scope Fidelity Audit');
  assert.ok(content.includes('review-work'), 'start-work should integrate review-work skill');
});
