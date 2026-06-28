"use client";

import { Camera, ChevronLeft, ChevronRight, Film, LoaderCircle, Lock, Mic, PauseCircle, PlayCircle, Sparkles, Upload, Waves, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";
import { supabase } from "@/lib/supabase/client";

const EVENT_SLUG = "amiyahs-quinceanera";
const EVENT_BUCKET = "event-media";
const MAX_IMAGE_DIMENSION = 2200;
const IMAGE_QUALITY = 0.86;
const SLIDESHOW_IMAGE_MS = 4200;
const MAX_MEDIA_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const MAX_AUDIO_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const MAX_MEDIA_FILES_PER_BATCH = 12;
const MAX_MEDIA_BATCH_BYTES = 180 * 1024 * 1024;

type MediaKind = "all" | "image" | "video" | "audio";

type UploadRow = {
  id: string;
  event_slug: string;
  media_kind: Exclude<MediaKind, "all">;
  bucket_id: string;
  storage_path: string;
  mime_type: string;
  byte_size: number;
  guest_name: string | null;
  caption: string | null;
  is_approved: boolean;
  created_at: string;
};

type GalleryItem = UploadRow & {
  publicUrl: string;
};

type UploadProgressState = {
  active: boolean;
  current: number;
  total: number;
  label: string;
  mode: "media" | "voice";
};

const theme = {
  accent: "#d8b45a",
  accentStrong: "#b58d29",
  sea: "#72d8d8",
  text: "#234242",
  muted: "rgba(35,66,66,0.76)",
  border: "rgba(188,157,77,0.28)",
  card: "rgba(255,255,255,0.74)",
  cardStrong: "rgba(255,255,255,0.86)",
  shadow: "0 30px 80px rgba(73, 111, 112, 0.18)",
} as const;

const mediaTabs: { key: MediaKind; label: string; icon: typeof Sparkles; }[] = [
  { key: "all", label: "All Media", icon: Sparkles },
  { key: "image", label: "Photos", icon: Camera },
  { key: "video", label: "Videos", icon: Film },
  { key: "audio", label: "Voice Notes", icon: Mic },
];

function LiquidIntroOverlay({ onComplete }: { onComplete: () => void; }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.85));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const lifecycle = {
      fill: 0.18,
      opacity: 1,
      revealStarted: false,
      completed: false,
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      varying vec2 vUv;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform float uFill;
      uniform float uOpacity;
      uniform vec3 uGold;
      uniform vec3 uTeal;
      uniform vec3 uDeep;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p *= 2.03;
          amplitude *= 0.52;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 warped = uv;
        warped.x *= aspect;

        float waveA = sin(uv.x * 8.0 + uTime * 1.5) * 0.038;
        float waveB = sin(uv.x * 17.0 - uTime * 2.0) * 0.02;
        float waveC = (fbm(vec2(uv.x * 3.4, uTime * 0.18 + 1.3)) - 0.5) * 0.078;
        float crest = uFill + waveA + waveB + waveC;

        float liquidMask = smoothstep(crest + 0.04, crest - 0.02, uv.y);
        float depth = clamp((crest - uv.y) * 1.6 + 0.22, 0.0, 1.0);

        vec3 baseA = mix(uTeal, uGold, clamp(uv.y * 0.82 + 0.12, 0.0, 1.0));
        vec3 baseB = mix(uDeep, uTeal, clamp(0.2 + depth * 0.85, 0.0, 1.0));
        vec3 silk = mix(baseA, baseB, 0.56 + 0.24 * sin((uv.x + uv.y) * 12.0 - uTime * 0.75));

        float shimmerBand = smoothstep(0.0, 0.6, sin((uv.x * 6.8 - uv.y * 4.2) + uTime * 1.6) * 0.5 + 0.5);
        silk += mix(uGold, vec3(1.0), shimmerBand * 0.15) * 0.22;

        float organic = fbm(warped * vec2(2.2, 3.8) + vec2(0.0, uTime * 0.16));
        silk += organic * 0.08;

        float highlight = exp(-pow(abs(uv.y - crest) * 42.0, 1.18));
        vec3 crestGlow = mix(vec3(1.0), uGold, 0.55) * highlight * 1.35;

        float pearlSpark = smoothstep(0.75, 1.0, fbm(warped * 6.0 + vec2(uTime * 0.24, -uTime * 0.3)));
        vec3 spark = mix(uTeal, vec3(1.0), 0.58) * pearlSpark * 0.12 * liquidMask;

        vec3 color = silk * liquidMask + crestGlow + spark;
        float alpha = liquidMask * uOpacity * 0.98;

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const liquidMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uFill: { value: lifecycle.fill },
        uOpacity: { value: lifecycle.opacity },
        uGold: { value: new THREE.Color(theme.accent) },
        uTeal: { value: new THREE.Color(theme.sea) },
        uDeep: { value: new THREE.Color("#2d6d6c") },
      },
      vertexShader,
      fragmentShader,
    });

    const liquidMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), liquidMaterial);
    scene.add(liquidMesh);

    const bubbleCount = 190;
    const bubbleGeometry = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSizes = new Float32Array(bubbleCount);
    const bubbleOffsets = new Float32Array(bubbleCount);
    const bubbleSeeds = new Float32Array(bubbleCount);
    const bubbleAge = new Float32Array(bubbleCount);
    const bubbleSpeed = new Float32Array(bubbleCount);

    const resetBubble = (i: number, scatter = 1, visibleBias = false) => {
      const x = (Math.random() * 2 - 1) * scatter;
      bubblePositions[i * 3] = x;
      bubblePositions[i * 3 + 1] = visibleBias
        ? -0.72 + Math.random() * 0.46
        : -0.98 - Math.random() * 0.45;
      bubblePositions[i * 3 + 2] = 0;
      bubbleSizes[i] = visibleBias ? 22 + Math.random() * 44 : 16 + Math.random() * 38;
      bubbleOffsets[i] = Math.random() * Math.PI * 2;
      bubbleSeeds[i] = Math.random();
      bubbleAge[i] = Math.random() * 6;
      bubbleSpeed[i] = visibleBias ? 0.34 + Math.random() * 0.38 : 0.3 + Math.random() * 0.34;
    };

    for (let i = 0; i < bubbleCount; i += 1) {
      resetBubble(i, 0.92, true);
    }

    bubbleGeometry.setAttribute("position", new THREE.BufferAttribute(bubblePositions, 3));
    bubbleGeometry.setAttribute("aSize", new THREE.BufferAttribute(bubbleSizes, 1));
    bubbleGeometry.setAttribute("aSeed", new THREE.BufferAttribute(bubbleSeeds, 1));

    const bubbleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: lifecycle.opacity },
        uIntroBoost: { value: 1 },
        uGold: { value: new THREE.Color("#efd68b") },
        uTeal: { value: new THREE.Color("#9df0ed") },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aSeed;
        varying float vSeed;
        varying float vGlow;
        void main() {
          vSeed = aSeed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float perspectiveBoost = 1.0 + sin(aSeed * 17.0) * 0.16;
          gl_PointSize = aSize * perspectiveBoost;
          gl_Position = projectionMatrix * mvPosition;
          vGlow = smoothstep(-1.0, 0.95, position.y);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying float vSeed;
        varying float vGlow;
        uniform float uTime;
        uniform float uOpacity;
        uniform float uIntroBoost;
        uniform vec3 uGold;
        uniform vec3 uTeal;

        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          if (dist > 0.5) discard;

          float ring = smoothstep(0.48, 0.18, dist);
          float shell = smoothstep(0.5, 0.34, dist) - smoothstep(0.3, 0.12, dist);
          float sheen = 0.5 + 0.5 * sin(uTime * 2.2 + vSeed * 13.0 + uv.x * 8.0 - uv.y * 7.0);
          vec3 iridescence = mix(uTeal, uGold, sheen);
          vec3 color = mix(vec3(1.0), iridescence, 0.72) * ring;
          color += iridescence * shell * 0.9;
          color += mix(uTeal, vec3(1.0), 0.5) * ring * 0.16 * uIntroBoost;

          float alpha = ring * (0.38 + shell * 1.25 + uIntroBoost * 0.18) * uOpacity * vGlow;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const bubblePoints = new THREE.Points(bubbleGeometry, bubbleMaterial);
    bubblePoints.position.z = 0.02;
    scene.add(bubblePoints);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      liquidMaterial.uniforms.uResolution.value.set(width, height);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const clock = new THREE.Clock();
    let accumulatedTime = 0;
    let frameId = 0;

    const updateBubbles = (time: number, delta: number) => {
      for (let i = 0; i < bubbleCount; i += 1) {
        bubbleAge[i] += delta;
        const drift = Math.sin(bubbleAge[i] * 1.35 + bubbleOffsets[i]) * (0.0018 + bubbleSeeds[i] * 0.0034);

        bubblePositions[i * 3] += drift;
        bubblePositions[i * 3 + 1] += bubbleSpeed[i] * delta;

        const localWave =
          Math.sin((bubblePositions[i * 3] * 4.2) + time * 1.5 + bubbleOffsets[i]) * 0.024 +
          Math.sin((bubblePositions[i * 3] * 9.4) - time * 2.1) * 0.014;
        const fluidTop = lifecycle.fill + localWave;
        const bubbleY = bubblePositions[i * 3 + 1];

        if (bubbleY > fluidTop - 0.02 || bubblePositions[i * 3] > 1.18 || bubblePositions[i * 3] < -1.18) {
          resetBubble(i, 0.96);
        }
      }

      bubbleGeometry.attributes.position.needsUpdate = true;
    };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.033);
      accumulatedTime += delta;
      const elapsed = accumulatedTime;
      const introBoost = Math.max(0, 1 - elapsed / 0.8);

      if (lifecycle.fill < 1.14) {
        lifecycle.fill += delta * 0.74 + Math.max(0, 0.32 - lifecycle.fill) * delta * 0.4;
      } else if (!lifecycle.revealStarted) {
        lifecycle.revealStarted = true;
      }

      if (lifecycle.revealStarted && lifecycle.opacity > 0) {
        lifecycle.opacity = Math.max(0, lifecycle.opacity - delta * 1.1);
      }

      liquidMaterial.uniforms.uTime.value = elapsed;
      liquidMaterial.uniforms.uFill.value = lifecycle.fill;
      liquidMaterial.uniforms.uOpacity.value = lifecycle.opacity;

      bubbleMaterial.uniforms.uTime.value = elapsed;
      bubbleMaterial.uniforms.uOpacity.value = lifecycle.opacity;
      bubbleMaterial.uniforms.uIntroBoost.value = introBoost;

      updateBubbles(elapsed, delta);
      renderer.render(scene, camera);

      if (lifecycle.revealStarted && lifecycle.opacity <= 0.01 && !lifecycle.completed) {
        lifecycle.completed = true;
        onComplete();
      } else {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = previousOverflow;
      bubbleGeometry.dispose();
      bubbleMaterial.dispose();
      liquidMesh.geometry.dispose();
      liquidMaterial.dispose();
      renderer.dispose();
      mount.innerHTML = "";
    };
  }, [onComplete]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 pointer-events-none bg-[radial-gradient(circle_at_18%_28%,rgba(114,216,216,0.28),transparent_26%),radial-gradient(circle_at_80%_22%,rgba(216,180,90,0.22),transparent_24%),linear-gradient(180deg,#f7f0df_0%,#efe3c7_42%,#eadabc_100%)]"
        aria-hidden="true"
      />
      <div ref={mountRef} className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 pointer-events-none">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="mx-auto mb-5 h-px w-36 rounded-full bg-[rgba(216,180,90,0.4)]"
            style={{ boxShadow: "0 0 28px rgba(255, 238, 182, 0.5)" }}
          />
          <h2
            className="text-5xl font-semibold tracking-tight text-[#f6df95] md:text-7xl lg:text-[6.25rem]"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              textShadow: "0 0 12px rgba(255,240,196,0.7), 0 0 28px rgba(216,180,90,0.42), 0 2px 16px rgba(92,62,8,0.18)",
            }}
          >
            Amiyah&apos;s Quinceañera
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.42em] text-[rgba(255,247,224,0.82)] md:text-base">
            Welcome to the Celebration
          </p>
        </div>
      </div>
    </>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function summarizeFileNames(files: { name: string; }[]) {
  const preview = files.slice(0, 3).map((file) => file.name).join(", ");
  return files.length > 3 ? `${preview}, and ${files.length - 3} more` : preview;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function slugifyFileName(fileName: string) {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function detectMediaKind(mimeType: string): Exclude<MediaKind, "all"> {
  if (mimeType.startsWith("video/")) {
    return "video";
  }
  if (mimeType.startsWith("audio/")) {
    return "audio";
  }
  return "image";
}

async function normalizeImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const imageUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image could not be processed."));
      img.src = imageUrl;
    });

    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    if (!context) {
      return file;
    }

    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", IMAGE_QUALITY);
    });

    if (!blob) {
      return file;
    }

    const normalizedName = `${slugifyFileName(file.name) || "event-photo"}.jpg`;
    return new File([blob], normalizedName, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

function getPublicUrl(bucketId: string, storagePath: string) {
  return supabase.storage.from(bucketId).getPublicUrl(storagePath).data.publicUrl;
}

function jumpToSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cycleIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }
  return (index + total) % total;
}

function GalleryViewer({
  items,
  index,
  isPlaying,
  onClose,
  onNext,
  onPrevious,
  onTogglePlay,
}: {
  items: GalleryItem[];
  index: number;
  isPlaying: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onTogglePlay: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const item = items[index];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
      if (event.key === "ArrowLeft") {
        onPrevious();
      }
      if (event.key === " ") {
        event.preventDefault();
        onTogglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious, onTogglePlay]);

  useEffect(() => {
    if (!item) {
      return;
    }

    if (item.media_kind === "audio" && audioRef.current) {
      if (isPlaying) {
        void audioRef.current.play().catch(() => undefined);
      } else {
        audioRef.current.pause();
      }
    }

    if (item.media_kind === "video" && videoRef.current) {
      if (isPlaying) {
        void videoRef.current.play().catch(() => undefined);
      } else {
        videoRef.current.pause();
      }
    }
  }, [item, isPlaying]);

  if (!item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-[#0e1718]/82 px-4 py-6 backdrop-blur-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/18"
        aria-label="Close slideshow"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onPrevious}
        className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/18 md:left-6"
        aria-label="Previous media"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/18 md:right-6"
        aria-label="Next media"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/18 bg-[#122123]/88 shadow-[0_28px_100px_rgba(0,0,0,0.34)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4 text-white/90">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-[#d8b45a]">
              {item.media_kind === "image" ? "Photo" : item.media_kind === "video" ? "Video" : "Voice Memo"}
            </div>
            <div className="mt-1 truncate text-lg font-medium">
              {item.guest_name || "Guest Upload"}
            </div>
          </div>

          <button
            type="button"
            onClick={onTogglePlay}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/18"
          >
            {isPlaying ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[48svh] bg-black/22">
            {item.media_kind === "image" ? (
              <div className="relative min-h-[48svh]">
                <Image src={item.publicUrl} alt={item.caption || "Event photo"} fill unoptimized className="object-contain" />
              </div>
            ) : null}

            {item.media_kind === "video" ? (
              <video
                ref={videoRef}
                controls
                playsInline
                autoPlay={isPlaying}
                onEnded={onNext}
                className="min-h-[48svh] w-full bg-black object-contain"
                src={item.publicUrl}
              />
            ) : null}

            {item.media_kind === "audio" ? (
              <div className="flex min-h-[48svh] flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_top,rgba(114,216,216,0.32),rgba(15,28,29,0.96))] px-6 text-center text-white">
                <div className="inline-flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10">
                  <Mic className="h-10 w-10" />
                </div>
                <div>
                  <div className="text-2xl font-semibold">Voice Memo</div>
                  <div className="mt-2 text-sm text-white/70">Listen to a message left during the celebration.</div>
                </div>
                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
                >
                  {isPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                  {isPlaying ? "Pause Voice Memo" : "Play Voice Memo"}
                </button>
                <audio
                  ref={audioRef}
                  controls
                  autoPlay={isPlaying}
                  onEnded={onNext}
                  className="w-full max-w-lg"
                  src={item.publicUrl}
                />
              </div>
            ) : null}
          </div>

          <div className="space-y-4 bg-white/96 p-5 text-[#244243]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07d23]">Uploaded</div>
              <div className="mt-2 text-base font-medium">{formatDate(item.created_at)}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07d23]">Details</div>
              <div className="mt-2 text-sm leading-7 text-[#426161]">
                {item.caption || "No guest note was added to this upload."}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#e7dcc0] bg-[#fff8eb] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b7b22]">Type</div>
                <div className="mt-2 text-sm font-medium capitalize">{item.media_kind}</div>
              </div>
              <div className="rounded-2xl border border-[#e7dcc0] bg-[#fff8eb] p-3">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b7b22]">Size</div>
                <div className="mt-2 text-sm font-medium">{formatFileSize(item.byte_size)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#a07d23]">Queue</div>
              <div className="text-sm text-[#426161]">
                {index + 1} of {items.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({
  open,
  unlocked,
  password,
  working,
  error,
  onPasswordChange,
  onClose,
  onVerify,
}: {
  open: boolean;
  unlocked: boolean;
  password: string;
  working: boolean;
  error: string | null;
  onPasswordChange: (value: string) => void;
  onClose: () => void;
  onVerify: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-105 flex items-center justify-center bg-[#102021]/45 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[30px] border border-white/35 bg-white/95 p-6 shadow-[0_28px_80px_rgba(53,77,78,0.24)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#a07d23]">Admin Controls</div>
            <h3 className="mt-2 text-2xl font-semibold text-[#214445]">
              {unlocked ? "Moderation Unlocked" : "Unlock Moderation"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#eadcb7] bg-[#fffaf0] text-[#7b6320]"
            aria-label="Close admin panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#4b6c6c]">
          Use the admin password to enable hide controls for inappropriate uploads. Hidden items disappear from the public gallery but stay in storage.
        </p>

        {!unlocked ? (
          <>
            <label className="mt-5 flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b7b22]">Admin Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                className="h-12 rounded-2xl border border-[#dfd2ae] bg-[#fffdfa] px-4 text-[#254344] outline-none"
                placeholder="Enter moderation password"
              />
            </label>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              onClick={onVerify}
              disabled={working || !password.trim()}
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#c8a546] bg-[#d9b24f] px-5 text-sm font-semibold text-[#1f2929] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {working ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Unlock
            </button>
          </>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Moderation is active for this session. Gallery cards now show hide controls.
          </div>
        )}
      </div>
    </div>
  );
}

export default function AmiyahsQuinceaneraPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<MediaKind>("all");
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [audioFallbackFile, setAudioFallbackFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioMimeType, setAudioMimeType] = useState("");
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | "info">("info");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressState | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerPlaying, setViewerPlaying] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminSessionPassword, setAdminSessionPassword] = useState("");
  const [adminWorking, setAdminWorking] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const recorderChunksRef = useRef<Blob[]>([]);
  const recorderStreamRef = useRef<MediaStream | null>(null);
  const recorderTimerRef = useRef<number | null>(null);
  const selectedFilesInputRef = useRef<HTMLInputElement | null>(null);
  const audioUploadInputRef = useRef<HTMLInputElement | null>(null);
  const audioElementMapRef = useRef<Record<string, HTMLAudioElement | null>>({});
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const loadGallery = async () => {
      setLoadingGallery(true);
      const { data, error } = await supabase
        .from("event_uploads")
        .select("*")
        .eq("event_slug", EVENT_SLUG)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) {
        setStatusTone("error");
        setStatusMessage("Gallery could not load right now.");
        setLoadingGallery(false);
        return;
      }

      const items = (data as UploadRow[]).map((item) => ({
        ...item,
        publicUrl: getPublicUrl(item.bucket_id, item.storage_path),
      }));
      setGalleryItems(items);
      setLoadingGallery(false);
    };

    void loadGallery();
  }, []);

  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }

      if (recorderTimerRef.current) {
        window.clearInterval(recorderTimerRef.current);
      }

      recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [audioPreviewUrl]);

  useEffect(() => {
    if (!uploadProgress?.active) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [uploadProgress?.active]);

  const filteredGallery = useMemo(() => {
    if (activeTab === "all") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.media_kind === activeTab);
  }, [activeTab, galleryItems]);

  const currentViewerItem = viewerOpen ? filteredGallery[viewerIndex] : null;

  useEffect(() => {
    if (!viewerOpen || !currentViewerItem || !viewerPlaying || currentViewerItem.media_kind !== "image") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setViewerIndex((current) => cycleIndex(current + 1, filteredGallery.length));
    }, SLIDESHOW_IMAGE_MS);

    return () => window.clearTimeout(timeout);
  }, [viewerOpen, currentViewerItem, viewerPlaying, filteredGallery.length, viewerIndex]);

  useEffect(() => {
    if (viewerOpen && viewerIndex >= filteredGallery.length) {
      setViewerIndex(0);
    }
  }, [filteredGallery.length, viewerIndex, viewerOpen]);

  const counts = useMemo(
    () => ({
      photos: galleryItems.filter((item) => item.media_kind === "image").length,
      videos: galleryItems.filter((item) => item.media_kind === "video").length,
      voice: galleryItems.filter((item) => item.media_kind === "audio").length,
    }),
    [galleryItems],
  );

  const totalUploads = galleryItems.length;

  const setStatus = (tone: "success" | "error" | "info", message: string) => {
    setStatusTone(tone);
    setStatusMessage(message);
  };

  const startUploadProgress = (mode: "media" | "voice", total: number) => {
    setUploadProgress({
      active: true,
      current: 0,
      total,
      label: "Preparing upload…",
      mode,
    });
  };

  const updateUploadProgress = (current: number, total: number, label: string, mode: "media" | "voice") => {
    setUploadProgress({
      active: true,
      current,
      total,
      label,
      mode,
    });
  };

  const clearUploadProgress = () => {
    setUploadProgress(null);
  };

  const resetVoiceDraft = () => {
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
    }
    setAudioPreviewUrl(null);
    setAudioBlob(null);
    setAudioMimeType("");
    setAudioFallbackFile(null);
  };

  const stopVoiceRecorder = () => {
    recorderRef.current?.stop();
    recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
    recorderStreamRef.current = null;
    if (recorderTimerRef.current) {
      window.clearInterval(recorderTimerRef.current);
      recorderTimerRef.current = null;
    }
    setIsRecording(false);
  };

  const startVoiceRecorder = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("error", "Voice recording is not supported on this device. You can still upload an audio file.");
      return;
    }

    try {
      resetVoiceDraft();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderStreamRef.current = stream;
      recorderChunksRef.current = [];

      const preferredMimeTypes = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg"];
      const supportedMimeType = preferredMimeTypes.find((mimeType) => MediaRecorder.isTypeSupported(mimeType));
      const recorder = supportedMimeType ? new MediaRecorder(stream, { mimeType: supportedMimeType }) : new MediaRecorder(stream);

      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recorderChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const recordedMimeType = recorder.mimeType || supportedMimeType || "audio/webm";
        const blob = new Blob(recorderChunksRef.current, { type: recordedMimeType });
        const previewUrl = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioMimeType(recordedMimeType);
        setAudioPreviewUrl(previewUrl);
      };

      recorder.start();
      setRecordingSeconds(0);
      setIsRecording(true);
      recorderTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((value) => value + 1);
      }, 1000);
      setStatus("info", "Recording voice memo…");
    } catch {
      setStatus("error", "Microphone access was denied.");
    }
  };

  const appendGalleryItem = (item: UploadRow) => {
    setGalleryItems((current) => [
      {
        ...item,
        publicUrl: getPublicUrl(item.bucket_id, item.storage_path),
      },
      ...current,
    ]);
  };

  const uploadSingleAsset = async (file: File | Blob, fileName: string, guest: string, note: string) => {
    const mimeType = file.type || "application/octet-stream";
    const mediaKind = detectMediaKind(mimeType);

    if (mediaKind === "audio" && file.size > MAX_AUDIO_FILE_SIZE_BYTES) {
      throw new Error(`Voice memos must be ${formatFileSize(MAX_AUDIO_FILE_SIZE_BYTES)} or smaller.`);
    }

    if ((mediaKind === "image" || mediaKind === "video") && file.size > MAX_MEDIA_FILE_SIZE_BYTES) {
      throw new Error(`Photos and videos must be ${formatFileSize(MAX_MEDIA_FILE_SIZE_BYTES)} or smaller per file.`);
    }

    const extension = fileName.includes(".") ? fileName.split(".").pop() : undefined;
    const safeExt = extension?.toLowerCase() || (mediaKind === "image" ? "jpg" : mediaKind === "video" ? "mp4" : "webm");
    const path = `${EVENT_SLUG}/${mediaKind}s/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${slugifyFileName(fileName) || "guest-upload"}.${safeExt}`;

    const { error: uploadError } = await supabase.storage.from(EVENT_BUCKET).upload(path, file, {
      contentType: mimeType,
      upsert: false,
    });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const payload = {
      event_slug: EVENT_SLUG,
      media_kind: mediaKind,
      bucket_id: EVENT_BUCKET,
      storage_path: path,
      mime_type: mimeType,
      byte_size: file.size,
      guest_name: guest || null,
      caption: note || null,
      is_approved: true,
    };

    const { data: inserted, error: insertError } = await supabase.from("event_uploads").insert(payload).select("*").single();

    if (insertError) {
      throw new Error(insertError.message);
    }

    appendGalleryItem(inserted as UploadRow);
  };

  const handleMediaFilesPicked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(event.target.files ?? []);
    if (!fileList.length) {
      return;
    }

    if (fileList.length > MAX_MEDIA_FILES_PER_BATCH) {
      setStatus("error", `Choose up to ${MAX_MEDIA_FILES_PER_BATCH} files at a time.`);
      event.target.value = "";
      return;
    }

    const normalizedFiles = await Promise.all(fileList.map((file) => normalizeImageFile(file)));
    const oversizedFiles = normalizedFiles.filter((file) => file.size > MAX_MEDIA_FILE_SIZE_BYTES);

    if (oversizedFiles.length) {
      setStatus(
        "error",
        `These files are over ${formatFileSize(MAX_MEDIA_FILE_SIZE_BYTES)} each: ${summarizeFileNames(oversizedFiles)}.`,
      );
      event.target.value = "";
      return;
    }

    const totalBatchBytes = normalizedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalBatchBytes > MAX_MEDIA_BATCH_BYTES) {
      setStatus(
        "error",
        `This batch is too large. Keep one upload batch under ${formatFileSize(MAX_MEDIA_BATCH_BYTES)} total.`,
      );
      event.target.value = "";
      return;
    }

    setSelectedFiles(normalizedFiles);
  };

  const handleAudioFallbackPicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      if (file.size > MAX_AUDIO_FILE_SIZE_BYTES) {
        setStatus("error", `Audio uploads must be ${formatFileSize(MAX_AUDIO_FILE_SIZE_BYTES)} or smaller.`);
        event.target.value = "";
        return;
      }

      resetVoiceDraft();
      setAudioFallbackFile(file);
    }
  };

  const submitMediaUpload = async () => {
    if (!selectedFiles.length) {
      setStatus("error", "Choose at least one photo or video.");
      return;
    }

    if (selectedFiles.length > MAX_MEDIA_FILES_PER_BATCH) {
      setStatus("error", `Choose up to ${MAX_MEDIA_FILES_PER_BATCH} files at a time.`);
      return;
    }

    if (selectedFiles.some((file) => file.size > MAX_MEDIA_FILE_SIZE_BYTES)) {
      setStatus("error", `Photos and videos must be ${formatFileSize(MAX_MEDIA_FILE_SIZE_BYTES)} or smaller per file.`);
      return;
    }

    const totalBatchBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalBatchBytes > MAX_MEDIA_BATCH_BYTES) {
      setStatus("error", `This batch is too large. Keep one upload batch under ${formatFileSize(MAX_MEDIA_BATCH_BYTES)} total.`);
      return;
    }

    setUploading(true);
    startUploadProgress("media", selectedFiles.length);
    setStatus("info", "Uploading event media…");

    try {
      for (const [index, file] of selectedFiles.entries()) {
        updateUploadProgress(index + 1, selectedFiles.length, file.name, "media");
        await uploadSingleAsset(file, file.name, guestName.trim(), caption.trim());
      }

      setSelectedFiles([]);
      setCaption("");
      if (selectedFilesInputRef.current) {
        selectedFilesInputRef.current.value = "";
      }
      setStatus("success", "Your media was added to Amiyah’s event album.");
    } catch (error) {
      setStatus("error", error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      clearUploadProgress();
    }
  };

  const submitVoiceMemo = async () => {
    const guest = guestName.trim();
    const note = caption.trim();

    if (!audioBlob && !audioFallbackFile) {
      setStatus("error", "Record a voice memo or choose an audio file first.");
      return;
    }

    if (audioFallbackFile && audioFallbackFile.size > MAX_AUDIO_FILE_SIZE_BYTES) {
      setStatus("error", `Audio uploads must be ${formatFileSize(MAX_AUDIO_FILE_SIZE_BYTES)} or smaller.`);
      return;
    }

    if (audioBlob && audioBlob.size > MAX_AUDIO_FILE_SIZE_BYTES) {
      setStatus("error", `Recorded voice memos must stay under ${formatFileSize(MAX_AUDIO_FILE_SIZE_BYTES)}.`);
      return;
    }

    setUploading(true);
    startUploadProgress("voice", 1);
    setStatus("info", "Uploading voice memo…");

    try {
      if (audioFallbackFile) {
        updateUploadProgress(1, 1, audioFallbackFile.name, "voice");
        await uploadSingleAsset(audioFallbackFile, audioFallbackFile.name, guest, note);
      } else if (audioBlob) {
        const extension = audioMimeType.includes("mp4") ? "m4a" : audioMimeType.includes("ogg") ? "ogg" : "webm";
        updateUploadProgress(1, 1, `voice-memo.${extension}`, "voice");
        await uploadSingleAsset(audioBlob, `voice-memo.${extension}`, guest, note);
      }

      resetVoiceDraft();
      if (audioUploadInputRef.current) {
        audioUploadInputRef.current.value = "";
      }
      setStatus("success", "Voice memo uploaded for Amiyah.");
    } catch (error) {
      setStatus("error", error instanceof Error ? error.message : "Voice memo upload failed.");
    } finally {
      setUploading(false);
      clearUploadProgress();
    }
  };

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerPlaying(true);
    setViewerOpen(true);
  };

  const toggleCardAudio = async (itemId: string) => {
    const nextId = playingAudioId === itemId ? null : itemId;
    const nextAudio = audioElementMapRef.current[itemId];

    Object.entries(audioElementMapRef.current).forEach(([id, element]) => {
      if (id !== itemId && element) {
        element.pause();
        element.currentTime = 0;
      }
    });

    if (!nextAudio) {
      setPlayingAudioId(nextId);
      return;
    }

    if (playingAudioId === itemId) {
      nextAudio.pause();
      setPlayingAudioId(null);
      return;
    }

    try {
      await nextAudio.play();
      setPlayingAudioId(itemId);
    } catch {
      setStatus("error", "This voice memo could not start playback.");
    }
  };

  const verifyAdminAccess = async () => {
    setAdminWorking(true);
    setAdminError(null);

    try {
      const response = await fetch("/api/amiyah-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", password: adminPassword }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; };

      if (!response.ok || !payload.ok) {
        setAdminError(payload.error || "Password was rejected.");
        return;
      }

      setAdminUnlocked(true);
      setAdminOpen(false);
      setAdminSessionPassword(adminPassword);
      setAdminPassword("");
      setStatus("success", "Moderation controls unlocked.");
    } catch {
      setAdminError("Admin verification failed.");
    } finally {
      setAdminWorking(false);
    }
  };

  const hideUpload = async (item: GalleryItem) => {
    if (!adminUnlocked) {
      setAdminOpen(true);
      return;
    }

    setAdminWorking(true);
    setAdminError(null);

    try {
      const response = await fetch("/api/amiyah-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "hide",
          password: adminSessionPassword,
          uploadId: item.id,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Item could not be hidden.");
      }

      setGalleryItems((current) => current.filter((entry) => entry.id !== item.id));
      setStatus("success", "Item removed from the public gallery.");
    } catch (error) {
      setStatus("error", error instanceof Error ? error.message : "Item could not be hidden.");
    } finally {
      setAdminWorking(false);
    }
  };

  useEffect(() => {
    const previousBodyBackground = document.body.style.background;
    const previousBodyBackgroundColor = document.body.style.backgroundColor;
    const previousHtmlBackground = document.documentElement.style.background;
    const previousHtmlBackgroundColor = document.documentElement.style.backgroundColor;

    const amiyahPageBackground =
      "radial-gradient(circle_at_top, rgba(216,180,90,0.24), transparent 22%), radial-gradient(circle_at_12%_26%, rgba(196,151,72,0.18), transparent 24%), radial-gradient(circle_at_88%_18%, rgba(255,236,181,0.24), transparent 22%), linear-gradient(180deg, #f8efd9 0%, #f3e4c4 22%, #ead7ad 48%, #dfc795 72%, #f2e3c4 100%)";

    document.body.style.background = amiyahPageBackground;
    document.body.style.backgroundColor = "#f8efd9";
    document.documentElement.style.background = amiyahPageBackground;
    document.documentElement.style.backgroundColor = "#f8efd9";

    return () => {
      document.body.style.background = previousBodyBackground;
      document.body.style.backgroundColor = previousBodyBackgroundColor;
      document.documentElement.style.background = previousHtmlBackground;
      document.documentElement.style.backgroundColor = previousHtmlBackgroundColor;
    };
  }, []);

  const pageStyle: CSSProperties = {
    background:
      "radial-gradient(circle_at_top, rgba(216,180,90,0.24), transparent 22%), radial-gradient(circle_at_12%_26%, rgba(196,151,72,0.18), transparent 24%), radial-gradient(circle_at_88%_18%, rgba(255,236,181,0.24), transparent 22%), linear-gradient(180deg, #f8efd9 0%, #f3e4c4 22%, #ead7ad 48%, #dfc795 72%, #f2e3c4 100%)",
    color: theme.text,
    ["--amiyah-accent" as string]: theme.accent,
    ["--amiyah-accent-strong" as string]: theme.accentStrong,
    ["--amiyah-sea" as string]: theme.sea,
    ["--amiyah-text" as string]: theme.text,
    ["--amiyah-muted" as string]: theme.muted,
    ["--amiyah-border" as string]: theme.border,
    ["--amiyah-card" as string]: theme.card,
    ["--amiyah-card-strong" as string]: theme.cardStrong,
  };

  return (
    <>
      {showIntro ? <LiquidIntroOverlay onComplete={handleIntroComplete} /> : null}
      <main
        className={`min-h-dvh overflow-hidden px-4 py-5 transition-all duration-1000 sm:px-6 lg:px-8 ${showIntro ? "pointer-events-none opacity-0 blur-sm scale-[0.985]" : "opacity-100 blur-0 scale-100"}`}
        style={pageStyle}
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-24 top-[18%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,180,90,0.18),transparent_68%)] blur-3xl" />
          <div className="absolute right-[-6rem] top-[10%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,231,170,0.26),transparent_68%)] blur-3xl" />
          <div className="absolute bottom-[-10rem] left-[12%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(196,151,72,0.18),transparent_70%)] blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(180deg,transparent,rgba(204,166,91,0.16)_36%,rgba(143,105,45,0.08))]" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <section className="relative min-h-[90svh] overflow-hidden rounded-[36px] border border-white/55 bg-white/18 shadow-[0_30px_100px_rgba(77,132,132,0.22)]">
            <div className="absolute inset-0">
              <div className="absolute inset-0 hidden md:block">
                <Image src="/amiyahs-quinceanera/hero-web.png" alt="Amiyah's Quinceañera hero artwork" fill priority className="object-cover" />
              </div>
              <div className="absolute inset-0 md:hidden">
                <Image src="/amiyahs-quinceanera/hero-mobile.png" alt="Amiyah's Quinceañera mobile hero artwork" fill priority className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,255,255,0.16),rgba(229,250,247,0.4)_34%,rgba(236,248,243,0.72)_62%,rgba(233,242,233,0.9)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(116,225,217,0.26),transparent_20%),radial-gradient(circle_at_82%_22%,rgba(231,210,145,0.28),transparent_18%),radial-gradient(circle_at_50%_85%,rgba(97,198,190,0.18),transparent_26%)]" />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,rgba(115,210,205,0.18)_36%,rgba(58,121,121,0.12))]" />
              <div className="absolute inset-x-[-5%] bottom-10 h-28 rounded-[999px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.72),rgba(169,239,231,0.2)_52%,transparent_72%)] blur-3xl" />
            </div>

            <div className="relative z-10 flex min-h-[90svh] flex-col justify-between p-5 sm:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-full border border-white/60 bg-white/62 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7b22] backdrop-blur-xl shadow-[0_10px_26px_rgba(86,128,126,0.08)]">
                  Live Guest Album
                </div>
                <div className="rounded-full border border-white/60 bg-white/62 px-4 py-2 text-right text-[11px] font-semibold uppercase tracking-[0.24em] text-[#669a99] backdrop-blur-xl shadow-[0_10px_26px_rgba(86,128,126,0.08)]">
                  July 25, 2026
                </div>
              </div>

              <div className="max-w-[58rem]">
                <div className="relative overflow-hidden rounded-[34px] border border-white/28 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.08))] p-5 shadow-[0_18px_60px_rgba(73,111,112,0.06)] backdrop-blur-lg sm:p-7">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute right-[-2rem] top-[-2rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.68),rgba(150,233,227,0.22)_46%,transparent_72%)] blur-2xl" />
                    <div className="absolute left-[-2rem] bottom-[-2rem] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(114,216,216,0.22),transparent_70%)] blur-2xl" />
                    <div className="absolute right-10 top-8 h-3 w-3 rounded-full bg-white/75 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
                    <div className="absolute right-[4.5rem] top-14 h-2.5 w-2.5 rounded-full bg-[#dff8f7] shadow-[0_0_16px_rgba(196,245,242,0.9)]" />
                    <div className="absolute right-14 top-20 h-4 w-4 rounded-full bg-white/65 shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
                    <div className="absolute inset-x-0 bottom-0 h-[4.5rem] bg-[linear-gradient(180deg,transparent,rgba(118,220,214,0.16)_52%,rgba(255,255,255,0.2))]" />
                    <div className="absolute inset-x-0 bottom-6 h-px bg-[linear-gradient(90deg,transparent,rgba(216,180,90,0.1),rgba(216,180,90,0.45),rgba(216,180,90,0.1),transparent)]" />
                  </div>
                  <div className="inline-flex rounded-full border border-[#e7d7a2] bg-white/60 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#9b7b22]">Under The Sea Celebration</div>
                  <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#173f44] sm:text-6xl lg:text-7xl" style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                    Amiyah&apos;s Quinceañera
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-[#245056] sm:text-lg">
                    Take or upload your favorite photos and videos from the night, and leave a voice message she can keep long after the celebration.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => jumpToSection("upload-media")} className="inline-flex items-center gap-2 rounded-full border border-[#c8a546] bg-[#d9b24f] px-5 py-3 text-sm font-semibold text-[#1f2929] shadow-[0_16px_32px_rgba(181,141,41,0.24)] transition hover:-translate-y-0.5" >
                      <Upload className="h-4 w-4" /> Upload Media
                    </button>

                    <button type="button" onClick={() => jumpToSection("gallery")} className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-5 py-3 text-sm font-semibold text-[#2e5f60] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white" >
                      <Camera className="h-4 w-4" /> View Album
                    </button>

                    <button type="button" onClick={() => jumpToSection("voice-memo")} className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/78 px-5 py-3 text-sm font-semibold text-[#2e5f60] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white" >
                      <Mic className="h-4 w-4" /> Leave Voice Memo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {/* Photos Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,249,247,0.78))] p-5 backdrop-blur-xl" style={{ boxShadow: theme.shadow }}>
              <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(114,216,216,0.2),transparent_68%)]" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9b7b22]">Photos</div>
                  <div className="mt-2 text-sm text-[#4f7474]">Sea-glass snapshots from the night.</div>
                </div>
                <div className="text-3xl font-semibold">{counts.photos}</div>
              </div>
            </div>

            {/* Videos Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,244,220,0.78))] p-5 backdrop-blur-xl" style={{ boxShadow: theme.shadow }}>
              <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(216,180,90,0.2),transparent_68%)]" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9b7b22]">Videos</div>
                  <div className="mt-2 text-sm text-[#4f7474]">Entrance, dancing, and tide-turn moments.</div>
                </div>
                <div className="text-3xl font-semibold">{counts.videos}</div>
              </div>
            </div>

            {/* Voice Memos Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(235,247,247,0.8))] p-5 backdrop-blur-xl" style={{ boxShadow: theme.shadow }}>
              <div className="absolute right-[-18px] top-[-18px] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(152,126,204,0.16),transparent_68%)]" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9b7b22]">Voice Memos</div>
                  <div className="mt-2 text-sm text-[#4f7474]">
                    Messages <strong className="font-semibold text-[#4f7474]">Amiyah</strong> can replay long after the party.
                  </div>
                </div>
                <div className="text-3xl font-semibold">{counts.voice}</div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <section
                id="upload-media"
                className="relative overflow-hidden rounded-[30px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(235,250,247,0.84))] p-5 backdrop-blur-xl sm:p-6"
                style={{ boxShadow: theme.shadow }}
              >
                <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(114,216,216,0.22),transparent_70%)]" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7b22]">Upload</div>
                <h2 className="mt-2 text-2xl font-semibold">Add Photos Or Videos</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--amiyah-muted)]">
                  Drop moments from the celebration straight into the shared album. Multiple files can go up in one pass.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9b7b22]">Your Name</span>
                    <input
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Optional"
                      className="h-12 rounded-2xl border border-[var(--amiyah-border)] bg-white/80 px-4 outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9b7b22]">Message</span>
                    <input
                      value={caption}
                      onChange={(event) => setCaption(event.target.value)}
                      placeholder="Optional"
                      className="h-12 rounded-2xl border border-[var(--amiyah-border)] bg-white/80 px-4 outline-none"
                    />
                  </label>
                </div>

                <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-[#c8b270] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(235,249,246,0.72))] px-5 py-10 text-center transition hover:bg-white/86">
                  <Upload className="h-7 w-7 text-[#7cbab8]" />
                  <div className="mt-4 text-base font-medium">Photos or Videos</div>
                  <div className="mt-2 text-sm text-[var(--amiyah-muted)]">JPEG, PNG, WEBP, MP4, MOV, WEBM up to 50 MB each, 12 files per upload, 180 MB per batch.</div>
                  <input
                    ref={selectedFilesInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(event) => void handleMediaFilesPicked(event)}
                    className="hidden"
                  />
                </label>

                {selectedFiles.length ? (
                  <div className="mt-4 space-y-3">
                    {selectedFiles.map((file) => (
                      <div
                        key={`${file.name}-${file.size}`}
                        className="flex items-center justify-between rounded-2xl border border-[var(--amiyah-border)] bg-white/72 px-4 py-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{file.name}</div>
                          <div className="mt-1 text-xs text-[var(--amiyah-muted)]">{formatFileSize(file.size)}</div>
                        </div>
                        <div className="rounded-full bg-[rgba(114,216,216,0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2c6665]">
                          {detectMediaKind(file.type)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => void submitMediaUpload()}
                  disabled={uploading || !selectedFiles.length}
                  className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#c8a546] bg-[#d9b24f] px-6 text-sm font-semibold text-[#1f2929] transition disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  Upload To Album
                </button>
              </section>

              <section
                id="voice-memo"
                className="relative overflow-hidden rounded-[30px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,251,249,0.84))] p-5 backdrop-blur-xl sm:p-6"
                style={{ boxShadow: theme.shadow }}
              >
                <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top,rgba(216,180,90,0.14),transparent_72%)]" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7b22]">Voice Message</div>
                <h2 className="mt-2 text-2xl font-semibold">Leave A Voice Memo</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--amiyah-muted)]">
                  Record a keepsake message from the celebration floor, or upload one you already saved.
                </p>
                <p className="mt-2 text-xs leading-6 text-[var(--amiyah-muted)]">
                  Audio uploads and recorded voice memos are limited to {formatFileSize(MAX_AUDIO_FILE_SIZE_BYTES)} each.
                </p>

                <div className="mt-5 rounded-[28px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(236,249,248,0.72))] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-medium">Recorder</div>
                      <div className="mt-1 text-sm text-[var(--amiyah-muted)]">
                        {isRecording ? `Recording… ${recordingSeconds}s` : "Ready"}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {!isRecording ? (
                        <button
                          type="button"
                          onClick={() => void startVoiceRecorder()}
                          className="inline-flex items-center gap-2 rounded-full border border-[#6ecfd0] bg-[#7de0df]/22 px-4 py-2 text-sm font-semibold text-[#2d6d6c]"
                        >
                          <Mic className="h-4 w-4" />
                          Start Recording
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={stopVoiceRecorder}
                          className="inline-flex items-center gap-2 rounded-full border border-[#c8a546] bg-[#f4d98a]/34 px-4 py-2 text-sm font-semibold text-[#7e6317]"
                        >
                          <PauseCircle className="h-4 w-4" />
                          Stop
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => audioUploadInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-semibold text-[#2d6d6c]"
                      >
                        <Waves className="h-4 w-4" />
                        Upload Audio File
                      </button>
                    </div>
                  </div>

                  <input ref={audioUploadInputRef} type="file" accept="audio/*" onChange={handleAudioFallbackPicked} className="hidden" />

                  {audioPreviewUrl ? (
                    <div className="mt-4 rounded-2xl border border-[var(--amiyah-border)] bg-white/85 p-4">
                      <div className="text-sm font-medium">Recorded memo ready</div>
                      <audio controls className="mt-3 w-full" src={audioPreviewUrl} />
                    </div>
                  ) : null}

                  {audioFallbackFile ? (
                    <div className="mt-4 rounded-2xl border border-[var(--amiyah-border)] bg-white/85 p-4">
                      <div className="text-sm font-medium">Selected audio file</div>
                      <div className="mt-2 text-sm text-[var(--amiyah-muted)]">
                        {audioFallbackFile.name} · {formatFileSize(audioFallbackFile.size)}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => void submitVoiceMemo()}
                      disabled={uploading || (!audioBlob && !audioFallbackFile)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#c8a546] bg-[#d9b24f] px-5 text-sm font-semibold text-[#1f2929] disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mic className="h-4 w-4" />}
                      Upload Voice Memo
                    </button>
                    {(audioBlob || audioFallbackFile) ? (
                      <button
                        type="button"
                        onClick={resetVoiceDraft}
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 bg-white/85 px-5 text-sm font-semibold text-[#315f60]"
                      >
                        Clear Draft
                      </button>
                    ) : null}
                  </div>
                </div>
              </section>
            </div>

            <section
              id="gallery"
              className="relative overflow-hidden rounded-[30px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(235,249,246,0.84))] p-5 backdrop-blur-xl sm:p-6"
              style={{ boxShadow: theme.shadow }}
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(114,216,216,0.18),transparent_72%)]" />
              {/* Absolute Positioned Admin Lock Button */}
              <button
                type="button"
                onClick={() => setAdminOpen(true)}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 inline-flex items-center justify-center rounded-full border border-white/70 bg-white/85 p-2.5 text-[#2d6d6c] transition hover:bg-white z-10"
                aria-label={adminUnlocked ? "Moderation On" : "Admin Menu"}
                title={adminUnlocked ? "Moderation On" : "Admin Menu"}
              >
                <Lock className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9b7b22]">Gallery</div>
                  <h2 className="mt-2 text-2xl font-semibold">Event Album</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--amiyah-muted)]">
                    A live stream of guest memories from the night. <br /> {totalUploads} item{totalUploads === 1 ? "" : "s"} so far.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => { if (!filteredGallery.length) { return; } openViewer(0); }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#c8a546] bg-[#d9b24f] px-4 py-2 text-sm font-semibold text-[#1f2929]"
                  >
                    <PlayCircle className="h-4 w-4" /> Start Slideshow
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {mediaTabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition"
                    style={{
                      borderColor: key === activeTab ? "rgba(201,165,70,0.6)" : "rgba(188,157,77,0.16)",
                      background: key === activeTab ? "rgba(217,178,79,0.18)" : "rgba(255,255,255,0.8)",
                      color: key === activeTab ? "#7f6215" : "#2e5f60",
                    }}
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
              </div>

              {loadingGallery ? (
                <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[28px] border border-[var(--amiyah-border)] bg-white/58">
                  <LoaderCircle className="h-7 w-7 animate-spin text-[#7cbab8]" />
                </div>
              ) : filteredGallery.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {filteredGallery.map((item, index) => (
                    <article key={item.id} className="overflow-hidden rounded-[26px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(241,251,248,0.82))] shadow-[0_16px_42px_rgba(79,129,128,0.08)]">
                      <div className="group relative aspect-[4/5] bg-[#dff9f7]">
                        {item.media_kind === "image" ? (
                          <>
                            <Image src={item.publicUrl} alt={item.caption || "Guest photo upload"} fill unoptimized className="object-cover" />
                            <button type="button" onClick={() => openViewer(index)} className="absolute inset-0 flex items-center justify-center bg-[#122123]/0 transition group-hover:bg-[#122123]/18" aria-label="Open photo in slideshow">
                              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/85 text-[#224546] opacity-0 transition group-hover:opacity-100">
                                <PlayCircle className="h-7 w-7" />
                              </span>
                            </button>
                          </>
                        ) : null}
                        {item.media_kind === "video" ? (
                          <>
                            <video className="h-full w-full object-cover" src={item.publicUrl} muted playsInline preload="metadata" />
                            <button type="button" onClick={() => openViewer(index)} className="absolute inset-0 flex items-center justify-center bg-[#122123]/18" aria-label="Open video in slideshow">
                              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-white/84 text-[#224546]">
                                <PlayCircle className="h-7 w-7" />
                              </span>
                            </button>
                          </>
                        ) : null}
                        {item.media_kind === "audio" ? (
                          <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,rgba(114,216,216,0.3),rgba(255,255,255,0.94))] p-5 text-center">
                            <button type="button" onClick={() => void toggleCardAudio(item.id)} className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#8bd5d4] bg-white/90 text-[#2f6968]" aria-label="Play voice memo">
                              {playingAudioId === item.id ? <PauseCircle className="h-8 w-8" /> : <PlayCircle className="h-8 w-8" />}
                            </button>
                            <div className="text-base font-semibold">Voice Memo</div>
                            <div className="text-sm text-[var(--amiyah-muted)]">Tap to listen or open in slideshow.</div>
                            <button type="button" onClick={() => openViewer(index)} className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2d6d6c]">
                              Open Viewer
                            </button>
                            <audio ref={(element) => { audioElementMapRef.current[item.id] = element; }} className="hidden" src={item.publicUrl} onEnded={() => setPlayingAudioId((current) => (current === item.id ? null : current))} />
                          </div>
                        ) : null}
                        {adminUnlocked ? (
                          <button type="button" onClick={() => void hideUpload(item)} disabled={adminWorking} className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/92 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-700 disabled:opacity-55">
                            {adminWorking ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />} Hide
                          </button>
                        ) : null}
                      </div>
                      <div className="space-y-2 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ background: item.media_kind === "image" ? "rgba(114,216,216,0.16)" : item.media_kind === "video" ? "rgba(217,178,79,0.16)" : "rgba(150,116,201,0.14)", color: item.media_kind === "image" ? "#2f6968" : item.media_kind === "video" ? "#7e6317" : "#6f4ea8", }}>
                            {item.media_kind}
                          </div>
                          <div className="text-xs text-[var(--amiyah-muted)]">{formatDate(item.created_at)}</div>
                        </div>
                        <div className="text-sm font-medium">{item.guest_name || "Guest Upload"}</div>
                        {item.caption ? <div className="text-sm leading-6 text-[var(--amiyah-muted)]">{item.caption}</div> : null}
                        <div className="text-xs text-[var(--amiyah-muted)]">{formatFileSize(item.byte_size)}</div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[28px] border border-[var(--amiyah-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(237,248,245,0.74))] px-5 py-12 text-center">
                  <div className="text-lg font-semibold">No Uploads</div>
                  <p className="mt-2 text-sm text-[var(--amiyah-muted)]">Be the first guest to share a photo, a video, or a message for Amiyah.</p>
                </div>
              )}
            </section>
          </section>

          {statusMessage ? (
            <section
              className="rounded-[24px] border bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(239,248,245,0.72))] px-5 py-4 text-sm backdrop-blur-xl"
              style={{
                borderColor:
                  statusTone === "success"
                    ? "rgba(16,185,129,0.24)"
                    : statusTone === "error"
                      ? "rgba(239,68,68,0.24)"
                      : "rgba(114,216,216,0.28)",
                background:
                  statusTone === "success"
                    ? "rgba(236,253,245,0.85)"
                    : statusTone === "error"
                      ? "rgba(254,242,242,0.88)"
                      : "rgba(239,255,255,0.84)",
                color: statusTone === "success" ? "#166534" : statusTone === "error" ? "#991b1b" : "#245d5d",
              }}
            >
              {statusMessage}
            </section>
          ) : null}
        </div>

        <AdminPanel
          open={adminOpen}
          unlocked={adminUnlocked}
          password={adminPassword}
          working={adminWorking}
          error={adminError}
          onPasswordChange={setAdminPassword}
          onClose={() => {
            setAdminOpen(false);
            setAdminError(null);
          }}
          onVerify={() => void verifyAdminAccess()}
        />

        {viewerOpen && filteredGallery.length ? (
          <GalleryViewer
            items={filteredGallery}
            index={viewerIndex}
            isPlaying={viewerPlaying}
            onClose={() => setViewerOpen(false)}
            onNext={() => setViewerIndex((current) => cycleIndex(current + 1, filteredGallery.length))}
            onPrevious={() => setViewerIndex((current) => cycleIndex(current - 1, filteredGallery.length))}
            onTogglePlay={() => setViewerPlaying((current) => !current)}
          />
        ) : null}

        {uploadProgress?.active ? (
          <>
            <div className="fixed inset-0 z-[115] bg-[#0f2021]/54 backdrop-blur-[3px]">
              <div className="flex h-full items-end justify-center px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 sm:items-center sm:px-4 sm:pb-6">
                <div className="w-full max-w-md rounded-[32px] border border-white/25 bg-white/96 p-5 text-center shadow-[0_28px_80px_rgba(53,77,78,0.24)] sm:p-6">
                  <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#d6c081] bg-[#fff5d8] text-[#9b7b22]">
                    <LoaderCircle className="h-8 w-8 animate-spin" />
                  </div>
                  <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9b7b22]">
                    {uploadProgress.mode === "media" ? "Uploading Media" : "Uploading Voice Memo"}
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-[#214445]">Please keep this page open</h3>
                  <p className="mt-3 text-sm leading-6 text-[#4b6c6c]">
                    {uploadProgress.current} of {uploadProgress.total} {uploadProgress.total === 1 ? "item" : "items"} in progress.
                  </p>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e8f4f4]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#72d8d8,#d8b45a)] transition-all"
                      style={{ width: `${Math.max(8, Math.round((uploadProgress.current / Math.max(uploadProgress.total, 1)) * 100))}%` }}
                    />
                  </div>
                  <div className="mt-4 truncate text-sm font-medium text-[#315f60]">{uploadProgress.label}</div>
                  <div className="mt-3 text-xs leading-5 text-[#5d7b7c]">
                    Uploads continue best if Safari or Chrome stays open until this finishes.
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-5 right-5 z-[116] hidden w-[min(92vw,360px)] rounded-[26px] border border-white/35 bg-white/95 p-4 shadow-[0_22px_70px_rgba(53,77,78,0.22)] backdrop-blur-xl md:block">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d6c081] bg-[#fff5d8] text-[#9b7b22]">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-[#214445]">
                    {uploadProgress.mode === "media" ? "Uploading to album" : "Uploading voice memo"}
                  </div>
                  <div className="mt-1 text-xs text-[#4b6c6c]">
                    {uploadProgress.current} / {uploadProgress.total}
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e8f4f4]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#72d8d8,#d8b45a)] transition-all"
                      style={{ width: `${Math.max(8, Math.round((uploadProgress.current / Math.max(uploadProgress.total, 1)) * 100))}%` }}
                    />
                  </div>
                  <div className="mt-2 truncate text-xs font-medium text-[#315f60]">{uploadProgress.label}</div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
