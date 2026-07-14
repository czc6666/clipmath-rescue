import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { patchMathFormulas } from '../src/patcher.mjs';

test('converts recognized inline and block formulas and returns a receipt', () => {
  const dom = new JSDOM(`<!doctype html><main>
    <span data-formula="M\\to N" data-formula-type="inline-equation"><svg></svg></span>
    <div data-formula="x^2 + y^2" data-formula-type="block-equation"><svg></svg></div>
  </main>`);

  const receipt = patchMathFormulas(dom.window.document);

  assert.equal(receipt.ok, true);
  assert.equal(receipt.converted, 2);
  assert.equal(dom.window.document.querySelector('span').textContent, '$M\\to N$');
  assert.equal(dom.window.document.querySelector('div').textContent, '\n$$\nx^2 + y^2\n$$\n');
});

test('fails closed without changing the page when a formula shape is unsupported', () => {
  const dom = new JSDOM(`<!doctype html><main>
    <span data-formula="M" data-formula-type="inline-equation"><svg id="keep"></svg></span>
    <span data-formula="N" data-formula-type="unknown-equation"><svg id="also-keep"></svg></span>
  </main>`);
  const before = dom.window.document.querySelector('main').innerHTML;

  const receipt = patchMathFormulas(dom.window.document);

  assert.deepEqual(receipt, { ok: false, code: 'UNSUPPORTED_FORMULA_SHAPE', converted: 0 });
  assert.equal(dom.window.document.querySelector('main').innerHTML, before);
});

test('second run reports already patched instead of wrapping delimiters again', () => {
  const dom = new JSDOM('<span data-formula="M" data-formula-type="inline-equation"><svg></svg></span>');
  patchMathFormulas(dom.window.document);
  const afterFirstRun = dom.window.document.body.innerHTML;

  const receipt = patchMathFormulas(dom.window.document);

  assert.deepEqual(receipt, { ok: false, code: 'ALREADY_PATCHED', converted: 0 });
  assert.equal(dom.window.document.body.innerHTML, afterFirstRun);
});
