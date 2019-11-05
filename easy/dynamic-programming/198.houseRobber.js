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
// var rob = function(nums) {
//   let dp = new Array(nums.length);
//   dp[0] = 0;
//   dp[1] = nums[0];
//   for (let i = 2; i <= nums.length; i++) {
//     dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1]);
//   }
//   return dp[nums.length];
// };

console.log(rob([2, 7, 9, 3, 1]));
