/*
 * @lc app=leetcode.cn id=322 lang=typescript
 *
 * [322] 零钱兑换
 *
 * https://leetcode-cn.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (44.73%)
 * Likes:    1617
 * Dislikes: 0
 * Total Accepted:    338K
 * Total Submissions: 754.9K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
 *
 * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
 *
 * 你可以认为每种硬币的数量是无限的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：coins = [1, 2, 5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 *
 * 示例 2：
 *
 *
 * 输入：coins = [2], amount = 3
 * 输出：-1
 *
 * 示例 3：
 *
 *
 * 输入：coins = [1], amount = 0
 * 输出：0
 *
 *
 * 示例 4：
 *
 *
 * 输入：coins = [1], amount = 1
 * 输出：1
 *
 *
 * 示例 5：
 *
 *
 * 输入：coins = [1], amount = 2
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 0
 *
 *
 */

// @lc code=start
function coinChange(coins: number[], amount: number): number {
  const dp = Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;

  // Sn = MIN(S[n-coin] + 1)
  for (let i = 1; i <= amount; i++) {
    coins.forEach(coin => {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    });
  }
  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
// @lc code=end

(() => {
  const nums = [1];
  const amount = 1;
  console.log(coinChange(nums, amount));
})();
