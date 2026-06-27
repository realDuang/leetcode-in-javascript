/*
 * @lc app=leetcode.cn id=139 lang=typescript
 * @lcpr version=30403
 *
 * [139] 单词拆分
 */

// @lc code=start
function wordBreak(s: string, wordDict: string[]): boolean {
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i < s.length + 1; i++) {
    for (const word of wordDict) {
      const wordLen = word.length;
      if (i < wordLen) continue;
      const postix = s.substring(i - wordLen, i);
      if (postix === word && dp[i - wordLen]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
// @lc code=end

(() => {
  LCT.func(wordBreak).cases([
    {
      input: ['leetcode', ['leet', 'code']],
      output: true
    },
    {
      input: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']],
      output: false
    }
  ]);
})();

/*
// @lcpr case=start
// "leetcode"\n["leet","code"]\n
// @lcpr case=end

// @lcpr case=start
// "applepenapple"\n["apple","pen"]\n
// @lcpr case=end

// @lcpr case=start
// "catsandog"\n["cats","dog","sand","and","cat"]\n
// @lcpr case=end

 */
