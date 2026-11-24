process.umask(0o022);
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One sentence on a small everyday wonder, at most 200 characters.
// Swapped the first idea out, this bus one actually happened to me.
const LINE =
  "My phone died on the bus so I just watched the rain instead, and caught the exact second a drop hit a puddle and threw the streetlight back up at me, all wobbly and gold.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) throw new Error(`line is ${chars} chars, must be 1-200`);
if (!LINE.trim()) throw new Error("line is only whitespace");
if (/[\r\n]/.test(LINE)) throw new Error("line must be one line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== LINE) throw new Error("write mismatch");
console.log(`wrote ${chars} characters`);
