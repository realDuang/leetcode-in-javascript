/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
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
