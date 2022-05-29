/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 *
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (41.37%)
 * Likes:    5436
 * Dislikes: 0
 * Total Accepted:    709K
 * Total Submissions: 1.7M
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 *
 * 算法的时间复杂度应该为 O(log (m+n)) 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -10^6 <= nums1[i], nums2[i] <= 10^6
 *
 *
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // 一次归并排序合并两个有序数组
  const len1 = nums1.length;
  const len2 = nums2.length;
  const arr = [];
  let temp = 0;
  let l = 0;
  let r = 0;
  while (l < len1 || r < len2) {
    if (l === len1) {
      arr[temp] = nums2[r];
      r += 1;
    } else if (r === len2) {
      arr[temp] = nums1[l];
      l += 1;
    } else if (nums1[l] < nums2[r]) {
      arr[temp] = nums1[l];
      l += 1;
    } else {
      arr[temp] = nums2[r];
      r += 1;
    }
    temp += 1;
  }

  // 求有序数组的中位数
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}
// @lc code=end

(() => {
  const nums1 = [1, 2, 6],
    nums2 = [3, 4, 4];
  console.log(findMedianSortedArrays(nums1, nums2));
})();
