/*
 * @lc app=leetcode.cn id=902 lang=typescript
 *
 * [902] 最大为 N 的数字组合
 *
 * https://leetcode.cn/problems/numbers-at-most-n-given-digit-set/description/
 *
 * algorithms
 * Hard (47.77%)
 * Likes:    283
 * Dislikes: 0
 * Total Accepted:    33.3K
 * Total Submissions: 69.4K
 * Testcase Example:  '["1","3","5","7"]\n100'
 *
 * 给定一个按 非递减顺序 排列的数字数组 digits 。你可以用任意次数 digits[i] 来写的数字。例如，如果 digits =
 * ['1','3','5']，我们可以写数字，如 '13', '551', 和 '1351315'。
 *
 * 返回 可以生成的小于或等于给定整数 n 的正整数的个数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：digits = ["1","3","5","7"], n = 100
 * 输出：20
 * 解释：
 * 可写出的 20 个数字是：
 * 1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75,
 * 77.
 *
 *
 * 示例 2：
 *
 *
 * 输入：digits = ["1","4","9"], n = 1000000000
 * 输出：29523
 * 解释：
 * 我们可以写 3 个一位数字，9 个两位数字，27 个三位数字，
 * 81 个四位数字，243 个五位数字，729 个六位数字，
 * 2187 个七位数字，6561 个八位数字和 19683 个九位数字。
 * 总共，可以使用D中的数字写出 29523 个整数。
 *
 * 示例 3:
 *
 *
 * 输入：digits = ["7"], n = 8
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 1 <= digits.length <= 9
 * digits[i].length == 1
 * digits[i] 是从 '1' 到 '9' 的数
 * digits 中的所有值都 不同
 * digits 按 非递减顺序 排列
 * 1 <= n <= 10^9
 *
 *
 */

// @lc code=start
function atMostNGivenDigitSet(digits: string[], n: number): number {
  const strN = n.toString();
  const nlen = strN.length;

  // 设 dp[i] 为长度为 i 时的数字组合数
  const dp = new Array(nlen + 1).fill(0);
  dp[nlen] = 1;

  // 对于长度等于 len(n) 的数字个数
  for (let i = nlen - 1; i >= 0; i--) {
    const temp = strN[i];

    for (const d of digits) {
      if (d < temp) {
        // 当前位的数字小于 n 对应位，则可以生成所有剩余位数可能的组合
        dp[i] += Math.pow(digits.length, nlen - i - 1);
      } else if (d === temp) {
        // 如果当前位的数字等于 n 的对应位，则需要对下一位递归
        // 与下一位所有可能的组合数量相同
        dp[i] += dp[i + 1];
      }
      // 如果当前位的数字大于 n 的对应位，全部不合法，丢弃
    }
  }

  // 对于长度小于 len(n) 的数字个数，直接取所有可能组合
  // 计算可重复的组合个数，为一位数两位数三位数...所有组合的和，即为 1+ i^2 + i^3 + ... + i^(n-1)
  for (let i = 1; i < nlen; i++) {
    dp[0] += Math.pow(digits.length, i);
  }

  // 长度等于 len(n) 的数字个数, 个数为 dp[0]
  return dp[0];
}
// @lc code=end

(() => {
  console.log(atMostNGivenDigitSet(['1', '3', '5', '7'], 100)); // 20
  console.log(atMostNGivenDigitSet(['1', '4', '9'], 1000000000)); // 29523
  console.log(atMostNGivenDigitSet(['7'], 8)); // 1
})();
