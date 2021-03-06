/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 *
 * https://leetcode-cn.com/problems/word-break/description/
 *
 * algorithms
 * Medium (44.01%)
 * Likes:    375
 * Dislikes: 0
 * Total Accepted:    44.7K
 * Total Submissions: 101K
 * Testcase Example:  '"leetcode"\n["leet","code"]'
 *
 * 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
 * 
 * 说明：
 * 
 * 
 * 拆分时可以重复使用字典中的单词。
 * 你可以假设字典中没有重复的单词。
 * 
 * 
 * 示例 1：
 * 
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
 * 
 * 
 * 示例 2：
 * 
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
 * 注意你可以重复使用字典中的单词。
 * 
 * 
 * 示例 3：
 * 
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let word of wordDict) {
      if (i >= word.length) {
        const fragment = s.substring(i - word.length, i);
        if (fragment === word && dp[i - word.length]) {
          dp[i] = true;
        }
      }
    }
  }
  return dp[s.length];
};
// @lc code=end

console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat', 'an']));

// 一道动态规划问题，我们可以从后往前倒推。建立dp数组，dp[i]表示s.substring(i)子串是否能被字典完全匹配。对于字典中的每一个词word，想办法找出dp[i]与dp[i-word.length]的关系。
// 1. 若i < word.length，则一定是无解的
// 2. 若截取子序列尾部能匹配字典中的单词，并且dp[n-word.length]有解，则该子序列有解，解为：dp[n-word.length]的解加上当前匹配单词
// 特殊的，当s为空时，任何情况下都匹配，即dp[0]=true
// 状态转移方程：dp[i] = dp[i - word.length] && s.substring(i - word.length, i) === word