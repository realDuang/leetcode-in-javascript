/*
 * @lc app=leetcode id=136 lang=javascript
 *
 * [136] Single Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  const hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (hash[nums[i]] === undefined) {
      hash[nums[i]] = nums[i];
    } else {
      Reflect.deleteProperty(hash, nums[i]);
    }
  }
  return hash[Reflect.ownKeys(hash)[0]];
};
// @lc code=end

console.log(singleNumber([2, 2, 5, 1, 4, 3, 2, 2, 3, 5, 4]));
