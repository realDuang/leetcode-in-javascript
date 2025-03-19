/*
 * @lc app=leetcode.cn id=152 lang=typescript
 *
 * [152] 乘积最大子数组
 *
 * https://leetcode.cn/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (42.07%)
 * Likes:    2397
 * Dislikes: 0
 * Total Accepted:    532K
 * Total Submissions: 1.2M
 * Testcase Example:  '[2,3,-2,4]'
 *
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续 子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 *
 * 测试用例的答案是一个 32-位 整数。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * -10 <= nums[i] <= 10
 * nums 的任何子数组的乘积都 保证 是一个 32-位 整数
 *
 *
 */

// @lc code=start
function maxProduct(nums: number[]): number {
  const len = nums.length;
  // 总的最大值
  let res = nums[0];

  // 设 dp 为 nums[0～i] 中且包含 nums[i] 的最大乘积 与最小乘积
  let dpMax = nums[0];
  let dpMin = nums[0];

  for (let i = 1; i < len; i++) {
    const num = nums[i];
    const res1 = dpMax * num;
    const res2 = dpMin * num;

    // 因为 num 可能为负数，由于负负得正，因此前面乘积最小值也可能成为新的最大值
    dpMax = Math.max(num, res1, res2);
    dpMin = Math.min(num, res1, res2);

    res = Math.max(dpMax, res);
  }

  return res;
}
// @lc code=end

(() => {
  console.log(maxProduct([2, 3, -2, 4]));
  console.log(maxProduct([-2, 0, -1]));
  console.log(maxProduct([-2, 3, -4]));
})();
