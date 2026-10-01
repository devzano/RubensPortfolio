import { NextResponse } from "next/server";

const BUY_ME_A_COFFEE_API_BASE = "https://developers.buymeacoffee.com/api/v1";
const CACHE_SECONDS = 15 * 60;
const MAX_PAGES_PER_SOURCE = 50;

type PaginatedResponse = {
  current_page?: number;
  last_page?: number;
  next_page_url?: string | null;
  total?: number;
  data: unknown[];
};

type SupporterRecord = {
  id?: string | number;
  supporter_id?: string | number;
  support_id?: string | number;
  subscription_id?: string | number;
  purchase_id?: string | number;
  payer_email?: string | null;
  payer_name?: string | null;
  supporter_name?: string | null;
  is_refunded?: boolean;
  refunded?: boolean;
  refunded_at?: string | null;
};

type SourceConfig = {
  key: "supporters" | "subscriptions" | "extras";
  path: string;
};

const sources: SourceConfig[] = [
  { key: "supporters", path: "/supporters" },
  { key: "subscriptions", path: "/subscriptions?status=all" },
  { key: "extras", path: "/extras" },
];

function getAccessToken() {
  return (
    process.env.BUYMEACOFFEE_ACCESS_TOKEN ??
    process.env.BUY_ME_A_COFFEE_ACCESS_TOKEN ??
    process.env.BMC_ACCESS_TOKEN ??
    ""
  ).trim();
}

function isPaginatedResponse(value: unknown): value is PaginatedResponse {
  return Boolean(value && typeof value === "object" && Array.isArray((value as PaginatedResponse).data));
}

function toSupporterRecord(value: unknown): SupporterRecord | null {
  if (!value || typeof value !== "object") return null;
  return value as SupporterRecord;
}

function recordKey(source: SourceConfig["key"], record: SupporterRecord) {
  const email = record.payer_email?.trim().toLowerCase();
  if (email) return `email:${email}`;

  const id = record.id ?? record.supporter_id ?? record.support_id ?? record.subscription_id ?? record.purchase_id;
  if (id !== undefined && id !== null) return `${source}:${String(id)}`;

  const name = record.payer_name?.trim().toLowerCase() ?? record.supporter_name?.trim().toLowerCase();
  if (name) return `${source}:name:${name}`;

  return null;
}

function isRefunded(record: SupporterRecord) {
  return record.is_refunded === true || record.refunded === true || Boolean(record.refunded_at);
}

function buildApiUrl(path: string, page: number) {
  const url = new URL(`${BUY_ME_A_COFFEE_API_BASE}${path}`);
  url.searchParams.set("page", String(page));
  return url;
}

async function fetchSource(source: SourceConfig, token: string) {
  const keys = new Set<string>();
  let page = 1;
  let total: number | null = null;

  while (page <= MAX_PAGES_PER_SOURCE) {
    const response = await fetch(buildApiUrl(source.path, page), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: CACHE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`${source.key} returned ${response.status}`);
    }

    const payload: unknown = await response.json();
    if (!isPaginatedResponse(payload)) break;

    if (typeof payload.total === "number") {
      total = payload.total;
    }

    for (const item of payload.data) {
      const record = toSupporterRecord(item);
      if (!record || isRefunded(record)) continue;

      const key = recordKey(source.key, record);
      if (key) keys.add(key);
    }

    const lastPage = typeof payload.last_page === "number" ? payload.last_page : page;
    if (!payload.next_page_url || page >= lastPage) break;
    page += 1;
  }

  return {
    key: source.key,
    keys,
    total,
  };
}

export async function GET() {
  const token = getAccessToken();

  if (!token) {
    return NextResponse.json(
      {
        count: null,
        configured: false,
        message: "Buy Me a Coffee access token is not configured.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      },
    );
  }

  try {
    const results = await Promise.all(sources.map((source) => fetchSource(source, token)));
    const uniqueSupporters = new Set<string>();
    const totals: Record<string, number | null> = {};

    for (const result of results) {
      totals[result.key] = result.total;
      for (const key of result.keys) {
        uniqueSupporters.add(key);
      }
    }

    return NextResponse.json(
      {
        count: uniqueSupporters.size,
        configured: true,
        sources: totals,
      },
      {
        headers: {
          "Cache-Control": `public, max-age=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Buy Me a Coffee API error.";
    return NextResponse.json(
      {
        count: null,
        configured: true,
        error: message,
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      },
    );
  }
}
