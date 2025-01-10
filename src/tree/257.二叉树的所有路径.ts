/*
 * @lc app=leetcode.cn id=257 lang=typescript
 *
 * [257] 二叉树的所有路径
 *
 * https://leetcode.cn/problems/binary-tree-paths/description/
 *
 * algorithms
 * Easy (71.03%)
 * Likes:    1188
 * Dislikes: 0
 * Total Accepted:    443.4K
 * Total Submissions: 622.1K
 * Testcase Example:  '[1,2,3,null,5]'
 *
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
 *
 * 叶子节点 是指没有子节点的节点。
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,null,5]
 * 输出：["1->2->5","1->3"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：["1"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目在范围 [1, 100] 内
 * -100 <= Node.val <= 100
 *
 *
 */

import { TreeNode, deserialize } from '../utils/tree';

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

function binaryTreePaths(root: TreeNode | null): string[] {
  const res: string[] = [];
  dfs(root, []);
  return res;

  function dfs(node: TreeNode, path: number[]) {
    const newPath = [...path, node.val];

    if (!node.left && !node.right) {
      res.push(newPath.join('->'));
    }

    if (node.left) dfs(node.left, newPath);
    if (node.right) dfs(node.right, newPath);
  }
}
// @lc code=end

(() => {
  const root: number[] = [1, 2, 3, 4, null, 5, 6, null, 7];
  console.log(binaryTreePaths(deserialize(root)));
})();
