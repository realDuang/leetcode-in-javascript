/*
 * @lc app=leetcode.cn id=124 lang=javascript
 *
 * [124] 二叉树中的最大路径和
 *
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/
 *
 * algorithms
 * Hard (43.20%)
 * Likes:    806
 * Dislikes: 0
 * Total Accepted:    86.9K
 * Total Submissions: 201K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个非空二叉树，返回其最大路径和。
 *
 * 本题中，路径被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[1,2,3]
 *
 * ⁠      1
 * ⁠     / \
 * ⁠    2   3
 *
 * 输出：6
 *
 *
 * 示例 2：
 *
 * 输入：[-10,9,20,null,null,15,7]
 *
 * -10
 * / \
 * 9  20
 * /  \
 * 15   7
 *
 * 输出：42
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let res = -Number.MAX_VALUE;
  traverse(root);
  return res;

  function traverse(root) {
    if (!root) return 0;

    const left = traverse(root.left);
    const right = traverse(root.right);

    // 进行后序遍历处理

    // 当前最大路径和
    res = Math.max(res, left + right + root.val);

    // 当前的最大路径值，如果值为负数，则设为0，表示直接不取该节点，从上一个节点出发为更优
    return Math.max(0, left + root.val, right + root.val);
  }
};
// @lc code=end

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === '') return null;
  const arr = JSON.parse(data);
  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();

    const leftNumber = arr[i];
    if (leftNumber !== 'null') {
      node.left = new TreeNode(leftNumber);
      queue.push(node.left);
    }

    const rightNumber = arr[i + 1];
    if (i + 1 < arr.length && rightNumber !== 'null') {
      node.right = new TreeNode(rightNumber);
      queue.push(node.right);
    }
  }
  return root;
};

const dedata = deserialize('[-3]');
console.log(maxPathSum(dedata));
