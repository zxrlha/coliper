import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { test } from 'node:test';

const BASE_PATH = path.resolve('.agents/plugins/coliper');

test('specialized skill files exist with valid YAML frontmatter', () => {
  const skills = ['review-work', 'remove-ai-slops', 'ast-grep'];
  for (const skill of skills) {
    const p = path.join(BASE_PATH, 'skills', skill, 'SKILL.md');
    assert.strictEqual(fs.existsSync(p), true, `${skill}/SKILL.md should exist`);
    const content = fs.readFileSync(p, 'utf8');
    assert.ok(content.startsWith('---'), `${skill} should start with YAML frontmatter`);
    assert.ok(content.includes(`name: ${skill}`), `${skill} should state name in frontmatter`);
    assert.ok(content.includes('description:'), `${skill} should state description in frontmatter`);
  }
});

test('mcp_config.json exists and contains valid server definitions', () => {
  const mcpPath = path.join(BASE_PATH, 'mcp_config.json');
  assert.strictEqual(fs.existsSync(mcpPath), true, 'mcp_config.json should exist');
  const parsed = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
  assert.ok(typeof parsed === 'object' && parsed !== null, 'mcp_config.json should parse as an object');
  assert.ok(parsed.mcpServers, 'mcp_config.json should contain mcpServers configuration');
});
