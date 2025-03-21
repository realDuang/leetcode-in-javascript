/*
 * @lc app=leetcode.cn id=357 lang=typescript
 *
 * [357] 统计各位数字都不同的数字个数
 *
 * https://leetcode.cn/problems/count-numbers-with-unique-digits/description/
 *
 * algorithms
 * Medium (60.77%)
 * Likes:    359
 * Dislikes: 0
 * Total Accepted:    77.7K
 * Total Submissions: 127.7K
 * Testcase Example:  '2'
 *
 * 给你一个整数 n ，统计并返回各位数字都不同的数字 x 的个数，其中 0 <= x < 10^n^ 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2
 * 输出：91
 * 解释：答案应为除去 11、22、33、44、55、66、77、88、99 外，在 0 ≤ x < 100 范围内的所有数字。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 0
 * 输出：1
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= n <= 8
 *
 *
 */

// @lc code=start
function countNumbersWithUniqueDigits(n: number): number {
  // 问题转换成，对于每一个 n-1 位数，后面再加一位组成 n 位数，有几种组合情况
  const dp = Array(11).fill(0);
  dp[0] = 1;

  // 如果高于 10 位数，必定有数字重复，不需要计算了
  for (let i = 1; i <= n && i <= 10; i++) {
    // 组成的 i 位数中，第一位可以有1-9 9 种选择
    dp[i] = 9;
    // 剩余可选的数字个数,如第二位可选 9 个，第三位 8 个
    let chosen = 9;
    while (chosen > 10 - i) {
      dp[i] *= chosen;
      chosen -= 1;
    }
    // 此时 dp[i] 为组成各位数字都不同的 i 位数
    // 最后加上 i-1 位数的 不同数字的个数 dp[i-1]
    dp[i] += dp[i - 1];
  }

  // console.log(dp);
  return n > 10 ? dp[10] : dp[n];
}
// @lc code=end

(() => {
  console.log(countNumbersWithUniqueDigits(11));
})();
