"use client";

import AppImages from "@/constants/images";
import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

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

const todayIso = () => new Date().toISOString().slice(0, 10);

function Field({
  label,
  name,
  value,
  type = "text",
  className = "",
  required = true,
  headerRight,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  className?: string;
  required?: boolean;
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
        className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none ring-1 ring-white/8 transition placeholder:text-white/30 focus:border-(--accent) focus:ring-(--accent-soft)"
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
  return (
    <label className="flex flex-col gap-2 rounded-3xl border border-white/8 bg-black/20 p-4">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
        {label}
      </span>
      <input
        name={name}
        type="file"
        accept={accept}
        required={required}
        className="block w-full rounded-2xl border border-dashed border-white/15 bg-black/25 px-4 py-4 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-(--accent) file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:brightness-110"
      />
      {help ? <span className="text-xs text-white/45">{help}</span> : null}
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
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
      <div className="mb-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent)">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
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
}: {
  value: string;
  onChange: (nextValue: string) => void;
  currentDate: string;
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
    context.strokeStyle = "#f8fafc";
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
  }, [value]);

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
    <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
            Signature
          </div>
          <div className="mt-1 text-sm text-white/68">
            sign with your mouse or trackpad.
          </div>
        </div>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition hover:bg-white/10"
        >
          Clear
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1017]">
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

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/45">
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

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCardDetails, setUseCardDetails] = useState(false);
  const [useSeparateApEmail, setUseSeparateApEmail] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState("");
  const [status, setStatus] = useState<{
    tone: "success" | "error" | null;
    message: string | null;
  }>({ tone: null, message: null });

  const currentDate = useMemo(() => todayIso(), []);

  useEffect(() => {
    setStatus({ tone: null, message: null });
  }, [useCardDetails]);

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

    const form = event.currentTarget;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());
    const apEmail = useSeparateApEmail
      ? String(entries.ap_email ?? "")
      : String(entries.business_email ?? "");

    formData.set("appName", "Sunshine COD Application");
    formData.set("firstName", String(entries.owner ?? "Ruben"));
    formData.set("lastName", "Application");
    formData.set("email", String(entries.business_email ?? "ruben@manzanomarine.co"));
    formData.set("subject", "Sunshine COD Application Submission");
    formData.set("recipient", "kpalomo@sunshinegasoline.com");

    const messageLines = [
      "Sunshine COD Application Submission",
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
      "Mailing Address",
      `Street: ${String(entries.mailing_street_address ?? "")}`,
      `City: ${String(entries.mailing_city ?? "")}`,
      `State: ${String(entries.mailing_state ?? "")}`,
      `Zip Code: ${String(entries.mailing_zip_code ?? "")}`,
      "",
      "Delivery Address",
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
      `Signature Included: Yes`,
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

    const signatureFile = dataUrlToFile(signatureDataUrl, "signature.png");
    if (signatureFile) {
      formData.append("signature_image", signatureFile);
    }

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => null)) as { error?: string; } | null;
      if (!response.ok) {
        setStatus({
          tone: "error",
          message: data?.error ?? "Unable to send the application right now.",
        });
        return;
      }

      setStatus({
        tone: "success",
        message: "Application sent successfully.",
      });
    } catch {
      setStatus({
        tone: "error",
        message: "Unable to send the application right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(216,180,74,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(108,90,28,0.16),transparent_30%)]" />

      <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,12,20,0.9),rgba(11,20,29,0.76))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.36)] backdrop-blur-2xl sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(216,180,74,0.24),transparent_70%)] blur-3xl" />

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
              <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-[88px] w-28 shrink-0 overflow-hidden rounded-2xl p-2">
                  <Image
                    src={AppImages.sunshine}
                    alt="Sunshine Gasoline Distributors logo"
                    fill
                    className="object-contain p-1.5"
                    priority
                  />
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Sunshine COD Application
                </h1>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                A digital version of the original application, with sample information filled in.
              </p>
            </div>

            <div className="lg:ml-auto lg:shrink-0">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Form Type
                </div>
                <div className="mt-1 text-sm font-medium text-white">
                  C.O.D. Application
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
              <div className="mb-5">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--accent)">
                    Applicant
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Business Profile
                  </h2>
                </div>
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
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${useSeparateApEmail ? "bg-(--accent)" : "bg-white/15"
                            }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-full bg-white shadow transition ${useSeparateApEmail ? "translate-x-6" : "translate-x-1"
                              }`}
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
                          <span className="text-[10px] font-medium normal-case tracking-normal text-white/55">
                            Different Email
                          </span>
                          <button
                            type="button"
                            onClick={() => setUseSeparateApEmail(true)}
                            aria-pressed={useSeparateApEmail}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${useSeparateApEmail ? "bg-(--accent)" : "bg-white/15"
                              }`}
                          >
                            <span
                              className={`h-5 w-5 rounded-full bg-white shadow transition ${useSeparateApEmail ? "translate-x-6" : "translate-x-1"
                                }`}
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
                    <div key={group.title} className="rounded-3xl border border-white/8 bg-black/20 p-4">
                      <div className="mb-4 text-sm font-medium text-white">{group.title}</div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {group.fields.map((field) => (
                          <Field
                            key={`${group.title}-${field.label}`}
                            label={field.label}
                            name={field.name}
                            value={field.value}
                            type={field.type}
                            className={field.label === "Street Address" ? "sm:col-span-2" : ""}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
            <Section eyebrow="Sunshine" title="Operational Contacts">
              <div className="space-y-4 text-sm text-white/78">
                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <div className="font-medium text-white">Plant Addresses</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div>
                      <div className="text-white">724 S. Flagler Ave.</div>
                      <div>Homestead, FL 33030</div>
                      <div>305-247-7249</div>
                    </div>
                    <div>
                      <div className="text-white">412 S. Flagler Ave.</div>
                      <div>Homestead, FL 33030</div>
                      <div>305-247-7249</div>
                    </div>
                    <div>
                      <div className="text-white">255 Tavernier St.</div>
                      <div>Tavernier, FL 33070</div>
                      <div>305-852-2881</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <div className="font-medium text-white">Fuel Order Contact</div>
                  <div className="mt-2">dispatch@sunshinegasoline.com</div>
                  <div>Phone: 305-247-7249 Ext. 1</div>
                  <div className="mt-2">Submitting To: kpalomo@sunshinegasoline.com</div>
                </div>
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section eyebrow="Authorization" title="Personal Guarantee">
              <p className="text-sm leading-7 text-white/72">
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
                />
              </div>
            </Section>

            <Section eyebrow="Attachments" title="Supporting Documents">
              <div className="space-y-4">
                <UploadField
                  label="Sales Tax Exemption Certificate"
                  name="sales_tax_certificate"
                  accept=".pdf,image/*"
                  help="Upload a PDF or Image Copy."
                />
                <UploadField
                  label="Driver's License"
                  name="drivers_license_image"
                  accept="image/*,.pdf"
                  help="Upload the front of your driver's license."
                />

                <div className="rounded-3xl border border-white/8 bg-black/20 p-4">
                  <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                    <div className="text-sm font-medium text-white">
                      Enter Credit Card Details Instead
                    </div>
                    <button
                      type="button"
                      onClick={() => setUseCardDetails((value) => !value)}
                      aria-pressed={useCardDetails}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${useCardDetails ? "bg-(--accent)" : "bg-white/15"
                        }`}
                    >
                      <span
                        className={`h-6 w-6 rounded-full bg-white shadow transition ${useCardDetails ? "translate-x-7" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </label>

                  {!useCardDetails ? (
                    <div className="mt-4 grid gap-4">
                      <UploadField
                        label="Credit Card Front"
                        name="credit_card_front"
                        accept="image/*,.pdf"
                        help="Readable Image or PDF."
                      />
                      <UploadField
                        label="Credit Card Back"
                        name="credit_card_back"
                        accept="image/*,.pdf"
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

        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] pb-2 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-white">Submit Application</h2>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-(--accent-light) to-(--accent) px-6 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit Application"}
            </button>
          </div>

          {status.message ? (
            <div
              className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${status.tone === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                  : "border-rose-400/30 bg-rose-400/10 text-rose-100"
                }`}
            >
              {status.message}
            </div>
          ) : null}
        </section>
      </form>
    </main>
  );
}
