# TrueProof

TrueProof is a hackathon prototype for proving authorship of core logic without storing keystrokes, prompt history, or raw draft edits.

## What works
- Local AST scoring for C++ and Java
- A Next.js recruiter dashboard
- A minimal receipt minting flow
- A FastAPI backend stub for minting and verification
- A VS Code extension scaffold for local analysis of the active file
- A one-command local demo launcher

## Quick start
```bash
npm install
cp .env.example .env
npm run demo
```

That starts:
- Next.js dashboard on `http://localhost:3000`
- FastAPI backend on `http://localhost:8000`

## Run the local parser only
```bash
npm run parser -- path/to/file.cpp
```

## Run the backend only
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

## VS Code extension
The `extension/` folder contains the usable extension scaffold. Build and package it with:
```bash
cd extension
npm install
npm run build
npm install -g @vscode/vsce
vsce package
```

The output `.vsix` can be installed into VS Code and run with the command:
- `TrueProof: Analyze Active File`

## Environment
The repo works without any external API keys for the hackathon demo.
If you want to wire production integrations later, put them in `.env`:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Privacy model
- No keystroke logging
- No prompt history retention
- No raw source code upload
- Only score + source hash are used for the receipt
