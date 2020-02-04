/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  if (n <= 0) return 0;
  // 四平方和定理提高算法效率，不知道该定理可以不加这两行
  while (n % 4 === 0) n /= 4;
  if (n % 8 === 7) return 4;

  const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n];
};
// @lc code=end

// 四平方和定理：任何正整数都能表示为4个整数的平方和。
// 状态转移方程：dp[i] = min(dp[i], dp[i - j * j] + 1)
// 动态规划问题，可以从后往前倒推，本数字i的最小平方和组成个数为: i减去一个比该数小的平方数j^2后的数所需要的最小平方和组成个数+1(这个1指代的就是j)的所有情况的最小值
console.log(numSquares(3));
