/*
 * @lc app=leetcode.cn id=33 lang=typescript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (43.08%)
 * Likes:    1777
 * Dislikes: 0
 * Total Accepted:    424.1K
 * Total Submissions: 984.4K
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。
 *
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 ）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ...,
 * nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如，
 * [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
 *
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [4,5,6,7,0,1,2], target = 3
 * 输出：-1
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1], target = 0
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^4
 * nums 中的每个值都 独一无二
 * 题目数据保证 nums 在预先未知的某个下标上进行了旋转
 * -10^4
 *
 *
 *
 *
 * 进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？
 *
 */

// @lc code=start
function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length,
    start = 0;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      // 说明此时找到了旋转位置，位置为 mid + 1
      start = mid + 1;
      break;
    } else {
      // 通过二分缩小查询范围
      if (nums[mid] > nums[left]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  }

  if (target === nums[0]) {
    // 如果target恰好等于第一个，则直接返回0索引
    return 0;
  } else if (target > nums[0] && start !== 0) {
    // 当target大于最左侧元素，此时target在左半边序列中查询。
    // 注意，当start=0时，此时没有左半边序列，只能从右半边序列中查询
    left = 0;
    right = start - 1;
  } else {
    // target在右半边序列中查询
    left = start;
    right = nums.length - 1;
  }

  // 正常二分查找
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
  return -1;
}
// @lc code=end

(() => {
  const nums = [1, 3, 5],
    target = 5;
  // const nums = [4, 5, 6, 7, 0, 1, 2],
  //   target = 0;
  console.log(search(nums, target));
})();
