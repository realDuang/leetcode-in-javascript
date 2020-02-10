/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  let cur = m + n - 1;
  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[cur] = nums1[p1];
      p1--;
    } else {
      nums1[cur] = nums2[p2];
      p2--;
    }
    cur--;
  }
  while (p2 >= 0) {
    nums1[cur] = nums2[p2];
    p2--;
    cur--;
  }
};
// @lc code=end

// 原地算法，一般用双指针法比较多，从后往前插入排序
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
