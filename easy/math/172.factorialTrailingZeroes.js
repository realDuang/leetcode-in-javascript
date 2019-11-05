/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
  let res = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    res += n;
  }
  return res;
};
// @lc code=end

// 由于题目要求在O(lgn)的时间下解决，因此无法用O(n)的暴力求解完成。
// 分析后得出，个位数只有2*5能够得出末尾0，有多少对2和5就有多少个0，而任何数因数分解5的个数永远小于2的个数，
// 因此题目转化为：求解目标数字因数分解后共含有多少个5。
// f(n) = n/5 + n/5^2 + n/5^3 + n/5^4 + n/5^5 + ... + 余数
console.log(trailingZeroes(20));
