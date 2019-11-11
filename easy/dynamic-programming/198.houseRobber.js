/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let dp = 0;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    const temp = res;
    res = Math.max(res, dp + nums[i]);
    dp = temp;
  }
  return res;
};

// @lc code=end

// 状态转移方程：dp[n] = max(dp[n-2] + nums[n], dp[n-1])
// 最简单经典的动态规划题之一。当前最优选择只有两种可能：
// 1. 要么拿当前这户的钱，获利为当前这户所取得的钱与上两家获取的获利相加
// 2. 要么不拿当前这户的钱，获利等于在上一户所取得的获利

// 原版动态规划如下：
// var rob = function(nums) {
//   let dp = new Array(nums.length);
//   dp[0] = 0;
//   dp[1] = nums[0];
//   for (let i = 2; i <= nums.length; i++) {
//     dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
//   }
//   return dp[nums.length];
// };
// 由于dp[n]的值只取决于dp[n-1]与dp[n-2]，因此我们只需要不断更新这两个变量，从而节省空间复杂度。

console.log(rob([2, 7, 9, 3, 1]));
