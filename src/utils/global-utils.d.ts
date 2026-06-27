declare global {
  class TreeNodeT<T = number> {
    val: T;
    left: TreeNodeT<T> | null;
    right: TreeNodeT<T> | null;
    constructor(val: T, left?: TreeNodeT<T> | null, right?: TreeNodeT<T> | null);
  }

  class TreeNode extends TreeNodeT<number> {}

  type ArrayElement<T> = T | 'null';

  class ListNode<T = number> {
    val: T;
    next: ListNode<T> | null;
    constructor(val?: T, next?: ListNode<T> | null);
  }

  class DoublyListNode<T = number> {
    val: T;
    prev: DoublyListNode<T> | null;
    next: DoublyListNode<T> | null;
    constructor(val?: T, prev?: DoublyListNode<T> | null, next?: DoublyListNode<T> | null);
  }

  const Tree: {
    serialize(root: TreeNodeT<number> | null): string;
    deserialize(data: string | Array<number | null>): TreeNodeT<number> | null;
  };

  const List: {
    serialize(root: ListNode<number> | null): Array<number>;
    deserialize(data: string | Array<number>, loopPosition?: number): ListNode<number> | null;
    getNode(root: ListNode<number> | null, index: number): ListNode<number> | null;
    hasCycle(head: ListNode<number> | null): boolean;
  };

  const DoublyList: {
    serialize(head: DoublyListNode<number> | null): Array<number>;
    deserialize(data: string | Array<number>): DoublyListNode<number> | null;
    getNode(head: DoublyListNode<number> | null, index: number): DoublyListNode<number> | null;
  };

  // ── LCT (LeetCode Test) ─────────────────────────────────────────────

  /** Options for a test suite; `judge` overrides the default deep-equality comparison. */
  type LCTOptions = {
    /** Compare array outputs without considering the order of their top-level elements. */
    ignoreArrayOrder?: boolean;
    /** Params are `any` so each call site can annotate its own actual/expected types without casts. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    judge?: (actual: any, expected: any) => boolean;
  };

  const LCT: {
    /** Test a pure function: `LCT.func(fn).cases([{ input, output }, ...], options?)` or `.auto(options?)` */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func<F extends (...args: any[]) => any>(
      solution: F
    ): {
      cases(
        cases: ReadonlyArray<{ input: unknown | ReadonlyArray<unknown>; output: unknown }>,
        options?: LCTOptions
      ): void;
      /** Auto-parse test cases from the file's comment block */
      auto(options?: LCTOptions): void;
    };
    /** Test an in-place mutation function: `LCT.inPlace(fn).cases([{ input, output }, ...], options?)` or `.auto(options?)` */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inPlace<F extends (...args: any[]) => any>(
      solution: F
    ): {
      cases(
        cases: ReadonlyArray<{ input: unknown | ReadonlyArray<unknown>; output: unknown }>,
        options?: LCTOptions
      ): void;
      /** Auto-parse test cases from the file's comment block */
      auto(options?: LCTOptions): void;
    };
    /** Test a class (design problems): `LCT.cls(Ctor).calls(methods, inputs, expected)` or `.auto()` */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cls<C extends new (...args: any[]) => any>(
      ctor: C
    ): {
      calls(
        methods: ReadonlyArray<string>,
        inputs: ReadonlyArray<ReadonlyArray<unknown>>,
        expected: ReadonlyArray<unknown>
      ): void;
      /** Auto-parse test cases from the file's comment block */
      auto(): void;
    };
  };
}

export {};
