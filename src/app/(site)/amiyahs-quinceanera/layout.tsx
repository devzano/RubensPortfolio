import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amiyah's Quinceañera",
  description: "A live guest upload page for Amiyah's Quinceañera photos, videos, and voice memos.",
};

export default function AmiyahsQuinceaneraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
