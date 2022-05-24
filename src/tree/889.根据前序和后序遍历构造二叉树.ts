/*
 * @lc app=leetcode.cn id=889 lang=typescript
 *
 * [889] 根据前序和后序遍历构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (67.61%)
 * Likes:    252
 * Dislikes: 0
 * Total Accepted:    25K
 * Total Submissions: 36.9K
 * Testcase Example:  '[1,2,4,5,3,6,7]\n[4,5,2,6,7,3,1]'
 *
 * 给定两个整数数组，preorder 和 postorder ，其中 preorder 是一个具有 无重复 值的二叉树的前序遍历，postorder
 * 是同一棵树的后序遍历，重构并返回二叉树。
 *
 * 如果存在多个答案，您可以返回其中 任何 一个。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
 * 输出：[1,2,3,4,5,6,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [1], postorder = [1]
 * 输出: [1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= preorder.length <= 30
 * 1 <= preorder[i] <= preorder.length
 * preorder 中所有值都 不同
 * postorder.length == preorder.length
 * 1 <= postorder[i] <= postorder.length
 * postorder 中所有值都 不同
 * 保证 preorder 和 postorder 是同一棵二叉树的前序遍历和后序遍历
 *
 *
 */

import { TreeNode, deserialize, serialize } from '../utils/tree';

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

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
  const len = preorder.length;
  return traverse(0, len - 1, 0, len - 1);

  function traverse(preLeft: number, preRight: number, postLeft: number, postRight: number) {
    if (preLeft > preRight) return null;

    const nodeVal = preorder[preLeft];
    const node = new TreeNode(nodeVal);
    if (preLeft === preRight) return node;

    // 左子树的根节点为前序遍历的第二个节点
    const leftNodeVal = preorder[preLeft + 1];
    // 在后序遍历中找到该左子树根节点的位置
    const leftNodeIndex = postorder.findIndex(val => val === leftNodeVal);
    // 得出左子树的节点个数
    const leftTreeSize = leftNodeIndex - postLeft + 1;

    node.left = traverse(preLeft + 1, preLeft + leftTreeSize, postLeft, leftNodeIndex);
    node.right = traverse(preLeft + leftTreeSize + 1, preRight, leftNodeIndex + 1, postRight - 1);
    return node;
  }
}
// @lc code=end

(() => {
  const preorder = [1, 2, 4, 5, 3, 6, 7],
    postorder = [4, 5, 2, 6, 7, 3, 1];
  const tree = constructFromPrePost(preorder, postorder);
  console.log(serialize(tree));
})();
