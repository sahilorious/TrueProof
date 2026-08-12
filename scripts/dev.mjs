import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const children = [];
const rootEnv = loadDotEnv(path.resolve(process.cwd(), ".env"));

function run(name, command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false,
    env: { ...process.env, ...rootEnv, ...(options.env || {}) },
    ...options,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      killAll(code);
    }
  });

  children.push(child);
}

function killAll(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill("SIGINT");
  }
  process.exit(code);
}

process.on("SIGINT", () => killAll(0));
process.on("SIGTERM", () => killAll(0));

const apiPort = rootEnv.TRUEPROOF_API_PORT || process.env.TRUEPROOF_API_PORT || "8000";

run("next", "npm", ["run", "dev"]);
run("api", "python3", ["-m", "uvicorn", "backend.app:app", "--reload", "--port", apiPort]);

console.log("TrueProof demo launcher started.");
console.log("Next.js: http://localhost:3000");
console.log(`FastAPI: http://localhost:${apiPort}`);

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const env = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^"(.*)"$/, "$1");
    if (key) env[key] = value;
  }
  return env;
}
