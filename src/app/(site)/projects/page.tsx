// src/app/(site)/projects/page.tsx
"use client";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { SlideNavProps } from "@/types/types";

type SlideComponent = React.ComponentType<SlideNavProps>;

const slideComponents: SlideComponent[] = [
  dynamic(() => import("@/app/(site)/watchlistr-web/page")),
  dynamic(() => import("@/app/(site)/reciperealm/page")),
  dynamic(() => import("@/app/(site)/watchlistr-mobile/page")),
  dynamic(() => import("@/app/(site)/echoexpense/page")),
  dynamic(() => import("@/app/(site)/otakuhive/page")),
  dynamic(() => import("@/app/(site)/sunshinekeywestchallenge/page")),
  dynamic(() => import("@/app/(site)/starship-pixelscape/page")),
  dynamic(() => import("@/app/(site)/autoarchive/page")),
  dynamic(() => import("@/app/(site)/steda/page")),
  dynamic(() => import("@/app/(site)/mps-mobile/page")),
  dynamic(() => import("@/app/(site)/mps-web/page")),
  dynamic(() => import("@/app/(site)/logiqo/page")),
];

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<string>("auto");
  const slideRef = useRef<HTMLDivElement | null>(null);
  const slideCount = slideComponents.length;

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % slideCount),
    [slideCount]
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount),
    [slideCount]
  );

  const ActiveSlide = useMemo(
    () => slideComponents[currentSlide] ?? slideComponents[0],
    [currentSlide]
  );

  useEffect(() => {
    const measure = () => {
      if (slideRef.current) {
        setContainerHeight(`${slideRef.current.offsetHeight}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [currentSlide]);

  return (
    <div className="coding-background pt-10">
      <div
        className="slider"
        style={{ height: containerHeight, transition: "height 0.5s ease" }}
      >
        <div className="slide-container">
          <div ref={slideRef} className="fade-slide active">
            <ActiveSlide showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />
          </div>
        </div>
      </div>
    </div>
  );
}
