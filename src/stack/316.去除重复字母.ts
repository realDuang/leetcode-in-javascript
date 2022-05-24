/*
 * @lc app=leetcode.cn id=316 lang=typescript
 *
 * [316] 去除重复字母
 *
 * https://leetcode.cn/problems/remove-duplicate-letters/description/
 *
 * algorithms
 * Medium (47.88%)
 * Likes:    743
 * Dislikes: 0
 * Total Accepted:    88.6K
 * Total Submissions: 185K
 * Testcase Example:  '"bcabc"'
 *
 * 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "bcabc"
 * 输出："abc"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbacdcbc"
 * 输出："acdb"
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^4
 * s 由小写英文字母组成
 *
 *
 *
 *
 * 注意：该题与 1081
 * https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters
 * 相同
 *
 */

// @lc code=start
function removeDuplicateLetters(s: string): string {
  // 遍历字符串，统计每个字母的出现次数
  const countMap: Record<string, number> = {};
  for (const ch of s) {
    countMap[ch] = countMap[ch] ? countMap[ch] + 1 : 1;
  }
  const stack: string[] = [];
  const stackMap: Record<string, boolean> = {};
  for (const ch of s) {
    // 每遍历过一个字符，当前字符的count数-1
    countMap[ch] -= 1;

    // 栈中若已存在该字符，则跳过
    if (stackMap[ch]) continue;

    // 单调栈结构，当发现栈顶元素比当前字符大，则出掉栈顶元素，保证单调栈递增
    while (stack.length > 0 && stack[stack.length - 1] > ch) {
      // 如果当前栈顶元素在剩余的字符串中已经不存在了，则不能删除
      if (countMap[stack[stack.length - 1]] === 0) break;

      // 出掉栈顶元素，保证单调栈递增
      const popCh = stack.pop();
      stackMap[popCh] = false;
    }
    // 入栈字符
    stack.push(ch);
    stackMap[ch] = true;
  }
  return stack.join('');
}
// @lc code=end

(() => {
  const s = 'cbacdcbc';
  console.log(removeDuplicateLetters(s));
})();
