"use client";

import { useMemo, useState } from "react";
import { ReceiptCard } from "./ReceiptCard";
import { localDemoReceipt } from "../lib/mock-data";
import type { Receipt } from "../lib/types";

type MintResponse = {
  verified: boolean;
  receipt: Receipt["credential"];
};

type VerifyResponse = {
  verified: boolean;
  reason: string;
};

const API_BASE = process.env.NEXT_PUBLIC_TRUEPROOF_API_URL || "http://localhost:8000";

export function LiveReceiptPanel() {
  const [receipt, setReceipt] = useState<Receipt>(localDemoReceipt);
  const [minting, setMinting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<string>("Using local demo receipt.");

  const payload = useMemo(
    () => ({
      issuer: receipt.issuer,
      subject: receipt.subject,
      score: receipt.score,
      sourceHash: receipt.sourceHash,
    }),
    [receipt],
  );

  async function mintFromBackend() {
    setMinting(true);
    setStatus(`Minting receipt through ${API_BASE} ...`);
    try {
      const response = await fetch(`${API_BASE}/mint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Mint request failed with ${response.status}`);
      }

      const data = (await response.json()) as MintResponse;
      setReceipt({
        issuer: payload.issuer,
        subject: payload.subject,
        score: payload.score,
        sourceHash: payload.sourceHash,
        issuedAt: new Date().toISOString(),
        credential: data.receipt,
      });
      setStatus("Receipt minted successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Minting failed.");
    } finally {
      setMinting(false);
    }
  }

  async function verifyWithBackend() {
    setVerifying(true);
    setStatus(`Verifying receipt through ${API_BASE} ...`);
    try {
      const response = await fetch(`${API_BASE}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Verify request failed with ${response.status}`);
      }

      const data = (await response.json()) as VerifyResponse;
      setStatus(data.verified ? `Verified: ${data.reason}` : `Not verified: ${data.reason}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Verification failed.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <div className="badge good">Live backend demo</div>
        <div className="muted">
          This panel can mint and verify a receipt through the FastAPI backend when it is running locally. If the
          backend is offline, the page still shows the local demo receipt.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button className="actionButton" onClick={mintFromBackend} disabled={minting}>
            {minting ? "Minting..." : "Mint Receipt"}
          </button>
          <button className="actionButton secondary" onClick={verifyWithBackend} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify Receipt"}
          </button>
        </div>
        <div className="muted" style={{ fontSize: 14 }}>
          Status: {status}
        </div>
      </div>
      <ReceiptCard receipt={receipt} />
    </div>
  );
}
