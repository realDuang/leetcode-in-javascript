/*
 * @lc app=leetcode.cn id=227 lang=typescript
 *
 * [227] 基本计算器 II
 *
 * https://leetcode.cn/problems/basic-calculator-ii/description/
 *
 * algorithms
 * Medium (45.13%)
 * Likes:    820
 * Dislikes: 0
 * Total Accepted:    185.2K
 * Total Submissions: 407.5K
 * Testcase Example:  '"3+2*2"'
 *
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 *
 * 整数除法仅保留整数部分。
 *
 * 你可以假设给定的表达式总是有效的。所有中间结果将在 [-2^31, 2^31 - 1] 的范围内。
 *
 * 注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "3+2*2"
 * 输出：7
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = " 3/2 "
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = " 3+5 / 2 "
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 3 * 10^5
 * s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
 * s 表示一个 有效表达式
 * 表达式中的所有整数都是非负整数，且在范围 [0, 2^31 - 1] 内
 * 题目数据保证答案是一个 32-bit 整数
 *
 *
 */

// @lc code=start
function calculate(s: string): number {
  // 去除多余空格
  s = s.replaceAll(' ', '');
  // 出现两个负号的变成正号
  s = s.replaceAll('--', '+');

  if (!isNaN(Number(s))) return Number(s);

  // 保存
  let nums: number[] = [];

  // 保存计算数字
  let num = 0;
  // 保存上一个符号
  let lastExp: string = '+';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    // 数字情况
    if (!isNaN(Number(ch))) {
      num = num * 10 + Number(ch);
    }
    // 此处除了判断遇到符号进入计算，还有一种情况，当执行到尾部时，需要将上一个符号运算计算完毕
    if (isNaN(Number(ch)) || i === s.length - 1) {
      // 注意此处的计算的是上一个符号的，当前符号的留到下次计算
      if (lastExp === '*') {
        const lastNum = nums.pop();
        nums.push(lastNum * num);
      } else if (lastExp === '/') {
        const lastNum = nums.pop();
        nums.push((lastNum / num) | 0);
      } else if (lastExp === '+') {
        nums.push(num);
      } else if (lastExp === '-') {
        nums.push(-num);
      }
      num = 0;
      lastExp = ch;
    }
  }

  // 此时栈中剩余的值都为加减运算的值了
  const res = nums.reduce((a, b) => a + b, 0);
  // console.log(s, '=', res);
  return res;
}
// @lc code=end

// function calculate(s: string): number {
//   if (!isNaN(Number(s.trim()))) return Number(s.trim());

//   // 两个栈分别统计符号和数字
//   let expArr: string[] = [];
//   let numArr: number[] = [];

//   let num = 0;
//   for (let i = 0; i < s.length; i++) {
//     const ch = s[i];
//     if (ch === ' ') continue;

//     if (!isNaN(Number(ch))) {
//       // 数字情况
//       num = num * 10 + Number(ch);
//     } else {
//       numArr.push(num);
//       expArr.push(ch);
//       num = 0;
//     }
//   }
//   numArr.push(num);

//   // 优先算乘除
//   for (let i = 0; i < expArr.length; i++) {
//     const exp = expArr[i];
//     if (exp === '*' || exp === '/') {
//       const temp = calc(numArr[i], numArr[i + 1], exp);
//       numArr.splice(i, 2, temp);
//       expArr.splice(i, 1);
//       i--;
//     }
//   }

//   let res = numArr[0];
//   for (let i = 0; i < expArr.length; i++) {
//     res = calc(res, numArr[i + 1], expArr[i]);
//   }

//   // console.log(expArr, numArr, res);
//   return res;
// }

// function calc(a: number, b: number, exp: string) {
//   let res = 0;
//   if (exp === '*') {
//     res = a * b;
//   } else if (exp === '/') {
//     res = Math.floor(a / b);
//   } else if (exp === '+') {
//     res = a + b;
//   } else if (exp === '-') {
//     res = a - b;
//   }
//   return res;
// }

(() => {
  console.log(calculate('0') === 0);
  console.log(calculate('0+0') === 0);
  console.log(calculate('1+2*3-20/6') === 4);
  console.log(calculate('4+ 2*  5 -2 /1') === 12);
  console.log(calculate(' 3/2 ') === 1);
  console.log(calculate(' 1--2 ') === 3);
})();
