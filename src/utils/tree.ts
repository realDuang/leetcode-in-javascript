export class TreeNodeT<T = number> {
  public val: T;
  public left: TreeNodeT<T> | null;
  public right: TreeNodeT<T> | null;
  constructor(val: T, left?: TreeNodeT<T> | null, right?: TreeNodeT<T> | null) {
    this.val = val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export class TreeNode extends TreeNodeT<number> {}

export type ArrayElement<T> = T | 'null';

/**
 * Encodes a tree to a single string.
 */
function serialize<T>(root: TreeNodeT<T> | null): string {
  if (!root) return '';
  const arr: Array<ArrayElement<T>> = [];
  const queue: Array<TreeNodeT<T> | null> = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      arr.push('null');
      continue;
    }
    arr.push(node.val);

    queue.push(node.left);
    queue.push(node.right);
  }

  // 去除尾部多余的null
  while (arr.length >= 1 && arr[arr.length - 1] === 'null') arr.pop();

  return JSON.stringify(arr);
}

/**
 * Decodes your encoded data to tree.
 */
function deserialize<T>(data: string | Array<T>): TreeNodeT<T> | null {
  let arr: Array<ArrayElement<T>>;
  if (data instanceof Array) {
    if (data.length < 1) return null;
    arr = data as Array<ArrayElement<T>>;
  } else if (typeof data === 'string') {
    if (data === '') return null;
    arr = JSON.parse(data) as Array<ArrayElement<T>>;
    if (arr.length < 1) return null;
  } else {
    return null;
  }

  // 根节点不可能为 'null'
  if (arr[0] === 'null' || arr[0] === null) return null;
  const root = new TreeNodeT(arr[0] as T);
  const queue: TreeNodeT<T>[] = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();
    if (!node) break;

    const leftNumber: ArrayElement<T> = arr[i];
    if (leftNumber !== 'null' && leftNumber !== null) {
      const leftNode = new TreeNodeT(leftNumber);
      node.left = leftNode;
      queue.push(leftNode);
    }

    const rightNumber: ArrayElement<T> = arr[i + 1];
    if (i + 1 < arr.length && rightNumber !== 'null' && rightNumber !== null) {
      const rightNode = new TreeNodeT(rightNumber);
      node.right = rightNode;
      queue.push(rightNode);
    }
  }
  return root;
}

class TreeUtils<T = number> {
  public serialize(root: TreeNodeT<T> | null): string {
    return serialize(root);
  }

  public deserialize(data: string | Array<T | null>): TreeNodeT<T> | null {
    return deserialize<T | null>(data) as TreeNodeT<T> | null;
  }
}

const Tree = new TreeUtils();

const treeGlobal = globalThis as typeof globalThis & {
  TreeNodeT?: typeof TreeNodeT;
  TreeNode?: typeof TreeNode;
  Tree?: typeof Tree;
};

treeGlobal.TreeNodeT = TreeNodeT;
treeGlobal.TreeNode = TreeNode;
treeGlobal.Tree = Tree;

// // 测试
// const a = new TreeNode(1);
// const b = new TreeNode(2);
// const c = new TreeNode(3);
// const d = new TreeNode(4);
// const e = new TreeNode(5);
// a.left = b;
// a.right = c;
// c.left = d;
// c.right = e;

// const data = serialize(a);
// console.log(data);
// const dedata = deserialize(data);
// console.log(dedata);
// console.log(serialize(dedata));
