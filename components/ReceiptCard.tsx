import { formatReceipt } from "../lib/receipt";
import type { Receipt } from "../lib/types";

export function ReceiptCard({ receipt }: { receipt: Receipt }) {
  const formatted = formatReceipt(receipt);

  return (
    <section className="card">
      <div className="badge good">{formatted.statusLabel}</div>
      <h2 style={{ marginBottom: 8 }}>{formatted.title}</h2>
      <p className="muted" style={{ marginTop: 0 }}>{formatted.subtitle}</p>
      <div className="grid">
        <div className="stat">
          <div className="label">Authorship Score</div>
          <div className="value">{receipt.score.toFixed(2)}%</div>
        </div>
        <div className="stat">
          <div className="label">Source Hash</div>
          <div className="value" style={{ fontSize: "0.95rem" }}>{receipt.sourceHash}</div>
        </div>
        <div className="stat">
          <div className="label">Issuer</div>
          <div className="value">{receipt.issuer}</div>
        </div>
        <div className="stat">
          <div className="label">Issued At</div>
          <div className="value">{formatted.issuedAt}</div>
        </div>
      </div>
      <h3 style={{ marginTop: 20 }}>Credential Preview</h3>
      <pre>{JSON.stringify(receipt.credential, null, 2)}</pre>
    </section>
  );
}
