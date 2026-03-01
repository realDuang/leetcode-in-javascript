/*
 * @lc app=leetcode.cn id=113 lang=typescript
 *
 * [113] 路径总和 II
 *
 * https://leetcode.cn/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (64.19%)
 * Likes:    1229
 * Dislikes: 0
 * Total Accepted:    504.7K
 * Total Submissions: 786.2K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 *
 * 叶子节点 是指没有子节点的节点。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：[[5,4,11,2],[5,8,4,5]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,2], targetSum = 0
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点总数在范围 [0, 5000] 内
 * -1000
 * -1000
 *
 *
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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const res: number[][] = [];
  if (!root) return res;

  const stack: TreeNode[] = [];
  let node: TreeNode | null = root;

  const path: number[] = [];
  let rest: number = targetSum;

  let prev: TreeNode | null = null;

  while (node || stack.length) {
    while (node) {
      // 前序处理位置
      path.push(node.val);
      rest -= node.val;

      // 成果判断位置
      if (!node.left && !node.right && rest === 0) {
        res.push([...path]);
      }

      stack.push(node);
      node = node.left;
    }

    const curr = stack[stack.length - 1];

    if (curr.right && prev !== curr.right) {
      // 栈顶节点没遍历过右子树，先去处理右子树
      node = curr.right;
    } else {
      // 后序处理位置，本质上是恢复回溯的状态
      stack.pop();
      path.pop();
      rest += curr.val;

      prev = curr;
    }
  }

  return res;
}

// @lc code=end

(() => {
  LCT.func(pathSum).auto({
    input: [Tree.deserialize]
  });
})();

// function pathSum(root: TreeNode | null, targetSum: number): number[][] {
//   const res: number[][] = [];
//   if (!root) return res;

//   function helper(node: TreeNode, path: number[], rest: number) {
//     //前序开始处理
//     path.push(node.val);
//     rest -= node.val;
//     // 成果判断位置
//     if (!node.left && !node.right && rest === 0) {
//       res.push([...path]);
//     }

//     node.left && helper(node.left, path, rest);
//     node.right && helper(node.right, path, rest);

//     // 后序开始处理，本质上是恢复回溯的状态
//     path.pop();
//   }

//   helper(root, [], targetSum);
//   return res;
// }
