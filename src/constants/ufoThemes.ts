// src/constants/ufoThemes.ts
import type * as THREE from "three";

// Keep in sync with your UFO.tsx
export type UFOTheme = {
  body: THREE.ColorRepresentation;
  cockpit: THREE.ColorRepresentation;
  cockpitOpacity: number; // 0..1
  ring: THREE.ColorRepresentation;
  lightBase: THREE.ColorRepresentation;
  lightEmissiveA: THREE.ColorRepresentation;
  lightEmissiveB: THREE.ColorRepresentation;
};

export const UFO_THEMES: Record<"autoArchive" | "echoExpense" | "logiqo" | "popShop" | "otakuHive" | "recipeRealm" | "starshipPixelscape" | "steda" | "sunshineKeyWest" | "watchlistr", UFOTheme> = {
  /** Car + wrench on orange gradient */
  autoArchive: {
    body: "#292b4f",          // deep navy from the icon stroke
    cockpit: "#fef4e0",       // warm cream glass
    cockpitOpacity: 0.45,
    ring: "#eb5731",          // bright orange ring
    lightBase: "#f3aa93",     // warm bulbs
    lightEmissiveA: "#eb5731",// orange pulse A
    lightEmissiveB: "#fef4e0" // cream pulse B
  },

  /** Calendar + dollar, teal/aqua on dark */
  echoExpense: {
    body: "#0d111e",          // near-black UI base
    cockpit: "#ebf9fc",       // frosty glass
    cockpitOpacity: 0.40,
    ring: "#17a199",          // teal ring
    lightBase: "#2bcea7",     // mint bulbs
    lightEmissiveA: "#17a199",// teal pulse
    lightEmissiveB: "#4ae6b2" // aqua pulse
  },

  /** Logiqo puzzle colors (navy + cyan/green/yellow/orange) */
  logiqo: {
    body: "#011521",          // brand navy
    cockpit: "#fcfdfc",       // white glass
    cockpitOpacity: 0.50,
    ring: "#fdb10f",          // golden ring
    lightBase: "#23cbe3",     // cyan bulbs
    lightEmissiveA: "#09a6d4",// cyan pulse
    lightEmissiveB: "#13ae8e" // green pulse
  },

  /** Pop figure / metallic grayscale */
  popShop: {
    body: "#394447",          // steel
    cockpit: "#fcfcfb",       // soft white glass
    cockpitOpacity: 0.30,
    ring: "#5c5f5e",          // mid gray ring
    lightBase: "#9e9d99",     // silver bulbs
    lightEmissiveA: "#fcfcfb",// white pulse
    lightEmissiveB: "#5c5f5e" // gray pulse
  },

  /** Otaku neon magenta/cyan */
  otakuHive: {
    body: "#010001",          // pure black
    cockpit: "#fcfcfc",       // neutral glass
    cockpitOpacity: 0.35,
    ring: "#fc0398",          // neon magenta ring
    lightBase: "#21eefa",     // neon cyan bulbs
    lightEmissiveA: "#fc0398",// magenta pulse
    lightEmissiveB: "#21eefa" // cyan pulse
  },
  /** 🍳 RecipeRealm — warm book + red accent */
  recipeRealm: {
    body: "#0F1A2A",            // deep navy outline
    cockpit: "#FFF3CC",         // warm cream glass
    cockpitOpacity: 0.48,
    ring: "#E23D3D",            // tomato red spine
    lightBase: "#FFC14D",       // amber bulbs
    lightEmissiveA: "#FF6B3D",  // orange pulse
    lightEmissiveB: "#FFD37A",  // warm highlight
  },

  /** 🚀 Starship Pixelscape — steel + cyan thrusters */
  starshipPixelscape: {
    body: "#8EA3AD",            // steel blue-gray hull
    cockpit: "#CFF4FF",         // cool cyan glass
    cockpitOpacity: 0.42,
    ring: "#18C3E0",            // saturated cyan trim
    lightBase: "#7FE7FF",       // cyan bulbs
    lightEmissiveA: "#5ED2FF",  // bright cyan pulse
    lightEmissiveB: "#E0FBFF",  // icy white pulse
  },

  /** 🕊️ Steda — clean purple brand */
  steda: {
    body: "#2E1F6B",            // deep royal
    cockpit: "#F1ECFF",         // soft lavender glass
    cockpitOpacity: 0.45,
    ring: "#7F63F4",            // brand violet ring
    lightBase: "#6F82FF",       // periwinkle bulbs
    lightEmissiveA: "#6D53F5",  // violet pulse
    lightEmissiveB: "#A88BFF",  // lilac pulse
  },

  /** 💙 Sunshine Key West — ocean teal line-art */
  sunshineKeyWest: {
    body: "#0B2B33",            // deep teal/sea
    cockpit: "#E7FBFF",         // pale aqua glass
    cockpitOpacity: 0.40,
    ring: "#1593AD",            // ocean teal
    lightBase: "#19B0C6",       // teal bulbs
    lightEmissiveA: "#1593AD",  // teal pulse
    lightEmissiveB: "#69E3FF",  // bright aqua pulse
  },

  /** 🎬 Watchlistr — clapperboard blues */
  watchlistr: {
    body: "#0A1F3A",            // night blue
    cockpit: "#E6F4FF",         // cool white glass
    cockpitOpacity: 0.38,
    ring: "#2EA0FF",            // electric blue ring
    lightBase: "#4AB3FF",       // sky blue bulbs
    lightEmissiveA: "#2EA0FF",  // blue pulse A
    lightEmissiveB: "#87D0FF",  // blue pulse B
  },
};
