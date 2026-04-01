"use client";

import { useState, useEffect, useCallback } from "react";
import type { TimeRecord } from "@/types";
import { generateId } from "@/lib/time";
import {
  getRecords,
  putRecord,
  deleteRecord as dbDeleteRecord,
  getSessionStart,
  setSessionStart,
  migrateFromLocalStorage,
} from "@/lib/db";

export function useTimeRecords() {
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const [sessionStartVal, setSessionStartVal] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function init() {
      await migrateFromLocalStorage();

      const storedRecords = await getRecords();
      setRecords(storedRecords);

      const lastRecord = storedRecords[storedRecords.length - 1];
      const start = lastRecord ? lastRecord.endTime : ((await getSessionStart()) || Date.now());
      await setSessionStart(start);
      setSessionStartVal(start);
      setHydrated(true);
    }
    init();
  }, []);

  const addRecord = useCallback(
    async (label: string) => {
      if (!sessionStartVal) return;

      const now = Date.now();
      const newRecord: TimeRecord = {
        id: generateId(),
        label: label.trim(),
        startTime: sessionStartVal,
        endTime: now,
      };

      setRecords((prev) => [...prev, newRecord]);
      setSessionStartVal(now);

      await putRecord(newRecord);
      await setSessionStart(now);
    },
    [sessionStartVal]
  );

  const updateLabel = useCallback(
    async (id: string, label: string) => {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, label } : r))
      );
      const record = records.find((r) => r.id === id);
      if (record) {
        await putRecord({ ...record, label });
      }
    },
    [records]
  );

  const deleteLatestRecord = useCallback(async () => {
    if (records.length === 0) return;
    const latest = records[records.length - 1];
    const remaining = records.slice(0, -1);
    setRecords(remaining);

    // Roll back sessionStart to the deleted record's startTime
    const newStart = latest.startTime;
    setSessionStartVal(newStart);
    await dbDeleteRecord(latest.id);
    await setSessionStart(newStart);
  }, [records]);

  const importRecords = useCallback(async (imported: TimeRecord[]) => {
    const { putAllRecords } = await import("@/lib/db");
    await putAllRecords(imported);
    setRecords(imported);
  }, []);

  return {
    records,
    sessionStart: sessionStartVal,
    hydrated,
    addRecord,
    updateLabel,
    deleteLatestRecord,
    importRecords,
  };
}
