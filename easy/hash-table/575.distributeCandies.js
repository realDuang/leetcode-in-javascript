/*
 * @lc app=leetcode id=575 lang=javascript
 *
 * [575] Distribute Candies
 */

// @lc code=start
/**
 * @param {number[]} candies
 * @return {number}
 */
var distributeCandies = function(candies) {
  const kinds = new Set(candies).size;
  const num = candies.length / 2;
  return Math.min(kinds, num);
};
// @lc code=end

console.log(distributeCandies([1, 1, 2, 3]));
