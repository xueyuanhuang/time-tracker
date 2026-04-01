"use client";

import { useTimeRecords } from "@/hooks/useTimeRecords";
import { CurrentSession } from "./CurrentSession";
import { RecordInput } from "./RecordInput";
import { Timeline } from "./Timeline";

export function TimeTracker() {
  const { records, sessionStart, hydrated, addRecord } = useTimeRecords();

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {sessionStart && <CurrentSession sessionStart={sessionStart} />}
      <RecordInput onSubmit={addRecord} />
      <Timeline records={records} />
    </div>
  );
}
