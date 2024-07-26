/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 *
 * https://leetcode.cn/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (38.50%)
 * Likes:    7275
 * Dislikes: 0
 * Total Accepted:    1.8M
 * Total Submissions: 4.5M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的 回文 子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 *
 *
 */

// @lc code=start
function longestPalindrome(s: string): string {
  const len = s.length;
  if (len === 0) return '';

  function palindrome(str: string, l: number, r: number) {
    while (l >= 0 && r < len && s[l] === s[r]) {
      l -= 1;
      r += 1;
    }
    return str.substring(l + 1, r);
  }

  let res = '';
  for (let i = 0; i < len; i++) {
    // 以 s[i]为中心的子串
    const s1 = palindrome(s, i, i);
    // 以 s[i] 和 s[i+1] 为中心的子串
    const s2 = palindrome(s, i, i + 1);

    res = s1.length > res.length ? s1 : res;
    res = s2.length > res.length ? s2 : res;
  }
  return res;
}
// @lc code=end

const s1 = 'babad',
  s2 = 'cbbd';
console.log(longestPalindrome(s1));
