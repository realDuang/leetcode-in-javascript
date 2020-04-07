/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
 *
 * https://leetcode-cn.com/problems/path-sum-iii/description/
 *
 * algorithms
 * Easy (54.53%)
 * Likes:    344
 * Dislikes: 0
 * Total Accepted:    27.5K
 * Total Submissions: 50.4K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树，它的每个结点都存放着一个整数值。
 *
 * 找出路径和等于给定数值的路径总数。
 *
 * 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 * 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 *
 * 示例：
 *
 * root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 *
 * ⁠     10
 * ⁠    /  \
 * ⁠   5   -3
 * ⁠  / \    \
 * ⁠ 3   2   11
 * ⁠/ \   \
 * 3  -2   1
 *
 * 返回 3。和等于 8 的路径有:
 *
 * 1.  5 -> 3
 * 2.  5 -> 2 -> 1
 * 3.  -3 -> 11
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
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
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
