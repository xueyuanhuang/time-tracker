"use client";

import { useState, useRef, useEffect } from "react";
import type { TimeRecord } from "@/types";
import { formatDuration, formatTime } from "@/lib/time";

interface TimelineProps {
  records: TimeRecord[];
  onUpdateLabel: (id: string, label: string) => void;
}

function TimelineItem({
  record,
  onUpdateLabel,
}: {
  record: TimeRecord;
  onUpdateLabel: (id: string, label: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(record.label);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      const el = textareaRef.current;
      el.focus();
      el.selectionStart = el.value.length;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [editing]);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== record.label) {
      onUpdateLabel(record.id, trimmed);
    } else {
      setEditValue(record.label);
    }
    setEditing(false);
  };

  return (
    <div
      className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3"
      onClick={() => {
        if (!editing) {
          setEditValue(record.label);
          setEditing(true);
        }
      }}
    >
      <div className="flex items-start justify-between gap-2">
        {editing ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              const el = e.target;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                setEditValue(record.label);
                setEditing(false);
              }
            }}
            onBlur={handleSave}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-base font-medium bg-transparent outline-none resize-none border-b border-zinc-300 dark:border-zinc-600 pb-0.5 leading-normal"
            rows={1}
          />
        ) : (
          <span className="font-medium text-base whitespace-pre-wrap cursor-pointer">
            {record.label}
          </span>
        )}
        <span className="text-sm text-zinc-400 dark:text-zinc-500 font-mono whitespace-nowrap pt-0.5">
          {formatDuration(record.endTime - record.startTime)}
        </span>
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        {formatTime(record.startTime)} – {formatTime(record.endTime)}
      </p>
    </div>
  );
}

export function Timeline({ records, onUpdateLabel }: TimelineProps) {
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
        <TimelineItem
          key={record.id}
          record={record}
          onUpdateLabel={onUpdateLabel}
        />
      ))}
    </div>
  );
}
