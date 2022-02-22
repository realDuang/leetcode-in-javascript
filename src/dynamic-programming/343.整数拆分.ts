/*
 * @lc app=leetcode.cn id=343 lang=typescript
 *
 * [343] 整数拆分
 *
 * https://leetcode-cn.com/problems/integer-break/description/
 *
 * algorithms
 * Medium (61.32%)
 * Likes:    712
 * Dislikes: 0
 * Total Accepted:    135.1K
 * Total Submissions: 220.4K
 * Testcase Example:  '2'
 *
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
 *
 * 返回 你可以获得的最大乘积 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = 2
 * 输出: 1
 * 解释: 2 = 1 + 1, 1 × 1 = 1。
 *
 * 示例 2:
 *
 *
 * 输入: n = 10
 * 输出: 36
 * 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
 *
 *
 *
 * 提示:
 *
 *
 * 2 <= n <= 58
 *
 *
 */

// @lc code=start
function integerBreak(n: number): number {
  if (n < 4) return n - 1;

  const dp = Array(n + 1).fill(1);
  // 默认处理好基础情况
  // dp[1] = 1;
  // dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(2 * (i - 2), 2 * dp[i - 2], 3 * (i - 3), 3 * dp[i - 3]);
  }
  return dp[n];
}
// @lc code=end

(() => {
  const n = 10;
  console.log(integerBreak(n));
})();
