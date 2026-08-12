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

export function LiveReceiptPanel() {
  const [receipt, setReceipt] = useState<Receipt>(localDemoReceipt);
  const [example, setExample] = useState<"demo" | "logic" | "boilerplate">("demo");
  const [minting, setMinting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<string>("Ready to mint or verify a receipt.");
  const [verificationState, setVerificationState] = useState<"idle" | "success" | "warning">("idle");

  const samples = {
    demo: {
      label: "Main example",
      description: "Representative receipt for the sample project shown on the page.",
      score: 97.4,
      sourceHash: localDemoReceipt.sourceHash,
    },
    logic: {
      label: "Stronger logic",
      description: "Receipt with more structural reasoning and less boilerplate.",
      score: 92.85,
      sourceHash: "4b7c9eaa12f3f91ad814b0c5e9a0c0d5e3f1d8d2c9f4f1a0c0b7d5a1e2f3c4b5",
    },
    boilerplate: {
      label: "More boilerplate",
      description: "Receipt where syntax plays a larger role.",
      score: 61.2,
      sourceHash: "c2d41eea941cc1f7f1a0d3d7b5f9d1a1d8b0f0fa5b7c8d9e2a3b4c5d6e7f8090",
    },
  } as const;

  const activeSample = samples[example];

  const payload = useMemo(
    () => ({
      issuer: receipt.issuer,
      subject: receipt.subject,
      score: activeSample.score,
      sourceHash: activeSample.sourceHash,
    }),
    [activeSample.score, activeSample.sourceHash, receipt.issuer, receipt.subject],
  );

  async function mintFromBackend() {
    setMinting(true);
    setStatus("Minting a clean receipt from the selected sample ...");
    try {
      const response = await fetch("/api/receipt", {
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
      setVerificationState("success");
      setStatus(`Minted a ${activeSample.label.toLowerCase()} receipt.`);
    } catch (error) {
      setVerificationState("warning");
      setStatus(error instanceof Error ? error.message : "Minting failed.");
    } finally {
      setMinting(false);
    }
  }

  async function verifyWithBackend() {
    setVerifying(true);
    setStatus("Checking whether the receipt is valid ...");
    try {
      const response = await fetch("/api/verify", {
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
      setVerificationState(data.verified ? "success" : "warning");
      setStatus(data.verified ? `Verified: ${data.reason}` : `Not verified: ${data.reason}`);
    } catch (error) {
      setVerificationState("warning");
      setStatus(error instanceof Error ? error.message : "Verification failed.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section className="card" style={{ display: "grid", gap: 18 }}>
        <div className="eyebrow">Demo</div>
        <div style={{ display: "grid", gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Choose a sample and mint a receipt.</h2>
          <p className="muted" style={{ margin: 0, maxWidth: 680 }}>
            The demo is intentionally compact: choose a sample, mint a receipt, and inspect the technical details only
            if needed.
          </p>
        </div>

        <div className="samplePicker" role="tablist" aria-label="receipt samples">
          {(Object.entries(samples) as Array<[keyof typeof samples, (typeof samples)[keyof typeof samples]]>).map(
            ([key, sample]) => (
              <button
                key={key}
                role="tab"
                aria-selected={example === key}
                className={`sampleChip ${example === key ? "active" : ""}`}
                onClick={() => setExample(key)}
              >
                <span>{sample.label}</span>
                <small>{sample.description}</small>
              </button>
            ),
          )}
        </div>

        <div className="sampleSummary">
          <div>
            <span className="label">Selected example</span>
            <strong>{activeSample.label}</strong>
          </div>
          <div>
            <span className="label">Visible result</span>
            <strong>{activeSample.score.toFixed(2)}% authorship score</strong>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button className="actionButton" onClick={mintFromBackend} disabled={minting}>
            {minting ? "Minting..." : "Mint Receipt"}
          </button>
          <button className="actionButton secondary" onClick={verifyWithBackend} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify Receipt"}
          </button>
        </div>

        <div className={`statusLine ${verificationState}`}>
          <span className="statusDot" />
          <span>{status}</span>
        </div>

        <p className="muted" style={{ margin: 0, fontSize: 14 }}>
          The page works without a local backend. The receipt updates in place and the technical preview remains
          collapsed by default.
        </p>
      </section>

      <ReceiptCard receipt={receipt} />
    </div>
  );
}
