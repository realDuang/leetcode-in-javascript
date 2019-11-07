/*
 * @lc app=leetcode id=144 lang=javascript
 *
 * [144] Binary Tree Preorder Traversal
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  if (!root) return [];
  const res = [];
  const stack = [root];
  while (stack.length !== 0) {
    const node = stack.pop();
    res.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return res;
};

// @lc code=end

// 非常典型的先序遍历树问题，有两种解法，递归与迭代。
// 递归写起来非常简单，遵循中-左-右的顺序即可
// 迭代先序遍历利用了栈的特性，直接先将根节点入栈，然后开始循环：出栈一个元素，存储节点值，若该节点有右节点，入栈，若该节点有左节点，入栈。直到栈空为止。

// var preorderTraversal = function(root) {
//   const res = [];
//   helper(root, res);
//   return res;
// };
// function helper(node, res) {
//   if (!node) return;
//   res.push(node.val);
//   helper(node.left, res);
//   helper(node.right, res);
// }

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
b.left = d;
b.right = e;

console.log(preorderTraversal(a));
