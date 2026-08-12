import * as vscode from "vscode";
import fs from "node:fs";
import path from "node:path";
import Parser from "tree-sitter";
import CPP from "tree-sitter-cpp";
import JAVA from "tree-sitter-java";

const HUMAN_LOGIC = new Set(["function_definition", "if_statement", "for_statement", "while_statement", "switch_statement", "return_statement", "try_statement", "catch_clause"]);
const AI_SYNTAX = new Set(["identifier", "type_identifier", "formal_parameter", "variable_declarator", "local_variable_declaration", "import_declaration", "parameter_list"]);

function analyzeText(filePath: string, text: string) {
  const parser = new Parser();
  parser.setLanguage(path.extname(filePath).toLowerCase() === ".java" ? JAVA : CPP);
  const tree = parser.parse(text);
  let human = 0;
  let syntax = 0;

  const visit = (node: Parser.SyntaxNode) => {
    if (node.isNamed) {
      if (HUMAN_LOGIC.has(node.type)) human += 5;
      else if (AI_SYNTAX.has(node.type) || node.type.endsWith("_type") || node.type.endsWith("_declaration")) syntax += 1;
    }
    for (let i = 0; i < node.namedChildCount; i += 1) {
      const child = node.namedChild(i);
      if (child) visit(child);
    }
  };

  visit(tree.rootNode);
  const score = human + syntax === 0 ? 0 : (5 * human / (5 * human + syntax)) * 100;
  return { score: Number(score.toFixed(2)), human, syntax };
}

export function activate(context: vscode.ExtensionContext) {
  const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  status.text = "TrueProof: Idle";
  status.show();
  context.subscriptions.push(status);

  const disposable = vscode.commands.registerCommand("trueproof.analyzeActiveFile", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("TrueProof: Open a C++ or Java file first.");
      return;
    }
    const filePath = editor.document.uri.fsPath;
    const text = editor.document.getText();
    const result = analyzeText(filePath, text);
    status.text = `TrueProof: ${result.score.toFixed(2)}%`;
    vscode.window.showInformationMessage(`TrueProof score: ${result.score.toFixed(2)}%`);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
