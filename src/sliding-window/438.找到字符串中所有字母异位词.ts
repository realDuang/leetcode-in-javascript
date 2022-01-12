/*
 * @lc app=leetcode.cn id=438 lang=typescript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (53.76%)
 * Likes:    754
 * Dislikes: 0
 * Total Accepted:    136.8K
 * Total Submissions: 254.4K
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 *
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "abab", p = "ab"
 * 输出: [0,1,2]
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length, p.length <= 3 * 10^4
 * s 和 p 仅包含小写字母
 *
 *
 */

// @lc code=start
function findAnagrams(s: string, p: string): number[] {
  const res: number[] = [];

  const needs: Record<string, number> = {};
  for (let i = 0; i < p.length; i++) {
    const ch = p[i];
    needs[ch] = needs[ch] ? needs[ch] + 1 : 1;
  }
  const needsCount = Object.keys(needs).length;

  let left = 0,
    right = 0;
  let validCount = 0;
  const window: Record<string, number> = {};

  while (right < s.length) {
    const ch = s[right];
    right += 1;

    if (needs[ch]) {
      window[ch] = window[ch] ? window[ch] + 1 : 1;
      if (window[ch] === needs[ch]) validCount += 1;
    }

    while (right - left === p.length) {
      if (validCount === needsCount) res.push(left);

      const dropCh = s[left];
      left++;

      if (needs[dropCh]) {
        if (window[dropCh] === needs[dropCh]) validCount -= 1;
        window[dropCh] -= 1;
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  const s = 'abab',
    p = 'ba';
  console.log(findAnagrams(s, p));
})();
