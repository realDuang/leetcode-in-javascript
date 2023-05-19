/*
 * @lc app=leetcode.cn id=108 lang=typescript
 *
 * [108] 将有序数组转换为二叉搜索树
 *
 * https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/
 *
 * algorithms
 * Easy (77.41%)
 * Likes:    1306
 * Dislikes: 0
 * Total Accepted:    356.6K
 * Total Submissions: 460.7K
 * Testcase Example:  '[-10,-3,0,5,9]'
 *
 * 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
 *
 * 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-10,-3,0,5,9]
 * 输出：[0,-3,9,-10,null,5]
 * 解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,3]
 * 输出：[3,1]
 * 解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^4
 * -10^4 <= nums[i] <= 10^4
 * nums 按 严格递增 顺序排列
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

function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;

  return helper(0, nums.length - 1);

  function helper(left: number, right: number): TreeNode | null {
    if (left > right) return null;
    const mid = Math.floor((left + right) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = helper(left, mid - 1);
    root.right = helper(mid + 1, right);
    return root;
  }
}
// @lc code=end

(() => {
  const nums = [-10, -3, 0, 5, 9];
  console.log(sortedArrayToBST(nums));
})();
