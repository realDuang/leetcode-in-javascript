/*
 * @lc app=leetcode.cn id=111 lang=typescript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (49.26%)
 * Likes:    654
 * Dislikes: 0
 * Total Accepted:    315.4K
 * Total Submissions: 639.9K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明：叶子节点是指没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [2,null,3,null,4,null,5,null,6]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数的范围在 [0, 10^5] 内
 * -1000
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function minDepth(root: TreeNode | null): number {
  if (!root) return 0;

  let depth = 1;
  const queue = [root];
  while (queue.length > 0) {
    let len = queue.length;
    while (len--) {
      const node = queue.pop();
      if (!node.left && !node.right) return depth;
      if (node.left) queue.unshift(node.left);
      if (node.right) queue.unshift(node.right);
    }
    depth += 1;
  }
  return depth;
}

// function minDepth(root: TreeNode | null): number {
//   if (!root) return 0;

//   function getMinDepth(node: TreeNode, depth: number): number {
//     if (!node.left && !node.right) return depth;

//     if (!node.left) return getMinDepth(node.right, depth + 1);
//     if (!node.right) return getMinDepth(node.left, depth + 1);

//     return Math.min(getMinDepth(node.left, depth + 1), getMinDepth(node.right, depth + 1));
//   }

//   return getMinDepth(root, 1);
// }
// @lc code=end

(() => {
  const root = Tree.deserialize([2, null, 3, null, 4, null, 5, null, 6]);
  console.log(minDepth(root));
})();
