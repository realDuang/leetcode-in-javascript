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

import { deserialize } from '../utils/tree';

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
  if (root === null) return 0;

  let res = 0;
  const queue: TreeNode[] = [];
  queue.unshift(root);

  while (queue.length > 0) {
    // 对于每一层，进行一次遍历，入队子节点操作
    res += 1;
    let count = queue.length;
    while (count) {
      const curr = queue.pop();
      // 此时为叶子节点，直接返回结果
      if (!curr.left && !curr.right) {
        return res;
      }
      if (curr.left) {
        queue.unshift(curr.left);
      }
      if (curr.right) {
        queue.unshift(curr.right);
      }
      count -= 1;
    }
  }
}
// @lc code=end

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

(() => {
  const root = deserialize<number>([2, null, 3, null, 4, null, 5, null, 6]);
  console.log(minDepth(root));
})();
