/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 *
 * https://leetcode-cn.com/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (34.59%)
 * Likes:    117
 * Dislikes: 0
 * Total Accepted:    23.5K
 * Total Submissions: 66.8K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。
 *
 * 换句话说，第一个字符串的排列之一是第二个字符串的子串。
 *
 * 示例1:
 *
 *
 * 输入: s1 = "ab" s2 = "eidbaooo"
 * 输出: True
 * 解释: s2 包含 s1 的排列之一 ("ba").
 *
 *
 *
 *
 * 示例2:
 *
 *
 * 输入: s1= "ab" s2 = "eidboaoo"
 * 输出: False
 *
 *
 *
 *
 * 注意：
 *
 *
 * 输入的字符串只包含小写字母
 * 两个字符串的长度都在 [1, 10,000] 之间
 *
 *
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  const map = {};
  for (let i = 0; i < s1.length; i++) {
    const ch = s1[i];
    map[ch] = map[ch] || 0;
    map[ch]++;
  }
  const mapLength = Object.keys(map).length;

  const window = {};
  let valid = 0;

  let left = 0;
  let right = 0;
  while (right < s2.length) {
    const ch = s2[right];
    right++;
    if (map[ch] && map[ch] > 0) {
      window[ch] = window[ch] || 0;
      window[ch]++;
      if (window[ch] === map[ch]) valid++;
    }

    while (right - left === s1.length) {
      if (valid === mapLength) return true;

      const dropCh = s2[left];
      left++;
      if (map[dropCh] && map[dropCh] > 0) {
        if (window[dropCh] === map[dropCh]) valid--;
        window[dropCh]--;
      }
    }
  }
  return false;
};
// @lc code=end

console.log(checkInclusion('ooab', 'eidbaooo'));
