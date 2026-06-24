// src/app/(site)/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import FXAndNav from "@/components/Home/FXAndNav";
import useRouteTheme from "@/hooks/useRouteTheme";

export default function SiteLayout({ children }: { children: ReactNode; }) {
  const { accent, cssVars } = useRouteTheme();
  const pathname = usePathname() ?? "/";
  const isSunshineShowcasePage =
    pathname.startsWith("/sscodapp") ||
    pathname.startsWith("/ssfuelportal") ||
    pathname.startsWith("/amiyahs-quinceanera");

  return (
    <div className="min-h-dvh flex flex-col" style={cssVars}>
      {!isSunshineShowcasePage ? <FXAndNav accent={accent} /> : null}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
