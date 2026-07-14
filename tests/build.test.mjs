import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPage } from '../src/build.mjs';

test('builds a privacy-bounded page with a real bookmarklet and feedback outlet', () => {
  const html = buildPage();

  assert.match(html, /href="javascript:/);
  assert.match(html, /issues\/new\?template=core-flow\.yml/);
  assert.match(html, /mp\.weixin\.qq\.com\/s\/fd0piUuEOtSYpjVws_b0fA/);
  assert.match(html, /预期识别 210 个公式/);
  assert.match(html, /connect-src 'none'/);
  assert.doesNotMatch(html, /<script|fonts\.google|google-analytics|plausible|umami/i);
});
