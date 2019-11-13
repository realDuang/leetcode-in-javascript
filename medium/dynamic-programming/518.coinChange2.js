/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change 2
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] += dp[i - coin];
    }
  }
  return dp[amount];
};
// @lc code=end

console.log(change(5, [2, 1, 5]));

// 状态转移方程：
// dp[i][j] = dp[i - 1][j] + (j > coins[i-1][j] ? dp[i][j-coin[i-1]]) : 0)

// 遍历一遍所有硬币种类，遍历次数+1相当于将自己可以选择的硬币种类增加一种。对于每次循环来说，共有取当前种类硬币和不取当前种类硬币两种情况。
// 1. 如果不取当前硬币，那么该硬币是否可以选择对结果没有影响，因此结果与上次遍历的结果相同。
// 2. 如果取当前硬币，那么当前的组成情况与 价值-当前硬币价值 的组成情况相同。
// 最后的组成情况总数即为两种情况之和。
// 计算时注意边界情况：若没有钱币种类可选(即coins.length = 0)，则没有方案可以选择。若amount=0，有且只有不取任何钱币一种情况。

// var change = function(amount, coins) {
//   // 初始化二维数组，并初始化第0行
//   const dp = new Array(coins.length + 1).fill(0).map(x => new Array(amount + 1).fill(0));
//   dp[0][0] = 1;

//   for (let i = 1; i <= coins.length; i++) {
//     dp[i][0] = 1;
//     for (let j = 1; j <= amount; j++) {
//       dp[i][j] = dp[i - 1][j];
//       if (j >= coins[i - 1]) {
//         dp[i][j] += dp[i][j - coins[i - 1]];
//       }
//     }
//   }
//   return dp[coins.length][amount];
// };

// 由于状态上述转移方程仅依赖i-1，因此可以转化为一维数组来解节省空间。
// 以测试数据为例，dp[i]表示当前amount下的所有硬币组成种类数，那么应当等于最后一个硬币为5、2、1的硬币种类组成数之和，即dp[i] = dp[i-5] + dp[i-2] + dp[i-1]。
// 由此可得出状态转移方程：对每一种硬币coin, dp[i] = SUM(dp[i-coin])

// 需要注意的时，转化成一维数组时，在循环时有可能会记入重复情况，如2+1和1+2会被算成两次。因此循环的顺序一定要注意一下。
