/*
 * @lc app=leetcode id=169 lang=javascript
 *
 * [169] Majority Element
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
