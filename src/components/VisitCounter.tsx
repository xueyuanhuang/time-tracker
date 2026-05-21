"use client";

import { useEffect, useState } from "react";

type VisitResponse = {
  count: number;
};

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/visits", {
      method: "POST",
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update visit count");
        }
        return response.json() as Promise<VisitResponse>;
      })
      .then((data) => {
        if (!cancelled && Number.isFinite(data.count)) {
          setCount(data.count);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCount(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-500 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
      访问 {count.toLocaleString("zh-CN")} 次
    </div>
  );
}
