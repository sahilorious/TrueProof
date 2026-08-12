import { LiveReceiptPanel } from "../components/LiveReceiptPanel";

const judgeSteps = [
  "Open the demo and read the one-sentence summary.",
  "Mint a receipt with one click.",
  "Verify it and see only a score + hash, not the draft history.",
];

const problemCards = [
  {
    title: "AI wrote the syntax, not the idea",
    body: "A clean repo no longer proves who solved the hard part.",
  },
  {
    title: "Whiteboards are the wrong answer",
    body: "They are stressful, narrow, and ignore real workflow.",
  },
  {
    title: "Surveillance tools are not acceptable",
    body: "We prove authorship without tracking keystrokes or prompts.",
  },
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero heroGrid">
        <div className="heroCopy">
          <div className="eyebrow">TrueProof</div>
          <h1>A receipt for the part of code you actually wrote.</h1>
          <p>
            TrueProof helps engineers prove they authored the core logic of C++ and Java code without exposing
            prompts, typos, or deleted lines. It is built for judges, recruiters, and anyone who wants trust without
            surveillance.
          </p>
          <div className="heroActions">
            <a className="actionButton" href="#demo">
              Open interactive demo
            </a>
            <a className="actionButton secondary" href="#judge-flow">
              How judges test it
            </a>
          </div>
        </div>
        <div className="heroProof">
          <div className="proofCard">
            <span className="label">One-line pitch</span>
            <strong>Prove authorship. Keep drafts private.</strong>
            <span className="proofNote">We score structural code contribution locally and mint a minimal receipt.</span>
          </div>
          <div className="proofCard mutedCard">
            <span className="label">What is shared</span>
            <strong>Score + code hash</strong>
            <span className="proofNote">That is all that leaves the local machine for the receipt.</span>
          </div>
        </div>
      </section>

      <section className="sectionHeading">
        <div className="eyebrow">The problem</div>
        <h2>Why TrueProof exists</h2>
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
        <div className="eyebrow">Judge flow</div>
        <h2>How to understand and test the product in 30 seconds</h2>
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
          <span className="label">For a normal user</span>
          <h3>You press a button and get a receipt.</h3>
          <p>
            The page shows a simple claim: this code was mostly human-designed, and here is the proof receipt.
          </p>
        </div>
        <div className="microExplainCard">
          <span className="label">For a technical reviewer</span>
          <h3>You can open the technical preview.</h3>
          <p>
            The receipt contains the JSON-LD credential, but the important part stays minimal by default.
          </p>
        </div>
      </section>

      <section id="demo" className="demoSection">
        <LiveReceiptPanel />
      </section>
    </main>
  );
}
