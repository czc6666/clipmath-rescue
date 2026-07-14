const SUPPORTED_TYPES = new Set(['inline-equation', 'block-equation']);
const MAX_FORMULA_LENGTH = 20000;

export function patchMathFormulas(document) {
  const candidates = [...document.querySelectorAll('[data-formula]')];
  if (candidates.length === 0) {
    return { ok: false, code: 'NO_SUPPORTED_FORMULAS', converted: 0 };
  }
  if (candidates.every((element) => element.getAttribute('data-clipmath-rescued') === 'true')) {
    return { ok: false, code: 'ALREADY_PATCHED', converted: 0 };
  }

  const pending = [];
  for (const element of candidates) {
    const formula = element.getAttribute('data-formula') ?? '';
    const type = element.getAttribute('data-formula-type') ?? '';
    if (!SUPPORTED_TYPES.has(type) || formula.trim() === '' || formula.length > MAX_FORMULA_LENGTH) {
      return { ok: false, code: 'UNSUPPORTED_FORMULA_SHAPE', converted: 0 };
    }
    pending.push({ element, formula, block: type === 'block-equation' });
  }

  for (const item of pending) {
    item.element.textContent = item.block
      ? `\n$$\n${item.formula}\n$$\n`
      : `$${item.formula}$`;
    item.element.setAttribute('data-clipmath-rescued', 'true');
  }

  return { ok: true, code: 'PATCHED', converted: pending.length };
}
