# TrueProof Demo Script

Use this script for a live 60-second demo.

## Opening

TrueProof proves authorship of core code logic without storing keystrokes, prompt history, or raw draft edits.

## Demo Flow

1. Start the app:

```bash
npm install
cp .env.example .env
npm run demo
```

2. Open the dashboard:

```text
http://localhost:3000
```

3. Show the receipt card.

- Point to the authorship score.
- Point to the source hash.
- Point to the JSON-LD credential preview.

4. Run the parser on a sample file:

```bash
npm run parser -- samples/cpp/greedy.cpp
```

5. Explain the privacy boundary:

- No keystrokes are logged
- No prompt history is stored
- Only the score and code hash leave the local machine for the receipt

## One-line closing

TrueProof turns AI-assisted coding into a verifiable authorship receipt, not a surveillance product.

