/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 *
 * https://leetcode-cn.com/problems/majority-element/description/
 *
 * algorithms
 * Easy (62.76%)
 * Likes:    546
 * Dislikes: 0
 * Total Accepted:    152.7K
 * Total Submissions: 242.9K
 * Testcase Example:  '[3,2,3]'
 *
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 *
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 *
 *
 * 示例 1:
 *
 * 输入: [3,2,3]
 * 输出: 3
 *
 * 示例 2:
 *
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let res = nums[0];
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      res = nums[i];
      count++;
    } else {
      res === nums[i] ? count++ : count--;
    }
  }
  return res;
};
// @lc code=end

// Moore Voting 摩尔投票算法求众数，时间O(n)，空间O(1)
// 设定一个候选者，每出现相同的元素计数器+1否则-1。当计数器为0时，说明当前元素与候选者出现次数相同，更换候选者为当前元素。
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
