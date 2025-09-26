// src/hooks/useIconAccent.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";

type RGB = { r: number; g: number; b: number };

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function hexToRgb(hex: string): RGB | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function rgbToHex({ r, g, b }: RGB): string {
  const to = (v: number) => v.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}
function rgbToHsl({ r, g, b }: RGB) {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / d + 2) * 60;
        break;
      default:
        h = ((rn - gn) / d + 4) * 60;
    }
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s, l };
}
function hslToRgb(h: number, s: number, l: number): RGB {
  s = clamp(s);
  l = clamp(l);
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rn = 0,
    gn = 0,
    bn = 0;
  if (h < 60) [rn, gn, bn] = [c, x, 0];
  else if (h < 120) [rn, gn, bn] = [x, c, 0];
  else if (h < 180) [rn, gn, bn] = [0, c, x];
  else if (h < 240) [rn, gn, bn] = [0, x, c];
  else if (h < 300) [rn, gn, bn] = [x, 0, c];
  else [rn, gn, bn] = [c, 0, x];
  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}
function lighten(hex: string, by = 0.12) {
  const rgb = hexToRgb(hex)!;
  const { h, s, l } = rgbToHsl(rgb);
  return rgbToHex(hslToRgb(h, s, clamp(l + by)));
}
function darken(hex: string, by = 0.12) {
  const rgb = hexToRgb(hex)!;
  const { h, s, l } = rgbToHsl(rgb);
  return rgbToHex(hslToRgb(h, s, clamp(l - by)));
}
function withAlpha(hex: string, a = 0.15) {
  const rgb = hexToRgb(hex)!;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(a)})`;
}

async function extractDominantColor(src: string): Promise<string> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.decoding = "async";
  img.src = src;

  await new Promise((res, rej) => {
    img.onload = () => res(null);
    img.onerror = rej;
  });

  const w = 64,
    h = 64;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  let r = 0,
    g = 0,
    b = 0,
    count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 16) continue;
    const rr = data[i],
      gg = data[i + 1],
      bb = data[i + 2];

    const max = Math.max(rr, gg, bb),
      min = Math.min(rr, gg, bb);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat < 0.12) continue;
    if (max > 240 || min < 16) continue;

    r += rr;
    g += gg;
    b += bb;
    count++;
  }

  if (count === 0) {
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 16) continue;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
  }
  if (count === 0) return "#6366F1";

  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);
  return rgbToHex({ r, g, b });
}

export default function useIconAccent(
  icon?: StaticImageData | string,
  opts?: { fallback?: string }
) {
  const [accent, setAccent] = useState<string | null>(null);
  const fallback = opts?.fallback ?? "#6366F1";

  useEffect(() => {
    let mounted = true;
    if (!icon) {
      setAccent(fallback);
      return;
    }
    const url = typeof icon === "string" ? icon : icon.src;

    extractDominantColor(url)
      .then((hex) => {
        if (!mounted) return;
        setAccent(hex);
      })
      .catch(() => {
        if (mounted) setAccent(fallback);
      });
    return () => {
      mounted = false;
    };
  }, [icon, fallback]);

  const cssVars = useMemo(() => {
    const base = accent ?? fallback;
    const light = lighten(base, 0.18);
    const deep = darken(base, 0.18);
    return {
      "--accent": base,
      "--accent-light": light,
      "--accent-deep": deep,
      "--accent-soft": withAlpha(base, 0.20),
      "--accent-softer": withAlpha(base, 0.50),
      "--tw-ring-color": base,
    } as React.CSSProperties;
  }, [accent, fallback]);

  return { accent: accent ?? fallback, cssVars };
}