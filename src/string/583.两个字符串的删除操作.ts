/*
 * @lc app=leetcode.cn id=583 lang=typescript
 *
 * [583] 两个字符串的删除操作
 *
 * https://leetcode-cn.com/problems/delete-operation-for-two-strings/description/
 *
 * algorithms
 * Medium (63.22%)
 * Likes:    370
 * Dislikes: 0
 * Total Accepted:    61.9K
 * Total Submissions: 97.9K
 * Testcase Example:  '"sea"\n"eat"'
 *
 * 给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数。
 *
 * 每步 可以删除任意一个字符串中的一个字符。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: word1 = "sea", word2 = "eat"
 * 输出: 2
 * 解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
 *
 *
 * 示例  2:
 *
 *
 * 输入：word1 = "leetcode", word2 = "etco"
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 1 <= word1.length, word2.length <= 500
 * word1 和 word2 只包含小写英文字母
 *
 *
 */

// @lc code=start
function minDistance(word1: string, word2: string): number {
  const len1 = word1.length;
  const len2 = word2.length;
  const dp = Array(len1 + 1)
    .fill(0)
    .map(x => Array(len2 + 1).fill(0));

  for (let j = 1; j <= len2; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= len1; i++) {
    dp[i][0] = i;
    for (let j = 1; j <= len2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  return dp[len1][len2];
}
// @lc code=end

(() => {
  const word1 = 'eat',
    word2 = 'eea';
  console.log(minDistance(word1, word2));
})();
