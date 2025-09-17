// app/error.tsx (for global error boundary)
"use client";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="error-page">
          <h1>Something went wrong</h1>
          <p>{process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}</p>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => reset()} className="home-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
              Try again
            </button>
            <Link href="/" className="home-link">Go home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}