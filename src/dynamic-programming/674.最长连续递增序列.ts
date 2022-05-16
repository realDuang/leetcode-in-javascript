/*
 * @lc app=leetcode.cn id=674 lang=typescript
 *
 * [674] 最长连续递增序列
 *
 * https://leetcode.cn/problems/longest-continuous-increasing-subsequence/description/
 *
 * algorithms
 * Easy (52.49%)
 * Likes:    283
 * Dislikes: 0
 * Total Accepted:    127K
 * Total Submissions: 241.4K
 * Testcase Example:  '[1,3,5,4,7]'
 *
 * 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。
 *
 * 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l ，都有 nums[i] < nums[i + 1] ，那么子序列
 * [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,3,5,4,7]
 * 输出：3
 * 解释：最长连续递增序列是 [1,3,5], 长度为3。
 * 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2]
 * 输出：1
 * 解释：最长连续递增序列是 [2], 长度为1。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^9
 *
 *
 */

// @lc code=start
function findLengthOfLCIS(nums: number[]): number {
  if (nums.length <= 0) return 0;
  let res = 1;
  let temp = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      temp += 1;
      res = Math.max(res, temp);
    } else {
      temp = 1;
    }
  }
  return res;
}
// @lc code=end

// function findLengthOfLCIS(nums: number[]): number {
//   if(nums.length <= 0) return 0;
//   let res = 1;
//   const dp: number[] = Array(nums.length).fill(1);
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] > nums[i - 1]) {
//       dp[i] = dp[i - 1] + 1;
//       res = Math.max(res, dp[i]);
//     } else {
//       dp[i] = 1;
//     }
//   }
//   return res;
// }

(() => {
  const nums = [1, 3, 5, 4, 7];
  console.log(findLengthOfLCIS(nums));
})();
