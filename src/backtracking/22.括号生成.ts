/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (77.36%)
 * Likes:    2367
 * Dislikes: 0
 * Total Accepted:    425K
 * Total Submissions: 549.3K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1
 * 输出：["()"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 8
 *
 *
 */

// @lc code=start
function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  backtrack('', 0, 0);
  return res;

  // str存已放入的括号串，l, r 表示已经放入左括号和右括号的数量
  function backtrack(str: string, l: number, r: number) {
    if (l === n && r === n) {
      res.push(str);
      return;
    }

    // 选择放左括号，条件是还剩左括号可以放
    if (l < n) {
      backtrack(str + '(', l + 1, r);
    }
    // 选择放右括号, 条件是还剩右括号可以放且子串里已经有多余的左括号了（即右括号比左括号少）
    // r<n && r<l 但由于l < n，所以可以简化
    if (r < l) {
      backtrack(str + ')', l, r + 1);
    }
  }
}
// @lc code=end

(() => {
  const n = 3;
  console.log(generateParenthesis(n));
})();

// function generateParenthesis(n: number): string[] {
//   const res: string[] = [];
//   backtrack('', 0, 0);
//   return res;

//   function backtrack(str: string, left: number, right: number) {
//     if (left === n && right === n) {
//       res.push(str);
//     }
//     if (left < n) {
//       backtrack(str + '(', left + 1, right);
//     }
//     if (right < left) {
//       backtrack(str + ')', left, right + 1);
//     }
//   }
// }
