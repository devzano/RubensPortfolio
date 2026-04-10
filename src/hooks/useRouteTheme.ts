"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import useIconAccent from "@/hooks/useIconAccent";
import { getRouteTheme } from "@/constants/routeThemes";

export default function useRouteTheme() {
  const pathname = usePathname() ?? "/";
  const routeTheme = useMemo(() => getRouteTheme(pathname), [pathname]);

  return useIconAccent(routeTheme.icon, {
    fallback: routeTheme.accent,
  });
}
