/*
 * @lc app=leetcode.cn id=107 lang=typescript
 *
 * [107] 二叉树的层序遍历 II
 *
 * https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/description/
 *
 * algorithms
 * Medium (72.45%)
 * Likes:    682
 * Dislikes: 0
 * Total Accepted:    270.3K
 * Total Submissions: 373K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[15,7],[9,20],[3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[[1]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
 *
 *
 */
import { deserialize, TreeNode } from '../utils/tree';

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

function levelOrderBottom(root: TreeNode | null): number[][] {
  const queue = [root];
  const res = [];

  while (queue.length > 0) {
    const level = [];
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      if (!node) continue;

      level.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    }

    if (level.length > 0) {
      res.unshift(level);
    }
  }

  return res;
}
// @lc code=end

(() => {
  const root = deserialize<number>([3, 9, 20, 3, null, 15, 7]);
  console.log(levelOrderBottom(root));
})();
