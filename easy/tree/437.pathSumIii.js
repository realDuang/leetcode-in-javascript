/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
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
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
  if (!root) return 0;
  const count = helper(root, sum);
  const lCount = pathSum(root.left, sum);
  const rCount = pathSum(root.right, sum);
  return count + lCount + rCount;
};

function helper(root, remain) {
  if (!root) return 0;
  const newRemain = remain - root.val;
  const count = newRemain === 0 ? 1 : 0;
  const lCount = helper(root.left, newRemain);
  const rCount = helper(root.right, newRemain);
  return lCount + rCount + count;
}
// @lc code=end

// 注意题目要求，并不一定从根节点开始计数，因此每一个节点都需要执行一遍子路径计算。

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(10);
const b = new TreeNode(5);
const c = new TreeNode(-3);
const d = new TreeNode(3);
const e = new TreeNode(2);
const f = new TreeNode(11);
const g = new TreeNode(3);
const h = new TreeNode(-2);
const i = new TreeNode(1);

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
d.left = g;
d.right = h;
e.right = i;

console.log(pathSum(a, 8));
