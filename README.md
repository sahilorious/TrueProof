# TrueProof

TrueProof is a hackathon prototype for proving authorship of core logic without storing keystrokes, prompt history, or raw draft edits.

## What works
- Local AST scoring for C++ and Java
- A Next.js recruiter dashboard
- A minimal receipt minting flow
- A FastAPI backend stub for minting and verification
- A VS Code extension scaffold for local analysis of the active file

## Run the dashboard
```bash
npm install
npm run dev
```

## Run the local parser
```bash
npm run parser -- path/to/file.cpp
```

## Run the backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

## VS Code extension
The `extension/` folder contains the usable extension scaffold. Build it with:
```bash
cd extension
npm install
npm run build
```

## Privacy model
- No keystroke logging
- No prompt history retention
- No raw source code upload
- Only score + source hash are used for the receipt
