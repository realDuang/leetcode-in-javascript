/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = Math.pow(-2, 31);
  let res = Math.abs(x)
    .toString()
    .split('')
    .reverse();

  while (res[0] === '0') {
    res.shift();
  }

  if (x < 0) {
    res.unshift('-');
  }
  res = res.join('');
  if (res < INT_MIN || res > INT_MAX) {
    return 0;
  }
  return res;
};
// @lc code=end

console.log(reverse(120));
