/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (41.81%)
 * Likes:    251
 * Dislikes: 0
 * Total Accepted:    72K
 * Total Submissions: 170.3K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 *
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最小深度  2.
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) return 0;

  let res = 1;
  const queue = [root];

  while (queue.length !== 0) {
    // 这里提前算出queue的长度进行循环，注意一定不要将length写在循环里动态判断，因为queue的长度是会变的！
    const layerNum = queue.length;
    for (let i = 0; i < layerNum; i++) {
      const cur = queue.shift();
      if (cur.left === null && cur.right === null) {
        return res;
      }

      if (cur.left !== null) {
        queue.push(cur.left);
      }
      if (cur.right !== null) {
        queue.push(cur.right);
      }
    }
    res++;
  }
  return res;
};
// @lc code=end

function buildTree(arr) {
  if (arr.length === 0) return null;

  const nodeArr = arr.map(ele => {
    if (typeof ele === 'number') {
      return new TreeNode(ele);
    }
    return null;
  });

  const len = nodeArr.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (nodeArr[i] !== null) {
      if (i * 2 + 1 < len) {
        nodeArr[i].left = nodeArr[i * 2 + 1];
      }
      if (i * 2 + 2 < len) {
        nodeArr[i].right = nodeArr[i * 2 + 2];
      }
    }
  }
  return nodeArr[0];

  function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

console.log(minDepth(buildTree([3, 9, 20, null, null, 15, 7])));
