# Time Tracker - 时间流记录 App

## 项目概述
一个"倒叙标记"式的时间记录工具。不是传统的"开始-结束"计时器，而是事后标记——做完了才说刚才在干嘛。

## 核心逻辑
1. **打开 App** → 自动记录当前时间戳作为起点，静默运行
2. **点击记录** → 输入"刚刚在做什么"（如"吃饭"）→ 把**上一次记录到现在**这段时间标记为该活动
3. **再次记录** → 输入新活动 → 自动承接上一段的结束时间，无缝衔接
4. 形成连续无间隙的时间线

## 关键设计
- **倒叙标记**：不是提前说要做什么，而是事后回顾刚才做了什么
- **无缝时间线**：每次标记自动承接上一段结束时间，没有空隙
- **不怕杀进程**：数据存 localStorage，每次记录写入时间戳，重新打开时读取上次时间戳计算间隔
- **极简 UI**：一个输入框 + 一个时间线列表

## 技术栈
- Next.js + TypeScript + Tailwind CSS
- 数据持久化：localStorage（不需要后端）
- 部署：Vercel
- 包管理：pnpm

## 数据结构
```typescript
interface TimeRecord {
  id: string;          // 唯一标识
  label: string;       // 活动名称（如"吃饭"、"搭 X Agent"）
  startTime: number;   // 开始时间戳 (ms)
  endTime: number;     // 结束时间戳 (ms)
}

// localStorage keys:
// "time-tracker-records": TimeRecord[]  — 所有已完成的记录
// "time-tracker-session-start": number  — 当前未标记时段的起始时间戳
```

## 工作流
- 确认后实现 → `pnpm build` 验证 → git commit & push → Vercel 自动部署
