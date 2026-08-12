import crypto from "node:crypto";
import type { Receipt } from "./types";

export function mintCredential(input: { issuer: string; subject: string; score: number; sourceHash: string }): Receipt {
  const issuedAt = new Date().toISOString();
  const credential = {
    "@context": ["https://www.w3.org/2018/credentials/v1", "https://www.w3.org/ns/did/v1"],
    type: ["VerifiableCredential", "TrueProofReceipt"],
    issuer: input.issuer,
    issuanceDate: issuedAt,
    credentialSubject: {
      id: input.subject,
      score: input.score,
      sourceHash: input.sourceHash,
    },
    proof: {
      type: "DataIntegrityProof",
      created: issuedAt,
      verificationMethod: `${input.issuer}#key-1`,
      proofPurpose: "assertionMethod",
      jws: crypto.createHash("sha256").update(`${input.issuer}:${input.subject}:${input.score}:${input.sourceHash}`).digest("hex"),
    },
  };

  return {
    issuer: input.issuer,
    subject: input.subject,
    score: input.score,
    sourceHash: input.sourceHash,
    issuedAt,
    credential,
  };
}

export function formatReceipt(receipt: Receipt) {
  return {
    title: "Verified AI Passport Receipt",
    subtitle: "Local demo receipt minted from AST-derived provenance signals.",
    statusLabel: "Verified locally",
    issuedAt: new Date(receipt.issuedAt).toLocaleString(),
  };
}
