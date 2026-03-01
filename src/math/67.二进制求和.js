/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (52.29%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    74.1K
 * Total Submissions: 141.7K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  if (i < j) a = '0'.repeat(j - i) + a;
  if (i > j) b = '0'.repeat(i - j) + b;

  let res = '';
  let cnt = 0;

  for (let k = Math.max(i, j); k >= 0; k--) {
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
