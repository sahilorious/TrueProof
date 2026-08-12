import { LiveReceiptPanel } from "../components/LiveReceiptPanel";
import { SectionLink } from "../components/SectionLink";

const judgeSteps = [
  "Read the summary and sample use case.",
  "Mint a receipt for one of the preset examples.",
  "Open the receipt details if you want the technical record.",
];

const problemCards = [
  {
    title: "Repository quality does not establish authorship",
    body: "Modern tools can complete syntax while the core reasoning remains human.",
  },
  {
    title: "Screening should reflect real development",
    body: "Whiteboards and live coding are useful, but they are not how most software is built.",
  },
  {
    title: "Verification should not require surveillance",
    body: "TrueProof avoids keystroke logging, prompt capture, and draft storage.",
  },
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">TrueProof</div>
          <h1>Authorship receipts for AI-assisted engineering.</h1>
          <p>
            TrueProof lets developers demonstrate authorship of the core logic in C++ and Java while keeping the
            drafting process private.
          </p>
          <div className="heroActions">
            <SectionLink targetId="demo" label="Open demo" />
            <SectionLink targetId="judge-flow" label="View overview" variant="secondary" />
          </div>
        </div>
        <div className="heroProof">
          <div className="proofCard">
            <span className="label">Product summary</span>
            <strong>Local analysis, minimal disclosure.</strong>
            <span className="proofNote">The prototype scores structural code contribution and mints a compact receipt.</span>
          </div>
          <div className="proofCard mutedCard">
            <span className="label">What is shared</span>
            <strong>Score + code hash</strong>
            <span className="proofNote">That is all that leaves the local machine for the receipt.</span>
          </div>
        </div>
      </section>

      <section className="sectionHeading">
        <div className="eyebrow">Problem</div>
        <h2>Why this product exists</h2>
      </section>

      <section className="triptych">
        {problemCards.map((card) => (
          <article className="infoTile" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </section>

      <section id="judge-flow" className="sectionHeading">
        <div className="eyebrow">Overview</div>
        <h2>What the prototype demonstrates</h2>
      </section>

      <section className="steps compact">
        {judgeSteps.map((step, index) => (
          <div className="step" key={step}>
            <span className="stepNumber">0{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </section>

      <section className="microExplain">
        <div className="microExplainCard">
          <span className="label">For a general audience</span>
          <h3>Review a receipt in one page.</h3>
          <p>
            The interface presents the result clearly without requiring knowledge of ASTs or cryptography.
          </p>
        </div>
        <div className="microExplainCard">
          <span className="label">For a technical reviewer</span>
          <h3>Inspect the receipt details on demand.</h3>
          <p>
            The technical receipt is available, but the default view stays concise.
          </p>
        </div>
      </section>

      <section id="demo" className="demoSection">
        <LiveReceiptPanel />
      </section>
    </main>
  );
}
