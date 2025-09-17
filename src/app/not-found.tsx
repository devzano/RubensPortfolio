// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-page">
      <h1>404 – Page not found</h1>
      <p>The page you’re looking for doesn’t exist or was moved.</p>
      <Link href="/" className="home-link">Back to home</Link>
    </div>
  );
}