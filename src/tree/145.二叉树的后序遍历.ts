/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Easy (75.18%)
 * Likes:    718
 * Dislikes: 0
 * Total Accepted:    331.3K
 * Total Submissions: 440.6K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
 *
 * 示例:
 *
 * 输入: [1,null,2,3]
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3
 *
 * 输出: [3,2,1]
 *
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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

function postorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];

  const stack: TreeNode[] = [root];

  // 永远指向上一次被读取的节点
  let prev = root;

  while (stack.length > 0) {
    const node = stack[stack.length - 1];
    // 当前节点为叶子节点，或者所有子节点都已被访问过，则读取该节点
    if ((!node.left && !node.right) || node.left === prev || node.right === prev) {
      res.push(node.val);
      prev = stack.pop();
    } else {
      if (node.right) {
        stack.push(node.right);
      }
      if (node.left) {
        stack.push(node.left);
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  // 递归法
  // function postorderTraversal(root: TreeNode | null): number[] {
  //   if (!root) return [];
  //   const res: number[] = [];
  //   helper(root);
  //   return res;

  //   function helper(node: TreeNode | null) {
  //     if (!node) return;
  //     if (node.left) helper(node.left);
  //     if (node.right) helper(node.right);
  //     res.push(node.val);
  //   }
  // }

  const root = [1, null, 2, 3, 4, 5];
  const res = postorderTraversal(Tree.deserialize(root));
  console.log(res);
})();
