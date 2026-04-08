"use client";

import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let refreshing = false;

    // Auto-reload when a NEW SW takes over (only if there was a previous controller)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        // Check for updates on visibility change (user returns to app)
        const checkUpdate = () => {
          if (document.visibilityState === "visible") {
            reg.update().catch(() => {});
          }
        };
        document.addEventListener("visibilitychange", checkUpdate);

        // Also check on focus
        window.addEventListener("focus", checkUpdate);

        // Periodic check every 60s while app is open
        setInterval(checkUpdate, 60_000);
      })
      .catch(() => {});
  }, []);
  return null;
}
