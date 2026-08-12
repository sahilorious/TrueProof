# TrueProof

TrueProof is a hackathon prototype for proving authorship of core logic in C++ and Java code without storing keystrokes, prompt history, or raw draft edits.

The idea:
- parse code locally with Tree-sitter
- classify structural AST changes as Human Logic (`H_L`) or AI Syntax (`A_S`)
- compute an authorship score
- mint a minimal receipt containing only the score and a source hash
- show that receipt in a clean recruiter-facing dashboard

## What is included

- Local AST scoring script for C++ and Java
- Next.js dashboard for viewing a receipt
- FastAPI backend for minting and verifying receipts
- VS Code extension scaffold for active-file analysis
- One-command demo launcher
- Sample C++ and Java files for testing

## Privacy model

TrueProof does not aim to capture or store:
- keystrokes
- prompt history
- deleted text
- raw source code in the cloud

The prototype keeps the demo minimal:
- the local score is computed from AST structure
- the receipt only contains the score and a source hash

## Repository layout

- `app/` - Next.js dashboard and API routes
- `backend/` - FastAPI mock backend
- `components/` - dashboard UI components
- `extension/` - VS Code extension scaffold
- `lib/` - receipt and mock data helpers
- `samples/` - sample C++ and Java programs to test the parser
- `scripts/` - local demo launcher
- `src/` - Tree-sitter parser script

## Requirements

- Node.js 18 or newer
- npm
- Python 3.10 or newer
- VS Code if you want to try the extension

## Fastest way to run everything

1. Install dependencies.

```bash
npm install
```

2. Create your local environment file.

```bash
cp .env.example .env
```

3. Start the dashboard and backend together.

```bash
npm run demo
```

4. Open the dashboard.

```text
http://localhost:3000
```

The demo launcher starts:
- Next.js on port `3000`
- FastAPI on port `8000`

## How to test the parser

Use the sample files first. They give you a predictable demo.

```bash
npm run parser -- samples/cpp/greedy.cpp
npm run parser -- samples/java/greedy.java
```

You should see:
- the detected language
- the file hash
- the Human Logic / AI Syntax totals
- the final score

## How to test the dashboard

1. Start the demo with:

```bash
npm run demo
```

2. Open:

```text
http://localhost:3000
```

3. You should see a receipt card with:
- authorship score
- source hash
- issuer
- issuance date
- a JSON-LD credential preview

## How to test the backend directly

Start the backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Then test the endpoints:

```bash
curl http://localhost:8000/health
```

Mint a receipt:

```bash
curl -X POST http://localhost:8000/mint \
  -H "Content-Type: application/json" \
  -d '{"score":97.4,"source_hash":"abc123"}'
```

Verify a receipt:

```bash
curl -X POST http://localhost:8000/verify \
  -H "Content-Type: application/json" \
  -d '{"score":97.4,"source_hash":"abc123"}'
```

## How to use the VS Code extension

1. Open the `extension/` folder in VS Code.
2. Install dependencies:

```bash
cd extension
npm install
npm run build
```

3. Package the extension:

```bash
npm install -g @vscode/vsce
vsce package
```

4. Install the generated `.vsix` file in VS Code.
5. Open a C++ or Java file.
6. Run the command:

```text
TrueProof: Analyze Active File
```

## Environment variables

The hackathon demo does not require any external API keys.

If you later connect real services, add them to `.env` in the repo root:

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TRUEPROOF_API_PORT=8000
```

## Useful scripts

```bash
npm run demo       # start dashboard + backend
npm run dev        # dashboard only
npm run parser -- samples/cpp/greedy.cpp
npm run build      # production build for the web app
npm run typecheck  # TypeScript check
```

## Submission checklist

Before you push the repo:
- run `npm run typecheck`
- run `npm run build`
- run `npm run demo` and open the dashboard once
- run the parser against both sample files
- make sure no `.vsix` or cache files are committed

## Why this matters

This prototype shows a privacy-preserving way to prove that someone wrote the core logic of a codebase without turning the IDE into surveillance software.

