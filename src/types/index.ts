export interface TimeRecord {
  id: string;
  label: string;
  startTime: number;
  endTime: number;
}

export const STORAGE_KEYS = {
  RECORDS: "time-tracker-records",
  SESSION_START: "time-tracker-session-start",
} as const;
