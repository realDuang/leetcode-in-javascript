/*
 * @lc app=leetcode.cn id=222 lang=typescript
 *
 * [222] 完全二叉树的节点个数
 *
 * https://leetcode.cn/problems/count-complete-tree-nodes/description/
 *
 * algorithms
 * Medium (79.63%)
 * Likes:    684
 * Dislikes: 0
 * Total Accepted:    181.3K
 * Total Submissions: 227.5K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
 *
 * 完全二叉树
 * 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h
 * 层，则该层包含 1~ 2^h 个节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,4,5,6]
 * 输出：6
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：0
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目范围是[0, 5 * 10^4]
 * 0
 * 题目数据保证输入的树是 完全二叉树
 *
 *
 *
 *
 * 进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
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

function countNodes(root: TreeNode | null): number {
  // 完全二叉树特性：一棵完全二叉树的两棵子树，至少有一棵是满二叉树。
  // 满二叉树特性：树高为N的满二叉树，节点共有 2^N - 1 个

  return traverse(root);

  function traverse(node: TreeNode | null): number {
    if (!node) return 0;

    // 记录左右子树的高度
    let lHeight = 1,
      rHeight = 1;
    let lTree: TreeNode = node.left;
    while (lTree) {
      lTree = lTree.left;
      lHeight += 1;
    }
    let rTree: TreeNode = node.right;
    while (rTree) {
      rTree = rTree.right;
      rHeight += 1;
    }

    if (lHeight === rHeight) {
      // 当前 node 为树高为 N 的满二叉树，节点共有 2^N - 1 个
      return Math.pow(2, lHeight) - 1;
    }
    // 递归左右子树节点数，加上当前节点
    return traverse(node.left) + traverse(node.right) + 1;
  }
}
// @lc code=end

// function countNodes(root: TreeNode | null): number {
//   let res = 0;
//   traverse(root);
//   return res;

//   function traverse(node: TreeNode | null) {
//     if (!node) return;
//     res += 1;
//     traverse(node.left);
//     traverse(node.right);
//   }
// }

(() => {
  const root = deserialize([1, 2, 3, 4, 5, 6]);
  console.log(countNodes(root));
})();
