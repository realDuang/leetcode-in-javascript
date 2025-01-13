/*
 * @lc app=leetcode.cn id=643 lang=typescript
 *
 * [643] 子数组最大平均数 I
 *
 * https://leetcode.cn/problems/maximum-average-subarray-i/description/
 *
 * algorithms
 * Easy (43.62%)
 * Likes:    367
 * Dislikes: 0
 * Total Accepted:    165.3K
 * Total Submissions: 379K
 * Testcase Example:  '[1,12,-5,-6,50,3]\n4'
 *
 * 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。
 *
 * 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。
 *
 * 任何误差小于 10^-5 的答案都将被视为正确答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,12,-5,-6,50,3], k = 4
 * 输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5], k = 1
 * 输出：5.00000
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= k <= n <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
function findMaxAverage(nums: number[], k: number): number {
  let l = 0;
  let r = k - 1;
  let res = Number.MIN_SAFE_INTEGER;

  // 前 n-1 项和
  let sum = nums.slice(l, r).reduce((a, b) => a + b, 0);

  while (r < nums.length) {
    // 扩大右窗口
    sum += nums[r];
    res = Math.max(res, sum / k);
    // 缩小左窗口
    sum -= nums[l];

    l++;
    r++;
  }

  return res;
}
// @lc code=end

(() => {
  const nums = [1, 12, -5, -6, 50, 3],
    k = 4;
  console.log(findMaxAverage(nums, k));
})();
