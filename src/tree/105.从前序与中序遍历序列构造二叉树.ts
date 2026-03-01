/*
 * @lc app=leetcode.cn id=105 lang=typescript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (71.04%)
 * Likes:    1605
 * Dislikes: 0
 * Total Accepted:    361.2K
 * Total Submissions: 508.3K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder
 * 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出: [3,9,20,null,null,15,7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: preorder = [-1], inorder = [-1]
 * 输出: [-1]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder 和 inorder 均 无重复 元素
 * inorder 均出现在 preorder
 * preorder 保证 为二叉树的前序遍历序列
 * inorder 保证 为二叉树的中序遍历序列
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const len = preorder.length;
  return traverse(0, len - 1, 0, len - 1);

  function traverse(preLeft: number, preRight: number, inLeft: number, inRight: number) {
    // 越界时，当前节点为 null
    if (preLeft > preRight) return null;
    // 当前树的根节点为前序遍历的第一个值
    const nodeVal = preorder[preLeft];
    const node = new TreeNode(nodeVal);
    // 找到当前节点在中序遍历的位置，从而确定中序遍历的左右子树范围
    const inMid = inorder.findIndex(val => val === nodeVal);
    // 中序遍历的左子树序列化长度一定等于前序遍历的左子树序列化长度
    // 于是可以确定出前序遍历的左子树的终点，从而确定前序遍历的左右子树范围
    const leftTreeSize = inMid - inLeft;

    node.left = traverse(preLeft + 1, preLeft + leftTreeSize, inLeft, inMid - 1);
    node.right = traverse(preLeft + leftTreeSize + 1, preRight, inMid + 1, inRight);
    return node;
  }
}
// @lc code=end

(() => {
  const preorder = [1, 2, 5, 4, 6, 7, 3, 8, 9],
    inorder = [5, 2, 6, 4, 7, 1, 8, 3, 9];
  const tree = buildTree(preorder, inorder);
  console.log(Tree.serialize(tree));
})();
