/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode-cn.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (29.39%)
 * Likes:    486
 * Dislikes: 0
 * Total Accepted:    87K
 * Total Submissions: 293.7K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 *
 * 假设一个二叉搜索树具有如下特征：
 *
 *
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 *
 *
 * 示例 1:
 *
 * 输入:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入:
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 * 根节点的值为 5 ，但是其右子节点值为 4 。
 *
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

function helper(root, min, max) {
  if (!root) return true;

  if (root.val <= min || root.val >= max) return false;

  return helper(root.left, min, root.val) && helper(root.right, root.val, max);
}
// @lc code=end

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const a = new TreeNode(10);
const b = new TreeNode(5);
const c = new TreeNode(16);
const d = new TreeNode(6);
const e = new TreeNode(20);

a.left = b;
a.right = c;
c.left = d;
c.right = e;

console.log(isValidBST(a));

// 若是普通遍历树的话需要注意，对于树的比较不能仅比较当前节点与左右子的大小关系，还应该注意与所有祖先节点的大小关系。因此，这里合适的做法是确立该节点取值的上下界，这样才能确定搜索树的正确性。

// 若该节点为父节点的左子节点，则取值范围上界更新为父节点的值，若为右子节点，则下界更新为父节点的值。

// var isValidBST = function (root) {
//   return helper(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
// };

// function helper(root, min, max) {
//   if (!root) return true;

//   if (root.val <= min || root.val >= max) return false;

//   return helper(root.left, min, root.val) && helper(root.right, root.val, max);
// }

// 另外，我们也可以用中序遍历来解题。我们容易看出来，二叉搜索树的中序遍历结果实际上就是一个从小到大的排序数组。因此，我们只需要比较当前值是否比前一个数大即可。
