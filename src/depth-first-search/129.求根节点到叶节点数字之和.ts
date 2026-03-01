/*
 * @lc app=leetcode.cn id=129 lang=typescript
 *
 * [129] 求根节点到叶节点数字之和
 *
 * https://leetcode.cn/problems/sum-root-to-leaf-numbers/description/
 *
 * algorithms
 * Medium (70.03%)
 * Likes:    640
 * Dislikes: 0
 * Total Accepted:    212K
 * Total Submissions: 302.6K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 *
 *
 * 每条从根节点到叶节点的路径都代表一个数字：
 *
 *
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 *
 *
 * 计算从根节点到叶节点生成的 所有数字之和 。
 *
 * 叶节点 是指没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3]
 * 输出：25
 * 解释：
 * 从根到叶子节点路径 1->2 代表数字 12
 * 从根到叶子节点路径 1->3 代表数字 13
 * 因此，数字总和 = 12 + 13 = 25
 *
 * 示例 2：
 *
 *
 * 输入：root = [4,9,0,5,1]
 * 输出：1026
 * 解释：
 * 从根到叶子节点路径 4->9->5 代表数字 495
 * 从根到叶子节点路径 4->9->1 代表数字 491
 * 从根到叶子节点路径 4->0 代表数字 40
 * 因此，数字总和 = 495 + 491 + 40 = 1026
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目在范围 [1, 1000] 内
 * 0
 * 树的深度不超过 10
 *
 *
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

function sumNumbers(root: TreeNode | null): number {
  let res = 0;
  helper(root, 0);
  return res;

  function helper(node: TreeNode | null, sum: number) {
    if (!node) return;

    const newSum = sum * 10 + node.val;
    if (!node.left && !node.right) {
      res += newSum;
    }

    helper(node.left, newSum);
    helper(node.right, newSum);
  }
}
// @lc code=end

(() => {
  const root = Tree.deserialize([4, 9, 0, 5, 1]);

  console.log(sumNumbers(root));
})();

// function sumNumbers(root: TreeNode | null): number {
//   let sum = 0;
//   helper(root, []);

//   function helper(node: TreeNode | null, trace: number[] = []) {
//     if (!node) return;

//     if (!node.left && !node.right) {
//       trace.push(node.val);
//       const number = trace.reduce((acc, cur) => acc * 10 + cur, 0);
//       sum += number;
//       return;
//     }

//     helper(node.left, [...trace, node.val]);
//     helper(node.right, [...trace, node.val]);
//   }

//   return sum;
// }
