import fs from "node:fs";
import path from "node:path";

for (const target of [".next", "dist"]) {
  const absolute = path.resolve(process.cwd(), target);
  if (fs.existsSync(absolute)) {
    fs.rmSync(absolute, { recursive: true, force: true });
  }
}

