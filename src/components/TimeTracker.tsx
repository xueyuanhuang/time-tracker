"use client";

import { useTimeRecords } from "@/hooks/useTimeRecords";
import { CurrentSession } from "./CurrentSession";
import { RecordInput } from "./RecordInput";
import { Timeline } from "./Timeline";
import { DataBackup } from "./DataBackup";
import { WechatCTA } from "./WechatCTA";

export function TimeTracker() {
  const { records, sessionStart, hydrated, addRecord, updateLabel, deleteLatestRecord, importRecords } =
    useTimeRecords();

  if (!hydrated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {sessionStart && <CurrentSession sessionStart={sessionStart} />}
      <RecordInput onSubmit={addRecord} />
      <Timeline records={records} onUpdateLabel={updateLabel} onDeleteLatest={deleteLatestRecord} />
      <DataBackup records={records} onImport={importRecords} />
      <WechatCTA />
    </div>
  );
}
