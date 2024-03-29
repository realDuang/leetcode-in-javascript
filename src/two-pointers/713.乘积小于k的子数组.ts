/*
 * @lc app=leetcode.cn id=713 lang=typescript
 *
 * [713] 乘积小于K的子数组
 *
 * https://leetcode-cn.com/problems/subarray-product-less-than-k/description/
 *
 * algorithms
 * Medium (43.30%)
 * Likes:    343
 * Dislikes: 0
 * Total Accepted:    33.7K
 * Total Submissions: 77.7K
 * Testcase Example:  '[10,5,2,6]\n100'
 *
 * 给定一个正整数数组 nums和整数 k 。
 *
 * 请找出该数组内乘积小于 k 的连续的子数组的个数。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [10,5,2,6], k = 100
 * 输出: 8
 * 解释: 8个乘积小于100的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
 * 需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1,2,3], k = 0
 * 输出: 0
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * 1
 * 0
 *
 *
 */

// @lc code=start
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;

  let res = 0;
  const len = nums.length;

  let temp = 1;

  let left = 0;
  let right = 0;
  while (right < len) {
    temp *= nums[right];

    while (temp >= k) {
      temp /= nums[left];
      left += 1;
    }
    res += right - left + 1;
    right += 1;
  }

  return res;
}
// @lc code=end

(() => {
  const nums = [10, 5, 2, 6],
    k = 100;
  console.log(numSubarrayProductLessThanK(nums, k));
})();
