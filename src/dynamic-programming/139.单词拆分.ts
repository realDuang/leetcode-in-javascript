/*
 * @lc app=leetcode.cn id=139 lang=typescript
 *
 * [139] 单词拆分
 *
 * https://leetcode-cn.com/problems/word-break/description/
 *
 * algorithms
 * Medium (52.31%)
 * Likes:    1404
 * Dislikes: 0
 * Total Accepted:    241.7K
 * Total Submissions: 461.9K
 * Testcase Example:  '"leetcode"\n["leet","code"]'
 *
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
 *
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 *
 *
 * 示例 2：
 *
 *
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 * 注意，你可以重复使用字典中的单词。
 *
 *
 * 示例 3：
 *
 *
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 300
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 20
 * s 和 wordDict[i] 仅有小写英文字母组成
 * wordDict 中的所有字符串 互不相同
 *
 *
 */

// @lc code=start
function wordBreak(s: string, wordDict: string[]): boolean {
  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= s.length; i++) {
    for (const word of wordDict) {
      // 剪枝
      if (i < word.length) continue;

      const tempWord = s.substring(i - word.length, i);
      if (tempWord === word && dp[i - word.length]) {
        dp[i] = 1;
        break;
      }
    }
  }

  return dp[s.length];
}
// @lc code=end

(() => {
  const s = 'catsandog',
    wordDict = ['cats', 'dog', 'sand', 'and', 'cat'];
  console.log(wordBreak(s, wordDict));
})();
