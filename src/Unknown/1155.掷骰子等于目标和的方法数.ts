/*
 * @lc app=leetcode.cn id=1155 lang=typescript
 *
 * [1155] 掷骰子等于目标和的方法数
 *
 * https://leetcode.cn/problems/number-of-dice-rolls-with-target-sum/description/
 *
 * algorithms
 * Medium (63.82%)
 * Likes:    303
 * Dislikes: 0
 * Total Accepted:    49.5K
 * Total Submissions: 76.8K
 * Testcase Example:  '1\n6\n3'
 *
 * 这里有 n 个一样的骰子，每个骰子上都有 k 个面，分别标号为 1 到 k 。
 *
 * 给定三个整数 n、k 和 target，请返回投掷骰子的所有可能得到的结果（共有 k^n 种方式），使得骰子面朝上的数字总和等于 target。
 *
 * 由于答案可能很大，你需要对 10^9 + 7 取模。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 1, k = 6, target = 3
 * 输出：1
 * 解释：你掷了一个有 6 个面的骰子。
 * 得到总和为 3 的结果的方式只有一种。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 2, k = 6, target = 7
 * 输出：6
 * 解释：你掷了两个骰子，每个骰子有 6 个面。
 * 有 6 种方式得到总和为 7 的结果: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1。
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 30, k = 30, target = 500
 * 输出：222616187
 * 解释：返回的结果必须对 10^9 + 7 取模。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n, k <= 30
 * 1 <= target <= 1000
 *
 *
 */

// @lc code=start
const MOD = Math.pow(10, 9) + 7;
function numRollsToTarget(n: number, k: number, target: number): number {
  if (n * k < target) return 0;

  // 设 dp[i][j] 为在有 i 个骰子的情况下投出和为 j 的结果总数
  const dp = Array(n + 1)
    .fill(0)
    .map(x => Array(target + 1).fill(0));

  // 当只有一个骰子的时候，所能投出的点数方式都存在 1 种
  for (let l = 1; l <= Math.min(k, target); l++) {
    dp[1][l] = 1;
  }

  for (let i = 2; i <= n; i++) {
    for (let j = i; j <= target; j++) {
      for (let l = 1; l <= Math.min(k, j); l++) {
        // 设 l 为当前摇出的点数，需要与第 i - 1 个骰子摇出 sum = j - l 的情况相加
        dp[i][j] = (dp[i][j] + dp[i - 1][j - l]) % MOD;
      }
    }
  }
  // console.log(dp);

  return dp[n][target];
}
// @lc code=end

(() => {
  console.log(numRollsToTarget(1, 6, 3));
  console.log(numRollsToTarget(2, 6, 7));
})();
