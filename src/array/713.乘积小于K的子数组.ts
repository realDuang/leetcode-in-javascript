/*
 * @lc app=leetcode.cn id=713 lang=typescript
 *
 * [713] 乘积小于 K 的子数组
 *
 * https://leetcode.cn/problems/subarray-product-less-than-k/description/
 *
 * algorithms
 * Medium (51.38%)
 * Likes:    829
 * Dislikes: 0
 * Total Accepted:    133.9K
 * Total Submissions: 257.4K
 * Testcase Example:  '[10,5,2,6]\n100'
 *
 * 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,5,2,6], k = 100
 * 输出：8
 * 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2]、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
 * 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3], k = 0
 * 输出：0
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 3 * 10^4
 * 1 <= nums[i] <= 1000
 * 0 <= k <= 10^6
 *
 *
 */

// @lc code=start
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // 正整数乘积不可能小于等于 1
  if (k <= 1) return 0;

  let res = 0;
  let l = 0;
  let r = 0;
  let multi = 1;

  while (l <= r && r < nums.length) {
    const num = nums[r];
    multi *= num;
    while (multi >= k) {
      multi /= nums[l];
      l++;
    }

    // 每次右指针移动到新位置，合法场景会增加：
    // [nums[r]] | [nums[r-1], nums[r]] | ... | [nums[l]] ... [nums[r]]
    // 共 r - l + 1 种
    res += r - l + 1;
    r++;
  }

  return res;
}
// @lc code=end

(() => {
  const nums = [10, 5, 2, 6],
    k = 100;
  console.log(numSubarrayProductLessThanK(nums, k));
})();
