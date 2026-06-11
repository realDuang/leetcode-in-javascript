import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyConstructor = new (...args: any[]) => any;

// Decides whether the actual result matches the expected value. Defaults to deep equality.
type Judge = (actual: unknown, expected: unknown) => boolean;

type Options = {
  /**
   * Custom check between the actual result and the expected value (overrides deep equality).
   * Params are `any` so each call site can annotate its own actual/expected types without casts.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  judge?: (actual: any, expected: any) => boolean;
};

// One test example: positional arguments plus an optional expected output.
type Example = {
  input: unknown[];
  expected?: unknown;
  hasExpected: boolean;
};

// A single runnable check: a tag for logging, the input to print, the expected
// value, and a thunk that produces the actual result.
type Row = {
  tag: string;
  input: ReadonlyArray<unknown>;
  expected?: unknown;
  hasExpected: boolean;
  call: () => unknown;
};

type ClassExample = {
  methods: ReadonlyArray<string>;
  inputs: ReadonlyArray<ReadonlyArray<unknown>>;
  expected: ReadonlyArray<unknown>;
  hasExpected: boolean;
};

type CaseData = {
  input: unknown | ReadonlyArray<unknown>;
  output: unknown;
};

/**
 * LCT (LeetCode Test) — lightweight test runner for algorithm problems.
 *
 * Public API (camelCase):
 *   - `LCT.func(fn).cases(...)` — test a pure function
 *   - `LCT.inPlace(fn).cases(...)` — test an in-place mutation function
 *   - `LCT.cls(Ctor).calls(...)` — test a class (design problems)
 */
class LCT {
  // ── Private ──────────────────────────────────────────────────────────

  private tag(label: string, index: string | number): string {
    return `[${label} #${index}]`;
  }

  private formatValue(value: unknown): string {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  private printSummary(passed: number, failed: number, unchecked = 0): void {
    const uncheckedText = unchecked > 0 ? `, ${unchecked} unchecked` : '';
    console.log(`\n── Summary: ${passed} passed, ${failed} failed${uncheckedText} ──\n`);
  }

  private normalizeInput(input: unknown | ReadonlyArray<unknown>): unknown[] {
    return Array.isArray(input) ? [...input] : [input];
  }

  /** Default judge: deep strict equality between actual and expected. */
  private deepEqual: Judge = (actual, expected) => {
    try {
      assert.deepStrictEqual(actual, expected);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * The single execution core: run every row, printing its input/actual/expect
   * and a PASS/FAIL/ERROR line, then print a summary.
   */
  private run(rows: ReadonlyArray<Row>, judge: Judge = this.deepEqual): void {
    let passed = 0;
    let failed = 0;
    let unchecked = 0;
    for (const { tag, input, expected, hasExpected, call } of rows) {
      const start = performance.now();
      try {
        console.log(`${tag} input:  ${this.formatValue(input)}`);
        const actual = call();
        const ms = (performance.now() - start).toFixed(3);
        console.log(`${tag} actual: ${this.formatValue(actual)}`);
        if (!hasExpected) {
          console.log(`${tag} expect: <not provided>`);
          console.log(`${tag} ℹ️ RUN   (${ms}ms)\n`);
          unchecked++;
          continue;
        }
        console.log(`${tag} expect: ${this.formatValue(expected)}`);
        if (judge(actual, expected)) {
          console.log(`${tag} ✅ PASS  (${ms}ms)\n`);
          passed++;
        } else {
          console.log(`${tag} ❌ FAIL  (${ms}ms)\n`);
          failed++;
        }
      } catch (error) {
        const ms = (performance.now() - start).toFixed(3);
        console.log(`${tag} ⚠️ ERROR  (${ms}ms)\n`);
        console.error(error);
        failed++;
      }
    }
    this.printSummary(passed, failed, unchecked);
  }

  /**
   * Shared driver for `func` / `inPlace`: turn examples into rows whose actual
   * value comes from `getActual`, and expose `.cases()` / `.auto()`.
   */
  private runner(getActual: (input: unknown[]) => unknown) {
    const exec = (examples: ReadonlyArray<Example>, judge?: Judge) =>
      this.run(
        examples.map((example, index) => ({
          tag: this.tag('case', index),
          input: example.input,
          expected: example.expected,
          hasExpected: example.hasExpected,
          call: () => getActual(example.input)
        })),
        judge
      );
    return {
      cases: (cases: ReadonlyArray<CaseData>, options?: Options) =>
        exec(
          cases.map(
            (testCase): Example => ({
              input: this.normalizeInput(testCase.input),
              expected: testCase.output,
              hasExpected: true
            })
          ),
          options?.judge
        ),
      auto: (options?: Options) => {
        const examples = this.parseFuncExamples();
        if (examples.length === 0) {
          console.log('⚠️ No examples found in comment or LCPR blocks');
          return;
        }
        exec(examples, options?.judge);
      }
    };
  }

  // ── Private: comment parsing ─────────────────────────────────────────

  private getFileContent(): string {
    return readFileSync(process.argv[1], 'utf-8');
  }

  private cleanBlockCommentLine(line: string): string {
    return line
      .replace(/^\s*\/\*\s?/, '')
      .replace(/\s*\*\/\s*$/, '')
      .replace(/^\s*\*\s?/, '')
      .trim();
  }

  private getCommentLines(): string[] {
    return Array.from(this.getFileContent().matchAll(/\/\*[\s\S]*?\*\//g)).flatMap(match =>
      match[0].split(/\r\n|\n|\r/).map(line => this.cleanBlockCommentLine(line))
    );
  }

  private stripCaseLine(line: string): string {
    let stripped = line.trimStart();
    while (true) {
      stripped = stripped.trimStart();
      if (stripped.startsWith('//')) {
        stripped = stripped.slice(2);
      } else if (stripped.startsWith('#')) {
        stripped = stripped.slice(1);
      } else if (stripped.startsWith('--')) {
        stripped = stripped.slice(2);
      } else if (stripped.startsWith('*')) {
        stripped = stripped.slice(1);
      } else {
        break;
      }
    }
    return stripped.replace(/\s+$/g, '');
  }

  private skipRawSeparators(str: string, pos: number): number {
    let cursor = pos;
    while (cursor < str.length) {
      const current = str[cursor];
      const next = str[cursor + 1];
      if (/[,\s]/.test(current)) {
        cursor++;
      } else if (current === '\\' && (next === 'n' || next === 'r')) {
        cursor += 2;
      } else {
        break;
      }
    }
    return cursor;
  }

  private extractJsonToken(str: string, pos: number): [string, number] {
    const ch = str[pos];
    if (ch === '[' || ch === '{') {
      const open = ch;
      const close = ch === '[' ? ']' : '}';
      let depth = 1;
      let end = pos + 1;
      let inStr = false;
      while (end < str.length && depth > 0) {
        if (inStr) {
          if (str[end] === '\\') end++;
          else if (str[end] === '"') inStr = false;
        } else {
          if (str[end] === '"') inStr = true;
          else if (str[end] === open) depth++;
          else if (str[end] === close) depth--;
        }
        end++;
      }
      return [str.slice(pos, end), end];
    }
    if (ch === '"') {
      let end = pos + 1;
      while (end < str.length) {
        if (str[end] === '\\') {
          end += 2;
          continue;
        }
        if (str[end] === '"') {
          end++;
          break;
        }
        end++;
      }
      return [str.slice(pos, end), end];
    }
    let end = pos;
    while (end < str.length && !/[,\s]/.test(str[end]) && !(str[end] === '\\' && /[nr]/.test(str[end + 1] ?? '')))
      end++;
    return [str.slice(pos, end), end];
  }

  private parseRawInputValues(raw: string): unknown[] {
    const values: unknown[] = [];
    let cursor = 0;
    while (cursor < raw.length) {
      cursor = this.skipRawSeparators(raw, cursor);
      if (cursor >= raw.length) break;
      const [token, end] = this.extractJsonToken(raw, cursor);
      if (end <= cursor || token.length === 0) throw new Error('Unable to parse raw testcase token');
      values.push(JSON.parse(token));
      cursor = end;
    }
    return values;
  }

  private parseLcprCaseInputs(): unknown[][] {
    const results: unknown[][] = [];
    const lines = this.getFileContent().split(/\r\n|\n|\r/);
    let isCollecting = false;
    let collectedLines: string[] = [];

    for (const line of lines) {
      if (/@lcpr\s+case\s*=\s*end/.test(line)) {
        if (isCollecting) {
          try {
            const input = this.parseRawInputValues(collectedLines.join('\n'));
            if (input.length > 0) results.push(input);
          } catch {
            /* skip unparseable LCPR cases */
          }
        }
        isCollecting = false;
        collectedLines = [];
        continue;
      }

      if (isCollecting) {
        collectedLines.push(this.stripCaseLine(line));
      }

      if (/@lcpr\s+case\s*=\s*start/.test(line)) {
        isCollecting = true;
        collectedLines = [];
      }
    }

    return results;
  }

  private inputKey(input: ReadonlyArray<unknown>): string {
    return this.formatValue(input);
  }

  private parseInputValues(line: string): unknown[] {
    const trimmed = line.trim();
    if (!trimmed.includes('=')) {
      return [JSON.parse(trimmed)];
    }
    const values: unknown[] = [];
    let pos = 0;
    while (pos < trimmed.length) {
      const eq = trimmed.indexOf('=', pos);
      if (eq === -1) break;
      pos = eq + 1;
      while (pos < trimmed.length && trimmed[pos] === ' ') pos++;
      if (pos >= trimmed.length) break;
      const [token, end] = this.extractJsonToken(trimmed, pos);
      values.push(JSON.parse(token));
      pos = end;
    }
    return values;
  }

  private parseFuncExamples(): Example[] {
    const lines = this.getCommentLines();
    const results: Example[] = [];
    const seenInputs = new Set<string>();

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const inputMatch = lines[lineIndex].match(/^(?:输入|Input)[：:]\s*(.+)/i);
      if (!inputMatch) continue;
      for (let outputLineIndex = lineIndex + 1; outputLineIndex < lines.length; outputLineIndex++) {
        const outputMatch = lines[outputLineIndex].match(/^(?:输出|Output)[：:]\s*(.+)/i);
        if (outputMatch) {
          try {
            const inputs = this.parseInputValues(inputMatch[1]);
            const output = JSON.parse(outputMatch[1]);
            results.push({ input: inputs, expected: output, hasExpected: true });
            seenInputs.add(this.inputKey(inputs));
          } catch {
            /* skip unparseable examples */
          }
          break;
        }
      }
    }

    for (const input of this.parseLcprCaseInputs()) {
      const key = this.inputKey(input);
      if (seenInputs.has(key)) continue;
      results.push({ input, hasExpected: false });
      seenInputs.add(key);
    }

    return results;
  }

  private isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string');
  }

  private isNestedInputArray(value: unknown): value is unknown[][] {
    return Array.isArray(value) && value.every(Array.isArray);
  }

  private parseClsExample(): ClassExample | null {
    const lines = this.getCommentLines();
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      if (!/^(?:输入|Input)(?:[：:]\s*)?$/i.test(lines[lineIndex])) continue;
      const inputLines: string[] = [];
      let outputLineIndex = lineIndex + 1;
      for (; outputLineIndex < lines.length; outputLineIndex++) {
        if (/^(?:输出|Output)/i.test(lines[outputLineIndex])) break;
        if (lines[outputLineIndex]) inputLines.push(lines[outputLineIndex]);
      }
      const outputLines: string[] = [];
      const outputInline = lines[outputLineIndex]?.match(/^(?:输出|Output)[：:]\s*(.+)/i);
      if (outputInline) {
        outputLines.push(outputInline[1]);
      } else {
        for (let nextLineIndex = outputLineIndex + 1; nextLineIndex < lines.length; nextLineIndex++) {
          if (!lines[nextLineIndex] || /^(解释|示例|提示|Explanation|Example|Constraints)/i.test(lines[nextLineIndex]))
            break;
          outputLines.push(lines[nextLineIndex]);
        }
      }
      if (inputLines.length >= 2 && outputLines.length >= 1) {
        try {
          const methods: string[] = JSON.parse(inputLines[0]);
          const inputs: unknown[][] = JSON.parse(inputLines[1]);
          const expected: unknown[] = JSON.parse(outputLines[0]);
          return { methods, inputs, expected, hasExpected: true };
        } catch {
          /* skip */
        }
      }
    }

    for (const input of this.parseLcprCaseInputs()) {
      const [methods, inputs, expected] = input;
      if (!this.isStringArray(methods) || !this.isNestedInputArray(inputs)) continue;
      if (Array.isArray(expected) && expected.length === methods.length) {
        return { methods, inputs, expected, hasExpected: true };
      }
      return { methods, inputs, expected: Array(methods.length).fill(undefined), hasExpected: false };
    }

    return null;
  }

  // ── Public ───────────────────────────────────────────────────────────

  /**
   * Test a pure function against its return value.
   * @example
   * LCT.func(twoSum).cases([
   *   { input: [[2,7,11,15], 9], output: [0,1] },
   *   { input: [[3,2,4], 6], output: [1,2] },
   * ]);
   */
  public func<F extends AnyFunc>(solution: F) {
    return this.runner(input => Reflect.apply(solution, undefined, input));
  }

  /**
   * Test an in-place mutation function (returns void, mutates its first argument).
   * @example
   * LCT.inPlace(moveZeroes).cases([
   *   { input: [[0,1,0,3,12]], output: [1,3,12,0,0] },
   * ]);
   */
  public inPlace<F extends AnyFunc>(solution: F) {
    return this.runner(input => {
      Reflect.apply(solution, undefined, input);
      return input[0];
    });
  }

  /**
   * Test a class with method call sequences (LeetCode design problem style).
   * @example
   * LCT.cls(LRUCache).calls(
   *   ['LRUCache', 'put', 'put', 'get'],
   *   [[2], [1,1], [2,2], [1]],
   *   [null, null, null, 1],
   * );
   */
  public cls<C extends AnyConstructor>(ctor: C) {
    // A null expected value (e.g. a void method) is matched loosely against null/undefined.
    const judge: Judge = (actual, expected) => (expected == null ? actual == null : this.deepEqual(actual, expected));
    const exec = ({ methods, inputs, expected, hasExpected }: ClassExample) => {
      if (methods.length !== inputs.length || methods.length !== expected.length) {
        throw new Error('LCT.cls: methods, inputs, expected must have the same length');
      }
      const instance = Reflect.construct(ctor, inputs[0], ctor);
      console.log(`${this.tag('new', methods[0])} args: ${this.formatValue(inputs[0])}`);
      // Index 0 is the constructor; every later call becomes one row.
      this.run(
        methods.slice(1).map((method, k) => {
          const args = inputs[k + 1];
          return {
            tag: this.tag('call', method),
            input: args,
            expected: expected[k + 1],
            hasExpected,
            call: () => {
              const fn = instance[method];
              if (typeof fn !== 'function') throw new Error(`method not found: ${method}`);
              return Reflect.apply(fn, instance, args);
            }
          };
        }),
        judge
      );
    };

    return {
      calls: (
        methods: ReadonlyArray<string>,
        inputs: ReadonlyArray<ReadonlyArray<unknown>>,
        expected: ReadonlyArray<unknown>
      ) => exec({ methods, inputs, expected, hasExpected: true }),
      auto: () => {
        const example = this.parseClsExample();
        if (!example) {
          console.log('⚠️ No class example found in comment or LCPR blocks');
          return;
        }
        exec(example);
      }
    };
  }
}

// ── Register singleton on globalThis ───────────────────────────────────

const lctGlobal = globalThis as typeof globalThis & { LCT?: LCT };
lctGlobal.LCT = new LCT();
