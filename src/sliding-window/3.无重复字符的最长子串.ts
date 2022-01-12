/*
 * @lc app=leetcode.cn id=3 lang=typescript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (38.27%)
 * Likes:    6733
 * Dislikes: 0
 * Total Accepted:    1.4M
 * Total Submissions: 3.7M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
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
 * 示例 4:
 *
 *
 * 输入: s = ""
 * 输出: 0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
function lengthOfLongestSubstring(s: string): number {
  const window: Record<string, number> = {};
  let res = 0;

  let left = 0;
  let right = 0;
  while (right < s.length) {
    // 扩大右边界
    const ch = s[right];
    right++;

    // 更新滑动窗口元素
    window[ch] = window[ch] ? window[ch] + 1 : 1;

    // 当滑动窗口中该字符个数大于1，此时字串不合法，需要缩小左边界直到使该字符唯一
    while (window[ch] > 1) {
      // 缩左边界
      const dropCh = s[left];
      left++;

      // 更新滑动窗口元素
      window[dropCh] -= 1;
    }

    // 更新合法情况的结果
    res = Math.max(res, right - left);
  }
  return res;
}
// @lc code=end

(() => {
  console.log(lengthOfLongestSubstring('pwwkew'));
})();
