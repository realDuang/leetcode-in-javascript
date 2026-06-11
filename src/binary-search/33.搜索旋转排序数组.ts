/*
 * @lc app=leetcode.cn id=33 lang=typescript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (46.02%)
 * Likes:    3365
 * Dislikes: 0
 * Total Accepted:    1.3M
 * Total Submissions: 2.9M
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。
 *
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 向左旋转，使数组变为 [nums[k],
 * nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始
 * 计数）。例如， [0,1,2,4,5,6,7] 下标 3 上向左旋转后可能变为 [4,5,6,7,0,1,2] 。
 *
 * 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。
 *
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
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
 * 1 <= nums.length <= 5000
 * -10^4 <= nums[i] <= 10^4
 * nums 中的每个值都 独一无二
 * 题目数据保证 nums 在预先未知的某个下标上进行了旋转
 * -10^4 <= target <= 10^4
 *
 *
 */

// @lc code=start
function search(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  // 先二分找旋转点
  while (l < r) {
    const mid = (l + r) >> 1;

    if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  // 现在已经找到旋转点了
  const point = l;

  // 判断在旋转点左侧还是右侧，只需要 target 与第一个元素比较大小
  const isLeft = target < nums[0] ? false : true;

  if (point === 0) {
    l = 0;
    r = nums.length;
  } else if (isLeft) {
    l = 0;
    r = point;
  } else {
    l = point;
    r = nums.length;
  }

  while (l < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return nums[l] === target ? l : -1;
}
// @lc code=end

(() => {
  LCT.func(search).auto();
  LCT.func(search).cases([
    {
      input: [[1, 2, 3], 3],
      output: 2
    }
  ]);
})();
