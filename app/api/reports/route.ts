// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { getClient } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await getClient();
    const db = client.db();
    const rows = await db.collection("reports").find({}).sort({ createdAt: -1 }).toArray();

    const normalized = rows.map((r: any) => {
      const { _id, createdAt, updatedAt, ...rest } = r;
      return {
        id: _id?.toString() ?? null,
        // ensure dates are strings (ISO) so client can safely new Date(...)
        createdAt: createdAt ? new Date(createdAt).toISOString() : null,
        updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
        ...rest,
      };
    });

    return NextResponse.json(normalized);
  } catch (err: any) {
    console.error("GET /api/reports error:", err);
    return NextResponse.json({ error: err?.message || "server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { title, subtitle, fairValue, upsideDownside, driveLink, excelLink } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const now = new Date();
    const client = await getClient();
    const db = client.db();

    const result = await db.collection("reports").insertOne({
      title: title.trim(),
      subtitle: (subtitle || "").trim(),
      fairValue: fairValue ?? null,
      upsideDownside: upsideDownside ?? null,
      driveLink: driveLink ?? null,
      excelLink: excelLink ?? null,
      createdAt: now,
      updatedAt: now,
    });

    const createdDoc = await db.collection("reports").findOne({ _id: result.insertedId });
    if (!createdDoc) {
      return NextResponse.json({ error: "could not retrieve created document" }, { status: 500 });
    }

    const { _id, createdAt, updatedAt, ...rest } = createdDoc as any;
    return NextResponse.json(
      {
        id: _id?.toString(),
        createdAt: createdAt ? new Date(createdAt).toISOString() : null,
        updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
        ...rest,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("POST /api/reports error:", err);
    return NextResponse.json({ error: err?.message || "server error" }, { status: 500 });
  }
}
