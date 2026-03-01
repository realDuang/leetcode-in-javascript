/*
 * @lc app=leetcode.cn id=300 lang=typescript
 *
 * [300] 最长递增子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (52.07%)
 * Likes:    2094
 * Dislikes: 0
 * Total Accepted:    400.6K
 * Total Submissions: 768.1K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 *
 * 子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7]
 * 的子序列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,9,2,5,3,7,101,18]
 * 输出：4
 * 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1,0,3,2,3]
 * 输出：4
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,7,7,7,7,7,7]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^4
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你可以设计时间复杂度为 O(n^2) 的解决方案吗？
 * 你能将算法的时间复杂度降低到 O(n log(n)) 吗?
 *
 *
 */

// @lc code=start
function lengthOfLIS(nums: number[]): number {
  // 维护一个最小递增子序列
  const lis: number[] = [];
  // Sn = (Sn-1, An)为递增子序列 ? Sn-1 + 1 : Sn-1
  for (let i = 0; i < nums.length; i++) {
    let left = 0;
    let right = lis.length - 1;
    // 求左边界的二分法
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < nums[i]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (left >= lis.length) {
      // 边界越界，说明此时子 LIS 中不存在比 nums[i] 大的数，LIS 数组增加一位
      lis.push(nums[i]);
    } else {
      // 否则更新该 LIS 位置上的数字
      lis[left] = nums[i];
    }
  }
  return lis.length;
}
// @lc code=end

(() => {
  // function lengthOfLIS(nums: number[]): number {
  //   const len = nums.length;
  //   const dp = Array(len).fill(1);
  //   let max = 1;
  //   // Sn = (Sn-1, An)为递增子序列 ? Sn-1 + 1 : Sn-1
  //   for (let i = 1; i < len; i++) {
  //     for (let j = 0; j < i; j++) {
  //       // 此时可以凑出递增子序列
  //       if (nums[i] > nums[j]) {
  //         // 选出 以nums[i]结尾的 最大递增子序列长度
  //         dp[i] = Math.max(dp[i], dp[j] + 1);
  //       }
  //     }
  //     max = Math.max(max, dp[i]);
  //   }
  //   return max;
  // }
  const nums = [1, 3, 6, 7, 9, 4, 10, 5, 6];
  console.log(lengthOfLIS(nums));
})();
