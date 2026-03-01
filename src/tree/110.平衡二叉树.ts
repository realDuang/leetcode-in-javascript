/*
 * @lc app=leetcode.cn id=110 lang=typescript
 *
 * [110] 平衡二叉树
 *
 * https://leetcode.cn/problems/balanced-binary-tree/description/
 *
 * algorithms
 * Easy (57.52%)
 * Likes:    1331
 * Dislikes: 0
 * Total Accepted:    502.3K
 * Total Submissions: 873K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 *
 * 本题中，一棵高度平衡二叉树定义为：
 *
 *
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,2,3,3,null,null,4,4]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在范围 [0, 5000] 内
 * -10^4
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

function isBalanced(root: TreeNode | null): boolean {
  const depth = getDepth(root);
  return depth !== -1;

  // 获取一棵平衡树的深度，如果树不是平衡的，则直接返回 -1，相当于提前剪枝。
  function getDepth(node: TreeNode | null): number {
    if (!node) return 0;
    const leftDepth = getDepth(node.left);
    const rightDepth = getDepth(node.right);

    // 若左右子树不都为平衡树，则该树必不为平衡树
    if (leftDepth === -1 || rightDepth === -1) return -1;
    // 若左右子树深度差大于 1，则该树必不为平衡树
    if (Math.abs(leftDepth - rightDepth) > 1) return -1;

    return Math.max(leftDepth + 1, rightDepth + 1);
  }
}
// @lc code=end

(() => {
  const root: number[] = [3, 9, 20, null, null, 15, 7];
  console.log(isBalanced(Tree.deserialize(root)));
})();
