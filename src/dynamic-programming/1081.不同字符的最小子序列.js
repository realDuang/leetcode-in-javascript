/*
 * @lc app=leetcode.cn id=1081 lang=javascript
 *
 * [1081] 不同字符的最小子序列
 *
 * https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/description/
 *
 * algorithms
 * Medium (50.01%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    4K
 * Total Submissions: 7.8K
 * Testcase Example:  '"cdadabcc"'
 *
 * 返回字符串 text 中按字典序排列最小的子序列，该子序列包含 text 中所有不同字符一次。
 *
 *
 *
 * 示例 1：
 *
 * 输入："cdadabcc"
 * 输出："adbc"
 *
 *
 * 示例 2：
 *
 * 输入："abcd"
 * 输出："abcd"
 *
 *
 * 示例 3：
 *
 * 输入："ecbacba"
 * 输出："eacb"
 *
 *
 * 示例 4：
 *
 * 输入："leetcode"
 * 输出："letcod"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= text.length <= 1000
 * text 由小写英文字母组成
 *
 *
 *
 *
 * 注意：本题目与 316 https://leetcode-cn.com/problems/remove-duplicate-letters/ 相同
 *
 */

// @lc code=start
/**
 * @param {string} text
 * @return {string}
 */
var smallestSubsequence = function(text) {
  const stack = [];
  // 用于去重的 hashMap
  const hasChMap = {};

  // 每个字母出现次数计数器
  const chCountMap = {};

  for (let ch of text) {
    if (!chCountMap[ch]) {
      chCountMap[ch] = 0;
    }
    chCountMap[ch]++;
    hasChMap[ch] = false;
  }

  for (let ch of text) {
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

console.log(smallestSubsequence('ecbacba'));
