/*
 * @lc app=leetcode.cn id=718 lang=typescript
 *
 * [718] 最长重复子数组
 *
 * https://leetcode.cn/problems/maximum-length-of-repeated-subarray/description/
 *
 * algorithms
 * Medium (56.72%)
 * Likes:    704
 * Dislikes: 0
 * Total Accepted:    123.5K
 * Total Submissions: 217.5K
 * Testcase Example:  '[1,2,3,2,1]\n[3,2,1,4,7]'
 *
 * 给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
 * 输出：3
 * 解释：长度最长的公共子数组是 [3,2,1] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 100
 *
 *
 */

// @lc code=start
function findLength(nums1: number[], nums2: number[]): number {
  let res = 0;
  // 设 dp[i][j] 为: 以nums1[i-1]结尾的子数组与 nums2[j-1] 结尾的子数组 的最长公共子数组
  const dp: number[][] = Array(nums1.length + 1)
    .fill(0)
    .map(x => Array(nums2.length + 1).fill(0));

  for (let i = 1; i <= nums1.length; i++) {
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        res = Math.max(res, dp[i][j]);
      }
    }
  }
  return res;
}
// @lc code=end

(() => {
  const nums1 = [1, 2, 3, 2, 1],
    nums2 = [3, 2, 1, 4, 7];
  console.log(findLength(nums1, nums2));
})();
