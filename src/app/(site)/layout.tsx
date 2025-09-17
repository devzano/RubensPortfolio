// src/app/(site)/layout.tsx
import type { ReactNode } from "react";
import FXAndNav from "@/components/FXAndNav";

export default function SiteLayout({ children }: { children: ReactNode; }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <FXAndNav />
      <div className="relative z-10">
        {children}
        <div id="modal-root" />
      </div>
    </div>
  );
}