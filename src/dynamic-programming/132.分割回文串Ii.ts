/*
 * @lc app=leetcode.cn id=132 lang=typescript
 *
 * [132] 分割回文串 II
 *
 * https://leetcode.cn/problems/palindrome-partitioning-ii/description/
 *
 * algorithms
 * Hard (49.80%)
 * Likes:    813
 * Dislikes: 0
 * Total Accepted:    108.7K
 * Total Submissions: 213.3K
 * Testcase Example:  '"aab"'
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文串。
 *
 * 返回符合要求的 最少分割次数 。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aab"
 * 输出：1
 * 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a"
 * 输出：0
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "ab"
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 2000
 * s 仅由小写英文字母组成
 *
 *
 *
 *
 */

// @lc code=start
function minCut(s: string): number {
  let n = s.length;

  // 设 dp[i][j] 表示 s[i]~s[j] 是否为回文
  const isPalindrome = Array(n)
    .fill(0)
    .map(() => Array(n).fill(false));

  // 只有单个字符的是回文串
  for (let i = 0; i < n; i++) {
    isPalindrome[i][i] = true;
  }
  // 两个相邻字符相同的是回文串
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      isPalindrome[i][i + 1] = true;
    }
  }

  // 当子串长度大于 2 时
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      // 如果首尾字符相同，且中间部分为回文串
      if (s[i] === s[j] && isPalindrome[i + 1][j - 1] === true) {
        isPalindrome[i][j] = true;
      }
    }
  }
  console.log(isPalindrome);
  // 子串是否是回文串构造完成

  // 计算最小分割次数
  // 设 dp[i] 表示 s[0...i] 的最少分割次数
  const dp = Array(n).fill(Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < n; i++) {
    // 如果 s[0...i] 本身是回文串，则不需要分割
    if (isPalindrome[0][i]) {
      dp[i] = 0;
      continue;
    }

    // 遍历从 1～i 的所有分割点
    for (let j = 0; j < i; j++) {
      // 如果 s[j+1...i] 是回文串，则表示可以在 j 处分割一次
      // 然后判断在此处分割时是否会让总分割次数最小，若是则选取该分割点，
      if (isPalindrome[j + 1][i]) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }

  return dp[n - 1];
}
// @lc code=end

(() => {
  let s = 'aab';
  console.log(minCut(s));
})();
