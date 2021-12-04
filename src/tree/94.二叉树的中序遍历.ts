/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Easy (75.56%)
 * Likes:    1194
 * Dislikes: 0
 * Total Accepted:    621.4K
 * Total Submissions: 822.5K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1]
 * 输出：[1]
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = [1,2]
 * 输出：[2,1]
 *
 *
 * 示例 5：
 *
 *
 * 输入：root = [1,null,2]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [0, 100] 内
 * -100
 *
 *
 *
 *
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 *
 */
import { deserialize } from '../utils/tree';

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

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

function inorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];

  const stack: TreeNode[] = [root];

  let cur = root.left;
  while (cur || stack.length > 0) {
    // 左子节点依次入栈
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    // 读取并存储当前节点值
    cur = stack.pop();
    res.push(cur.val);
    // 指针指向右子节点
    cur = cur.right;
  }

  return res;
}
// @lc code=end

// 递归法
// function inorderTraversal(root: TreeNode | null): number[] {
//   if (!root) return [];
//   const res: number[] = [];
//   helper(root);
//   return res;

//   function helper(node: TreeNode | null) {
//     if (!node) return;
//     if (node.left) helper(node.left);
//     res.push(node.val);
//     if (node.right) helper(node.right);
//   }
// }

const root = [3, 1, 6, 4, 5, null, null, 2, null, 7];
const res = inorderTraversal(deserialize(root));
console.log(res);
