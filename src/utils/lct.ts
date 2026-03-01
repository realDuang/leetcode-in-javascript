import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyConstructor = new (...args: any[]) => any;

type ExpectedOrTester<T> = T | ((actual: T) => boolean);

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

  private printSummary(passed: number, failed: number): void {
    console.log(`\n── Summary: ${passed} passed, ${failed} failed ──\n`);
  }

  private runOne(
    label: string,
    index: string | number,
    input: unknown,
    expectedOrTester: ExpectedOrTester<unknown>,
    getActual: () => unknown
  ): boolean {
    const t = this.tag(label, index);
    const start = performance.now();
    try {
      console.log(`${t} input:  ${this.formatValue(input)}`);

      const actual = getActual();
      const elapsed = (performance.now() - start).toFixed(3);

      console.log(`${t} actual: ${this.formatValue(actual)}`);

      if (typeof expectedOrTester === 'function') {
        const name = expectedOrTester.name || 'anonymous';
        console.log(`${t} expect: <predicate: ${name}>`);
        assert.strictEqual(expectedOrTester(actual), true);
      } else {
        console.log(`${t} expect: ${this.formatValue(expectedOrTester)}`);
        assert.deepStrictEqual(actual, expectedOrTester);
      }

      console.log(`${t} ✅ PASS  (${elapsed}ms)\n`);
      return true;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(3);
      if (error instanceof assert.AssertionError) {
        console.log(`${t} ❌ FAIL  (${elapsed}ms)\n`);
      } else {
        console.log(`${t} ⚠️ ERROR  (${elapsed}ms)\n`);
        console.error(error);
      }
      return false;
    }
  }

  // ── Private: comment parsing ─────────────────────────────────────────

  private getCommentLines(): string[] {
    const content = readFileSync(process.argv[1], 'utf-8');
    const match = content.match(/\/\*[\s\S]*?\*\//);
    if (!match) return [];
    return match[0].split('\n').map(line => line.replace(/^\s*\*\s?/, '').trim());
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
    while (end < str.length && !/[,\s]/.test(str[end])) end++;
    return [str.slice(pos, end), end];
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

  private parseFuncExamples(): Array<[unknown[], unknown]> {
    const lines = this.getCommentLines();
    const results: Array<[unknown[], unknown]> = [];
    for (let i = 0; i < lines.length; i++) {
      const inputMatch = lines[i].match(/^输入[：:]\s*(.+)/);
      if (!inputMatch) continue;
      for (let j = i + 1; j < lines.length; j++) {
        const outputMatch = lines[j].match(/^输出[：:]\s*(.+)/);
        if (outputMatch) {
          try {
            const inputs = this.parseInputValues(inputMatch[1]);
            const output = JSON.parse(outputMatch[1]);
            results.push([inputs, output]);
          } catch {
            /* skip unparseable examples */
          }
          break;
        }
      }
    }
    return results;
  }

  private parseClsExample(): [string[], unknown[][], unknown[]] | null {
    const lines = this.getCommentLines();
    for (let i = 0; i < lines.length; i++) {
      if (!/^输入\s*$/.test(lines[i])) continue;
      const inputLines: string[] = [];
      let j = i + 1;
      for (; j < lines.length; j++) {
        if (/^输出/.test(lines[j])) break;
        if (lines[j]) inputLines.push(lines[j]);
      }
      const outputLines: string[] = [];
      const outputInline = lines[j]?.match(/^输出[：:]\s*(.+)/);
      if (outputInline) {
        outputLines.push(outputInline[1]);
      } else {
        for (let k = j + 1; k < lines.length; k++) {
          if (!lines[k] || /^(解释|示例|提示)/.test(lines[k])) break;
          outputLines.push(lines[k]);
        }
      }
      if (inputLines.length >= 2 && outputLines.length >= 1) {
        try {
          const methods: string[] = JSON.parse(inputLines[0]);
          const inputs: unknown[][] = JSON.parse(inputLines[1]);
          const expected: unknown[] = JSON.parse(outputLines[0]);
          return [methods, inputs, expected];
        } catch {
          /* skip */
        }
      }
    }
    return null;
  }

  // ── Public ───────────────────────────────────────────────────────────

  /**
   * Test a pure function with return value.
   * @example
   * LCT.func(twoSum).cases(
   *   [[[2,7,11,15], 9], [0,1]],
   *   [[[3,2,4], 6],     [1,2]],
   * );
   */
  public func<F extends AnyFunc>(solution: F) {
    return {
      cases: (...cases: ReadonlyArray<readonly [Readonly<Parameters<F>>, ExpectedOrTester<ReturnType<F>>]>) => {
        let passed = 0;
        let failed = 0;
        for (const [i, [input, expected]] of cases.entries()) {
          if (this.runOne('case', i, input, expected, () => Reflect.apply(solution, undefined, input))) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      },
      auto: () => {
        const examples = this.parseFuncExamples();
        if (examples.length === 0) {
          console.log('⚠️ No examples found in comment block');
          return;
        }
        let passed = 0;
        let failed = 0;
        for (const [i, [input, expected]] of examples.entries()) {
          if (this.runOne('case', i, input, expected, () => Reflect.apply(solution, undefined, input))) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      }
    };
  }

  /**
   * Test an in-place mutation function (returns void, modifies first argument).
   * @example
   * LCT.inPlace(moveZeroes).cases(
   *   [[[0,1,0,3,12]], [1,3,12,0,0]],
   * );
   */
  public inPlace<F extends AnyFunc>(solution: F) {
    return {
      cases: (...cases: ReadonlyArray<readonly [Readonly<Parameters<F>>, ExpectedOrTester<unknown>]>) => {
        let passed = 0;
        let failed = 0;
        for (const [i, [input, expected]] of cases.entries()) {
          const args = [...input];
          if (
            this.runOne('case', i, args, expected, () => {
              Reflect.apply(solution, undefined, args);
              return args[0];
            })
          ) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      },
      auto: () => {
        const examples = this.parseFuncExamples();
        if (examples.length === 0) {
          console.log('⚠️ No examples found in comment block');
          return;
        }
        let passed = 0;
        let failed = 0;
        for (const [i, [input, expected]] of examples.entries()) {
          const args = [...input];
          if (
            this.runOne('case', i, args, expected, () => {
              Reflect.apply(solution, undefined, args);
              return args[0];
            })
          ) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      }
    };
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
    return {
      calls: (
        methods: ReadonlyArray<string>,
        inputs: ReadonlyArray<ReadonlyArray<unknown>>,
        expected: ReadonlyArray<unknown>
      ) => {
        if (methods.length !== inputs.length || methods.length !== expected.length) {
          throw new Error('LCT.cls: methods, inputs, expected must have the same length');
        }

        const instance = Reflect.construct(ctor, inputs[0], ctor);
        console.log(`${this.tag('new', methods[0])} args: ${this.formatValue(inputs[0])}`);

        let passed = 0;
        let failed = 0;

        for (let i = 1; i < methods.length; i++) {
          const method = methods[i];
          const args = inputs[i];
          const exp = expected[i];

          const fn = instance[method];
          if (typeof fn !== 'function') {
            console.log(`${this.tag('call', method)} ERROR method not found`);
            failed++;
            continue;
          }

          if (
            this.runOne('call', method, args, exp == null ? (v: unknown) => v == null : exp, () =>
              Reflect.apply(fn, instance, args)
            )
          ) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      },
      auto: () => {
        const example = this.parseClsExample();
        if (!example) {
          console.log('⚠️ No class example found in comment block');
          return;
        }
        const [methods, inputs, expected] = example;
        if (methods.length !== inputs.length || methods.length !== expected.length) {
          throw new Error('LCT.cls: methods, inputs, expected must have the same length');
        }
        const instance = Reflect.construct(ctor, inputs[0], ctor);
        console.log(`${this.tag('new', methods[0])} args: ${this.formatValue(inputs[0])}`);
        let passed = 0;
        let failed = 0;
        for (let i = 1; i < methods.length; i++) {
          const method = methods[i];
          const args = inputs[i];
          const exp = expected[i];
          const fn = instance[method];
          if (typeof fn !== 'function') {
            console.log(`${this.tag('call', method)} ERROR method not found`);
            failed++;
            continue;
          }
          if (
            this.runOne('call', method, args, exp == null ? (v: unknown) => v == null : exp, () =>
              Reflect.apply(fn, instance, args)
            )
          ) {
            passed++;
          } else {
            failed++;
          }
        }
        this.printSummary(passed, failed);
      }
    };
  }
}

// ── Register singleton on globalThis ───────────────────────────────────

const lctGlobal = globalThis as typeof globalThis & { LCT?: LCT };
lctGlobal.LCT = new LCT();
