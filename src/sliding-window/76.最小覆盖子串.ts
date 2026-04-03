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
  let l = 0;
  let r = 0;
  let start = 0;
  let minLen = Infinity;
  let validCount = 0;

  const window: Record<string, number> = {};

  const needs: Record<string, number> = {};
  for (let ch of t) {
    needs[ch] = (needs[ch] ?? 0) + 1;
  }
  const target = Object.keys(needs).length;

  while (r < s.length) {
    // 向右扩大窗口，将元素加入窗口
    const ch = s[r];
    r++;

    if (needs[ch]) {
      window[ch] = (window[ch] ?? 0) + 1;
      // 计算匹配个数，方便查询是否达成目标
      if (window[ch] === needs[ch]) validCount++;
    }

    while (validCount === target) {
      // 处在合法区间，更新最终目标，更新要在收缩之前
      if (r - l < minLen) {
        minLen = r - l;
        start = l;
      }

      // 之后逐步缩小窗口，踢出窗口外元素
      const dropCh = s[l];
      l++;

      if (needs[dropCh]) {
        // 注意顺序，先判断丢弃的字符在窗口中的数量是否满足要求，再进行丢弃
        if (window[dropCh] === needs[dropCh]) validCount--;
        window[dropCh]--;
      }
    }
  }

  return minLen === Infinity ? '' : s.substring(start, start + minLen);
}
// @lc code=end

(() => {
  LCT.func(minWindow).auto();
})();
