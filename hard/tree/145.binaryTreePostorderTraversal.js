/*
 * @lc app=leetcode id=145 lang=javascript
 *
 * [145] Binary Tree Postorder Traversal
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
var postorderTraversal = function(root) {
  if (!root) return [];
  const res = [];
  const stack = [root];
  let pre = root;
  while (stack.length !== 0) {
    const node = stack[stack.length - 1];
    if (node.left === pre || node.right === pre || (!node.left && !node.right)) {
      res.push(node.val);
      pre = stack.pop();
    } else {
      node.right && stack.push(node.right);
      node.left && stack.push(node.left);
    }
  }
  return res;
};
// @lc code=end

// 非常典型的后序遍历树问题，有两种解法，递归与迭代。
// 递归写起来非常简单，遵循左-右-中的顺序即可
// 迭代后序遍历利用了栈的特性，直接先将根节点入栈，然后开始循环：
// 1.记录当前栈顶节点。
// 2.若该节点为叶子节点，或者该节点的左节点与右节点都已经被遍历过，则存储该节点值，并出栈栈顶节点，使用一个变量记录。
// 3. 否则，若该节点有右节点，入栈，若该节点有左节点，入栈。
// 直到栈空为止。

// var postorderTraversal = function(root) {
//   const res = [];
//   helper(root, res);
//   return res;
// };
// function helper(node, res) {
//   if (!node) return;
//   helper(node.left, res);
//   helper(node.right, res);
//   res.push(node.val);
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

console.log(postorderTraversal(a));
