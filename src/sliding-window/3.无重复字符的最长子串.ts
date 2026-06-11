/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (42.28%)
 * Likes:    11404
 * Dislikes: 0
 * Total Accepted:    4.1M
 * Total Submissions: 9.8M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。注意 "bca" 和 "cab" 也是正确答案。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 5 * 10^4
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  const map: Record<string, number> = {};

  let l = 0;
  let r = 0;
  let res = 0;

  while (r < s.length) {
    const ch = s[r];
    map[ch] = map[ch] ? map[ch] + 1 : 1;
    r++;

    while (map[ch] > 1) {
      const dropCh = s[l];
      map[dropCh] -= 1;
      l++;
    }
    res = Math.max(res, r - l);
  }
  return res;
}
// @lc code=end

(() => {
  LCT.func(lengthOfLongestSubstring).auto();
})();
