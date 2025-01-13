/*
 * @lc app=leetcode.cn id=394 lang=typescript
 *
 * [394] 字符串解码
 *
 * https://leetcode.cn/problems/decode-string/description/
 *
 * algorithms
 * Medium (58.33%)
 * Likes:    1891
 * Dislikes: 0
 * Total Accepted:    391.1K
 * Total Submissions: 664.4K
 * Testcase Example:  '"3[a]2[bc]"'
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 30
 * s 由小写英文字母、数字和方括号 '[]' 组成
 * s 保证是一个 有效 的输入。
 * s 中所有整数的取值范围为 [1, 300]
 *
 *
 */

// @lc code=start
function decodeString(s: string): string {
  let decodeStr = '';

  const stack: [number, string][] = [];

  let i = 0;
  while (i < s.length) {
    if (/\d/.test(s[i])) {
      // 数字类型的一直取完数字，并记录进栈
      const temp = i;
      while (/\d/.test(s[i])) {
        i++;
      }
      const cnt = Number(s.substring(temp, i));

      // 数字取完后，当前字符一定是 [
      // 遇到 [ 时，记录入栈当前的子串，并清空子串
      stack.push([cnt, decodeStr]);
      decodeStr = '';
      i++;
    } else if (s[i] === ']') {
      // 遇到 ] 时，出栈，并构建当前子串
      const [times, subStr] = stack.pop();
      decodeStr = subStr + decodeStr.repeat(times);
      i++;
    } else {
      // 其他字符类型全部原值输入
      decodeStr += s[i];
      i++;
    }
  }

  return decodeStr;
}

// @lc code=end

(() => {
  // const s = 'a3[a12[c]s]x';
  const s = '3[a]2[bc]';
  console.log(decodeString(s));
})();
