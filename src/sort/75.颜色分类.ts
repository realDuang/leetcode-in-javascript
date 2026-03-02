/*
 * @lc app=leetcode.cn id=75 lang=typescript
 *
 * [75] 颜色分类
 *
 * https://leetcode.cn/problems/sort-colors/description/
 *
 * algorithms
 * Medium (63.52%)
 * Likes:    2048
 * Dislikes: 0
 * Total Accepted:    919.8K
 * Total Submissions: 1.4M
 * Testcase Example:  '[2,0,2,1,1,0]'
 *
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 *
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 *
 *
 *
 *
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,0,1]
 * 输出：[0,1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == nums.length
 * 1 <= n <= 300
 * nums[i] 为 0、1 或 2
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  function helper(left: number, right: number) {
    let i = left;
    let j = right;

    while (i <= right && nums[i] === 0) i++;
    while (j >= left && nums[j] === 2) j--;
    if (i >= j) return;

    // 遍历 [i, j] 未处理区，维护不变量：
    // 使得有 [left, i-1] 全是 0， [i, p-1] 全是 1， [j+1, right] 全是 2
    // 注意！ p 必须从 i 开始，否则可能漏处理 i 位置（尤其 i 上是 2 的情况）
    let p = i;
    while (p <= j) {
      // 如果是0的话，直接跟左边位置的交换，2跟右边交换
      if (nums[p] === 0) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        i++;
        // 重点！此时 p只可能是1（或 p===i 时是 0）（因为p的左侧不会有2被换过来），因此可以p++
        p++;
      } else if (nums[p] === 2) {
        [nums[j], nums[p]] = [nums[p], nums[j]];
        j--;
      } else {
        p++;
      }
    }
  }

  helper(0, nums.length - 1);
}
// @lc code=end

(() => {
  LCT.inPlace(sortColors).auto();
})();
