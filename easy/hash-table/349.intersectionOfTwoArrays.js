/*
 * @lc app=leetcode id=349 lang=javascript
 *
 * [349] Intersection of Two Arrays
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const set2 = new Set(nums2);
  return Array.from(new Set(nums1.filter(ele => set2.has(ele))));
};
// @lc code=end
// 利用Set的特性可以很轻松的实现数组的交集、并集、补集。

// 并集
// var union = function(nums1, nums2) {
//   return Array.from(new Set([...nums1, ...nums2]));
// };

// 补集
// var complement = function(nums1, nums2) {
//   const set2 = new Set(nums2);
//   return Array.from(new Set(nums1.filter(ele => !set2.has(ele))));
// };

console.log(intersection([4, 4, 9, 5], [9, 4, 9, 8, 4]));
// console.log(union([4, 4, 9, 5], [9, 4, 9, 8, 4]));
// console.log(complement([4, 4, 9, 5], [9, 4, 9, 8, 4]));
