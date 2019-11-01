/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let dp = nums[0];
  let sum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(dp + nums[i], nums[i]);
    sum = Math.max(sum, dp);
  }
  return sum;
};
// @lc code=end

// 原始动态规划解法，由于本题不需要回溯子序列索引，因此不需要记录每一步的最大值

// var maxSubArray = function(nums) {
//   const dp = new Array(nums.length).fill(Number.MIN_SAFE_INTEGER);
//   dp[0] = nums[0];
//   let sum = nums[0];
//   for (let i = 1; i < nums.length; i++) {
//     let temp1 = dp[i - 1] + nums[i];
//     let temp2 = nums[i];
//     dp[i] = Math.max(temp1, temp2);
//     sum = Math.max(sum, dp[i]);
//   }
//   return sum;
// };

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
