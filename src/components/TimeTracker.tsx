"use client";

import { useState, useMemo } from "react";
import { useTimeRecords } from "@/hooks/useTimeRecords";
import { formatDateKey } from "@/lib/time";
import { CurrentSession } from "./CurrentSession";
import { RecordInput } from "./RecordInput";
import { Timeline } from "./Timeline";
import { DataBackup } from "./DataBackup";
import { WechatCTA } from "./WechatCTA";

export function TimeTracker() {
  const {
    records,
    sessionStart,
    hydrated,
    addRecord,
    updateLabel,
    deleteLatestRecord,
    importRecords,
  } = useTimeRecords();

  const todayKey = formatDateKey(Date.now());
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const filteredRecords = useMemo(
    () => records.filter((r) => formatDateKey(r.startTime) === selectedDate),
    [records, selectedDate]
  );

  const latestRecord = records[records.length - 1];
  const canDeleteLatest =
    !!latestRecord && formatDateKey(latestRecord.startTime) === selectedDate;

  if (!hydrated) {
    return null;
  }

  const isToday = selectedDate === todayKey;

  return (
    <div className="flex flex-col gap-6">
      {sessionStart && <CurrentSession sessionStart={sessionStart} />}
      <RecordInput onSubmit={addRecord} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {isToday ? "今天" : "历史记录"}
        </span>
        <div className="flex items-center gap-2">
          {!isToday && (
            <button
              onClick={() => setSelectedDate(todayKey)}
              className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              回到今天
            </button>
          )}
          <input
            type="date"
            value={selectedDate}
            max={todayKey}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm bg-transparent border border-zinc-200 dark:border-zinc-700 rounded-lg px-2 py-1"
          />
        </div>
      </div>
      <Timeline
        records={filteredRecords}
        onUpdateLabel={updateLabel}
        onDeleteLatest={canDeleteLatest ? deleteLatestRecord : undefined}
        emptyMessage={isToday ? undefined : "这一天没有记录"}
      />
      <DataBackup records={records} onImport={importRecords} />
      <WechatCTA />
    </div>
  );
}
