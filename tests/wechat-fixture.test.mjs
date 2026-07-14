import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { patchMathFormulas } from '../src/patcher.mjs';

const html = `<!doctype html><article>
  <p>形式位于 <span data-formula="\\mathbf{Mod}" data-formula-type="inline-equation"><svg aria-label="插图"></svg></span> 中。</p>
  <div data-formula="f:M\\rightarrow N" data-formula-type="block-equation"><svg></svg></div>
</article>`;

test('wechat-style fixture preserves formulas as markdown delimiters without retaining SVG', () => {
  const dom = new JSDOM(html);

  const receipt = patchMathFormulas(dom.window.document);
  const output = dom.window.document.body.textContent;

  assert.equal(receipt.converted, 2);
  assert.match(output, /\$\\mathbf\{Mod\}\$/);
  assert.match(output, /\$\$\s*f:M\\rightarrow N\s*\$\$/);
  assert.equal(dom.window.document.querySelectorAll('svg').length, 0);
});
