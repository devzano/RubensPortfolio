// src/app/(site)/layout.tsx
"use client";

import type { ReactNode } from "react";
import FXAndNav from "@/components/Home/FXAndNav";
import useRouteTheme from "@/hooks/useRouteTheme";

export default function SiteLayout({ children }: { children: ReactNode; }) {
  const { accent, cssVars } = useRouteTheme();

  return (
    <div className="min-h-dvh flex flex-col" style={cssVars}>
      <FXAndNav accent={accent} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
