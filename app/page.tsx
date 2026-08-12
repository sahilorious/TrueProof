import { LiveReceiptPanel } from "../components/LiveReceiptPanel";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow">TrueProof</div>
        <h1>Verified AI Passport Receipt</h1>
        <p>
          A minimal-disclosure prototype for proving authorship of core logic without storing keystrokes, prompts,
          or draft history.
        </p>
      </section>
      <LiveReceiptPanel />
    </main>
  );
}
