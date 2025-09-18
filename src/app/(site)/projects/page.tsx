// src/app/(site)/projects/page.tsx
"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { SlideNavProps } from "@/types/types";
import WatchlistrWeb from "@/app/(site)/watchlistr-web/page";
import RecipeRealm from "@/app/(site)/reciperealm/page";
import WatchlistrMobile from "@/app/(site)/watchlistr-mobile/page";
import EchoExpense from "@/app/(site)/echoexpense/page";
import OtakuHive from "@/app/(site)/otakuhive/page";
import StarshipPixelscape from "@/app/(site)/starship-pixelscape/page";
import SunshineKeyWestChallenge from "@/app/(site)/sunshinekeywestchallenge/page";
import AutoArchive from "@/app/(site)/autoarchive/page";
import Steda from "@/app/(site)/steda/page";
import ManzanosPopShop from "@/app/(site)/manzanos-popshop/page";
import Logiqo from "@/app/(site)/logiqo/page";

type SlideComponent = React.ComponentType<SlideNavProps>;

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<string>("auto");
  const slideRef = useRef<HTMLDivElement | null>(null);

  const SlideComponents: SlideComponent[] = useMemo(
    () => [
      WatchlistrWeb,
      RecipeRealm,
      WatchlistrMobile,
      EchoExpense,
      OtakuHive,
      SunshineKeyWestChallenge,
      StarshipPixelscape,
      AutoArchive,
      Steda,
      ManzanosPopShop,
      Logiqo,
    ],
    []
  );

  const slideCount = SlideComponents.length;

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % slideCount),
    [slideCount]
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount),
    [slideCount]
  );

  const slides = useMemo(
    () =>
      SlideComponents.map((Cmp, idx) => (
        <Cmp key={idx} showArrows={true} nextSlide={nextSlide} prevSlide={prevSlide} />
      )),
    [SlideComponents, nextSlide, prevSlide]
  );

  // Measure height whenever the active slide changes (and on resize)
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
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={index === currentSlide ? slideRef : null}
              className={`fade-slide ${index === currentSlide ? "active" : ""}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}