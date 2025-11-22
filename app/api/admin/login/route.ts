// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

/**
 * Minimal server-side login endpoint.
 * Reads ADMIN_USERNAME / ADMIN_PASSWORD from server env (no NEXT_PUBLIC_).
 * Returns { success: true } on valid creds, 401 otherwise.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { username, password } = body ?? {};

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error("ADMIN_USERNAME / ADMIN_PASSWORD not set");
      return NextResponse.json({ success: false, error: "Server misconfigured" }, { status: 500 });
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (err: any) {
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
