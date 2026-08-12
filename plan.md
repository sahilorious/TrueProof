# TrueProof Prototype Plan

## Goal
Build a hackathon-ready prototype that lets a developer locally score C++ or Java code by AST-based authorship signals, mint a minimal verifiable receipt, and view that receipt in a recruiter-facing dashboard without exposing raw source history.

## Constraints
- No keystroke logging.
- No prompt history, deleted text, or raw draft storage.
- Only AST-based analysis.
- Only the final score and source hash leave the local machine.

## Implementation Plan
1. **Local AST Scoring**
   - Watch a C++ or Java file.
   - Parse with Tree-sitter.
   - Classify inserted AST nodes as Human Logic (`H_L`) or AI Syntax (`A_S`).
   - Emit a local score and source hash.

2. **Receipt Minting**
   - Convert the local score into a minimal JSON-LD verifiable credential.
   - Add a local signature proof.
   - Discard granular AST details after minting.

3. **Verification API**
   - Provide a small API that accepts the receipt payload.
   - Return a verified status for dashboard consumption.
   - Mock the Egoist AI Passport flow for the hackathon demo.

4. **Recruiter Dashboard**
   - Build a dark, minimal Next.js page.
   - Show score, hash, verification status, and issuance metadata.
   - Keep the UI clean and presentation-focused.

5. **Demo Workflow**
   - Run the parser on a local source file.
   - Mint the receipt.
   - Open the dashboard and render the verified passport receipt.

## Done Criteria
- `npm run parser -- <file>` works locally.
- `npm run dev` opens the dashboard.
- The API returns a receipt from locally supplied analysis data.
- The repo contains a single obvious path to demonstrate the product end to end.
