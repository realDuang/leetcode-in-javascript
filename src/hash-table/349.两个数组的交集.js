/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 *
 * https://leetcode-cn.com/problems/intersection-of-two-arrays/description/
 *
 * algorithms
 * Easy (68.51%)
 * Likes:    170
 * Dislikes: 0
 * Total Accepted:    59.7K
 * Total Submissions: 86.8K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组，编写一个函数来计算它们的交集。
 *
 * 示例 1:
 *
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出: [2]
 *
 *
 * 示例 2:
 *
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出: [9,4]
 *
 * 说明:
 *
 *
 * 输出结果中的每个元素一定是唯一的。
 * 我们可以不考虑输出结果的顺序。
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
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
