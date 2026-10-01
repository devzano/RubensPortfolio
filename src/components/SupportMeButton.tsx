"use client";

import { Heart, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SupporterCountResponse = {
  count: number | null;
  configured: boolean;
};

export default function SupportMeButton() {
  const pathname = usePathname() ?? "/";
  const [supporterCount, setSupporterCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSupporterCount() {
      try {
        const response = await fetch("/api/buymeacoffee/supporter-count", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as SupporterCountResponse;
        setSupporterCount(typeof data.count === "number" ? data.count : null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSupporterCount(null);
      }
    }

    fetchSupporterCount();

    return () => {
      controller.abort();
    };
  }, []);

  const formattedSupporterCount = useMemo(() => {
    if (supporterCount === null) return null;
    return new Intl.NumberFormat("en-US").format(supporterCount);
  }, [supporterCount]);

  if (
    pathname.startsWith("/sscodapp") ||
    pathname.startsWith("/ssfuelportal") ||
    pathname.startsWith("/amiyahs-quinceanera")
  ) {
    return null;
  }

  return (
    <a
      href="https://www.buymeacoffee.com/devzano"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[9999] inline-flex min-h-12 items-center overflow-hidden rounded-xl bg-[#5F7FFF] text-white shadow-lg shadow-black/25 ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      aria-label={
        formattedSupporterCount
          ? `Support devzano on Buy Me a Coffee. ${formattedSupporterCount} supporter${supporterCount === 1 ? "" : "s"}.`
          : "Support devzano on Buy Me a Coffee."
      }
    >
      <span className="inline-flex h-12 items-center gap-2 px-4 text-sm font-bold">
        <Video className="h-4 w-4" aria-hidden="true" />
        Support Me
      </span>
      {formattedSupporterCount ? (
        <span className="inline-flex h-12 min-w-12 flex-col items-center justify-center bg-black/10 px-3">
          <Heart className="h-4 w-4 fill-white" aria-hidden="true" />
          <span className="text-xs font-semibold leading-none">{formattedSupporterCount}</span>
        </span>
      ) : null}
    </a>
  );
}
