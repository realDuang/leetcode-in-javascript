/*
 * @lc app=leetcode.cn id=297 lang=javascript
 *
 * [297] 二叉树的序列化与反序列化
 *
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/description/
 *
 * algorithms
 * Hard (51.60%)
 * Likes:    344
 * Dislikes: 0
 * Total Accepted:    47.4K
 * Total Submissions: 91.5K
 * Testcase Example:  '[1,2,3,null,null,4,5]'
 *
 *
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 *
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 /
 * 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 *
 * 示例:
 *
 * 你可以将以下二叉树：
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * ⁠    / \
 * ⁠   4   5
 *
 * 序列化为 "[1,2,3,null,null,4,5]"
 *
 * 提示: 这与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode
 * 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
 *
 * 说明: 不要使用类的成员 / 全局 / 静态变量来存储状态，你的序列化和反序列化算法应该是无状态的。
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
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
var deserialize = function(data) {
  if (data === '') return null;
  const arr = JSON.parse(data);
  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();

    const leftNumber = arr[i];
    if (leftNumber !== 'null') {
      node.left = new TreeNode(leftNumber);
      queue.push(node.left);
    }

    const rightNumber = arr[i + 1];
    if (i + 1 < arr.length && rightNumber !== 'null') {
      node.right = new TreeNode(rightNumber);
      queue.push(node.right);
    }
  }
  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

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
