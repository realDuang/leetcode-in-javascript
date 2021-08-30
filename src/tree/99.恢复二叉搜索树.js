/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
 *
 * https://leetcode-cn.com/problems/recover-binary-search-tree/description/
 *
 * algorithms
 * Medium (61.56%)
 * Likes:    540
 * Dislikes: 0
 * Total Accepted:    67.6K
 * Total Submissions: 109.8K
 * Testcase Example:  '[1,3,null,null,2]'
 *
 * 给你二叉搜索树的根节点 root ，该树中的两个节点被错误地交换。请在不改变其结构的情况下，恢复这棵树。
 * 
 * 进阶：使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用常数空间的解决方案吗？
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,3,null,null,2]
 * 输出：[3,1,null,null,2]
 * 解释：3 不能是 1 左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [3,1,4,null,null,2]
 * 输出：[2,1,4,null,null,3]
 * 解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树上节点的数目在范围 [2, 1000] 内
 * -2^31 
 * 
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  let prev = null;
  let first = null;
  let second = null;
  if(!root) return null;
  helper(root, null)
  
  const temp = first.val;
  first.val = second.val;
  second.val = temp;
  return root;

  function helper(node) {
    if(!node) return;
    helper(node.left);
    if(!prev) {
      prev = node;
    } else {
      if(node.val < prev.val) {
        if(!first) first = prev;
        second = node;
      }
      prev = node;
    }
    helper(node.right);
  }
};
// @lc code=end


function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
  let arr = null;
  if( data instanceof Array) {
    if(data.length < 1) return null;
    arr = data;
  } else if (typeof data === 'string') {
    if (data === '') return null;
    arr = JSON.parse(data);
  } else {
    return null;
  }

  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();

    const leftNumber = arr[i];
    if (leftNumber !== 'null' && leftNumber !== null) {
      node.left = new TreeNode(leftNumber);
      queue.push(node.left);
    }

    const rightNumber = arr[i + 1];
    if (i + 1 < arr.length 
      && rightNumber !== 'null' 
      && rightNumber !== null) {
      node.right = new TreeNode(rightNumber);
      queue.push(node.right);
    }
  }
  return root;
};

console.log(deserialize([1,3,null,null,2]));
console.log(recoverTree(deserialize([1,3,null,null,2])));