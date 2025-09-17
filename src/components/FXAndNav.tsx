// app/FXAndNav.tsx
"use client";

import { useState } from "react";
import DynamicSpaceBackground from "@/components/Home/DynamicSpaceBackground";
import UFO from "@/components/Home/UFO";
import Navbar from "@/components/Navbar/Navbar";

export default function FXAndNav() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <DynamicSpaceBackground isPaused={paused} />
      <UFO isPaused={paused} />
      <Navbar onTogglePause={() => setPaused(p => !p)} />
    </>
  );
}