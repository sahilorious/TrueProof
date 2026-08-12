import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Parser from "tree-sitter";
import CPP from "tree-sitter-cpp";
import JAVA from "tree-sitter-java";

type Language = "cpp" | "java";
type ScoreBreakdown = {
  hLogic: number;
  aSyntax: number;
  score: number;
  fileHash: string;
  insertedNodes: Array<{ type: string; category: "HL" | "AS"; weight: number }>;
};

const HUMAN_LOGIC = new Set([
  "function_definition",
  "if_statement",
  "for_statement",
  "while_statement",
  "do_statement",
  "switch_statement",
  "case_statement",
  "return_statement",
  "try_statement",
  "catch_clause",
  "throw_statement",
  "enhanced_for_statement",
  "synchronized_statement",
  "lambda_expression",
  "block",
  "condition",
  "body",
]);

const AI_SYNTAX = new Set([
  "variable_declarator",
  "field_declaration",
  "local_variable_declaration",
  "type_identifier",
  "integral_type",
  "floating_point_type",
  "boolean_type",
  "void_type",
  "generic_type",
  "import_declaration",
  "package_declaration",
  "formal_parameter",
  "modifiers",
  "scoped_identifier",
  "identifier",
  "string_literal",
  "decimal_integer_literal",
  "binary_expression",
  "assignment_expression",
  "call_expression",
  "argument_list",
  "parenthesized_expression",
  "array_type",
  "braced_init_list",
  "class_body",
  "method_declaration",
  "constructor_declaration",
  "annotation",
]);

const IGNORE_NODES = new Set([
  "translation_unit",
  "program",
  "source_file",
]);

const WEIGHTS = {
  human: 5,
  syntax: 1,
} as const;

function detectLanguage(filePath: string): Language {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".java") return "java";
  return "cpp";
}

function createParser(language: Language): Parser {
  const parser = new Parser();
  parser.setLanguage(language === "java" ? JAVA : CPP);
  return parser;
}

function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function flattenNodes(node: Parser.SyntaxNode): Array<{ type: string; startIndex: number; endIndex: number }> {
  const out: Array<{ type: string; startIndex: number; endIndex: number }> = [];
  const stack: Parser.SyntaxNode[] = [node];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current.isNamed) {
      out.push({
        type: current.type,
        startIndex: current.startIndex,
        endIndex: current.endIndex,
      });
    }

    for (let i = current.namedChildCount - 1; i >= 0; i -= 1) {
      const child = current.namedChild(i);
      if (child) stack.push(child);
    }
  }

  return out;
}

function nodeKey(entry: { type: string; startIndex: number; endIndex: number }): string {
  return `${entry.type}:${entry.startIndex}:${entry.endIndex}`;
}

function classifyNodeType(type: string): "HL" | "AS" | "UNK" {
  if (HUMAN_LOGIC.has(type)) return "HL";
  if (AI_SYNTAX.has(type)) return "AS";

  if (type.endsWith("_statement") || type.endsWith("_expression")) return "HL";
  if (type.endsWith("_declaration") || type.endsWith("_literal") || type.endsWith("_type")) return "AS";

  return "UNK";
}

function computeScore(previousTree: Parser.Tree | null, currentTree: Parser.Tree, sourceText: string): ScoreBreakdown {
  const previousNodes = previousTree ? flattenNodes(previousTree.rootNode) : [];
  const currentNodes = flattenNodes(currentTree.rootNode);

  const previousKeys = new Set(previousNodes.map(nodeKey));
  const insertedNodes = currentNodes.filter((node) => !previousKeys.has(nodeKey(node)) && !IGNORE_NODES.has(node.type));

  let human = 0;
  let syntax = 0;
  const details: ScoreBreakdown["insertedNodes"] = [];

  for (const node of insertedNodes) {
    const category = classifyNodeType(node.type);
    const weight = category === "HL" ? WEIGHTS.human : WEIGHTS.syntax;

    if (category === "HL") human += weight;
    if (category === "AS") syntax += weight;

    details.push({
      type: node.type,
      category: category === "HL" ? "HL" : "AS",
      weight,
    });
  }

  const denominator = WEIGHTS.human * human + WEIGHTS.syntax * syntax;
  const score = denominator === 0 ? 0 : (WEIGHTS.human * human / denominator) * 100;

  return {
    hLogic: human,
    aSyntax: syntax,
    score: Number(score.toFixed(2)),
    fileHash: sha256(sourceText),
    insertedNodes: details,
  };
}

async function main(): Promise<void> {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm run parser -- <path-to-source-file>");
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  const language = detectLanguage(absolutePath);
  const parser = createParser(language);

  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  let previousTree: Parser.Tree | null = null;
  let debounceHandle: NodeJS.Timeout | null = null;

  const analyze = (): void => {
    const sourceText = fs.readFileSync(absolutePath, "utf8");
    const currentTree = parser.parse(sourceText);
    const result = computeScore(previousTree, currentTree, sourceText);

    previousTree = currentTree;

    console.log(JSON.stringify({
      file: absolutePath,
      language,
      score: result.score,
      hLogic: result.hLogic,
      aSyntax: result.aSyntax,
      fileHash: result.fileHash,
      insertedNodes: result.insertedNodes,
      note: "Local-only AST analysis; granular edit data is not persisted.",
    }, null, 2));
  };

  analyze();

  fs.watch(absolutePath, { persistent: true }, () => {
    if (debounceHandle) clearTimeout(debounceHandle);
    debounceHandle = setTimeout(() => {
      try {
        analyze();
      } catch (error) {
        console.error("Failed to analyze file:", error);
      }
    }, 120);
  });

  process.on("SIGINT", () => {
    process.exit(0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
