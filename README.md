# ClipMath Rescue

在点击原网页剪藏器前，把微信公众号页面中的 SVG 数学公式恢复成 Markdown LaTeX 的极小 Bookmarklet。

## 为什么存在

部分微信数学文章把公式渲染为带 `data-formula` 的 SVG。Obsidian Web Clipper / Defuddle 可能保留正文，却丢掉这些公式。受影响用户已经在 [Obsidian Web Clipper #461](https://github.com/obsidianmd/obsidian-clipper/issues/461) 写过 DevTools 函数绕过。

ClipMath Rescue 不做新的完整剪藏器，只在原工作流旁做一步前置修复：

1. 打开含公式的微信文章；
2. 点击 Bookmarklet；
3. 看到转换数量；
4. 继续点击原来的网页剪藏器。

## 隐私与权限

- 无扩展权限、无站点权限；
- 只在用户主动点击时读取当前页 `[data-formula]` 节点；
- 不读取 Cookie、Token、浏览历史；
- 不上传 URL、标题、正文或公式；
- 未知结构会 Fail Closed，不部分修改；
- 刷新页面即可撤销。

## 当前状态

- Runnable：本地单元测试、微信 DOM Fixture、成功/失败/重复运行路径已通过。
- Installable：Bookmarklet 可从页面拖到书签栏。
- Public：待 GitHub Pages 部署验收。
- Observable：核心完成需由用户提交脱敏 Issue 回执；匿名流量不算 E4。
- Validated：尚无外部 E4/E5，不能宣称验证完成。

## 本地验证

```bash
npm ci
npm test
npm run check
npm run build
python3 -m http.server 4173 -d docs
```

## 能力边界

当前只识别：

- `data-formula-type="inline-equation"`
- `data-formula-type="block-equation"`

它不承诺修复所有 MathJax、KaTeX、MathML、SVG 或任意网站。平台结构变化时可能失效。

## 反馈

请使用仓库 Issue 模板，只提供：转换数量、所用剪藏器、公式是否正常和一个具体反馈。不要提交文章正文、私人 URL、凭证或公司数据。
