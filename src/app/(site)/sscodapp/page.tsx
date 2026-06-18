"use client";

import AppImages from "@/constants/images";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const sunshineTheme = {
  dark: {
    pageBg: "#06070b",
    pageGlowTop: "radial-gradient(circle at top, rgba(216,180,74,0.16), transparent 34%)",
    pageGlowBottom: "radial-gradient(circle at bottom left, rgba(108,90,28,0.14), transparent 30%)",
    text: "rgba(255,255,255,0.96)",
    muted: "rgba(255,255,255,0.70)",
    soft: "rgba(255,255,255,0.48)",
    border: "rgba(255,255,255,0.10)",
    borderSoft: "rgba(255,255,255,0.08)",
    panel: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    hero: "linear-gradient(135deg, rgba(8,12,20,0.9), rgba(11,20,29,0.76))",
    surface: "rgba(0,0,0,0.20)",
    surfaceStrong: "rgba(0,0,0,0.28)",
    surfaceSoft: "rgba(255,255,255,0.05)",
    inputBg: "rgba(0,0,0,0.30)",
    inputText: "rgba(255,255,255,0.96)",
    inputPlaceholder: "rgba(255,255,255,0.30)",
    canvasBg: "#0b1017",
    successBg: "rgba(52, 211, 153, 0.10)",
    successBorder: "rgba(52, 211, 153, 0.30)",
    successText: "#d1fae5",
    errorBg: "rgba(251, 113, 133, 0.10)",
    errorBorder: "rgba(251, 113, 133, 0.30)",
    errorText: "#ffe4e6",
    buttonText: "#ffffff",
    shadow: "0 24px 80px rgba(0,0,0,0.28)",
    heroShadow: "0 28px 100px rgba(0,0,0,0.36)",
    signatureStroke: "#f8fafc",
    toggleOffBg: "rgba(255,255,255,0.16)",
  },
  light: {
    pageBg: "#f5f1e3",
    pageGlowTop: "radial-gradient(circle at top, rgba(216,180,74,0.20), transparent 32%)",
    pageGlowBottom: "radial-gradient(circle at bottom left, rgba(160,132,47,0.12), transparent 30%)",
    text: "#1f1c16",
    muted: "rgba(31,28,22,0.72)",
    soft: "rgba(31,28,22,0.52)",
    border: "rgba(89,72,27,0.16)",
    borderSoft: "rgba(89,72,27,0.12)",
    panel: "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,243,229,0.78))",
    hero: "linear-gradient(135deg, rgba(255,250,239,0.94), rgba(245,236,212,0.88))",
    surface: "rgba(255,255,255,0.62)",
    surfaceStrong: "rgba(255,255,255,0.72)",
    surfaceSoft: "rgba(255,255,255,0.56)",
    inputBg: "rgba(255,255,255,0.78)",
    inputText: "#1f1c16",
    inputPlaceholder: "rgba(31,28,22,0.34)",
    canvasBg: "#fffaf0",
    successBg: "rgba(5, 150, 105, 0.10)",
    successBorder: "rgba(5, 150, 105, 0.25)",
    successText: "#065f46",
    errorBg: "rgba(225, 29, 72, 0.08)",
    errorBorder: "rgba(225, 29, 72, 0.20)",
    errorText: "#9f1239",
    buttonText: "#1f1c16",
    shadow: "0 24px 80px rgba(69,53,12,0.14)",
    heroShadow: "0 28px 100px rgba(69,53,12,0.18)",
    signatureStroke: "#111827",
    toggleOffBg: "rgba(107,114,128,0.35)",
  },
} as const;

type FieldSpec = {
  label: string;
  name: string;
  value: string;
  type?: string;
};

type AddressGroup = {
  title: string;
  fields: FieldSpec[];
};

const companyFields: FieldSpec[] = [
  { label: "Date", name: "date", value: "", type: "date" },
  { label: "Company Name", name: "company_name", value: "Manzano Marine LLC" },
  { label: "Owner", name: "owner", value: "Ruben Manzano" },
  { label: "Telephone", name: "telephone", value: "(305) 481-1185", type: "tel" },
  { label: "Business Email", name: "business_email", value: "rmanzano@sunshinegasoline.com", type: "email" },
  { label: "Accounts Payable Clerk", name: "accounts_payable_clerk", value: "Kathy Palomo" },
  { label: "Primary Activity of Business", name: "primary_activity_of_business", value: "Boat Supplies & Marina Operations" },
  { label: "Years Established", name: "years_established", value: "8" },
  { label: "Tank Registration No. (s)", name: "tank_registration_numbers", value: "FL-MAR-22841 / FL-MAR-22842" },
  { label: "Individual Applicant DOB", name: "individual_applicant_dob", value: "1996-08-25", type: "date" },
  { label: "Federal Employee ID No.", name: "federal_employee_id_no", value: "84-5123476" },
  { label: "Sales Tax Exempt No.", name: "sales_tax_exempt_no", value: "FL-EX-20498713" },
];

const apEmailField: FieldSpec = {
  label: "A/P Email",
  name: "ap_email",
  value: "rmanzano@sunshinegasoline.com",
  type: "email",
};

const addressFields: AddressGroup[] = [
  {
    title: "Mailing Address",
    fields: [
      { label: "Street Address", name: "mailing_street_address", value: "724 S. Flagler Ave." },
      { label: "City", name: "mailing_city", value: "Homestead" },
      { label: "State", name: "mailing_state", value: "FL" },
      { label: "Zip Code", name: "mailing_zip_code", value: "33030" },
    ],
  },
  {
    title: "Delivery Address",
    fields: [
      { label: "Street Address", name: "delivery_street_address", value: "255 Tavernier St." },
      { label: "City", name: "delivery_city", value: "Tavernier" },
      { label: "State", name: "delivery_state", value: "FL" },
      { label: "Zip Code", name: "delivery_zip_code", value: "33070" },
    ],
  },
];

const fuelFields: FieldSpec[] = [
  { label: "Type of Fuel", name: "type_of_fuel", value: "Diesel" },
  { label: "Tank Size", name: "tank_size", value: "1,000 gallons" },
  { label: "Boat Tank", name: "boat_tank", value: "Yes, twin 250-gallon tanks" },
];

const cardFields: FieldSpec[] = [
  { label: "Name on Card", name: "name_on_card", value: "Ruben Manzano" },
  { label: "Type of Card", name: "type_of_card", value: "Visa Business" },
  { label: "Card Number", name: "card_number", value: "4242 4242 4242 4242" },
  { label: "3-digit Bank Number", name: "bank_number", value: "123" },
  { label: "Expiration Date", name: "expiration_date", value: "08/28" },
  { label: "Driver's License #", name: "drivers_license_number", value: "M525-721-98-417-0" },
  { label: "Authorized Signature for Payment", name: "authorized_signature_for_payment", value: "Ruben Manzano" },
];

const reviewChecks = [
  {
    label: "Sunbiz",
    url: "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName",
    note: "Verify the business entity is active and matches the submitted company name.",
  },
  {
    label: "Florida Driver License Check",
    url: "https://mydmvportal.flhsmv.gov/Home/en/PublicWeb/DLCheck",
    note: "Manual review required. The FLHSMV portal uses a CAPTCHA, so Kathy will still need to enter the license number directly.",
  },
  {
    label: "Miami-Dade Property Search",
    url: "https://apps.miamidadepa.gov/PropertySearch/#/",
    note: "Cross-check the owner name and address details against county property records.",
  },
  {
    label: "Miami-Dade Criminal Search",
    url: "https://www2.miamidadeclerk.gov/cjis/",
    note: "Run a manual county criminal records check using the applicant name and date of birth.",
  },
] as const;

type VerificationStepState = "pending" | "running" | "passed" | "manual" | "failed";

type VerificationStep = {
  key: string;
  label: string;
  description: string;
  state: VerificationStepState;
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const createVerificationSteps = (): VerificationStep[] => [
  {
    key: "business",
    label: "Business Check",
    description: "Validating business entity details against Sunbiz.",
    state: "pending",
  },
  {
    key: "property",
    label: "Property Check",
    description: "Reviewing Miami-Dade property ownership details.",
    state: "pending",
  },
  {
    key: "criminal",
    label: "Criminal Check",
    description: "Reviewing Miami-Dade criminal records status.",
    state: "pending",
  },
  {
    key: "dmv",
    label: "DMV History",
    description: "Manual review required on the state DMV portal.",
    state: "pending",
  },
];

function getPageThemeStyle(theme: (typeof sunshineTheme)[keyof typeof sunshineTheme]): CSSProperties {
  return {
    backgroundColor: theme.pageBg,
    color: theme.text,
    ["--ss-text" as string]: theme.text,
    ["--ss-muted" as string]: theme.muted,
    ["--ss-soft" as string]: theme.soft,
    ["--ss-border" as string]: theme.border,
    ["--ss-border-soft" as string]: theme.borderSoft,
    ["--ss-panel" as string]: theme.panel,
    ["--ss-surface" as string]: theme.surface,
    ["--ss-surface-strong" as string]: theme.surfaceStrong,
    ["--ss-surface-soft" as string]: theme.surfaceSoft,
    ["--ss-input-bg" as string]: theme.inputBg,
    ["--ss-input-text" as string]: theme.inputText,
    ["--ss-input-placeholder" as string]: theme.inputPlaceholder,
    ["--ss-canvas-bg" as string]: theme.canvasBg,
    ["--ss-shadow" as string]: theme.shadow,
    ["--button-text" as string]: theme.buttonText,
    ["--ss-signature-stroke" as string]: theme.signatureStroke,
    ["--ss-toggle-off-bg" as string]: theme.toggleOffBg,
  };
}

function Field({
  label,
  name,
  value,
  type = "text",
  className = "",
  required = true,
  readOnly = false,
  headerRight,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  headerRight?: ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-end gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
        <span className="leading-[1.15]">{label}</span>
        {headerRight ? (
          <span className="flex h-8 shrink-0 items-end leading-none">{headerRight}</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={value}
        readOnly={readOnly}
        className="h-12 rounded-2xl border px-4 text-sm outline-none ring-1 transition placeholder:text-[color:var(--ss-input-placeholder)] focus:border-(--accent) focus:ring-(--accent-soft) read-only:cursor-default read-only:opacity-70"
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

function UploadField({
  label,
  name,
  accept,
  help,
  required = true,
}: {
  label: string;
  name: string;
  accept: string;
  help?: string;
  required?: boolean;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFileName(file?.name ?? "");

    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setPreviewUrl(null);
    setFileName("");
  };

  return (
    <label
      className="flex flex-col gap-2 rounded-3xl border p-4"
      style={{
        borderColor: "var(--ss-border-soft)",
        background: "var(--ss-surface)",
      }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
        {label}
      </span>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        required={required}
        onChange={handleChange}
        className="block w-full rounded-2xl border border-dashed px-4 py-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-(--accent) file:px-4 file:py-2 file:text-sm file:font-semibold file:text-(--button-text) hover:file:brightness-110"
        style={{
          borderColor: "var(--ss-border)",
          background: "var(--ss-surface-strong)",
          color: "var(--ss-input-text)",
        }}
      />

      {previewUrl ? (
        <div
          className="mt-3 overflow-hidden rounded-2xl border"
          style={{
            borderColor: "var(--ss-border)",
            background: "var(--ss-canvas-bg)",
          }}
        >
          <img
            src={previewUrl}
            alt={`${label} preview`}
            className="h-48 w-full object-contain"
          />
        </div>
      ) : null}

      {fileName ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs truncate" style={{ color: "var(--ss-soft)" }}>
            Selected: {fileName}
          </span>
          <button
            type="button"
            onClick={clearFile}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition hover:opacity-80"
            style={{
              borderColor: "var(--ss-border)",
              background: "var(--ss-surface-soft)",
              color: "var(--ss-muted)",
            }}
            aria-label="Clear selected file"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6L18 18" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
      ) : null}

      {help ? <span className="text-xs" style={{ color: "var(--ss-soft)" }}>{help}</span> : null}
    </label>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
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

function SignaturePad({
  value,
  onChange,
  currentDate,
  strokeColor,
}: {
  value: string;
  onChange: (nextValue: string) => void;
  currentDate: string;
  strokeColor: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const pointRef = useRef({ x: 0, y: 0 });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    context.scale(dpr, dpr);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 2.4;
    context.strokeStyle = strokeColor;
    context.clearRect(0, 0, rect.width, rect.height);

    if (!value) {
      setIsEmpty(true);
      return;
    }

    const image = new window.Image();
    image.onload = () => {
      context.clearRect(0, 0, rect.width, rect.height);
      context.drawImage(image, 0, 0, rect.width, rect.height);
      setIsEmpty(false);
    };
    image.src = value;
  }, [value, strokeColor]);

  const toPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const begin = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    drawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = toPoint(event);
    pointRef.current = point;

    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(point.x + 0.01, point.y + 0.01);
    context.stroke();

    const nextValue = canvas.toDataURL("image/png");
    onChange(nextValue);
    setIsEmpty(false);
  };

  const move = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const point = toPoint(event);
    context.beginPath();
    context.moveTo(pointRef.current.x, pointRef.current.y);
    context.lineTo(point.x, point.y);
    context.stroke();
    pointRef.current = point;
  };

  const end = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL("image/png"));
    setIsEmpty(false);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    setIsEmpty(true);
    onChange("");
  };

  return (
    <div
      className="rounded-3xl border p-4"
      style={{
        borderColor: "var(--ss-border-soft)",
        background: "var(--ss-surface)",
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
            Signature
          </div>
          <div className="mt-1 text-sm" style={{ color: "var(--ss-muted)" }}>
            sign with your mouse or trackpad.
          </div>
        </div>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition"
          style={{
            borderColor: "var(--ss-border)",
            background: "var(--ss-surface-soft)",
            color: "var(--ss-muted)",
          }}
        >
          Clear
        </button>
      </div>

      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--ss-border)",
          background: "var(--ss-canvas-bg)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="block h-44 w-full touch-none"
          onPointerDown={begin}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
        />
      </div>

      <input name="signature_data_url" type="hidden" value={value} readOnly />
      <input name="authorization_date" type="hidden" value={currentDate} readOnly />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: "var(--ss-soft)" }}>
        <span>{isEmpty ? "signature required before submission" : "signature captured"}</span>
        <span>
          Date: {(() => {
            const [year, month, day] = currentDate.split("-");
            return `${month}-${day}-${year}`;
          })()}
        </span>
      </div>
    </div>
  );
}

function ThemeToggle({
  isLight,
  onToggle,
}: {
  isLight: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
      style={{
        borderColor: "var(--ss-border)",
        background: "var(--ss-surface-soft)",
        color: "var(--ss-text)",
      }}
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          <circle cx="12" cy="12" r="4.2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M20.2 14.4A8.7 8.7 0 0 1 9.6 3.8a.5.5 0 0 0-.7-.6A10 10 0 1 0 20.8 15a.5.5 0 0 0-.6-.6Z" />
        </svg>
      )}
    </button>
  );
}

function dataUrlToFile(dataUrl: string, filename: string) {
  const [header, content] = dataUrl.split(",");
  const mimeMatch = header.match(/data:(.*?);base64/);
  if (!mimeMatch || !content) return null;

  const mimeType = mimeMatch[1];
  const binary = atob(content);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new File([bytes], filename, { type: mimeType });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function VerificationModal({
  open,
  steps,
  isSendingEmail,
  isComplete,
  errorMessage,
  onClose,
}: {
  open: boolean;
  steps: VerificationStep[];
  isSendingEmail: boolean;
  isComplete: boolean;
  errorMessage: string | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm">
      <div
        className="w-full max-w-2xl rounded-[30px] border p-6 shadow-2xl sm:p-7"
        style={{
          borderColor: "var(--ss-border)",
          background: "var(--ss-panel)",
          color: "var(--ss-text)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent)">
              Verification Preview
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              Running Customer Review Flow
            </h3>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--ss-muted)" }}>
              This demonstrates the future approval flow. Business, property, and criminal checks are shown as preview passes, and DMV remains manual review required until a compliant backend verifier is approved.
            </p>
          </div>
          {(isComplete || errorMessage) ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition"
              style={{
                borderColor: "var(--ss-border)",
                background: "var(--ss-surface-soft)",
                color: "var(--ss-muted)",
              }}
            >
              Close
            </button>
          ) : null}
        </div>

        <div className="mt-6 space-y-3">
          {steps.map((step) => {
            const stateStyles: Record<VerificationStepState, { badge: string; tone: string; }> = {
              pending: { badge: "Pending", tone: "var(--ss-soft)" },
              running: { badge: "Running", tone: "var(--accent)" },
              passed: { badge: "Passed", tone: "#059669" },
              manual: { badge: "Manual Review", tone: "#d97706" },
              failed: { badge: "Failed", tone: "#e11d48" },
            };

            return (
              <div
                key={step.key}
                className="rounded-3xl border p-4"
                style={{
                  borderColor: "var(--ss-border-soft)",
                  background: "var(--ss-surface)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{step.label}</div>
                    <div className="mt-1 text-sm" style={{ color: "var(--ss-muted)" }}>
                      {step.description}
                    </div>
                  </div>
                  <div
                    className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{
                      color: stateStyles[step.state].tone,
                      background: "color-mix(in srgb, currentColor 10%, transparent)",
                      border: "1px solid color-mix(in srgb, currentColor 20%, transparent)",
                    }}
                  >
                    {stateStyles[step.state].badge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-3xl border p-4" style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}>
          <div className="text-sm font-medium">Dispatch Summary</div>
          <div className="mt-2 text-sm" style={{ color: "var(--ss-muted)" }}>
            {errorMessage
              ? errorMessage
              : isSendingEmail
                ? "Preparing summary email for dispatch."
                : isComplete
                  ? "Summary sent. DMV is flagged as manual review required in the email."
                  : "Verification preview is still in progress."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCardDetails, setUseCardDetails] = useState(false);
  const [useSeparateApEmail, setUseSeparateApEmail] = useState(false);
  const [useMailingForDelivery, setUseMailingForDelivery] = useState(false);
  const [isPickup, setIsPickup] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [isLightMode, setIsLightMode] = useState(true);
  const [status, setStatus] = useState<{
    tone: "success" | "error" | null;
    message: string | null;
  }>({ tone: null, message: null });
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>(() => createVerificationSteps());
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const currentDate = useMemo(() => todayIso(), []);
  const theme = isLightMode ? sunshineTheme.light : sunshineTheme.dark;

  const mailingAddressGroup = addressFields.find((group) => group.title === "Mailing Address");

  const deliveryValueFor = (field: FieldSpec) => {
    if (isPickup) {
      if (field.name === "delivery_street_address") return "Pick-Up";
      return "N/A";
    }

    if (!useMailingForDelivery) {
      return field.value;
    }

    const mailingFieldName = field.name.replace("delivery_", "mailing_");
    return mailingAddressGroup?.fields.find((mailingField) => mailingField.name === mailingFieldName)?.value ?? field.value;
  };

  useEffect(() => {
    setStatus({ tone: null, message: null });
  }, [useCardDetails]);

  const setStepState = (key: VerificationStep["key"], nextState: VerificationStepState) => {
    setVerificationSteps((current) =>
      current.map((step) => (step.key === key ? { ...step, state: nextState } : step))
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!signatureDataUrl) {
      setStatus({
        tone: "error",
        message: "Please add a signature before submitting the application.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ tone: null, message: null });
    setVerificationSteps(createVerificationSteps());
    setVerificationModalOpen(true);
    setVerificationComplete(false);
    setVerificationError(null);
    setIsSendingEmail(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());
    const deliveryMethod = isPickup ? "Pick-Up" : useMailingForDelivery ? "Same as Mailing Address" : "Delivery";
    const apEmail = useSeparateApEmail
      ? String(entries.ap_email ?? "")
      : String(entries.business_email ?? "");
    const companyName = String(entries.company_name ?? "");
    const ownerName = String(entries.owner ?? "");
    const ownerDob = String(entries.individual_applicant_dob ?? "");
    const driversLicenseNumber = useCardDetails
      ? String(entries.drivers_license_number ?? "")
      : "See uploaded driver's license attachment";
    const mailingAddress = [
      String(entries.mailing_street_address ?? ""),
      String(entries.mailing_city ?? ""),
      String(entries.mailing_state ?? ""),
      String(entries.mailing_zip_code ?? ""),
    ]
      .filter(Boolean)
      .join(", ");
    const deliveryAddress = [
      String(entries.delivery_street_address ?? ""),
      String(entries.delivery_city ?? ""),
      String(entries.delivery_state ?? ""),
      String(entries.delivery_zip_code ?? ""),
    ]
      .filter(Boolean)
      .join(", ");

    formData.set("appName", "Sunshine COD Application");
    formData.set("firstName", String(entries.owner ?? "Ruben"));
    formData.set("lastName", "Application");
    formData.set("email", String(entries.business_email ?? "ruben@manzanomarine.co"));
    formData.set("subject", "Sunshine COD Application Submission");
    formData.set("recipient", "kpalomo@sunshinegasoline.com");
    formData.set("delivery_method", deliveryMethod);

    const messageLines = [
      "Sunshine COD Application Submission",
      "",
      "Showcase Verification Preview",
      "Business Check: Passed (preview)",
      "Property Check: Passed (preview)",
      "Criminal Check: Passed (preview)",
      `Delivery Method: ${deliveryMethod}`,
      "DMV History: Manual review required",
      "",
      `Date: ${String(entries.date ?? "")}`,
      `Company Name: ${String(entries.company_name ?? "")}`,
      `Owner: ${String(entries.owner ?? "")}`,
      `Telephone: ${String(entries.telephone ?? "")}`,
      `Business Email: ${String(entries.business_email ?? "")}`,
      `Accounts Payable Clerk: ${String(entries.accounts_payable_clerk ?? "")}`,
      `A/P Email: ${apEmail}`,
      `Primary Activity of Business: ${String(entries.primary_activity_of_business ?? "")}`,
      `Years Established: ${String(entries.years_established ?? "")}`,
      `Tank Registration No. (s): ${String(entries.tank_registration_numbers ?? "")}`,
      `Individual Applicant DOB: ${String(entries.individual_applicant_dob ?? "")}`,
      `Federal Employee ID No.: ${String(entries.federal_employee_id_no ?? "")}`,
      `Sales Tax Exempt No.: ${String(entries.sales_tax_exempt_no ?? "")}`,
      "",
      "Dispatch Review Checks",
      `Sunbiz Business Check: review ${companyName} — ${reviewChecks[0].url}`,
      `Florida Driver License Check: MANUAL REVIEW REQUIRED — ${driversLicenseNumber} — ${reviewChecks[1].url}`,
      `Miami-Dade Property Search: review ${ownerName} / ${mailingAddress} / ${deliveryAddress} — ${reviewChecks[2].url}`,
      `Miami-Dade Criminal Search: review ${ownerName} / DOB ${ownerDob} — ${reviewChecks[3].url}`,
      "",
      "Mailing Address",
      `Street: ${String(entries.mailing_street_address ?? "")}`,
      `City: ${String(entries.mailing_city ?? "")}`,
      `State: ${String(entries.mailing_state ?? "")}`,
      `Zip Code: ${String(entries.mailing_zip_code ?? "")}`,
      "",
      `Delivery Address (${deliveryMethod})`,
      `Street: ${String(entries.delivery_street_address ?? "")}`,
      `City: ${String(entries.delivery_city ?? "")}`,
      `State: ${String(entries.delivery_state ?? "")}`,
      `Zip Code: ${String(entries.delivery_zip_code ?? "")}`,
      "",
      "Fuel Details",
      `Type of Fuel: ${String(entries.type_of_fuel ?? "")}`,
      `Tank Size: ${String(entries.tank_size ?? "")}`,
      `Boat Tank: ${String(entries.boat_tank ?? "")}`,
      "",
      "Authorization",
      `Printed Name: ${String(entries.printed_name ?? "")}`,
      `Authorization Date: ${String(entries.authorization_date ?? "")}`,
      "Signature Included: Yes",
      "",
      "Attachments",
      `Sales Tax Exemption Certificate: ${formData.get("sales_tax_certificate") instanceof File && (formData.get("sales_tax_certificate") as File).size > 0 ? "Attached" : "Not attached"}`,
      `Driver's License: ${formData.get("drivers_license_image") instanceof File && (formData.get("drivers_license_image") as File).size > 0 ? "Attached" : "Not attached"}`,
    ];

    if (useCardDetails) {
      messageLines.push(
        "",
        "Credit Card Authorization",
        `Name on Card: ${String(entries.name_on_card ?? "")}`,
        `Type of Card: ${String(entries.type_of_card ?? "")}`,
        `Card Number: ${String(entries.card_number ?? "")}`,
        `3-digit Bank Number: ${String(entries.bank_number ?? "")}`,
        `Expiration Date: ${String(entries.expiration_date ?? "")}`,
        `Driver's License #: ${String(entries.drivers_license_number ?? "")}`,
        `Authorized Signature for Payment: ${String(entries.authorized_signature_for_payment ?? "")}`
      );
      formData.delete("credit_card_front");
      formData.delete("credit_card_back");
    } else {
      messageLines.push(
        `Credit Card Front: ${formData.get("credit_card_front") instanceof File && (formData.get("credit_card_front") as File).size > 0 ? "Attached" : "Not attached"}`,
        `Credit Card Back: ${formData.get("credit_card_back") instanceof File && (formData.get("credit_card_back") as File).size > 0 ? "Attached" : "Not attached"}`,
        "",
        "Credit card details entered: No"
      );
      for (const field of cardFields) {
        formData.delete(field.name);
      }
    }

    formData.set("message", messageLines.join("\n"));
    formData.set("card_submission_mode", useCardDetails ? "details" : "uploads");
    formData.set(
      "htmlMessage",
      [
        "<div style=\"font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1f1c16;\">",
        "<h2>Sunshine COD Application Submission</h2>",
        `<p><strong>Date:</strong> ${escapeHtml(String(entries.date ?? ""))}<br />`,
        `<strong>Company Name:</strong> ${escapeHtml(companyName)}<br />`,
        `<strong>Owner:</strong> ${escapeHtml(ownerName)}<br />`,
        `<strong>Telephone:</strong> ${escapeHtml(String(entries.telephone ?? ""))}<br />`,
        `<strong>Business Email:</strong> ${escapeHtml(String(entries.business_email ?? ""))}<br />`,
        `<strong>Accounts Payable Clerk:</strong> ${escapeHtml(String(entries.accounts_payable_clerk ?? ""))}<br />`,
        `<strong>A/P Email:</strong> ${escapeHtml(apEmail)}<br />`,
        `<strong>Delivery Method:</strong> ${escapeHtml(deliveryMethod)}</p>`,
        "<h3>Dispatch Review Checks</h3>",
        "<ul>",
        `<li><strong>Sunbiz Business Check:</strong> review <em>${escapeHtml(companyName)}</em> at <a href="${reviewChecks[0].url}">${reviewChecks[0].label}</a>.</li>`,
        `<li><strong>Driver License Check:</strong> <strong>manual review required</strong> for <em>${escapeHtml(driversLicenseNumber)}</em> at <a href="${reviewChecks[1].url}">${reviewChecks[1].label}</a>. CAPTCHA required on the state portal.</li>`,
        `<li><strong>Property Search:</strong> review <em>${escapeHtml(ownerName)}</em>, <em>${escapeHtml(mailingAddress)}</em>, and <em>${escapeHtml(deliveryAddress)}</em> at <a href="${reviewChecks[2].url}">${reviewChecks[2].label}</a>.</li>`,
        `<li><strong>Criminal Search:</strong> review <em>${escapeHtml(ownerName)}</em> and DOB <em>${escapeHtml(ownerDob)}</em> at <a href="${reviewChecks[3].url}">${reviewChecks[3].label}</a>.</li>`,
        "</ul>",
        "<p>See the plain-text message below for the full application details. Uploaded documents remain attached to this email.</p>",
        `<pre style="white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;background:#f7f2e4;border:1px solid #e8dcc0;border-radius:12px;padding:16px;">${escapeHtml(messageLines.join("\n"))}</pre>`,
        "</div>",
      ].join("")
    );

    const signatureFile = dataUrlToFile(signatureDataUrl, "signature.png");
    if (signatureFile) {
      formData.append("signature_image", signatureFile);
    }

    try {
      setStepState("business", "running");
      await sleep(800);
      setStepState("business", "passed");

      setStepState("property", "running");
      await sleep(800);
      setStepState("property", "passed");

      setStepState("criminal", "running");
      await sleep(800);
      setStepState("criminal", "passed");

      setStepState("dmv", "running");
      await sleep(900);
      setStepState("dmv", "manual");

      setIsSendingEmail(true);
      const response = await fetch("/api/sendMail", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as {
        error?: string;
        debug?: {
          message?: string;
          code?: string | null;
          EMAIL_USER?: boolean;
          EMAIL_APP_PASSWORD?: boolean;
          EMAIL_COD_USER?: boolean;
        };
      } | null;
      if (!response.ok) {
        const debugMessage = data?.debug
          ? [
            data.debug.message ? `message: ${data.debug.message}` : null,
            data.debug.code ? `code: ${data.debug.code}` : null,
            typeof data.debug.EMAIL_USER === "boolean"
              ? `EMAIL_USER: ${data.debug.EMAIL_USER ? "set" : "missing"}`
              : null,
            typeof data.debug.EMAIL_APP_PASSWORD === "boolean"
              ? `EMAIL_APP_PASSWORD: ${data.debug.EMAIL_APP_PASSWORD ? "set" : "missing"}`
              : null,
            typeof data.debug.EMAIL_COD_USER === "boolean"
              ? `EMAIL_COD_USER: ${data.debug.EMAIL_COD_USER ? "set" : "missing"}`
              : null,
          ]
            .filter(Boolean)
            .join(" | ")
          : null;

        setVerificationError(
          [data?.error ?? "Unable to send the dispatch summary right now.", debugMessage]
            .filter(Boolean)
            .join(" | ")
        );
        setStatus({
          tone: "error",
          message: data?.error ?? "Unable to send the application right now.",
        });
        return;
      }

      setVerificationComplete(true);
      setStatus({
        tone: "success",
        message: "Application sent successfully. Dispatch summary includes DMV manual review requirement.",
      });
    } catch (error) {
      const debugMessage =
        error instanceof Error && error.message.trim().length > 0
          ? error.message.trim()
          : "Unknown network error";
      setVerificationError(
        `Unable to send the dispatch summary right now. | message: ${debugMessage}`
      );
      setStatus({
        tone: "error",
        message: "Unable to send the application right now.",
      });
    } finally {
      setIsSendingEmail(false);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden px-4 pb-36 pt-10 sm:px-6 lg:px-8" style={getPageThemeStyle(theme)}>
      <VerificationModal
        open={verificationModalOpen}
        steps={verificationSteps}
        isSendingEmail={isSendingEmail}
        isComplete={verificationComplete}
        errorMessage={verificationError}
        onClose={() => setVerificationModalOpen(false)}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `${theme.pageGlowTop}, ${theme.pageGlowBottom}`,
        }}
      />

      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section
          className="relative overflow-hidden rounded-[34px] border p-6 backdrop-blur-2xl sm:p-8"
          style={{
            borderColor: "var(--ss-border)",
            background: theme.hero,
            boxShadow: theme.heroShadow,
          }}
        >
          <div
            className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle at center, rgba(216,180,74,0.24), transparent 70%)" }}
          />
          <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
            <ThemeToggle isLight={isLightMode} onToggle={() => setIsLightMode((value) => !value)} />
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl flex-1">
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
                  Sunshine COD Application
                </h1>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: "var(--ss-muted)" }}>
                A digital version of the original application, with sample information filled in.
              </p>
            </div>

            <div className="pt-2 lg:ml-auto lg:shrink-0">
              <div
                className="rounded-2xl border px-4 py-3"
                style={{
                  borderColor: "var(--ss-border)",
                  background: "var(--ss-surface-soft)",
                }}
              >
                <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--ss-soft)" }}>
                  Form Type
                </div>
                <div className="mt-1 text-sm font-medium" style={{ color: "var(--ss-text)" }}>
                  C.O.D. Application
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
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
                  Applicant
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl" style={{ color: "var(--ss-text)" }}>
                  Business Profile
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {companyFields
                  .filter((field) => field.name !== "business_email" && field.name !== "accounts_payable_clerk")
                  .map((field) => (
                    <Field
                      key={field.label}
                      label={field.label}
                      name={field.name}
                      value={field.name === "date" ? currentDate : field.value}
                      type={field.type}
                      className={field.label === "Primary Activity of Business" ? "md:col-span-2" : ""}
                    />
                  ))}

                <Field
                  label="Business Email"
                  name="business_email"
                  value="rmanzano@sunshinegasoline.com"
                  type="email"
                />

                {useSeparateApEmail ? (
                  <>
                    <Field
                      label="Accounts Payable Clerk"
                      name="accounts_payable_clerk"
                      value="Kathy Palomo"
                      headerRight={
                        <button
                          type="button"
                          onClick={() => setUseSeparateApEmail(false)}
                          aria-pressed={useSeparateApEmail}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${useSeparateApEmail ? "bg-(--accent)" : ""}`}
                          style={!useSeparateApEmail ? { background: "var(--ss-toggle-off-bg)" } : undefined}
                        >
                          <span
                            className={`h-5 w-5 rounded-full bg-white shadow transition ${useSeparateApEmail ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      }
                    />
                    <Field
                      label={apEmailField.label}
                      name={apEmailField.name}
                      value={apEmailField.value}
                      type={apEmailField.type}
                    />
                  </>
                ) : (
                  <div className="md:col-span-2">
                    <Field
                      label="Accounts Payable Clerk"
                      name="accounts_payable_clerk"
                      value="Kathy Palomo"
                      headerRight={
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-medium normal-case tracking-normal" style={{ color: "var(--ss-soft)" }}>
                            Different Email
                          </span>
                          <button
                            type="button"
                            onClick={() => setUseSeparateApEmail(true)}
                            aria-pressed={useSeparateApEmail}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${useSeparateApEmail ? "bg-(--accent)" : ""}`}
                            style={!useSeparateApEmail ? { background: "var(--ss-toggle-off-bg)" } : undefined}
                          >
                            <span
                              className={`h-5 w-5 rounded-full bg-white shadow transition ${useSeparateApEmail ? "translate-x-6" : "translate-x-1"}`}
                            />
                          </button>
                        </div>
                      }
                    />
                  </div>
                )}
              </div>
            </section>

            <Section eyebrow="Operations" title="Delivery and Fuel Details">
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  {fuelFields.map((field) => (
                    <Field
                      key={field.label}
                      label={field.label}
                      name={field.name}
                      value={field.value}
                      type={field.type}
                    />
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {addressFields.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-3xl border p-4"
                      style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="text-sm font-medium" style={{ color: "var(--ss-text)" }}>
                          {group.title}
                        </div>

                        {group.title === "Delivery Address" ? (
                          <div className="flex flex-wrap items-center justify-end gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-medium" style={{ color: "var(--ss-soft)" }}>
                                Same as Mailing
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setUseMailingForDelivery((value) => !value);
                                  setIsPickup(false);
                                }}
                                aria-pressed={useMailingForDelivery}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${useMailingForDelivery ? "bg-(--accent)" : ""}`}
                                style={!useMailingForDelivery ? { background: "var(--ss-toggle-off-bg)" } : undefined}
                              >
                                <span className={`h-5 w-5 rounded-full bg-white shadow transition ${useMailingForDelivery ? "translate-x-6" : "translate-x-1"}`} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-medium" style={{ color: "var(--ss-soft)" }}>
                                Pick-Up
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsPickup((value) => !value);
                                  setUseMailingForDelivery(false);
                                }}
                                aria-pressed={isPickup}
                                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${isPickup ? "bg-(--accent)" : ""}`}
                                style={!isPickup ? { background: "var(--ss-toggle-off-bg)" } : undefined}
                              >
                                <span className={`h-5 w-5 rounded-full bg-white shadow transition ${isPickup ? "translate-x-6" : "translate-x-1"}`} />
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {group.fields.map((field) => {
                          const isDeliveryAddress = group.title === "Delivery Address";

                          return (
                            <Field
                              key={`${group.title}-${field.label}-${isPickup ? "pickup" : useMailingForDelivery ? "mailing" : "delivery"}`}
                              label={field.label}
                              name={field.name}
                              value={isDeliveryAddress ? deliveryValueFor(field) : field.value}
                              type={field.type}
                              readOnly={isDeliveryAddress && (useMailingForDelivery || isPickup)}
                              className={field.label === "Street Address" ? "sm:col-span-2" : ""}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section eyebrow="Sunshine" title="Operational Contacts">
              <div className="space-y-4 text-sm" style={{ color: "var(--ss-muted)" }}>
                <div
                  className="rounded-3xl border p-4"
                  style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                >
                  <div className="font-medium" style={{ color: "var(--ss-text)" }}>Plant Addresses</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <div style={{ color: "var(--ss-text)" }}>724 S. Flagler Ave.</div>
                      <div>Homestead, FL 33030</div>
                      <div>305-247-7249</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--ss-text)" }}>412 S. Flagler Ave.</div>
                      <div>Homestead, FL 33030</div>
                      <div>305-247-7249</div>
                    </div>
                    <div>
                      <div style={{ color: "var(--ss-text)" }}>255 Tavernier St.</div>
                      <div>Tavernier, FL 33070</div>
                      <div>305-852-2881</div>
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-3xl border p-4"
                  style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                >
                  <div className="font-medium" style={{ color: "var(--ss-text)" }}>Fuel Order Contact</div>
                  <div className="mt-2">dispatch@sunshinegasoline.com</div>
                  <div>Phone: 305-247-7249 Ext. 1</div>
                  <div className="mt-2">Submitting To: kpalomo@sunshinegasoline.com</div>
                </div>
              </div>
            </Section>

          </div>

          <div className="space-y-6">
            <Section eyebrow="Authorization" title="Personal Guarantee">
              <p className="text-sm leading-7" style={{ color: "var(--ss-muted)" }}>
                In consideration of Sunshine Gasoline Distributors, Inc. extending credit, the undersigned
                personally guarantees payment of goods purchased, including special arrangements and promissory
                note-supported purchases. Venue is agreed to be Miami-Dade County and unpaid balances accrue
                1.5% monthly interest.
              </p>

              <div className="mt-5 grid gap-4">
                <Field label="Printed Name" name="printed_name" value="Ruben Manzano" />
                <Field label="Authorization Date" name="authorization_date_display" value={currentDate} type="date" />
                <SignaturePad
                  value={signatureDataUrl}
                  onChange={setSignatureDataUrl}
                  currentDate={currentDate}
                  strokeColor={theme.signatureStroke}
                />
              </div>
            </Section>

            <Section eyebrow="Attachments" title="Supporting Documents">
              <div className="space-y-4">
                <UploadField
                  label="Sales Tax Exemption Certificate"
                  name="sales_tax_certificate"
                  accept="image/jpeg,image/png,image/webp,.pdf"
                  help="Upload a PDF or Image Copy."
                />
                <UploadField
                  label="Driver's License"
                  name="drivers_license_image"
                  accept="image/jpeg,image/png,image/webp,.pdf"
                  help="Upload the front of your driver's license."
                />

                <div
                  className="rounded-3xl border p-4"
                  style={{ borderColor: "var(--ss-border-soft)", background: "var(--ss-surface)" }}
                >
                  <label
                    className="flex items-center justify-between gap-4 rounded-2xl border px-4 py-3"
                    style={{ borderColor: "var(--ss-border)", background: "var(--ss-surface-strong)" }}
                  >
                    <div className="text-sm font-medium" style={{ color: "var(--ss-text)" }}>
                      Enter Credit Card Details Instead
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseCardDetails((value) => !value)}
                      aria-pressed={useCardDetails}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${useCardDetails ? "bg-(--accent)" : ""}`}
                      style={!useCardDetails ? { background: "var(--ss-toggle-off-bg)" } : undefined}
                    >
                      <span
                        className={`h-6 w-6 rounded-full bg-white shadow transition ${useCardDetails ? "translate-x-7" : "translate-x-1"}`}
                      />
                    </button>
                  </label>

                  {!useCardDetails ? (
                    <div className="mt-4 grid gap-4">
                      <UploadField
                        label="Credit Card Front"
                        name="credit_card_front"
                        accept="image/jpeg,image/png,image/webp,.pdf"
                        help="Readable Image or PDF."
                      />
                      <UploadField
                        label="Credit Card Back"
                        name="credit_card_back"
                        accept="image/jpeg,image/png,image/webp,.pdf"
                        help="Readable Image or PDF."
                      />
                    </div>
                  ) : (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {cardFields.map((field) => (
                        <Field
                          key={field.label}
                          label={field.label}
                          name={field.name}
                          value={field.value}
                          type={field.type}
                          className={field.label === "Authorized Signature for Payment" ? "md:col-span-2" : ""}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Section>
          </div>
        </div>

        <section className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto w-full max-w-7xl rounded-[28px] border p-4 backdrop-blur-xl sm:p-5"
            style={{
              borderColor: "var(--ss-border)",
              background: "var(--ss-panel)",
              boxShadow: "var(--ss-shadow)",
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-tight sm:text-lg" style={{ color: "var(--ss-text)" }}>
                  Submit Application
                </h2>
                <div className="mt-1 text-xs" style={{ color: "var(--ss-soft)" }}>
                  Ready when the required fields, uploads, and signature are complete.
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-(--accent-light) to-(--accent) px-6 text-sm font-semibold shadow-lg shadow-black/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ color: "var(--button-text)" }}
              >
                {isSubmitting ? "Sending..." : "Submit Application"}
              </button>
            </div>

            {status.message ? (
              <div
                className="mt-3 rounded-2xl border px-4 py-3 text-sm"
                style={
                  status.tone === "success"
                    ? {
                      borderColor: theme.successBorder,
                      background: theme.successBg,
                      color: theme.successText,
                    }
                    : {
                      borderColor: theme.errorBorder,
                      background: theme.errorBg,
                      color: theme.errorText,
                    }
                }
              >
                {status.message}
              </div>
            ) : null}
          </div>
        </section>
      </form>
    </main>
  );
}
