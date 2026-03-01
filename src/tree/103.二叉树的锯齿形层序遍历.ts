/*
 * @lc app=leetcode.cn id=103 lang=typescript
 *
 * [103] 二叉树的锯齿形层序遍历
 *
 * https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/description/
 *
 * algorithms
 * Medium (57.52%)
 * Likes:    763
 * Dislikes: 0
 * Total Accepted:    302K
 * Total Submissions: 525.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1]
 * 输出：[[1]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  const queue = [root];
  const res = [];
  let direction = false;

  while (queue.length > 0) {
    direction = !direction;
    const level = [];
    let len = queue.length;
    while (len--) {
      const node = queue.shift();
      if (!node) continue;

      if (direction) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }
      queue.push(node.left);
      queue.push(node.right);
    }

    if (level.length > 0) {
      res.push(level);
    }
  }

  return res;
}
// @lc code=end

(() => {
  const root = Tree.deserialize([3, 9, 20, 3, null, 15, 7]);
  console.log(zigzagLevelOrder(root));
})();
