/*
 * @lc app=leetcode id=67 lang=javascript
 *
 * [67] Add Binary
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  if (i < j) a = '0'.repeat(j - i) + a;
  if (i > j) b = '0'.repeat(i - j) + b;

  let res = '';
  let cnt = 0;

  for (k = Math.max(i, j); k >= 0; k--) {
    const temp = Number(a[k]) + Number(b[k]) + cnt;
    cnt = temp > 1 ? 1 : 0;
    res = (temp % 2) + res;
  }
  if (cnt === 1) res = '1' + res;
  return res;
};
// @lc code=end

console.log(addBinary('1010', '1011'));

// 简单题就不多做解析了。大概思想就是，先补齐两个二进制数，然后从后往前遍历相加，注意二进制进位问题即可。
