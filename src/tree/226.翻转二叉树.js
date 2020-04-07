/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 *
 * https://leetcode-cn.com/problems/invert-binary-tree/description/
 *
 * algorithms
 * Easy (74.46%)
 * Likes:    400
 * Dislikes: 0
 * Total Accepted:    67.3K
 * Total Submissions: 90.2K
 * Testcase Example:  '[4,2,7,1,3,6,9]'
 *
 * 翻转一棵二叉树。
 *
 * 示例：
 *
 * 输入：
 *
 * ⁠    4
 * ⁠  /   \
 * ⁠ 2     7
 * ⁠/ \   / \
 * 1   3 6   9
 *
 * 输出：
 *
 * ⁠    4
 * ⁠  /   \
 * ⁠ 7     2
 * ⁠/ \   / \
 * 9   6 3   1
 *
 * 备注:
 * 这个问题是受到 Max Howell 的 原问题 启发的 ：
 *
 * 谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return null;
  const queue = [root];
  while (queue.length !== 0) {
    const node = queue.shift();
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
};
// @lc code=end

// 树深度优先遍历(递归)与层序遍历(队列，非递归)两种方法
// var invertTree = function(root) {
//   if (!root) return null;
//   invertTree(root.left);
//   invertTree(root.right);

//   const temp = root.left;
//   root.left = root.right;
//   root.right = temp;

//   return root;
// };

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(4);
const b = new TreeNode(2);
const c = new TreeNode(7);
const d = new TreeNode(1);
const e = new TreeNode(3);
const f = new TreeNode(6);
const g = new TreeNode(9);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

console.log(invertTree(a));
