"use client";

import { useRef } from "react";
import type { TimeRecord } from "@/types";

interface DataBackupProps {
  records: TimeRecord[];
  onImport: (records: TimeRecord[]) => void;
}

export function DataBackup({ records, onImport }: DataBackupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify(records, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `时间沙漏-备份-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result as string) as TimeRecord[];
        if (
          Array.isArray(imported) &&
          imported.every((r) => r.id && r.label && r.startTime && r.endTime)
        ) {
          onImport(imported);
        } else {
          alert("文件格式不正确");
        }
      } catch {
        alert("无法解析文件");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
      <button
        onClick={handleExport}
        disabled={records.length === 0}
        className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium disabled:opacity-40 transition-opacity"
      >
        导出备份
      </button>
      <label className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium flex items-center justify-center cursor-pointer">
        导入恢复
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}
