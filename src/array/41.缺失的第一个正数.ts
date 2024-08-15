/*
 * @lc app=leetcode.cn id=41 lang=typescript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode.cn/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (45.16%)
 * Likes:    2174
 * Dislikes: 0
 * Total Accepted:    420.8K
 * Total Submissions: 931K
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0]
 * 输出：3
 * 解释：范围 [1,2] 中的数字都在数组中。
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 解释：1 在数组中，但 2 没有。
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 * 解释：最小的正数 1 没有出现。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -2^31 <= nums[i] <= 2^31 - 1
 *
 *
 */

// @lc code=start
function firstMissingPositive(nums: number[]): number {
  const len = nums.length;
  // 目的是将所有 nums[i] < nums.length 的所有元素排在 nums[i] - 1 的位置
  for (let i = 0; i < len; i++) {
    while (nums[i] > 0 && nums[i] < len && nums[nums[i] - 1] !== nums[i]) {
      swap(i, nums[i] - 1);
    }
  }

  // 排列后前 n 个整数一定是连续有序的[1,2,3, ... n, ...], n 为最小没出现的正整数的值
  // 找到 n, 即第一个 nums[index] !== index+1 的数，即为最小没出现的正整数
  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  return len + 1;

  function swap(i: number, j: number) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}
// @lc code=end

(() => {
  const nums = [-3, 1, 2, 6, 3, 9, -1, 2];
  console.log(firstMissingPositive(nums));
})();
