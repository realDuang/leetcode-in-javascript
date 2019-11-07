/*
 * @lc app=leetcode id=100 lang=javascript
 *
 * [100] Same Tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if (!p && !q) return true;
  if ((!p && q) || (p && !q) || p.val !== q.val) {
    return false;
  }
  const l = isSameTree(p.left, q.left);
  const r = isSameTree(p.right, q.right);
  return l && r;
};
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(1);
const b = new TreeNode(2);
const c = new TreeNode(3);
const d = new TreeNode(4);

const e = new TreeNode(1);
const f = new TreeNode(2);
const g = new TreeNode(3);
const h = new TreeNode(4);

a.left = b;
a.right = c;
b.left = d;

e.left = f;
e.right = g;
f.left = h;

console.log(isSameTree(a, e));
