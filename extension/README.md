# TrueProof VS Code Extension

This is the local authoring companion for TrueProof.

## Build
```bash
cd extension
npm install
npm run build
```

## Package
Install `vsce`, then package the extension:
```bash
npm install -g @vscode/vsce
vsce package
```

That creates a `.vsix` you can install in VS Code with the Extensions view or:
```bash
code --install-extension trueproof-extension-0.1.0.vsix
```
