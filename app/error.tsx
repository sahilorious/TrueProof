"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="shell">
      <section className="card" style={{ marginTop: 48 }}>
        <div className="eyebrow">TrueProof</div>
        <h1 style={{ maxWidth: "100%", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Something went wrong</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          We could not render the page just now. This is usually temporary. You can retry the page or return to the
          homepage.
        </p>
        <p className="muted" style={{ fontSize: 14 }}>{error.message}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="actionButton" onClick={() => reset()}>
            Try again
          </button>
          <a className="actionButton secondary" href="/">
            Go home
          </a>
        </div>
      </section>
    </main>
  );
}
