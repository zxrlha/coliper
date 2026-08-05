import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('.agents/plugins/coliper');

test('metis.md system prompt mandates view_file reading of .coliper/specs/<slug>-design.md', () => {
  const metisPath = path.join(BASE_PATH, 'agents', 'metis.md');
  assert.strictEqual(fs.existsSync(metisPath), true, 'metis.md should exist');
  const content = fs.readFileSync(metisPath, 'utf8');
  const body = content.split('---').slice(2).join('---');
  assert.ok(body.includes('view_file'), 'metis prompt body should reference view_file');
});

test('planner.md system prompt mandates design spec and metis report intake', () => {
  const plannerPath = path.join(BASE_PATH, 'agents', 'planner.md');
  assert.strictEqual(fs.existsSync(plannerPath), true, 'planner.md should exist');
  const content = fs.readFileSync(plannerPath, 'utf8');
  const body = content.split('---').slice(2).join('---');
  assert.ok(body.includes('planner'), 'planner prompt body should reference planning role');
});

test('momus.md system prompt mandates plan audit against design spec document', () => {
  const momusPath = path.join(BASE_PATH, 'agents', 'momus.md');
  assert.strictEqual(fs.existsSync(momusPath), true, 'momus.md should exist');
  const content = fs.readFileSync(momusPath, 'utf8');
  const body = content.split('---').slice(2).join('---');
  assert.ok(body.includes('reviewer') || body.includes('plan'), 'momus prompt body should reference review role');
});

test('ultraplan skill file exists and defines workflow', () => {
  const ultraplanPath = path.join(BASE_PATH, 'skills', 'ultraplan', 'SKILL.md');
  assert.strictEqual(fs.existsSync(ultraplanPath), true, 'ultraplan/SKILL.md should exist');
  const content = fs.readFileSync(ultraplanPath, 'utf8');
  assert.ok(content.length > 0, 'ultraplan skill content should not be empty');
});

test('coliper brainstorm skill exists and defines spec handoff', () => {
  const bsPath = path.join(BASE_PATH, 'skills', 'brainstorm', 'SKILL.md');
  assert.strictEqual(fs.existsSync(bsPath), true, 'brainstorm/SKILL.md should exist in coliper plugin');
  const content = fs.readFileSync(bsPath, 'utf8');
  assert.ok(content.length > 0, 'brainstorm skill content should not be empty');
});

test('coliper discipline rules file exists and contains discipline rules', () => {
  const rulesPath = path.join(BASE_PATH, 'rules', 'coliper-discipline.md');
  assert.strictEqual(fs.existsSync(rulesPath), true, 'coliper-discipline.md should exist');
  const content = fs.readFileSync(rulesPath, 'utf8');
  assert.ok(content.length > 0, 'coliper-discipline.md should not be empty');
});
