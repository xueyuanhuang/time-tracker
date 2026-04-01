"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  // initialStart is only used when there are no records
  const [initialStart, setInitialStart] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Always derive sessionStart from records — never stale
  const sessionStart = useMemo(() => {
    if (records.length > 0) return records[records.length - 1].endTime;
    return initialStart;
  }, [records, initialStart]);

  useEffect(() => {
    async function init() {
      await migrateFromLocalStorage();

      const storedRecords = await getRecords();
      setRecords(storedRecords);

      // Only matters when no records exist
      if (storedRecords.length === 0) {
        const start = (await getSessionStart()) || Date.now();
        await setSessionStart(start);
        setInitialStart(start);
      }

      setHydrated(true);
    }
    init();
  }, []);

  const addRecord = useCallback(
    async (label: string) => {
      if (!sessionStart) return;

      const now = Date.now();
      const newRecord: TimeRecord = {
        id: generateId(),
        label: label.trim(),
        startTime: sessionStart,
        endTime: now,
      };

      setRecords((prev) => [...prev, newRecord]);

      await putRecord(newRecord);
      await setSessionStart(now);
    },
    [sessionStart]
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
    setRecords((prev) => prev.slice(0, -1));

    await dbDeleteRecord(latest.id);
    // sessionStart auto-derives from new last record's endTime
    // or falls back to latest.startTime if no records left
    if (records.length === 1) {
      setInitialStart(latest.startTime);
      await setSessionStart(latest.startTime);
    }
  }, [records]);

  const importRecords = useCallback(async (imported: TimeRecord[]) => {
    const { putAllRecords } = await import("@/lib/db");
    await putAllRecords(imported);
    setRecords(imported);
  }, []);

  return {
    records,
    sessionStart,
    hydrated,
    addRecord,
    updateLabel,
    deleteLatestRecord,
    importRecords,
  };
}
