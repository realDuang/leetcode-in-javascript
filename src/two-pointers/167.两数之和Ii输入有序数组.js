/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 *
 * https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/
 *
 * algorithms
 * Easy (53.06%)
 * Likes:    272
 * Dislikes: 0
 * Total Accepted:    80.7K
 * Total Submissions: 151.6K
 * Testcase Example:  '[2,7,11,15]\n9'
 *
 * 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
 *
 * 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
 *
 * 说明:
 *
 *
 * 返回的下标值（index1 和 index2）不是从零开始的。
 * 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
 *
 *
 * 示例:
 *
 * 输入: numbers = [2, 7, 11, 15], target = 9
 * 输出: [1,2]
 * 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 *
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  const size = numbers.length;
  let lp = 0;
  let rp = size - 1;
  while (lp < rp) {
    if (numbers[lp] + numbers[rp] === target) {
      return [lp + 1, rp + 1];
    } else if (numbers[lp] + numbers[rp] < target) {
      lp++;
    } else {
      rp--;
    }
  }
  return [];
};
// @lc code=end

// 由于数组已经排好序，因此利用头尾指针能在O(n)的时间内解决该题，比结果大前移大数指针位置，比结果小后移小数指针位置
console.log(twoSum([2, 7, 11, 15], 9));
