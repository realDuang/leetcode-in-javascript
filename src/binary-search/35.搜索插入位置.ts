/*
 * @lc app=leetcode.cn id=35 lang=typescript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (46.00%)
 * Likes:    1216
 * Dislikes: 0
 * Total Accepted:    585.3K
 * Total Submissions: 1.3M
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,3,5,6], target = 5
 * 输出: 2
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [1,3,5,6], target = 2
 * 输出: 1
 *
 *
 * 示例 3:
 *
 *
 * 输入: nums = [1,3,5,6], target = 7
 * 输出: 4
 *
 *
 * 示例 4:
 *
 *
 * 输入: nums = [1,3,5,6], target = 0
 * 输出: 0
 *
 *
 * 示例 5:
 *
 *
 * 输入: nums = [1], target = 0
 * 输出: 0
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * -10^4
 * nums 为无重复元素的升序排列数组
 * -10^4
 *
 *
 */

// @lc code=start
function searchInsert(nums: number[], target: number): number {
  const len = nums.length;
  let left = 0;
  let right = len - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return left;
}
// @lc code=end

(() => {
  const nums = [1, 3, 5, 6];
  const target = 6;
  console.log(searchInsert(nums, target));
})();
