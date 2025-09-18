// src/app/global-error.tsx
"use client";
import ErrorShell from "@/components/Home/ErrorShell";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const message =
    process.env.NODE_ENV === "development"
      ? `${error.message}${error.digest ? ` (digest: ${error.digest})` : ""}`
      : "An unexpected error occurred.";

  return (
    <html>
      <body>
        <ErrorShell title="Something went wrong" message={message} showHome>
          <button
            onClick={() => reset()}
            className="home-link rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
          >
            Try again
          </button>
        </ErrorShell>
      </body>
    </html>
  );
}