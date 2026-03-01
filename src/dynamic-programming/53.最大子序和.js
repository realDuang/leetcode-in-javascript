/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 *
 * https://leetcode-cn.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (49.88%)
 * Likes:    1797
 * Dislikes: 0
 * Total Accepted:    197.7K
 * Total Submissions: 394.8K
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 *
 * 示例:
 *
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 *
 *
 * 进阶:
 *
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = nums[0];
  let sum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(dp + nums[i], nums[i]);
    sum = Math.max(sum, dp);
  }
  return sum;
};
// @lc code=end

// 状态转移方程：dp[i] = max(dp[i-1] + nums[i], nums[i])

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

// 观察dp数组可知，dp[i]仅与dp[i-1]相关，因此完全可以用一个变量替代dp数组，从而节省空间复杂度。（下面的解顺便求了最大子序列）

// var maxSubArray = function(nums) {
//   let dp = nums[0];
//   let res = nums[0];
//   let tempArr = [nums[0]];
//   let resArr = [nums[0]];
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] < dp + nums[i]) {
//       dp = nums[i] + dp;
//       tempArr.push(nums[i]);
//     } else {
//       dp = nums[i];
//       tempArr = [nums[i]];
//     }
//     if (res < dp) {
//       res = dp;
//       resArr = [...tempArr];
//     }
//   }
//   console.log(resArr);
//   return res;
// };

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
