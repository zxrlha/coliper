import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('plugins/coliper');

test('metis.json system prompt mandates view_file reading of .coliper/specs/<slug>-design.md', () => {
  const metisPath = path.join(BASE_PATH, 'agents', 'metis.json');
  assert.strictEqual(fs.existsSync(metisPath), true, 'metis.json should exist');
  const data = JSON.parse(fs.readFileSync(metisPath, 'utf8'));
  assert.ok(data.system_prompt.includes('.coliper/specs/<slug>-design.md'), 'metis prompt should cite .coliper/specs/<slug>-design.md');
  assert.ok(data.system_prompt.includes('view_file'), 'metis prompt should mandate view_file usage');
});

test('planner.json system prompt mandates design spec and metis report intake', () => {
  const plannerPath = path.join(BASE_PATH, 'agents', 'planner.json');
  assert.strictEqual(fs.existsSync(plannerPath), true, 'planner.json should exist');
  const data = JSON.parse(fs.readFileSync(plannerPath, 'utf8'));
  assert.ok(data.system_prompt.includes('.coliper/specs/<slug>-design.md'), 'planner prompt should cite .coliper/specs/<slug>-design.md');
  assert.ok(data.system_prompt.includes('Metis gap report'), 'planner prompt should mandate Metis report intake');
});

test('momus.json system prompt mandates plan audit against design spec document', () => {
  const momusPath = path.join(BASE_PATH, 'agents', 'momus.json');
  assert.strictEqual(fs.existsSync(momusPath), true, 'momus.json should exist');
  const data = JSON.parse(fs.readFileSync(momusPath, 'utf8'));
  assert.ok(data.system_prompt.includes('.coliper/specs/<slug>-design.md'), 'momus prompt should cite .coliper/specs/<slug>-design.md');
  assert.ok(data.system_prompt.includes('Design Spec'), 'momus prompt should cite Design Spec');
});

test('ultraplan skill specifies Dual Entry Points and Stage 0-3 workflow', () => {
  const ultraplanPath = path.join(BASE_PATH, 'skills', 'ultraplan', 'SKILL.md');
  assert.strictEqual(fs.existsSync(ultraplanPath), true, 'ultraplan/SKILL.md should exist');
  const content = fs.readFileSync(ultraplanPath, 'utf8');
  assert.ok(content.includes('Dual Entry Points'), 'ultraplan should document Dual Entry Points');
  assert.ok(content.includes('Stage 0: Design Spec Resolution / Generation'), 'ultraplan should define Stage 0');
  assert.ok(content.includes('.coliper/specs/<slug>-design.md'), 'ultraplan should reference design spec path');
});

test('coliper brainstorm skill output path and handoff target are aligned', () => {
  const bsPath = path.join(BASE_PATH, 'skills', 'brainstorm', 'SKILL.md');
  assert.strictEqual(fs.existsSync(bsPath), true, 'brainstorm/SKILL.md should exist in coliper plugin');
  const content = fs.readFileSync(bsPath, 'utf8');
  assert.ok(content.includes('.coliper/specs/<slug>-design.md'), 'brainstorm should output to .coliper/specs/<slug>-design.md');
  assert.ok(content.includes('metis') && content.includes('ultraplan'), 'brainstorm should hand off to metis & ultraplan');
});

test('coliper discipline rules include Design Spec First and Spec Analysis Discipline', () => {
  const rulesPath = path.join(BASE_PATH, 'rules', 'coliper-discipline.md');
  assert.strictEqual(fs.existsSync(rulesPath), true, 'coliper-discipline.md should exist');
  const content = fs.readFileSync(rulesPath, 'utf8');
  assert.ok(content.includes('Design Spec First'), 'rules should include Design Spec First');
  assert.ok(content.includes('Spec Analysis Discipline'), 'rules should include Spec Analysis Discipline');
});
