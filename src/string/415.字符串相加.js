/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 *
 * https://leetcode-cn.com/problems/add-strings/description/
 *
 * algorithms
 * Easy (47.59%)
 * Likes:    144
 * Dislikes: 0
 * Total Accepted:    27K
 * Total Submissions: 54.4K
 * Testcase Example:  '"0"\n"0"'
 *
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 *
 * 注意：
 *
 *
 * num1 和num2 的长度都小于 5100.
 * num1 和num2 都只包含数字 0-9.
 * num1 和num2 都不包含任何前导零。
 * 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。
 *
 *
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  if (i < j) num1 = '0'.repeat(j - i) + num1;
  if (i > j) num2 = '0'.repeat(i - j) + num2;

  let res = '';
  let cnt = 0;

  for (let k = Math.max(i, j); k >= 0; k--) {
    const temp = Number(num1[k]) + Number(num2[k]) + cnt;
    cnt = temp > 9 ? 1 : 0;
    res = (temp % 10) + res;
  }
  if (cnt === 1) res = '1' + res;
  return res;
};
// @lc code=end

console.log(addStrings('12345', '87654321'));

// 这道题也是简单级别的题，解题思路参考 67.addBinary
