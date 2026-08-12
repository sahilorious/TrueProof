import { formatReceipt } from "../lib/receipt";
import type { Receipt } from "../lib/types";

export function ReceiptCard({ receipt }: { receipt: Receipt }) {
  const formatted = formatReceipt(receipt);

  return (
    <section className="card">
      <div className="badge good">{formatted.statusLabel}</div>
      <h2 style={{ marginBottom: 8 }}>{formatted.title}</h2>
      <p className="muted" style={{ marginTop: 0, maxWidth: 720 }}>{formatted.subtitle}</p>
      <div className="receiptSummary">
        <div className="stat">
          <div className="label">Result</div>
          <div className="value">{receipt.score >= 90 ? "Strong signal" : "Mixed signal"}</div>
        </div>
        <div className="stat">
          <div className="label">Authorship Score</div>
          <div className="value">{receipt.score.toFixed(2)}%</div>
          <div className="miniNote">Higher means more of the structural logic likely came from the human author.</div>
        </div>
        <div className="stat">
          <div className="label">Shared</div>
          <div className="value">Score + hash only</div>
          <div className="miniNote">No keystrokes, prompts, or draft history leave the machine.</div>
        </div>
      </div>
      <div className="receiptMeta">
        <div>
          <span className="label">Issued At</span>
          <div className="value small">{formatted.issuedAt}</div>
        </div>
        <div>
          <span className="label">Issuer</span>
          <div className="value small">{receipt.issuer}</div>
        </div>
      </div>
      <details className="detailsBlock">
        <summary>Technical receipt</summary>
        <pre>{JSON.stringify(receipt.credential, null, 2)}</pre>
      </details>
    </section>
  );
}
