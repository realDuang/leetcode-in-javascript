/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (48.89%)
 * Likes:    355
 * Dislikes: 0
 * Total Accepted:    47.7K
 * Total Submissions: 97.5K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 * 注意:
 *
 *
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 *
 *
 * 示例 1:
 *
 * 输入: [1, 5, 11, 5]
 *
 * 输出: true
 *
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 *
 *
 *
 *
 * 示例 2:
 *
 * 输入: [1, 2, 3, 5]
 *
 * 输出: false
 *
 * 解释: 数组不能分割成两个元素和相等的子集.
 *
 *
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((prev, x) => prev + x);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const n = nums.length;

  const dp = Array(target + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = target + 1; j > 0; j--) {
      if (j - nums[i - 1] >= 0) {
        // 若取当前物品，判断当前物品i是否正好能装满背包剩余容量 j - nums[i - 1]
        dp[j] = dp[j] || dp[j - nums[i - 1]];
      }
    }
  }
  return dp[target] === 1;
};
// @lc code=end

console.log(canPartition([2, 3, 1, 8]));

// var canPartition = function(nums) {
//   const sum = nums.reduce((prev, x) => prev + x);
//   if (sum % 2 !== 0) return false;

//   const target = sum / 2;
//   const n = nums.length;
//   // dp[i][j] 表示，对于前i个物品，是否能将容量为j的背包恰好装满
//   const dp = Array(n + 1)
//     .fill(0)
//     .map(x => Array(target + 1).fill(0));

//   // 当背包容量为0时，任何情况都能满足要求(不装)
//   for (let i = 0; i <= n; i++) {
//     dp[i][0] = 1;
//   }

//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j <= target; j++) {
//       if (j - nums[i - 1] < 0) {
//         // 当前物品容量超过了背包总容量，则不能取当前物品，与选前i-1个物品的结果一致
//         dp[i][j] = dp[i - 1][j];
//       } else {
//         // 若取当前物品，判断当前物品i是否正好能装满背包剩余容量 j - nums[i - 1]
//         dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
//       }
//     }
//   }
//   return dp[n][target] === 1;
// };
