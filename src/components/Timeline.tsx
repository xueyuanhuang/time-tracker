"use client";

import type { TimeRecord } from "@/types";
import { formatDuration, formatTime } from "@/lib/time";

export function Timeline({ records }: { records: TimeRecord[] }) {
  if (records.length === 0) {
    return (
      <p className="text-center text-zinc-400 dark:text-zinc-500 py-8 text-sm">
        还没有记录，输入刚刚做的事情开始吧
      </p>
    );
  }

  const reversed = [...records].reverse();

  return (
    <div className="flex flex-col gap-3">
      {reversed.map((record) => (
        <div
          key={record.id}
          className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3"
        >
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-medium text-base">{record.label}</span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap">
              {formatDuration(record.endTime - record.startTime)}
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            {formatTime(record.startTime)} – {formatTime(record.endTime)}
          </p>
        </div>
      ))}
    </div>
  );
}
