import { NextResponse } from "next/server";
import { mintCredential } from "../../../lib/receipt";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const score = typeof body?.score === "number" ? body.score : 0;
  const sourceHash = typeof body?.sourceHash === "string" ? body.sourceHash : "unknown";
  const subject = typeof body?.subject === "string" ? body.subject : "did:key:candidate";
  const issuer = typeof body?.issuer === "string" ? body.issuer : "did:key:demo-trueproof";

  return NextResponse.json({
    receipt: mintCredential({ issuer, subject, score, sourceHash }),
    verified: true,
  });
}
