/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 *
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/description/
 *
 * algorithms
 * Medium (41.95%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    23.8K
 * Total Submissions: 55.4K
 * Testcase Example:  '"cbaebabacd"\n"abc"'
 *
 * 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 *
 * 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。
 *
 * 说明：
 *
 *
 * 字母异位词指字母相同，但排列不同的字符串。
 * 不考虑答案输出的顺序。
 *
 *
 * 示例 1:
 *
 *
 * 输入:
 * s: "cbaebabacd" p: "abc"
 *
 * 输出:
 * [0, 6]
 *
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 *
 *
 * 示例 2:
 *
 *
 * 输入:
 * s: "abab" p: "ab"
 *
 * 输出:
 * [0, 1, 2]
 *
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const map = {};
  for (let i = 0; i < p.length; i++) {
    map[p[i]] = map[p[i]] || 0;
    map[p[i]]++;
  }
  const mapLength = Object.keys(map).length;

  const res = [];
  const window = {};
  let valid = 0;

  let left = 0;
  let right = 0;
  while (right < s.length) {
    const ch = s[right];
    right++;
    if (map[ch] && map[ch] > 0) {
      window[ch] = window[ch] || 0;
      window[ch]++;
      if (window[ch] === map[ch]) valid++;
    }

    while (right - left >= p.length) {
      if (valid === mapLength) {
        res.push(left);
      }

      const dropCh = s[left];
      left++;
      if (map[dropCh] && map[dropCh] > 0) {
        if (window[dropCh] === map[dropCh]) valid--;
        window[dropCh]--;
      }
    }
  }
  return res;
};
// @lc code=end

console.log(findAnagrams('cbaebabacd', 'abc'));
