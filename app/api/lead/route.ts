import { NextRequest, NextResponse } from "next/server";
import { quizSchema } from "@/lib/validation";

const RATE_LIMIT = 1; // 1 per window
const WINDOW_MS = 10 * 1000; // 10s window
const ipHits: Record<string, { count: number; windowStart: number }> = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits[ip];
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    ipHits[ip] = { count: 1, windowStart: now };
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (origin && !/^https?:\/\/(localhost:\d+|rada\.example\.com)/.test(origin)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 400 });
  }

  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  const ip = (ipHeader || "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = quizSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  if (data.honey) return NextResponse.json({ error: "Bot detected" }, { status: 400 });

  // Log for now; integrate with ESP/CRM later.
  // TODO: Integrate with MailerLite/ConvertKit or Google Sheets/Airtable
  console.log("lead", {
    ...data,
    ip,
    ua: req.headers.get("user-agent") || null,
    ts: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}


