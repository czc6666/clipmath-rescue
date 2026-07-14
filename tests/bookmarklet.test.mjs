import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBookmarklet } from '../src/bookmarklet.mjs';

test('builds a self-contained javascript bookmarklet with no network APIs', () => {
  const bookmarklet = buildBookmarklet();

  assert.match(bookmarklet, /^javascript:/);
  assert.match(decodeURIComponent(bookmarklet), /data-formula/);
  assert.doesNotMatch(decodeURIComponent(bookmarklet), /fetch\(|XMLHttpRequest|sendBeacon|WebSocket/);
});
