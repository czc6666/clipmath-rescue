function bookmarkletProgram() {
  const supportedTypes = new Set(['inline-equation', 'block-equation']);
  const candidates = [...document.querySelectorAll('[data-formula]')];
  const showReceipt = (message, ok) => {
    const old = document.getElementById('clipmath-rescue-receipt');
    if (old) old.remove();
    const box = document.createElement('div');
    box.id = 'clipmath-rescue-receipt';
    box.setAttribute('role', 'status');
    box.style.cssText = [
      'position:fixed', 'z-index:2147483647', 'right:16px', 'bottom:16px',
      'max-width:360px', 'padding:12px 14px', 'border-radius:10px',
      'font:14px/1.45 system-ui,sans-serif', 'color:#fff',
      `background:${ok ? '#166534' : '#991b1b'}`, 'box-shadow:0 8px 30px #0005'
    ].join(';');
    box.textContent = message;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 8000);
  };

  if (candidates.length === 0) {
    showReceipt('ClipMath Rescue：未发现可识别公式，页面没有改动。', false);
    return;
  }
  if (candidates.every((element) => element.getAttribute('data-clipmath-rescued') === 'true')) {
    showReceipt('ClipMath Rescue：本页公式已经处理过。刷新页面可恢复原状。', false);
    return;
  }

  const pending = [];
  for (const element of candidates) {
    const formula = element.getAttribute('data-formula') ?? '';
    const type = element.getAttribute('data-formula-type') ?? '';
    if (!supportedTypes.has(type) || formula.trim() === '' || formula.length > 20000) {
      showReceipt('ClipMath Rescue：发现不支持的公式结构，已安全停止，页面没有改动。', false);
      return;
    }
    pending.push({ element, formula, block: type === 'block-equation' });
  }

  for (const item of pending) {
    item.element.textContent = item.block
      ? `\n$$\n${item.formula}\n$$\n`
      : `$${item.formula}$`;
    item.element.setAttribute('data-clipmath-rescued', 'true');
  }
  showReceipt(`ClipMath Rescue：已转换 ${pending.length} 个公式。现在请继续点击原来的网页剪藏器。刷新页面可撤销。`, true);
}

export function buildBookmarklet() {
  const source = `(${bookmarkletProgram.toString()})()`;
  return `javascript:${encodeURIComponent(source)}`;
}
