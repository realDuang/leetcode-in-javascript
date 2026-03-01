/*
 * @lc app=leetcode.cn id=100 lang=typescript
 *
 * [100] 相同的树
 *
 * https://leetcode-cn.com/problems/same-tree/description/
 *
 * algorithms
 * Easy (59.98%)
 * Likes:    728
 * Dislikes: 0
 * Total Accepted:    271.1K
 * Total Submissions: 452.1K
 * Testcase Example:  '[1,2,3]\n[1,2,3]'
 *
 * 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
 *
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：p = [1,2,3], q = [1,2,3]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：p = [1,2], q = [1,null,2]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：p = [1,2,1], q = [1,1,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 两棵树上的节点数目都在范围 [0, 100] 内
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

// 递归比对，是否同为空，若同不为空值是否相等即可。
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if ((!p && q) || (p && !q)) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
// @lc code=end

(() => {
  const p = [1, null, 2, 3, null, 4, 5];
  const q = [1, null, 2, 3, 4, null, 5];
  const res = isSameTree(Tree.deserialize(p), Tree.deserialize(q));
  console.log(res);
})();
