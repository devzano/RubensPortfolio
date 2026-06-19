"use client";

import AppImages from "@/constants/images";
import Image from "next/image";
import { useMemo, useState, type CSSProperties, type FormEvent } from "react";

const portalTheme = {
  pageBg: "#f5f1e3",
  pageGlowTop: "radial-gradient(circle at top, rgba(216,180,74,0.18), transparent 32%)",
  pageGlowBottom: "radial-gradient(circle at bottom right, rgba(160,132,47,0.10), transparent 28%)",
  text: "#1f1c16",
  muted: "rgba(31,28,22,0.72)",
  soft: "rgba(31,28,22,0.52)",
  border: "rgba(89,72,27,0.16)",
  borderSoft: "rgba(89,72,27,0.12)",
  panel: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,243,229,0.78))",
  hero: "linear-gradient(135deg, rgba(255,250,239,0.94), rgba(245,236,212,0.88))",
  surface: "rgba(255,255,255,0.62)",
  surfaceStrong: "rgba(255,255,255,0.78)",
  surfaceSoft: "rgba(255,255,255,0.56)",
  inputBg: "rgba(255,255,255,0.86)",
  inputText: "#1f1c16",
  inputPlaceholder: "rgba(31,28,22,0.34)",
  shadow: "0 24px 80px rgba(69,53,12,0.14)",
  heroShadow: "0 28px 100px rgba(69,53,12,0.18)",
  buttonText: "#1f1c16",
} as const;

const accountSummary = [
  { label: "Account", value: "Active COD Fuel Customer" },
  { label: "Primary Location", value: "Tavernier, FL" },
  { label: "Primary Fuel", value: "Diesel" },
  { label: "Last Delivery", value: "June 14, 2026" },
];

const tanks = [
  { name: "Main Dock Tank", type: "Diesel", capacity: "1,000 gal", level: "42%" },
  { name: "Boat Reserve", type: "Diesel", capacity: "250 gal x2", level: "58%" },
];

const pastOrders = [
  {
    id: "ORD-48211",
    date: "June 14, 2026",
    fuel: "Diesel",
    gallons: "420 gal",
    location: "255 Tavernier St.",
    status: "Delivered",
  },
  {
    id: "ORD-48087",
    date: "June 08, 2026",
    fuel: "Diesel",
    gallons: "300 gal",
    location: "255 Tavernier St.",
    status: "Delivered",
  },
  {
    id: "ORD-47742",
    date: "May 30, 2026",
    fuel: "Diesel",
    gallons: "500 gal",
    location: "724 S. Flagler Ave.",
    status: "Delivered",
  },
];

function getPortalThemeStyle(): CSSProperties {
  return {
    backgroundColor: portalTheme.pageBg,
    color: portalTheme.text,
    ["--ss-text" as string]: portalTheme.text,
    ["--ss-muted" as string]: portalTheme.muted,
    ["--ss-soft" as string]: portalTheme.soft,
    ["--ss-border" as string]: portalTheme.border,
    ["--ss-border-soft" as string]: portalTheme.borderSoft,
    ["--ss-panel" as string]: portalTheme.panel,
    ["--ss-surface" as string]: portalTheme.surface,
    ["--ss-surface-strong" as string]: portalTheme.surfaceStrong,
    ["--ss-surface-soft" as string]: portalTheme.surfaceSoft,
    ["--ss-input-bg" as string]: portalTheme.inputBg,
    ["--ss-input-text" as string]: portalTheme.inputText,
    ["--ss-input-placeholder" as string]: portalTheme.inputPlaceholder,
    ["--ss-shadow" as string]: portalTheme.shadow,
    ["--button-text" as string]: portalTheme.buttonText,
  };
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-[28px] border p-5 backdrop-blur-xl sm:p-6"
      style={{
        borderColor: "var(--ss-border)",
        background: "var(--ss-panel)",
        boxShadow: "var(--ss-shadow)",
      }}
    >
      <div className="mb-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent)">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl" style={{ color: "var(--ss-text)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="h-12 rounded-2xl border px-4 text-sm outline-none ring-1 transition placeholder:text-[color:var(--ss-input-placeholder)] focus:border-(--accent) focus:ring-(--accent-soft)"
        style={{
          borderColor: "var(--ss-border)",
          background: "var(--ss-input-bg)",
          color: "var(--ss-input-text)",
          boxShadow: "inset 0 0 0 1px var(--ss-border-soft)",
        }}
      />
    </label>
  );
}

export default function Page() {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const nextDeliveryWindow = useMemo(() => "Tomorrow, 6:00 AM - 10:00 AM", []);

  const handleOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("Mock order created. Dispatch would review and confirm the delivery window.");
  };

  return (
    <main className="relative min-h-dvh overflow-hidden px-4 py-10 sm:px-6 lg:px-8" style={getPortalThemeStyle()}>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `${portalTheme.pageGlowTop}, ${portalTheme.pageGlowBottom}`,
        }}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section
          className="relative overflow-hidden rounded-[34px] border p-6 backdrop-blur-2xl sm:p-8"
          style={{
            borderColor: "var(--ss-border)",
            background: portalTheme.hero,
            boxShadow: portalTheme.heroShadow,
          }}
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at center, rgba(216,180,74,0.24), transparent 70%)" }}
          />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="max-w-4xl flex-1">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{
                  borderColor: "color-mix(in srgb, var(--accent) 24%, transparent)",
                  background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                  color: "var(--accent)",
                }}
              >
                Temporary Showcase
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl p-2 sm:h-[88px] sm:w-28">
                  <Image
                    src={AppImages.sunshine}
                    alt="Sunshine Gasoline Distributors logo"
                    fill
                    className="object-contain p-1.5"
                    priority
                  />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: "var(--ss-text)" }}>
                  Sunshine Fuel Portal
                </h1>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 sm:text-base" style={{ color: "var(--ss-muted)" }}>
                A mock customer profile experience showing account status, past deliveries, and a streamlined fuel re-order flow.
              </p>
            </div>

            <div className="grid gap-3 pt-2 lg:w-[280px]">
              <div
                className="rounded-2xl border px-4 py-3"
                style={{
                  borderColor: "var(--ss-border)",
                  background: "var(--ss-surface-soft)",
                }}
              >
                <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--ss-soft)" }}>
                  Next Delivery Window
                </div>
                <div className="mt-1 text-sm font-medium" style={{ color: "var(--ss-text)" }}>
                  {nextDeliveryWindow}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Section eyebrow="Profile" title="Customer Snapshot">
              <div className="grid gap-4 md:grid-cols-2">
                {accountSummary.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border p-4"
                    style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
                      {item.label}
                    </div>
                    <div className="mt-2 text-base font-medium" style={{ color: "var(--ss-text)" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section eyebrow="Orders" title="Past Orders">
              <div className="space-y-4">
                {pastOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-3xl border p-4"
                    style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-base font-semibold" style={{ color: "var(--ss-text)" }}>
                          {order.id}
                        </div>
                        <div className="mt-1 text-sm" style={{ color: "var(--ss-muted)" }}>
                          {order.date}
                        </div>
                      </div>
                      <div
                        className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                        style={{
                          color: "#059669",
                          background: "rgba(5,150,105,0.10)",
                          border: "1px solid rgba(5,150,105,0.18)",
                        }}
                      >
                        {order.status}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--accent)">Fuel</div>
                        <div className="mt-1 text-sm" style={{ color: "var(--ss-text)" }}>{order.fuel}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--accent)">Volume</div>
                        <div className="mt-1 text-sm" style={{ color: "var(--ss-text)" }}>{order.gallons}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--accent)">Site</div>
                        <div className="mt-1 text-sm" style={{ color: "var(--ss-text)" }}>{order.location}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section eyebrow="Tanks" title="Current Fuel Profile">
              <div className="space-y-4">
                {tanks.map((tank) => (
                  <div
                    key={tank.name}
                    className="rounded-3xl border p-4"
                    style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold" style={{ color: "var(--ss-text)" }}>
                          {tank.name}
                        </div>
                        <div className="mt-1 text-sm" style={{ color: "var(--ss-muted)" }}>
                          {tank.type} • {tank.capacity}
                        </div>
                      </div>
                      <div className="text-sm font-medium" style={{ color: "var(--ss-text)" }}>
                        {tank.level}
                      </div>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full" style={{ background: "rgba(216,180,74,0.16)" }}>
                      <div
                        className="h-full rounded-full bg-linear-to-r from-(--accent-light) to-(--accent)"
                        style={{ width: tank.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section eyebrow="Create Order" title="Fuel Reorder">
              <form onSubmit={handleOrderSubmit} className="grid gap-4">
                <Field label="Fuel Type" defaultValue="Diesel" />
                <Field label="Requested Gallons" defaultValue="300" />
                <Field label="Delivery Site" defaultValue="255 Tavernier St." />
                <Field label="Requested Window" defaultValue="Tomorrow, 6:00 AM - 10:00 AM" />
                <Field label="Order Notes" defaultValue="Please top off dock access first." />

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-(--accent-light) to-(--accent) px-6 text-sm font-semibold shadow-lg shadow-black/15 transition hover:-translate-y-0.5"
                  style={{ color: "var(--button-text)" }}
                >
                  Create Order
                </button>

                {statusMessage ? (
                  <div
                    className="rounded-2xl border px-4 py-3 text-sm"
                    style={{
                      borderColor: "rgba(5,150,105,0.20)",
                      background: "rgba(5,150,105,0.08)",
                      color: "#065f46",
                    }}
                  >
                    {statusMessage}
                  </div>
                ) : null}
              </form>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
