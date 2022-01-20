/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode-cn.com/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (47.87%)
 * Likes:    902
 * Dislikes: 0
 * Total Accepted:    241.7K
 * Total Submissions: 504.9K
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 *
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr]
 * ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 *
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  let res: number = nums.length + 1;
  let left = 0;
  let right = 0;

  let sum = 0;
  while (right < nums.length) {
    sum += nums[right];
    right += 1;

    while (sum >= target) {
      res = Math.min(res, right - left);
      sum -= nums[left];
      left++;
    }
  }

  // 不存在时返回0
  return res === nums.length + 1 ? 0 : res;
}
// @lc code=end

(() => {
  const nums = [2, 3, 1, 2, 4, 3];
  const target = 7;
  console.log(minSubArrayLen(target, nums));
})();
