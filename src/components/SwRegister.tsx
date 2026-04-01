"use client";

import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Auto-reload when a new SW takes control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        // Check for updates every 60 seconds
        setInterval(() => reg.update(), 60_000);
      })
      .catch(() => {});
  }, []);
  return null;
}
