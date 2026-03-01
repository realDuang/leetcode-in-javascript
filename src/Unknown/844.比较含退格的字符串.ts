/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 *
 * https://leetcode-cn.com/problems/backspace-string-compare/description/
 *
 * algorithms
 * Easy (50.59%)
 * Likes:    356
 * Dislikes: 0
 * Total Accepted:    106.5K
 * Total Submissions: 210.6K
 * Testcase Example:  '"ab#c"\n"ad#c"'
 *
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。
 *
 * 如果相等，返回 true ；否则，返回 false 。
 *
 * 注意：如果对空文本输入退格字符，文本继续为空。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ab#c", t = "ad#c"
 * 输出：true
 * 解释：S 和 T 都会变成 “ac”。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "ab##", t = "c#d#"
 * 输出：true
 * 解释：s 和 t 都会变成 “”。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "a##c", t = "#a#c"
 * 输出：true
 * 解释：s 和 t 都会变成 “c”。
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "a#c", t = "b"
 * 输出：false
 * 解释：s 会变成 “c”，但 t 仍然是 “b”。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length, t.length <= 200
 * s 和 t 只含有小写字母以及字符 '#'
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？
 *
 *
 *
 *
 */

// @lc code=start
function backspaceCompare(s: string, t: string): boolean {
  let p = s.length - 1;
  let q = t.length - 1;
  let scount = 0;
  let tcount = 0;

  while (p >= 0 || q >= 0) {
    while (p >= 0) {
      if (s[p] === '#') {
        p -= 1;
        scount += 1;
      } else if (scount > 0) {
        p -= 1;
        scount -= 1;
      } else {
        // 只有当欠的退格全部清除后才允许退出
        break;
      }
    }
    while (q >= 0) {
      if (t[q] === '#') {
        q -= 1;
        tcount += 1;
      } else if (tcount > 0) {
        q -= 1;
        tcount -= 1;
      } else {
        // 只有当欠的退格全部清除后才允许退出
        break;
      }
    }
    // 此时字符比对若不同，则字符串一定不同，提前返回
    if (s[p] !== t[q]) return false;

    p -= 1;
    q -= 1;
  }
  return true;
}
// @lc code=end

(() => {
  // function backspaceCompare(s: string, t: string): boolean {
  //   return getBackspaceString(s) === getBackspaceString(t);

  //   function getBackspaceString(str: string): string {
  //     const res: string[] = [];

  //     let curr = 0;
  //     while (curr < str.length) {
  //       if (str[curr] === '#') {
  //         if (res.length > 0) res.pop();
  //       } else {
  //         res.push(str[curr]);
  //       }
  //       curr += 1;
  //     }
  //     return res.join('');
  //   }
  // }
  const s = 'y#fo##f',
    t = 'y#f#o##f';
  console.log(backspaceCompare(s, t));
})();
