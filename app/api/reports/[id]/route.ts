// app/api/reports/[id]/route.ts
import { NextResponse } from "next/server";
import { getClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * Note: context.params is a Promise in Next.js app route handlers —
 * you must await it before using.
 */

export async function GET(_req: Request, context: { params: any }) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "missing id" }, { status: 400 });
    }
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "invalid id format" }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db();

    const doc = await db.collection("reports").findOne({ _id: new ObjectId(id) });
    if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });

    const { _id, createdAt, updatedAt, ...rest } = doc as any;
    return NextResponse.json({
      id: _id.toString(),
      createdAt: createdAt ? new Date(createdAt).toISOString() : null,
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
      ...rest,
    });
  } catch (e: any) {
    console.error("GET /api/reports/[id] error:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: any }) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "missing id" }, { status: 400 });
    }
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "invalid id format" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));

    console.log("PUT /api/reports/[id] called with id:", id);
    console.log("Payload:", JSON.stringify(body));

    const client = await getClient();
    const db = client.db();

    const updateDoc: any = {
      $set: {
        ...(typeof body.title === "string" ? { title: body.title.trim() } : {}),
        ...(typeof body.subtitle === "string" ? { subtitle: body.subtitle.trim() } : {}),
        ...(body.fairValue !== undefined ? { fairValue: body.fairValue } : {}),
        ...(body.upsideDownside !== undefined ? { upsideDownside: body.upsideDownside } : {}),
        ...(body.driveLink !== undefined ? { driveLink: body.driveLink } : {}),
        ...(body.excelLink !== undefined ? { excelLink: body.excelLink } : {}),
        updatedAt: new Date(),
      },
    };

    const rawResult = await db
      .collection("reports")
      .findOneAndUpdate({ _id: new ObjectId(id) }, updateDoc, { returnDocument: "after" });

    let updatedDoc: any = null;
    if (rawResult && typeof rawResult === "object") {
      if ("value" in rawResult && rawResult.value) updatedDoc = rawResult.value;
      else if ("_id" in rawResult) updatedDoc = rawResult;
      else {
        // fallback fetch
        updatedDoc = await db.collection("reports").findOne({ _id: new ObjectId(id) });
      }
    }

    if (!updatedDoc) {
      console.error("findOneAndUpdate returned no updated document for id:", id, "rawResult:", rawResult);
      return NextResponse.json({ error: "update failed" }, { status: 500 });
    }

    const { _id, createdAt, updatedAt, ...rest } = updatedDoc as any;
    return NextResponse.json({
      id: _id?.toString(),
      createdAt: createdAt ? new Date(createdAt).toISOString() : null,
      updatedAt: updatedAt ? new Date(updatedAt).toISOString() : null,
      ...rest,
    });
  } catch (e: any) {
    console.error("PUT /api/reports/[id] error:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: { params: any }) {
  try {
    const params = await context.params;
    const id = params?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "missing id" }, { status: 400 });
    }
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "invalid id format" }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db();

    const res = await db.collection("reports").deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("DELETE /api/reports/[id] error:", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
