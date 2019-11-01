/*
 * @lc app=leetcode id=633 lang=javascript
 *
 * [633] Sum of Square Numbers
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  let lp = 0;
  let rp = Math.floor(Math.sqrt(c));
  while (lp <= rp) {
    const res = lp * lp + rp * rp;
    if (res === c) {
      return true;
    } else if (res > c) {
      rp--;
    } else {
      lp++;
    }
  }
  return false;
};
// @lc code=end

console.log(judgeSquareSum(2));
