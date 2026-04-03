/*
 * @lc app=leetcode.cn id=438 lang=typescript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (54.64%)
 * Likes:    1910
 * Dislikes: 0
 * Total Accepted:    982.5K
 * Total Submissions: 1.8M
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
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
  const res = [];
  const needs: Record<string, number> = {};
  for (const ch of p) needs[ch] = (needs[ch] || 0) + 1;
  const needsCount = Object.keys(needs).length;

  const window: Record<string, number> = {};
  let l = 0,
    r = 0;
  let validCount = 0;

  while (r < s.length) {
    const ch = s[r];
    r++;

    if (needs[ch]) {
      window[ch] = (window[ch] || 0) + 1;
      if (window[ch] === needs[ch]) validCount++;
    }

    while (r - l === p.length) {
      if (validCount === needsCount) res.push(l);

      const dropCh = s[l];
      l++;

      if (needs[dropCh]) {
        if (window[dropCh] === needs[dropCh]) validCount--;
        window[dropCh]--;
      }
    }
  }

  return res;
}
// @lc code=end

(() => {
  LCT.func(findAnagrams).auto();
})();
