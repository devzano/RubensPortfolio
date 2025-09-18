// src/app/not-found.tsx
import ErrorShell from "@/components/Home/ErrorShell";

export default function NotFound() {
  return (
    <ErrorShell
      title="404 – Page not found"
      message="The page you’re looking for doesn’t exist or was moved."
      showHome
    />
  );
}