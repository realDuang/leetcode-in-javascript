/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 *
 * https://leetcode-cn.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (38.69%)
 * Likes:    526
 * Dislikes: 0
 * Total Accepted:    71.4K
 * Total Submissions: 183.9K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给定不同面额的硬币 coins 和一个总金额
 * amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 *
 * 示例 1:
 *
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3
 * 解释: 11 = 5 + 5 + 1
 *
 * 示例 2:
 *
 * 输入: coins = [2], amount = 3
 * 输出: -1
 *
 * 说明:
 * 你可以认为每种硬币的数量是无限的。
 *
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// 状态转移方程：对每一种硬币coin：dp[i] = min(dp[i], dp[i - coin] + 1)
var coinChange = function(coins, amount) {
  const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;

  for (let j = 1; j <= amount; j++) {
    for (let i = 0; i < coins.length; i++) {
      if (j >= coins[i]) {
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
      }
    }
  }
  return dp[amount] < Number.MAX_SAFE_INTEGER ? dp[amount] : -1;
};
// @lc code=end

// 经典的DP背包问题，设立二维数组，行i为硬币的种类，j为背包容量(在本题即为amount)，不过跟普通背包问题不同的是，本题的每一个硬币都有任意个。
// 状态转移方程：dp[i, j] = min(dp[i - 1, j], dp[i, j - coins[i]]) + 1

// var coinChange = function(coins, amount) {
//   // 初始化dp二维数组与第一行、第一列的值
//   const dp = new Array(coins.length).fill(0).map(x => new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER));
//   for (let i = 0; i < dp.length; i++) {
//     dp[i][0] = 0;
//   }
//   for (let i = 0; i < dp[0].length; i++) {
//     dp[0][i] = i % coins[0] === 0 ? Math.floor(i / coins[0]) : Number.MAX_SAFE_INTEGER;
//   }

//   for (let j = 1; j <= amount; j++) {
//     for (let i = 1; i < coins.length; i++) {
//       if (j >= coins[i]) {
//         dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - coins[i]] + 1);
//       } else {
//         dp[i][j] = dp[i - 1][j];
//       }
//     }
//   }
//   return dp[coins.length - 1][amount] < Number.MAX_SAFE_INTEGER ? dp[coins.length - 1][amount] : -1;
// };

// 我们也可以用一维表代替二维表，从而节省空间复杂度。
// 状态转移方程：对每一种硬币coin：dp[i] = min(dp[i], dp[i - coin] + 1)

// 贪心回溯解法
// let res = Number.MAX_SAFE_INTEGER;
// var coinChange = function(coins, amount) {
//   if (amount === 0) return 0;
//   // 从大到小排序
//   coins.sort((a, b) => b - a);

//   dfs(coins, 0, amount, 0);
//   return res < Number.MAX_SAFE_INTEGER ? res : -1;
// };

// function dfs(coins, index, amount, count) {
//   if (index >= coins.length) return;

//   // 当剩余值为0,说明找到了一组最优解
//   if (amount === 0) {
//     res = Math.min(count, res);
//     return;
//   }

//   for (let i = Math.floor(amount / coins[index]); i >= 0; i--) {
//     const newCount = count + i;
//     const rest = amount - i * coins[index];

//     // 当前硬币数已经超过最优解了，剪枝
//     if (newCount >= res) break;

//     dfs(coins, index + 1, rest, newCount);
//   }
// }
var coinChange = function(coins, amount) {
  // 初始化dp二维数组与第一行、第一列的值
  const dp = new Array(coins.length).fill(0).map(x => new Array(amount + 1).fill(amount + 1));
  // amount=0时，硬币个数总为0
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = 0;
  }
  for (let i = 0; i < dp[0].length; i++) {
    if (i % coins[0] === 0) dp[0][i] = Math.floor(i / coins[0]);
  }

  for (let j = 1; j <= amount; j++) {
    for (let i = 1; i < coins.length; i++) {
      if (j >= coins[i]) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - coins[i]] + 1);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  console.log(dp);
  return dp[coins.length - 1][amount] < amount + 1 ? dp[coins.length - 1][amount] : -1;
};

console.log(coinChange([7, 1, 10], 14));
// console.log(coinChange([6, 4, 10], 18));
