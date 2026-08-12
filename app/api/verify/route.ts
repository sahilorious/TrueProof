import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const hasHash = typeof body?.sourceHash === "string" && body.sourceHash.length > 0;
  const hasScore = typeof body?.score === "number";

  return NextResponse.json({
    verified: Boolean(hasHash && hasScore),
    reason: hasHash && hasScore ? "Receipt shape is valid." : "Missing required receipt fields.",
  });
}
