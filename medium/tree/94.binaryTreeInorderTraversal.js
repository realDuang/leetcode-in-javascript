/*
 * @lc app=leetcode id=94 lang=javascript
 *
 * [94] Binary Tree Inorder Traversal
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
var inorderTraversal = function(root) {
  if (!root) return [];
  const res = [];
  const stack = [root];
  let p = root.left;
  while (stack.length !== 0 || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }

    p = stack.pop();
    res.push(p.val);

    p = p.right;
  }
  return res;
};
// @lc code=end

// 非常典型的中序遍历树问题，有两种解法，递归与迭代。

// 递归写起来非常简单，遵循左-中-右的顺序即可
// 迭代中序遍历利用了栈的特性。先将根节点入栈，指针指向根节点的左子节点，然后开始循环：
// 1.指针节点所有左子节点全部依次入栈，
// 2.取出栈顶节点，存储节点值，
// 3.该节点若有右节点，指针指向其右节点。
// 直到节点栈空并且取出节点没有右子节点为止。

// var inorderTraversal = function(root) {
//   const res = [];
//   helper(root, res);
//   return res;
// };
// function helper(node, res) {
//   if (!node) return;
//   helper(node.left, res);
//   res.push(node.val);
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

console.log(inorderTraversal(a));
