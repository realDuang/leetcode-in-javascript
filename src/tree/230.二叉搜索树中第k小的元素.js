/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 *
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/
 *
 * algorithms
 * Medium (72.39%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    76.9K
 * Total Submissions: 106.2K
 * Testcase Example:  '[3,1,4,null,2]\n1'
 *
 * 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。
 *
 * 说明：
 * 你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。
 *
 * 示例 1:
 *
 * 输入: root = [3,1,4,null,2], k = 1
 * ⁠  3
 * ⁠ / \
 * ⁠1   4
 * ⁠ \
 * 2
 * 输出: 1
 *
 * 示例 2:
 *
 * 输入: root = [5,3,6,2,4,null,null,1], k = 3
 * ⁠      5
 * ⁠     / \
 * ⁠    3   6
 * ⁠   / \
 * ⁠  2   4
 * ⁠ /
 * ⁠1
 * 输出: 3
 *
 * 进阶：
 * 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let res = null;
  let count = k;
  function traverse(root) {
    if (!root) return null;

    traverse(root.left);

    // 中序遍历时判断
    count -= 1;
    if (count === 0) {
      res = root.val;
      return;
    }

    traverse(root.right);
  }

  traverse(root);

  return res;
};

// @lc code=end

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var deserialize = function (arr) {
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

const root = [5, 3, 6, 2, 4, 'null', 'null', 1];
console.log(kthSmallest(deserialize(root), 5));
