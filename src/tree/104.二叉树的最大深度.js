/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (72.57%)
 * Likes:    494
 * Dislikes: 0
 * Total Accepted:    152.8K
 * Total Submissions: 210.2K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 *
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最大深度 3 。
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
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0;
  let depth = 0;
  let queue = [root];
  while (queue.length !== 0) {
    for (let i = queue.length; i > 0; i--) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
};
// @lc code=end

// 解法一：DFS深度优先搜索 递归实现
// var maxDepth = function(root) {
//   if (!root) return 0;
//   let depth = 1;
//   let queue = [root, null];
//   while (queue.length !== 0) {
//     const node = queue.shift();
//     if (node === null) {
//       if (queue.length === 0) return depth;
//       queue.push(null);
//       depth++;
//     } else {
//       if (node.left) queue.push(node.left);
//       if (node.right) queue.push(node.right);
//     }
//   }
//   return depth;
// };

// 解法二：BFS广度优先搜索实现
// var maxDepth = function(root) {
//   if (!root) return 0;
//   return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
// };

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

console.log(maxDepth(a));
