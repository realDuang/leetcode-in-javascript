/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
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

console.log(coinChange([2, 5, 7], 11));
