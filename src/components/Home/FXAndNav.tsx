// app/FXAndNav.tsx
"use client";

import { useState } from "react";
import DynamicSpaceBackground from "@/components/Home/DynamicSpaceBackground";
import Navbar from "@/components/Navbar/Navbar";

type Props = {
  accent?: string;
};

export default function FXAndNav({ accent = "#7DA7FF" }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <DynamicSpaceBackground accent={accent} isPaused={paused} />
      <Navbar isPaused={paused} onTogglePause={() => setPaused((p) => !p)} />
    </>
  );
}
