# 验证记录

## 唯一目标行为

外部目标用户在含 `data-formula` 的微信数学文章中运行 Bookmarklet，完成公式转换，再用原剪藏器保存，并主动提交脱敏结果。

## 本地事件与证据出口

| 事件 | 本地表现 | 外部可核验出口 |
|---|---|---|
| `patch_succeeded` | 绿色回执：已转换 N 个公式 | GitHub Issue：转换数量 + 剪藏结果 |
| `patch_failed` | 红色回执：无公式 / 未知结构 / 已处理 | GitHub Issue：失败类型 + 脱敏反馈 |
| `feedback_clicked` | 打开 GitHub Issue 模板 | 新 Issue |
| `reuse` | 用户再次在另一篇文章运行 | Issue 中主动说明继续使用/复用要求 |
| `payment_intent` | 当前无付款入口 | 只有明确询价/采购承诺才记录 |

没有远程遥测；不能从页面访问或匿名事件推断 E4。Owner 自测只记在本文件，全部扣除。

## Owner baseline

- 单元/Fixture 测试：Owner，自测，不计外部证据。
- 本地页面浏览器验收：Owner，自测，不计外部证据。
- 真实微信文章浏览器验收：Owner，自测，不计外部证据。
- GitHub Pages 公开验收：Owner，自测，不计外部证据。
- 测试 Issue（若创建）：Owner，自测，关闭并标记，不计外部证据。

## E4 门槛

必须同时有：

1. 非 Owner 的目标用户运行核心入口；
2. 完成公式转换和后续剪藏；
3. 主动提供转换数量、剪藏是否正常、具体反馈/复用要求/询价之一；
4. 可从原问题现场回复或仓库 Issue 读回。

只有访问、Star、Fork、拖入书签栏或“看起来不错”均不算。

## 单渠道发布记录

- 发布时间：2026-07-14T15:35:14Z
- 唯一现场：<https://github.com/obsidianmd/obsidian-clipper/issues/461#issuecomment-4971014242>
- 发布账号：`czc6666`（Owner）
- 发布范围：仅该 Issue 一次回复；未发其他 Issue、Reddit、X、商店或私信。
- 发布后即时读回：评论存在；产品仓 Issue 数为 0。
- 当前 E4/E5：0 / 0。Owner 的 210 公式 E2E 仍全部扣除。
