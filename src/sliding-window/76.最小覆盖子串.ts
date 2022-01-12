/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode-cn.com/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (42.95%)
 * Likes:    1517
 * Dislikes: 0
 * Total Accepted:    212.8K
 * Total Submissions: 494.2K
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 * 。
 *
 *
 *
 * 注意：
 *
 *
 * 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a", t = "a"
 * 输出："a"
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 和 t 由英文字母组成
 *
 *
 *
 * 进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
 */

// @lc code=start
function minWindow(s: string, t: string): string {
  const initRes = s + ' ';
  let res = initRes;

  const needs: Record<string, number> = {};
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    needs[ch] = needs[ch] ? needs[ch] + 1 : 1;
  }
  const needsLength = Object.keys(needs).length;

  const window: Record<string, number> = {};
  let left = 0;
  let right = 0;
  let validCount = 0;
  while (right < s.length) {
    // 扩右边界
    const ch = s[right];
    right++;

    if (needs[ch]) {
      // 更新滑动窗口元素内容以及合法指标判断
      window[ch] = window[ch] ? window[ch] + 1 : 1;
      if (window[ch] === needs[ch]) {
        validCount += 1;
      }
    }

    while (validCount === needsLength) {
      // 若当前滑动窗口中字串长度小于res，则更新res字串
      if (right - left < res.length) {
        res = s.substring(left, right);
      }

      // 缩左边界
      const dropCh = s[left];
      left++;

      // 更新滑动窗口元素内容以及合法指标判断
      if (needs[dropCh] && needs[dropCh] > 0) {
        if (window[dropCh] === needs[ch]) validCount -= 1;
        window[dropCh] -= 1;
      }
    }
  }

  return res === initRes ? '' : res;
}
// @lc code=end

(() => {
  const s = 'ADOBECODEBANC',
    t = 'ABC';
  console.log(minWindow(s, t));
})();
