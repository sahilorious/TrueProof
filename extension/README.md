# TrueProof VS Code Extension

This folder contains the local authoring companion for TrueProof.

## What it does

- Adds a command called `TrueProof: Analyze Active File`
- Runs the AST-based score on the currently open C++ or Java file
- Updates the status bar with the score

## Build the extension

```bash
cd extension
npm install
npm run build
```

## Package it as a `.vsix`

Install the packaging tool:

```bash
npm install -g @vscode/vsce
```

Then build the package:

```bash
vsce package
```

That creates a file such as `trueproof-extension-0.1.0.vsix`.

## Install the package in VS Code

Use the command palette or run:

```bash
code --install-extension trueproof-extension-0.1.0.vsix
```

## Use it

1. Open a `.cpp` or `.java` file.
2. Run `TrueProof: Analyze Active File`.
3. Read the score in the status bar.

