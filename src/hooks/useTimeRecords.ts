"use client";

import { useState, useEffect, useCallback } from "react";
import type { TimeRecord } from "@/types";
import { STORAGE_KEYS } from "@/types";
import { generateId } from "@/lib/time";

export function useTimeRecords() {
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }

    const storedStart = localStorage.getItem(STORAGE_KEYS.SESSION_START);
    if (storedStart) {
      setSessionStart(Number(storedStart));
    } else {
      const now = Date.now();
      localStorage.setItem(STORAGE_KEYS.SESSION_START, String(now));
      setSessionStart(now);
    }

    setHydrated(true);
  }, []);

  const addRecord = useCallback(
    (label: string) => {
      if (!sessionStart) return;

      const now = Date.now();
      const newRecord: TimeRecord = {
        id: generateId(),
        label: label.trim(),
        startTime: sessionStart,
        endTime: now,
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      localStorage.setItem(
        STORAGE_KEYS.RECORDS,
        JSON.stringify(updatedRecords)
      );

      setSessionStart(now);
      localStorage.setItem(STORAGE_KEYS.SESSION_START, String(now));
    },
    [sessionStart, records]
  );

  return { records, sessionStart, hydrated, addRecord };
}
