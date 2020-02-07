/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (!root) return null;
  const queue = [root];
  while (queue.length !== 0) {
    const node = queue.shift();
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
};
// @lc code=end

// 树深度优先遍历(递归)与层序遍历(队列，非递归)两种方法
// var invertTree = function(root) {
//   if (!root) return null;
//   invertTree(root.left);
//   invertTree(root.right);

//   const temp = root.left;
//   root.left = root.right;
//   root.right = temp;

//   return root;
// };

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(4);
const b = new TreeNode(2);
const c = new TreeNode(7);
const d = new TreeNode(1);
const e = new TreeNode(3);
const f = new TreeNode(6);
const g = new TreeNode(9);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

console.log(invertTree(a));
