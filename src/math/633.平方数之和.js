/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 *
 * https://leetcode-cn.com/problems/sum-of-square-numbers/description/
 *
 * algorithms
 * Easy (33.05%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 53.6K
 * Testcase Example:  '5'
 *
 * 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a^2 + b^2 = c。
 *
 * 示例1:
 *
 *
 * 输入: 5
 * 输出: True
 * 解释: 1 * 1 + 2 * 2 = 5
 *
 *
 *
 *
 * 示例2:
 *
 *
 * 输入: 3
 * 输出: False
 *
 *
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
