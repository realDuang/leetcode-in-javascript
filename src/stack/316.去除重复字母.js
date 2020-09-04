/*
 * @lc app=leetcode.cn id=316 lang=javascript
 *
 * [316] 去除重复字母
 *
 * https://leetcode-cn.com/problems/remove-duplicate-letters/description/
 *
 * algorithms
 * Hard (40.33%)
 * Likes:    207
 * Dislikes: 0
 * Total Accepted:    18.6K
 * Total Submissions: 45.5K
 * Testcase Example:  '"bcabc"'
 *
 *
 * 给你一个仅包含小写字母的字符串，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 *
 *
 *
 * 示例 1:
 *
 * 输入: "bcabc"
 * 输出: "abc"
 *
 *
 * 示例 2:
 *
 * 输入: "cbacdcbc"
 * 输出: "acdb"
 *
 *
 *
 * 注意：该题与 1081
 * https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters
 * 相同
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  const stack = [];
  // 用于去重的 hashMap
  const hasChMap = {};

  // 每个字母出现次数计数器
  const chCountMap = {};

  for (let ch of s) {
    if (!chCountMap[ch]) {
      chCountMap[ch] = 0;
    }
    chCountMap[ch]++;
    hasChMap[ch] = false;
  }

  for (let ch of s) {
    // 该字母剩余出现次数-1
    chCountMap[ch]--;

    if (!hasChMap[ch]) {
      // 比较与栈顶字母的字典序，直到栈顶字母序比当前字母小为止
      while (stack.length > 0 && stack[stack.length - 1] > ch) {
        // 如果该栈顶字母之后没有出现次数了，则停止出栈操作
        if (chCountMap[stack[stack.length - 1]] === 0) break;
        const popCh = stack.pop();
        hasChMap[popCh] = false;
      }
      hasChMap[ch] = true;
      stack.push(ch);
    }
  }
  return stack.join('');
};
// @lc code=end

console.log(removeDuplicateLetters('cbacdcbc'));
