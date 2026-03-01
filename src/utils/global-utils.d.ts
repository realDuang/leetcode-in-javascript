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

  // ── LCT (LeetCode Test) ─────────────────────────────────────────────

  const LCT: {
    /** Test a pure function: `LCT.func(fn).cases([args, expected], ...)` or `LCT.func(fn).auto()` */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func<F extends (...args: any[]) => any>(
      solution: F
    ): {
      cases(
        ...cases: ReadonlyArray<
          readonly [Readonly<Parameters<F>>, ReturnType<F> | ((actual: ReturnType<F>) => boolean)]
        >
      ): void;
      /** Auto-parse test cases from the file's comment block */
      auto(): void;
    };
    /** Test an in-place mutation function: `LCT.inPlace(fn).cases([args, expected], ...)` or `.auto()` */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inPlace<F extends (...args: any[]) => any>(
      solution: F
    ): {
      cases(
        ...cases: ReadonlyArray<readonly [Readonly<Parameters<F>>, unknown | ((actual: unknown) => boolean)]>
      ): void;
      /** Auto-parse test cases from the file's comment block */
      auto(): void;
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
