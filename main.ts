process.umask(0o022);
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One sentence on a small everyday wonder, at most 200 characters.
// Wrote this after the machine woke me up last week, no big meaning to it.
const LINE =
  "The washing machine finished at 1am and beeped so pleased with itself I actually said well done out loud, standing there in my socks holding a pair of wet pants.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) throw new Error(`line is ${chars} chars, must be 1-200`);
if (!LINE.trim()) throw new Error("line is only whitespace");
if (/[\r\n]/.test(LINE)) throw new Error("line must be one line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
if (readFileSync(join(outDir, "entry.txt"), "utf8") !== LINE) throw new Error("write mismatch");
console.log(`wrote ${chars} characters`);
