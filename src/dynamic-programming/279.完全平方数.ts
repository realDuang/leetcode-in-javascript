/*
 * @lc app=leetcode.cn id=279 lang=typescript
 *
 * [279] 完全平方数
 *
 * https://leetcode-cn.com/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (64.41%)
 * Likes:    1305
 * Dislikes: 0
 * Total Accepted:    261.6K
 * Total Submissions: 406.1K
 * Testcase Example:  '12'
 *
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。
 *
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11
 * 不是。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 *
 * 示例 2：
 *
 *
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^4
 *
 *
 */

// @lc code=start
function numSquares(n: number): number {
  const maxFactor = Math.floor(Math.pow(n, 0.5));
  const maxNum = Number.MAX_SAFE_INTEGER;

  const dp = Array(n + 1).fill(maxNum);
  dp[0] = 0;

  for (let i = 1; i <= maxFactor; i++) {
    const square = Math.pow(i, 2);
    for (let j = 1; j <= n; j++) {
      if (j >= square) {
        dp[j] = Math.min(dp[j], dp[j - square] + 1);
      }
    }
  }

  return dp[n];
}
// @lc code=end

(() => {
  // function numSquares(n: number): number {
  //   const maxFactor = Math.floor(Math.pow(n, 0.5));
  //   const maxNum = Number.MAX_SAFE_INTEGER;

  //   const dp = Array(maxFactor + 1)
  //     .fill(0)
  //     .map(x => Array(n + 1).fill(maxNum));

  //   for (let i = 1; i <= maxFactor; i++) {
  //     dp[i][0] = 0;
  //     const square = Math.pow(i, 2);

  //     for (let j = 1; j <= n; j++) {
  //       dp[i][j] = dp[i - 1][j];
  //       if (j >= square) {
  //         dp[i][j] = Math.min(dp[i][j], dp[i][j - square] + 1);
  //       }
  //     }
  //   }

  //   return dp[maxFactor][n];
  // }
  const n = 13;
  console.log(numSquares(n));
})();
