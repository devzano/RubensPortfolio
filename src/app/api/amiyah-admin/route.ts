import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AdminRequestPayload = {
  action?: "verify" | "hide";
  password?: string;
  uploadId?: string;
  storagePath?: string;
};

function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: Request) {
  const adminPassword = process.env.AMIYAH_ADMIN_PASSWORD;
  const supabaseAdmin = getSupabaseAdminClient();

  if (!adminPassword || !supabaseAdmin) {
    return NextResponse.json(
      { error: "Admin moderation is not configured." },
      { status: 500 },
    );
  }

  let payload: AdminRequestPayload;
  try {
    payload = (await request.json()) as AdminRequestPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload.password || payload.password !== adminPassword) {
    return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
  }

  if (payload.action === "verify") {
    return NextResponse.json({ ok: true });
  }

  if (payload.action === "hide") {
    if (!payload.uploadId) {
      return NextResponse.json({ error: "Upload id is required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("event_uploads")
      .update({ is_approved: false })
      .eq("id", payload.uploadId)
      .eq("event_slug", "amiyahs-quinceanera");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unsupported admin action." }, { status: 400 });
}
