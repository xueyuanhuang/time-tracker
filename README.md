# 时间沙漏

一个「倒叙标记」式的时间记录工具。不是提前说要做什么，而是事后回顾刚才做了什么。

**在线使用：https://time-tracker-78s.pages.dev**

## 使用方式

1. 打开 App，计时器自动启动
2. 做完一件事，输入「刚才在做什么」，点击记录
3. 自动承接上一段结束时间，形成连续无间隙的时间线
4. 支持 iPhone 添加到主屏幕，体验如原生 App

## 特性

- 倒叙标记：事后回顾，不打断心流
- 无缝时间线：每次标记自动衔接，没有空隙
- 离线可用：数据存本地 IndexedDB，无需联网
- PWA 支持：添加到主屏幕，全屏无地址栏
- 导出备份：一键导出/导入 JSON，数据不丢失
- 编辑撤销：点击记录可修改，最新记录可撤销

## 技术栈

- Next.js + TypeScript + Tailwind CSS
- IndexedDB 本地持久化
- Service Worker 离线缓存
- Cloudflare Pages 部署

## 本地开发

```bash
pnpm install
pnpm dev
```

## 联系作者

微信：`_xueyuanhuang`（备注「小作坊」进 AI 小作坊群）

用 AI 做的小工具都在这，新品尝鲜、反馈直达、一起共创。
