/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (33.89%)
 * Likes:    1802
 * Dislikes: 0
 * Total Accepted:    319.5K
 * Total Submissions: 940.3K
 * Testcase Example:  '123'
 *
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * 示例 1:
 *
 * 输入: 123
 * 输出: 321
 *
 *
 * 示例 2:
 *
 * 输入: -123
 * 输出: -321
 *
 *
 * 示例 3:
 *
 * 输入: 120
 * 输出: 21
 *
 *
 * 注意:
 *
 * 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回
 * 0。
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = Math.pow(-2, 31);
  let res = Math.abs(x).toString().split('').reverse();

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
