import { writeFileSync } from 'node:fs';
import { buildBookmarklet } from './bookmarklet.mjs';

export function buildPage() {
  const bookmarklet = buildBookmarklet();
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="在点击原网页剪藏器前，把微信公众号页面中的 SVG 数学公式恢复成 Markdown LaTeX。只处理当前页面，不上传正文。">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">
  <title>ClipMath Rescue｜剪藏前抢救网页公式</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <p class="eyebrow">免费 Bookmarklet · 无需安装扩展</p>
    <h1>剪藏前，先把网页公式抢救回来</h1>
    <p class="lead">适用于带 <code>data-formula</code> 的微信公众号数学文章。点击一次，把 SVG 公式改成 Markdown LaTeX，再继续用你原来的 Obsidian Web Clipper。</p>
    <section class="card" aria-labelledby="install-title">
      <h2 id="install-title">1. 把按钮拖到书签栏</h2>
      <a id="bookmarklet" class="bookmarklet" href="${bookmarklet}">抢救本页公式</a>
      <p class="hint">手机或无法拖拽？右键复制链接地址，新建书签后粘贴到网址栏。</p>
    </section>
    <section class="steps" aria-labelledby="use-title">
      <h2 id="use-title">2. 在含公式文章中使用</h2>
      <ol><li>打开要保存的微信公众号文章。</li><li>点击书签栏里的“抢救本页公式”。</li><li>看到“已转换 N 个公式”后，再点击原来的网页剪藏器。</li></ol>
    </section>
    <section class="card" aria-labelledby="sample-title">
      <h2 id="sample-title">没有现成文章？先用原问题样本验证</h2>
      <p><a class="secondary" href="https://mp.weixin.qq.com/s/fd0piUuEOtSYpjVws_b0fA" rel="noreferrer">打开公开测试文章</a></p>
      <p class="hint">在该文章运行后，预期识别 210 个公式。完成剪藏后只需回传转换数量和公式是否正常，不要粘贴正文。</p>
    </section>
    <section class="notice" aria-labelledby="boundary-title">
      <h2 id="boundary-title">边界与回退</h2>
      <ul><li>只处理当前页明确标记的 <code>data-formula</code> 公式，不读取 Cookie、Token、浏览历史。</li><li>不上传页面正文、标题、URL 或公式内容；本页也不含遥测脚本。</li><li>发现未知公式结构会安全停止，不部分修改页面。</li><li>刷新页面即可撤销；网站结构变化时可能失效。</li></ul>
    </section>
    <section class="feedback" aria-labelledby="feedback-title">
      <h2 id="feedback-title">请回传一条脱敏结果</h2>
      <p>完成核心流程后，请只告诉我：转换数量、剪藏后公式是否正常、使用的剪藏器。不要贴文章正文或私人链接。</p>
      <a class="secondary" href="https://github.com/czc6666/clipmath-rescue/issues/new?template=core-flow.yml">提交脱敏结果（需要 GitHub 登录）</a>
    </section>
    <p class="source">独立实验性工具，不隶属于微信或 Obsidian。<a href="https://github.com/czc6666/clipmath-rescue">查看源码</a></p>
  </main>
</body>
</html>`;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  writeFileSync(new URL('../docs/index.html', import.meta.url), buildPage());
}
