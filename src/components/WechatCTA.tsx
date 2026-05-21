"use client";

import { useState } from "react";

export function WechatCTA() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("_xueyuanhuang").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col items-end">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm backdrop-blur transition-colors hover:text-zinc-900 active:opacity-80 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        内测群
      </button>

      {open && (
        <div className="mt-2 w-[min(calc(100vw-2rem),20rem)] rounded-xl border border-zinc-100 bg-white px-4 py-4 shadow-lg shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">AI 小作坊</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">
                用 AI 做的小工具都在这 · 新品尝鲜 · 反馈直达 · 一起共创
              </p>
            </div>
            <button
              type="button"
              aria-label="关闭内测群"
              onClick={() => setOpen(false)}
              className="shrink-0 text-sm leading-none text-zinc-300 transition-colors hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300"
            >
              ×
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#07C160] text-sm font-medium text-white transition-opacity active:opacity-80"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.253-1.736c0-3.556 3.277-6.429 7.324-6.429.204 0 .405.011.603.029C16.371 4.985 12.882 2.188 8.691 2.188zm-3.11 5.07a.96.96 0 110-1.92.96.96 0 010 1.92zm6.235 0a.96.96 0 110-1.92.96.96 0 010 1.92zM23.058 15.17c0-3.09-3.088-5.593-6.894-5.593-3.81 0-6.898 2.504-6.898 5.593 0 3.092 3.088 5.596 6.898 5.596a8.86 8.86 0 002.347-.32.636.636 0 01.527.073l1.402.82a.242.242 0 00.122.04.214.214 0 00.214-.215c0-.053-.02-.105-.035-.156l-.286-1.09a.432.432 0 01.158-.49c1.394-1.032 2.445-2.596 2.445-4.258zm-9.267-.705a.72.72 0 110-1.44.72.72 0 010 1.44zm4.744 0a.72.72 0 110-1.44.72.72 0 010 1.44z" />
            </svg>
            {copied ? "已复制微信号" : "复制微信号：_xueyuanhuang"}
          </button>
          <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">
            添加后备注「小作坊」拉你进群
          </p>
        </div>
      )}
    </div>
  );
}
