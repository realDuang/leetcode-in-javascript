/*
 * @lc app=leetcode id=4 lang=javascript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const left = Math.floor((len1 + len2 + 1) / 2);
  const right = Math.floor((len1 + len2 + 2) / 2);
  return (findMedian(nums1, 0, nums2, 0, left) + findMedian(nums1, 0, nums2, 0, right)) / 2;
};

function findMedian(nums1, i, nums2, j, K) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  if (i >= len1) return nums2[j + K - 1];
  if (j >= len2) return nums1[i + K - 1];
  if (K === 1) return Math.min(nums1[i], nums2[j]);

  const midK = Math.floor(K / 2);

  const mid1 = i + midK - 1 < len1 ? nums1[i + midK - 1] : Number.MAX_VALUE;
  const mid2 = j + midK - 1 < len2 ? nums2[j + midK - 1] : Number.MAX_VALUE;

  return mid1 < mid2
    ? findMedian(nums1, i + midK, nums2, j, K - midK)
    : findMedian(nums1, i, nums2, j + midK, K - midK);
}
// @lc code=end

console.log(findMedianSortedArrays([1, 4, 7, 21], [2, 6, 15, 16, 19, 27]));

// 这道题如果不算时间复杂度的话其实是一个非常简单的题目，有序数组合并后求中位数即可，但是时间限制在O(log(m+n))之内了，处理起来就比较麻烦了。
// 首先看这个log级的时间复杂度，很容易就想到用二分的思想处理。关键是对谁二分比较合适，这里其实需要对每次取得的中位数 K 二分
// 这里取中位数K有一个小技巧：对任意一个数x，无论x的奇偶性，中位数都为： ((x+1)/2 + (x+2)/2) / 2
// 之后来观察一下，我们需要在两个数组中找到第K/2个数，之后比较两数组大小。若arr1不存在第K/2个数，或arr1[K/2] < arr2[K/2]，那么不管arr1中的数字是多少，当前这两个数组混合后的中位数一定在arr2中不在arr1中(即使数组1的数字全部大于数组2)，因此我们能淘汰掉arr1的前K/2个数字(即起始位置后移K/2)。之后将 K - K/2，进入下一次递归。
// 然后来看下边界情况。
// 1. 如果一个数组的起始位置大于该数组长度，说明该数组全部数字都被淘汰了，那么现在就可以只在另一个数组中取中位数就得出答案了
// 2. 当K=1时，只需要比较两数组的起始位置即可。

// var findMedianSortedArrays = function(nums1, nums2) {
//   const len1 = nums1.length;
//   const len2 = nums2.length;
//   const left = Math.floor((len1 + len2 + 1) / 2);
//   const right = Math.floor((len1 + len2 + 2) / 2);
//   return (findMedian(nums1, nums2, left) + findMedian(nums1, nums2, right)) / 2;
// };

// function findMedian(nums1, nums2, K) {
//   const len1 = nums1.length;
//   const len2 = nums2.length;
//   if (len1 === 0) return nums2[K - 1];
//   if (len2 === 0) return nums1[K - 1];
//   if (K === 1) return Math.min(nums1[0], nums2[0]);

//   const midK = Math.floor(K / 2);
//   const mid1 = Math.min(len1, midK);
//   const mid2 = Math.min(len2, midK);
//   if (nums1[mid1 - 1] < nums2[mid2 - 1]) {
//     return findMedian(nums1.slice(mid1), nums2, K - mid1);
//   } else {
//     return findMedian(nums1, nums2.slice(mid2), K - mid2);
//   }
// }

// 更好地，我们可以用两个变量记录坐标，即原地算法来解，可以节省复制数组的时间与空间消耗。
