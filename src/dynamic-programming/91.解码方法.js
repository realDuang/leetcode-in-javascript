/*
 * @lc app=leetcode.cn id=91 lang=javascript
 *
 * [91] 解码方法
 *
 * https://leetcode-cn.com/problems/decode-ways/description/
 *
 * algorithms
 * Medium (21.72%)
 * Likes:    193
 * Dislikes: 0
 * Total Accepted:    16K
 * Total Submissions: 73.5K
 * Testcase Example:  '"12"'
 *
 * 一条包含字母 A-Z 的消息通过以下方式进行了编码：
 *
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 *
 *
 * 给定一个只包含数字的非空字符串，请计算解码方法的总数。
 *
 * 示例 1:
 *
 * 输入: "12"
 * 输出: 2
 * 解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
 *
 *
 * 示例 2:
 *
 * 输入: "226"
 * 输出: 3
 * 解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (!s || s.length <= 0) return 0;
  const dp = new Array(s.length + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] === '0' ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    const single = Number(s.slice(i - 1, i));
    const double = Number(s.slice(i - 2, i));
    if (single >= 1 && single <= 9) {
      dp[i] += dp[i - 1];
    }
    if (double >= 10 && double <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[s.length];
};
// @lc code=end

// 状态转移方程： dp[n] = (1<=single<=9: dp[n - 1]) + (10<=double<=26: dp[n - 2])
// 动态规划问题，从后往前倒退，若最后一个数字为1-9，那么它的情况与dp[n-1]的情况一样多，排列为每种情况在最后面加上最后一个数字即可，同理，若最后两个数字为10-26，它的情况与dp[n-2]一样多，最后的结果即为两者相加的和。
console.log(numDecodings('10'));
