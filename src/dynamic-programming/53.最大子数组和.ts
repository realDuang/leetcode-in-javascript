/*
 * @lc app=leetcode.cn id=53 lang=typescript
 *
 * [53] 最大子数组和
 *
 * https://leetcode-cn.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (55.31%)
 * Likes:    4093
 * Dislikes: 0
 * Total Accepted:    777.2K
 * Total Submissions: 1.4M
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 *
 * 子数组 是数组中的一个连续部分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 *
 *
 * 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
 *
 */

// @lc code=start
function maxSubArray(nums: number[]): number {
  // 设 dp[i] 为以 nums[i] 结尾的最大子数组和
  let dp = nums[0];
  let res = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(nums[i], dp + nums[i]);
    res = Math.max(res, dp);
  }

  return res;
}
// @lc code=end

// function maxSubArray(nums: number[]): number {
//   // 设 dp[i] 为以 nums[i] 结尾的最大子数组和
//   const dp: number[] = Array(nums.length).fill(Number.MIN_VALUE);
//   let res = nums[0];
//   for (let i = 0; i < nums.length; i++) {
//     // 当 dp[i - 1] 为负数时，直接不取
//     dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
//     // 获取从 0 ~ i 的最大子数组和的最大值
//     res = Math.max(res, dp[i]);
//   }
//   return res;
// }

(() => {
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  console.log(maxSubArray(nums));
})();

// function maxSubArray(nums: number[]): number {
//   const len = nums.length;
//   const dp = Array(len).fill(Number.MIN_SAFE_INTEGER);
//   dp[0] = nums[0];
//   let res = nums[0];

//   // 状态转移方程：Sn = Math.max(nums[n], Sn-1 + nums[n])
//   for (let i = 1; i < len; i++) {
//     dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
//     res = Math.max(res, dp[i]);
//   }

//   return res;
// }

// function maxSubArray(nums: number[]): number {
//   const len = nums.length;
//   const dp = Array(len).fill(Number.MIN_SAFE_INTEGER);
//   dp[0] = nums[0];

//   let arr: number[] = [nums[0]];
//   let resArr: number[] = [nums[0]];
//   let res = nums[0];

//   // 状态转移方程：Sn = Math.max(nums[n], Sn-1 + nums[n])
//   for (let i = 1; i < len; i++) {
//     if (dp[i - 1] < 0) {
//       dp[i] = nums[i];
//       arr = [nums[i]];
//     } else {
//       dp[i] = dp[i - 1] + nums[i];
//       arr.push(nums[i]);
//     }

//     if (dp[i] > res) {
//       // 此时更新子序列
//       res = dp[i];
//       resArr = [...arr];
//     }
//   }

//   console.log(resArr);
//   return res;
// }
