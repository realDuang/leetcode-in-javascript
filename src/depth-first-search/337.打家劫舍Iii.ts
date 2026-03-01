/*
 * @lc app=leetcode.cn id=337 lang=typescript
 *
 * [337] 打家劫舍 III
 *
 * https://leetcode-cn.com/problems/house-robber-iii/description/
 *
 * algorithms
 * Medium (60.77%)
 * Likes:    1119
 * Dislikes: 0
 * Total Accepted:    147.9K
 * Total Submissions: 243.4K
 * Testcase Example:  '[3,2,3,null,3,null,1]'
 *
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。
 * 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 * 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 *
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 *
 * 示例 1:
 *
 * 输入: [3,2,3,null,3,null,1]
 *
 * ⁠    3
 * ⁠   / \
 * ⁠  2   3
 * ⁠   \   \
 * ⁠    3   1
 *
 * 输出: 7
 * 解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
 *
 * 示例 2:
 *
 * 输入: [3,4,5,1,3,null,1]
 *
 * 3
 * ⁠   / \
 * ⁠  4   5
 * ⁠ / \   \
 * ⁠1   3   1
 *
 * 输出: 9
 * 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
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

function rob(root: TreeNode | null): number {
  const [rob, giveup] = helper(root);
  return Math.max(rob, giveup);

  function helper(root: TreeNode | null): [number, number] {
    if (!root) return [0, 0];

    // 递归子节点的情况
    const [leftRob, leftGiveup] = helper(root.left);
    const [rightRob, rightGiveup] = helper(root.right);

    // 若决定抢这家，当前的子节点就都必须放弃，结果加上取当前节点的值
    const rob = leftGiveup + rightGiveup + root.val;

    // 若决定不抢这家，当前的子节点的所有情况就都需要被考虑到，其中取最大值
    const giveup = Math.max(leftRob + rightRob, leftGiveup + rightGiveup, leftRob + rightGiveup, leftGiveup + rightRob);

    return [rob, giveup];
  }
}
// @lc code=end

(() => {
  const root = Tree.deserialize([3, 2, 3, null, 3, null, 1]);
  console.log(rob(root));
})();
