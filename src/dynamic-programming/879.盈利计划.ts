/*
 * @lc app=leetcode.cn id=879 lang=typescript
 *
 * [879] 盈利计划
 *
 * https://leetcode-cn.com/problems/profitable-schemes/description/
 *
 * algorithms
 * Hard (55.19%)
 * Likes:    237
 * Dislikes: 0
 * Total Accepted:    23.2K
 * Total Submissions: 42.1K
 * Testcase Example:  '5\n3\n[2,2]\n[2,3]'
 *
 * 集团里有 n 名员工，他们可以完成各种各样的工作创造利润。
 *
 * 第 i 种工作会产生 profit[i] 的利润，它要求 group[i] 名成员共同参与。如果成员参与了其中一项工作，就不能参与另一项工作。
 *
 * 工作的任何至少产生 minProfit 利润的子集称为 盈利计划 。并且工作的成员总数最多为 n 。
 *
 * 有多少种计划可以选择？因为答案很大，所以 返回结果模 10^9 + 7 的值。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, minProfit = 3, group = [2,2], profit = [2,3]
 * 输出：2
 * 解释：至少产生 3 的利润，该集团可以完成工作 0 和工作 1 ，或仅完成工作 1 。
 * 总的来说，有两种计划。
 *
 * 示例 2：
 *
 *
 * 输入：n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
 * 输出：7
 * 解释：至少产生 5 的利润，只要完成其中一种工作就行，所以该集团可以完成任何工作。
 * 有 7 种可能的计划：(0)，(1)，(2)，(0,1)，(0,2)，(1,2)，以及 (0,1,2) 。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 1
 * 1
 * profit.length == group.length
 * 0
 *
 *
 */

// @lc code=start
function profitableSchemes(n: number, minProfit: number, group: number[], profit: number[]): number {
  const len = group.length;
  // 三种变量，当前工作，当前剩余员工数，剩余需要的最小利润
  const dp = Array(len + 1)
    .fill(0)
    .map(x =>
      Array(n + 1)
        .fill(0)
        .map(x => Array(minProfit + 1).fill(0))
    );
  // 基准情况，当工作数目与需要利润为 0 时，共有 1 种计划（就是摆烂。
  for (let j = 0; j <= n; j++) {
    dp[0][j][0] = 1;
  }

  const mod = Math.pow(10, 9) + 7;

  for (let i = 1; i <= len; i++) {
    const needs = group[i - 1];
    const earned = profit[i - 1];
    for (let j = 0; j <= n; j++) {
      for (let k = 0; k <= minProfit; k++) {
        dp[i][j][k] = dp[i - 1][j][k];
        if (j >= needs) {
          // 这里注意，k的定义为剩余需要的最小利润，如果剩余需要利润为负数也是满足条件的，因此 k = Math.max(0, k - earned)
          dp[i][j][k] += dp[i - 1][j - needs][Math.max(0, k - earned)];
        }
        // 取模一下
        dp[i][j][k] = dp[i][j][k] % mod;
      }
    }
  }

  return dp[len][n][minProfit];
}
// @lc code=end

(() => {
  const n = 5,
    minProfit = 3,
    group = [2, 2],
    profit = [2, 3];
  console.log(profitableSchemes(n, minProfit, group, profit));
})();
