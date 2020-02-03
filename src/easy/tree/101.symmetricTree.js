/*
 * @lc app=leetcode id=101 lang=javascript
 *
 * [101] Symmetric Tree
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (!root) return true;
  return helper(root.left, root.right);
};

function helper(left, right) {
  if (!left && !right) return true;
  if ((left && !right) || (!left && right) || left.val !== right.val)
    return false;
  return helper(left.left, right.right) && helper(left.right, right.left);
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(1);
const b = new TreeNode(2);
const c = new TreeNode(2);
const d = new TreeNode(3);
const e = new TreeNode(4);
const f = new TreeNode(4);
const g = new TreeNode(3);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = g;
c.right = f;

console.log(a);
console.log(isSymmetric(a));
