/*
 * @lc app=leetcode id=96 lang=javascript
 *
 * [96] Unique Binary Search Trees
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  if (n === 0 || n === 1) return 1;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};
// @lc code=end

// 这道题请与Unique Binary Search Trees II配合食用，这道题需要求对按数字顺序1~n组成的树进行先序遍历,求所有可能的个数。那么我们可以建立一个一维数组dp，考虑当每个数字为根节点时，所有可行的方法个数。
// 这实际上是求卡特兰数，不知道的同学可自行百度。根节点的组成个数为左右子树的组成个数相乘。
// 对于每一个节点i，考虑所有左右子树分配节点个数可能的组成情况，设左子树节点个数为j，那么右子树节点个数为i-1-j,将左右子树的组成个数相乘，将所有情况相加，即可得到dp[i]的值。
// 状态转移方程为dp[i] = dp[i-1] * dp[n-i]。
// 确定边界情况，n=0时，只有可能是空树；n=1时，也只有一种可能。
console.log(numTrees(3));
