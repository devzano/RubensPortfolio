import type { StaticImageData } from "next/image";
import AppImages from "@/constants/images";

type ThemeConfig = {
  match: (pathname: string) => boolean;
  icon?: StaticImageData | string;
  accent: string;
};

export const ROUTE_THEMES: ThemeConfig[] = [
  {
    match: (pathname) => pathname.startsWith("/autoarchive"),
    icon: AppImages.autoArchive,
    accent: "#EB5731",
  },
  {
    match: (pathname) => pathname.startsWith("/creaturerealm"),
    icon: AppImages.creaturerealm,
    accent: "#47A26B",
  },
  {
    match: (pathname) => pathname.startsWith("/echoexpense"),
    icon: AppImages.echoExpense,
    accent: "#17A199",
  },
  {
    match: (pathname) => pathname.startsWith("/logiqo"),
    icon: AppImages.logiqo,
    accent: "#09A6D4",
  },
  {
    match: (pathname) => pathname.startsWith("/mps-mobile") || pathname.startsWith("/mps-web"),
    icon: AppImages.manzanosPopShop,
    accent: "#5C5F5E",
  },
  {
    match: (pathname) => pathname.startsWith("/otakuhive"),
    icon: AppImages.otakuHive,
    accent: "#FC0398",
  },
  {
    match: (pathname) => pathname.startsWith("/reciperealm"),
    icon: AppImages.recipeRealm,
    accent: "#E23D3D",
  },
  {
    match: (pathname) => pathname.startsWith("/starship-pixelscape"),
    icon: AppImages.starshipPixelscape,
    accent: "#18C3E0",
  },
  {
    match: (pathname) => pathname.startsWith("/steda"),
    icon: AppImages.steda,
    accent: "#7F63F4",
  },
  {
    match: (pathname) => pathname.startsWith("/sunshinekeywestchallenge"),
    icon: AppImages.sunshineKeyWestChallenge,
    accent: "#1593AD",
  },
  {
    match: (pathname) => pathname.startsWith("/watchlistr-mobile") || pathname.startsWith("/watchlistr-web"),
    icon: AppImages.watchlistr,
    accent: "#2EA0FF",
  },
  {
    match: (pathname) => pathname === "/" || pathname.startsWith("/projects"),
    accent: "#60A5FA",
  },
];

export function getRouteTheme(pathname: string) {
  return ROUTE_THEMES.find((theme) => theme.match(pathname)) ?? {
    icon: undefined,
    accent: "#6366F1",
  };
}
