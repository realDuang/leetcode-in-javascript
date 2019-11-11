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
      if (word.length <= i) {
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

console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat', ]));

// 状态转移方程：dp[n] = dp[n - word.length] && 子序列 == word
// 一道动态规划问题，我们可以从后往前倒推。
// 对于词典中的每一个词word，想办法找出dp[n]与dp[n-word.length]的关系。
// 1. 若n-word.length<0，则一定是无解的
// 2. 若截取子序列能在字典中被找到，并且dp[n-word.length]有解，则该子序列有解，解为：dp[n-word.length]的解加上当前子序列
