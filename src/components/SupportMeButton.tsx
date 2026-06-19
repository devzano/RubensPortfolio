"use client";
/* eslint-disable @next/next/no-img-element */

import { usePathname } from "next/navigation";

export default function SupportMeButton() {
  const pathname = usePathname() ?? "/";

  if (pathname.startsWith("/sscodapp") || pathname.startsWith("/ssfuelportal")) {
    return null;
  }

  return (
    <a
      href="https://www.buymeacoffee.com/devzano"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 9999,
      }}
    >
      <img
        src="https://img.buymeacoffee.com/button-api/?text=Support Me&emoji=💻&slug=devzano&button_colour=5F7FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
        alt="Support Me on Buy Me a Coffee"
        style={{ height: "48px" }}
      />
    </a>
  );
}
