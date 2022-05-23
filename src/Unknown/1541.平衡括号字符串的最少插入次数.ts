/*
 * @lc app=leetcode.cn id=1541 lang=typescript
 *
 * [1541] 平衡括号字符串的最少插入次数
 *
 * https://leetcode.cn/problems/minimum-insertions-to-balance-a-parentheses-string/description/
 *
 * algorithms
 * Medium (48.18%)
 * Likes:    43
 * Dislikes: 0
 * Total Accepted:    11.3K
 * Total Submissions: 23.5K
 * Testcase Example:  '"(()))"'
 *
 * 给你一个括号字符串 s ，它只包含字符 '(' 和 ')' 。一个括号字符串被称为平衡的当它满足：
 *
 *
 * 任何左括号 '(' 必须对应两个连续的右括号 '))' 。
 * 左括号 '(' 必须在对应的连续两个右括号 '))' 之前。
 *
 *
 * 比方说 "())"， "())(())))" 和 "(())())))" 都是平衡的， ")()"， "()))" 和 "(()))" 都是不平衡的。
 *
 * 你可以在任意位置插入字符 '(' 和 ')' 使字符串平衡。
 *
 * 请你返回让 s 平衡的最少插入次数。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "(()))"
 * 输出：1
 * 解释：第二个左括号有与之匹配的两个右括号，但是第一个左括号只有一个右括号。我们需要在字符串结尾额外增加一个 ')' 使字符串变成平衡字符串
 * "(())))" 。
 *
 *
 * 示例 2：
 *
 * 输入：s = "())"
 * 输出：0
 * 解释：字符串已经平衡了。
 *
 *
 * 示例 3：
 *
 * 输入：s = "))())("
 * 输出：3
 * 解释：添加 '(' 去匹配最开头的 '))' ，然后添加 '))' 去匹配最后一个 '(' 。
 *
 *
 * 示例 4：
 *
 * 输入：s = "(((((("
 * 输出：12
 * 解释：添加 12 个 ')' 得到平衡字符串。
 *
 *
 * 示例 5：
 *
 * 输入：s = ")))))))"
 * 输出：5
 * 解释：在字符串开头添加 4 个 '(' 并在结尾添加 1 个 ')' ，字符串变成平衡字符串 "(((())))))))" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 只包含 '(' 和 ')' 。
 *
 *
 */

// @lc code=start
function minInsertions(s: string): number {
  let res = 0;
  // 设需要右括号的个数为 rightNeed, 左括号的个数为 rightNeed / 2
  let rightNeed = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      rightNeed += 2;
      // 因为左括号一定要对应两个 **连续的** 右括号，
      // 所以此时发现右括号为奇数个时，必须补一个右括号在该左括号之前
      if (rightNeed % 2 === 1) {
        res += 1;
        rightNeed -= 1;
      }
    } else {
      if (rightNeed > 0) {
        rightNeed -= 1;
      } else {
        // 当没有左括号时，补充一个左括号，同时还需多余匹配一个右括号，计数器+1
        res += 1;
        rightNeed += 1;
      }
    }
  }
  // 结尾处补充剩余的右括号
  res += rightNeed;
  return res;
}
// @lc code=end

(() => {
  const s = '(()))(()))()())))';
  console.log(minInsertions(s));
})();
