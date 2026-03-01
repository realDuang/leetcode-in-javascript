/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 *
 * https://leetcode-cn.com/problems/balanced-binary-tree/description/
 *
 * algorithms
 * Easy (50.84%)
 * Likes:    283
 * Dislikes: 0
 * Total Accepted:    64.5K
 * Total Submissions: 126.3K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 *
 * 本题中，一棵高度平衡二叉树定义为：
 *
 *
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
 *
 *
 * 示例 1:
 *
 * 给定二叉树 [3,9,20,null,null,15,7]
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回 true 。
 *
 * 示例 2:
 *
 * 给定二叉树 [1,2,2,3,3,null,null,4,4]
 *
 * ⁠      1
 * ⁠     / \
 * ⁠    2   2
 * ⁠   / \
 * ⁠  3   3
 * ⁠ / \
 * ⁠4   4
 *
 *
 * 返回 false 。
 *
 *
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  return Math.abs(helper(root.left) - helper(root.right)) <= 1;
};

function helper(root) {
  if (!root) return 0;
  return Math.max(helper(root.left), helper(root.right)) + 1;
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(0);
const b = new TreeNode(2);
const c = new TreeNode(4);
const d = new TreeNode(1);
const e = new TreeNode(3);
const f = new TreeNode(-1);
const g = new TreeNode(5);
const h = new TreeNode(1);
const i = new TreeNode(6);
const j = new TreeNode(8);

a.left = b;
a.right = c;
b.left = d;

c.left = e;
c.right = f;
d.left = g;
d.right = h;

e.right = i;

f.right = j;

console.log(a);
console.log(isBalanced(a));
