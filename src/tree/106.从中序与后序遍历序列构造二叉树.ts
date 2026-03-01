/*
 * @lc app=leetcode.cn id=106 lang=typescript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (72.39%)
 * Likes:    751
 * Dislikes: 0
 * Total Accepted:    196.9K
 * Total Submissions: 272.1K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder
 * 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  const len = inorder.length;
  return traverse(0, len - 1, 0, len - 1);

  function traverse(inLeft: number, inRight: number, postLeft: number, postRight: number) {
    if (inLeft > inRight) return null;

    const nodeVal = postorder[postRight];
    const inMid = inorder.findIndex(val => val === nodeVal);

    const leftTreeSize = inMid - inLeft;

    const node = new TreeNode(nodeVal);
    node.left = traverse(inLeft, inMid - 1, postLeft, postLeft + leftTreeSize - 1);
    node.right = traverse(inMid + 1, inRight, postLeft + leftTreeSize, postRight - 1);
    return node;
  }
}
// @lc code=end

(() => {
  const postorder = [5, 6, 7, 4, 2, 8, 9, 3, 1],
    inorder = [5, 2, 6, 4, 7, 1, 8, 3, 9];
  const tree = buildTree(inorder, postorder);
  console.log(Tree.serialize(tree));
})();
