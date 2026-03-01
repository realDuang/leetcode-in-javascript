/**
 * Batch test runner — executes all .ts solution files in a single
 * ts-node process for fast execution (~50x faster than per-file spawning).
 *
 * Usage:
 *   npx ts-node scripts/run-all.ts              # run all .ts files
 *   npx ts-node scripts/run-all.ts show         # show stdout/stderr for each file
 *   npx ts-node scripts/run-all.ts array         # only run files under src/array/
 *   npx ts-node scripts/run-all.ts tree show      # combine filter + show
 */

import { readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(__dirname, '..');
const SRC = join(ROOT, 'src');
const SKIP_DIRS = new Set(['utils']);

// ── CLI flags ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const verbose = args.includes('--show') || args.includes('show');
const filterArgs = args.filter(a => !a.startsWith('--') && a !== 'show');
const dirFilter = filterArgs.length > 0 ? filterArgs[0] : undefined;
const numFilter = filterArgs.length > 1 ? filterArgs[1] : undefined;

// ── Collect files ──────────────────────────────────────────────────────

function collectTsFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      results.push(...collectTsFiles(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
      results.push(full);
    }
  }
  return results;
}

let files = collectTsFiles(SRC).sort();

if (dirFilter) {
  // Normalize separators for cross-platform matching
  const normalized = dirFilter.replace(/[\\/]/g, '/');
  files = files.filter(f => {
    const rel = relative(SRC, f).replace(/\\/g, '/');
    return rel.startsWith(normalized);
  });
}

if (numFilter) {
  // Match problem number at the start of the filename (e.g. "1" matches "1.两数之和.ts")
  files = files.filter(f => {
    const filename = f.replace(/\\/g, '/').split('/').pop() || '';
    return filename.startsWith(numFilter + '.') || filename === numFilter;
  });
}

// ── Run (single-process) ───────────────────────────────────────────────

interface Result {
  file: string;
  passed: boolean;
  output: string;
  duration: number;
}

const results: Result[] = [];

// Capture console.log output per file
const originalLog = console.log.bind(console);
const originalError = console.error.bind(console);

const filterLabel = [dirFilter, numFilter].filter(Boolean).join(' ');
console.log(`\n🔍 Found ${files.length} .ts file(s) to run${filterLabel ? ` (filter: "${filterLabel}")` : ''}.\n`);

for (const file of files) {
  const rel = relative(ROOT, file);
  const captured: string[] = [];

  // Hijack console to capture output
  console.log = (...a: unknown[]) => {
    captured.push(a.map(String).join(' '));
  };
  console.error = (...a: unknown[]) => {
    captured.push('[stderr] ' + a.map(String).join(' '));
  };

  // LCT reads process.argv[1] via readFileSync to parse examples,
  // so we need to point it to the current file.
  const origArgv1 = process.argv[1];
  process.argv[1] = file;

  const start = performance.now();
  let passed = true;
  let output = '';

  try {
    // Clear require cache so each file runs fresh
    delete require.cache[require.resolve(file)];
    require(file);
  } catch (err) {
    passed = false;
    const errMsg = err instanceof Error ? err.stack || err.message : String(err);
    captured.push('[error] ' + errMsg);
  }

  const duration = performance.now() - start;
  output = captured.join('\n');

  // Restore
  process.argv[1] = origArgv1;
  console.log = originalLog;
  console.error = originalError;

  // Detect LCT failures from captured output (LCT catches assertion errors
  // internally and doesn't throw, so we check the output text).
  if (passed) {
    const summaryMatch = output.match(/(\d+) failed/);
    if (summaryMatch && parseInt(summaryMatch[1], 10) > 0) passed = false;
    if (/❌ FAIL/.test(output)) passed = false;
  }

  results.push({ file: rel, passed, output, duration });

  if (!passed) {
    originalLog(`  ❌ ${rel} (${duration.toFixed(0)}ms)`);
    const lines = output.split('\n');
    const failLines = lines.filter(l => /❌ FAIL|Summary.*[1-9]\d* failed|\[error\]/.test(l));
    const display = failLines.length > 0 ? failLines : lines.slice(-4);
    originalLog(`     ${display.join('\n     ')}`);
  } else {
    if (verbose && output.trim()) {
      originalLog(`  ✅ ${rel} (${duration.toFixed(0)}ms)`);
      originalLog(`     ${output.trim().split('\n').join('\n     ')}`);
    } else {
      originalLog(`  ✅ ${rel} (${duration.toFixed(0)}ms)`);
    }
  }
}

// ── Summary ────────────────────────────────────────────────────────────

const passed = results.filter(r => r.passed);
const failed = results.filter(r => !r.passed);
const totalTime = results.reduce((s, r) => s + r.duration, 0);

console.log('\n' + '═'.repeat(60));
console.log(`  Total: ${results.length}  ✅ Passed: ${passed.length}  ❌ Failed: ${failed.length}`);
console.log(`  Time:  ${(totalTime / 1000).toFixed(1)}s`);
console.log('═'.repeat(60));

if (failed.length > 0) {
  console.log('\nFailed files:');
  for (const f of failed) {
    console.log(`  ❌ ${f.file}`);
  }
  process.exit(1);
}

console.log('\n🎉 All tests passed!\n');
