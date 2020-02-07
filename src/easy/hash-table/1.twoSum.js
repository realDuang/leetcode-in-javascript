/*
 * @lc app=leetcode id=1 lang=javascript
 *
 * [1] Two Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const hashObj = {};
  for (let i = 0; i < nums.length; i++) {
    const another = hashObj[target - nums[i]];
    if (another !== undefined) {
      return [another, i];
    }
    hashObj[nums[i]] = i;
  }
  return [];
};
// @lc code=end

console.log(twoSum([7, 7, 11, 15], 14));
