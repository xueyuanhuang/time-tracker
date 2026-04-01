import type { TimeRecord } from "@/types";
import { STORAGE_KEYS } from "@/types";

const DB_NAME = "time-tracker-db";
const DB_VERSION = 1;
const STORE_RECORDS = "records";
const STORE_META = "meta";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_RECORDS)) {
        db.createObjectStore(STORE_RECORDS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getRecords(): Promise<TimeRecord[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_RECORDS, "readonly");
    const store = tx.objectStore(STORE_RECORDS);
    const request = store.getAll();
    request.onsuccess = () => {
      const records = request.result as TimeRecord[];
      records.sort((a, b) => a.startTime - b.startTime);
      resolve(records);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function putRecord(record: TimeRecord): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_RECORDS, "readwrite");
    const store = tx.objectStore(STORE_RECORDS);
    store.put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function putAllRecords(records: TimeRecord[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_RECORDS, "readwrite");
    const store = tx.objectStore(STORE_RECORDS);
    store.clear();
    for (const record of records) {
      store.put(record);
    }
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteRecord(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_RECORDS, "readwrite");
    const store = tx.objectStore(STORE_RECORDS);
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getSessionStart(): Promise<number | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_META, "readonly");
    const store = tx.objectStore(STORE_META);
    const request = store.get("sessionStart");
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function setSessionStart(value: number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_META, "readwrite");
    const store = tx.objectStore(STORE_META);
    store.put(value, "sessionStart");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Migrate localStorage data to IndexedDB (one-time) */
export async function migrateFromLocalStorage(): Promise<void> {
  const existingRecords = await getRecords();
  if (existingRecords.length > 0) return; // already migrated

  const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
  if (raw) {
    const records: TimeRecord[] = JSON.parse(raw);
    await putAllRecords(records);
    localStorage.removeItem(STORAGE_KEYS.RECORDS);
  }

  const rawStart = localStorage.getItem(STORAGE_KEYS.SESSION_START);
  if (rawStart) {
    await setSessionStart(Number(rawStart));
    localStorage.removeItem(STORAGE_KEYS.SESSION_START);
  }
}
