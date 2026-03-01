/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return '';
  const arr = [];
  const queue = [root];
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
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  let arr = null;
  if (data instanceof Array) {
    if (data.length < 1) return null;
    arr = data;
  } else if (typeof data === 'string') {
    if (data === '') return null;
    arr = JSON.parse(data);
  } else {
    return null;
  }

  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();

    const leftNumber = arr[i];
    if (leftNumber !== 'null' && leftNumber !== null) {
      node.left = new TreeNode(leftNumber);
      queue.push(node.left);
    }

    const rightNumber = arr[i + 1];
    if (i + 1 < arr.length && rightNumber !== 'null' && rightNumber !== null) {
      node.right = new TreeNode(rightNumber);
      queue.push(node.right);
    }
  }
  return root;
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

// 测试
const a = new TreeNode(1);
const b = new TreeNode(2);
const c = new TreeNode(3);
const d = new TreeNode(4);
const e = new TreeNode(5);
a.left = b;
a.right = c;
c.left = d;
c.right = e;

const data = serialize(a);
console.log(data);
const dedata = deserialize(data);
console.log(dedata);
console.log(serialize(dedata));
