export default function NotFoundPage() {
  return (
    <main className="shell">
      <section className="card" style={{ marginTop: 48 }}>
        <div className="eyebrow">TrueProof</div>
        <h1 style={{ maxWidth: "100%", fontSize: "clamp(2rem, 4vw, 3rem)" }}>Page not found</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          The page you requested does not exist. Return to the homepage to view the demo and receipt flow.
        </p>
        <a className="actionButton" href="/">
          Go home
        </a>
      </section>
    </main>
  );
}
