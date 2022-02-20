/*
 * @lc app=leetcode.cn id=91 lang=typescript
 *
 * [91] 解码方法
 *
 * https://leetcode-cn.com/problems/decode-ways/description/
 *
 * algorithms
 * Medium (31.70%)
 * Likes:    1088
 * Dislikes: 0
 * Total Accepted:    189.6K
 * Total Submissions: 598.1K
 * Testcase Example:  '"12"'
 *
 * 一条包含字母 A-Z 的消息通过以下映射进行了 编码 ：
 *
 *
 * 'A' -> "1"
 * 'B' -> "2"
 * ...
 * 'Z' -> "26"
 *
 * 要 解码 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，"11106" 可以映射为：
 *
 *
 * "AAJF" ，将消息分组为 (1 1 10 6)
 * "KJF" ，将消息分组为 (11 10 6)
 *
 *
 * 注意，消息不能分组为  (1 11 06) ，因为 "06" 不能映射为 "F" ，这是由于 "6" 和 "06" 在映射中并不等价。
 *
 * 给你一个只含数字的 非空 字符串 s ，请计算并返回 解码 方法的 总数 。
 *
 * 题目数据保证答案肯定是一个 32 位 的整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "12"
 * 输出：2
 * 解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "226"
 * 输出：3
 * 解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "0"
 * 输出：0
 * 解释：没有字符映射到以 0 开头的数字。
 * 含有 0 的有效映射是 'J' -> "10" 和 'T'-> "20" 。
 * 由于没有字符，因此没有有效的方法对此进行解码，因为所有数字都需要映射。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s 只包含数字，并且可能包含前导零。
 *
 *
 */

// @lc code=start
function numDecodings(s: string): number {
  const len = s.length;

  const dp = Array(len + 1).fill(0);

  dp[0] = 1;
  dp[1] = s[0] === '0' ? 0 : 1;

  for (let i = 2; i <= len; i++) {
    const oneNum = Number(s.slice(i - 1, i));
    const oneTemp = oneNum > 0 ? dp[i - 1] : 0;

    const twoNum = Number(s.slice(i - 2, i));
    const twoTemp = twoNum >= 10 && twoNum <= 26 ? dp[i - 2] : 0;

    dp[i] = oneTemp + twoTemp;
  }

  return dp[len];
}
// @lc code=end

// 状态转移方程：
// dp[n] = (s[n] > 0 ? dp[n-1] : 0)
//          + (10 <= s[n-1]s[n] <= 26 ? dp[n-2] : 0)

(() => {
  const s = '226';
  console.log(numDecodings(s));
})();
