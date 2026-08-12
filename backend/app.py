from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="TrueProof API", version="0.1.0")


class ReceiptIn(BaseModel):
    issuer: str = "did:key:demo-trueproof"
    subject: str = "did:key:candidate"
    score: float
    source_hash: str


def sign_payload(payload: dict[str, Any]) -> str:
    raw = f"{payload['issuer']}:{payload['subject']}:{payload['score']}:{payload['source_hash']}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/mint")
def mint(receipt: ReceiptIn):
    issued_at = datetime.now(timezone.utc).isoformat()
    credential = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        "type": ["VerifiableCredential", "TrueProofReceipt"],
        "issuer": receipt.issuer,
        "issuanceDate": issued_at,
        "credentialSubject": {
            "id": receipt.subject,
            "score": receipt.score,
            "sourceHash": receipt.source_hash,
        },
        "proof": {
            "type": "DataIntegrityProof",
            "created": issued_at,
            "verificationMethod": f"{receipt.issuer}#key-1",
            "proofPurpose": "assertionMethod",
            "jws": sign_payload(receipt.model_dump()),
        },
    }
    return {"verified": True, "receipt": credential}


@app.post("/verify")
def verify(receipt: ReceiptIn):
    valid = bool(receipt.score >= 0 and receipt.source_hash)
    return {"verified": valid, "reason": "Receipt shape is valid." if valid else "Missing data."}
