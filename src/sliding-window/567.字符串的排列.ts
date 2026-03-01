/*
 * @lc app=leetcode.cn id=567 lang=typescript
 *
 * [567] 字符串的排列
 *
 * https://leetcode-cn.com/problems/permutation-in-string/description/
 *
 * algorithms
 * Medium (43.43%)
 * Likes:    534
 * Dislikes: 0
 * Total Accepted:    143.8K
 * Total Submissions: 331.2K
 * Testcase Example:  '"ab"\n"eidbaooo"'
 *
 * 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
 *
 * 换句话说，s1 的排列之一是 s2 的 子串 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "ab" s2 = "eidbaooo"
 * 输出：true
 * 解释：s2 包含 s1 的排列之一 ("ba").
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1= "ab" s2 = "eidboaoo"
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s1.length, s2.length <= 10^4
 * s1 和 s2 仅包含小写字母
 *
 *
 */

// @lc code=start
function checkInclusion(s1: string, s2: string): boolean {
  const needs: Record<string, number> = {};
  for (let i = 0; i < s1.length; i++) {
    const ch = s1[i];
    needs[ch] = needs[ch] ? needs[ch] + 1 : 1;
  }
  const needsCount = Object.keys(needs).length;

  let left = 0,
    right = 0;
  let validCount = 0;
  const window: Record<string, number> = {};

  while (right < s2.length) {
    const ch = s2[right];
    right += 1;

    if (needs[ch]) {
      window[ch] = window[ch] ? window[ch] + 1 : 1;
      if (window[ch] === needs[ch]) validCount += 1;
    }

    while (right - left === s1.length) {
      if (validCount === needsCount) return true;

      const dropCh = s2[left];
      left += 1;

      if (needs[dropCh]) {
        if (window[dropCh] === needs[dropCh]) validCount -= 1;
        window[dropCh] -= 1;
      }
    }
  }
  return false;
}
// @lc code=end

(() => {
  const s1 = 'ab',
    s2 = 'eidboaoo';
  console.log(checkInclusion(s1, s2));
})();
