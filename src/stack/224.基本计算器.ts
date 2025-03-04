/*
 * @lc app=leetcode.cn id=224 lang=typescript
 *
 * [224] 基本计算器
 *
 * https://leetcode.cn/problems/basic-calculator/description/
 *
 * algorithms
 * Hard (42.96%)
 * Likes:    1106
 * Dislikes: 0
 * Total Accepted:    170.2K
 * Total Submissions: 393.1K
 * Testcase Example:  '"1 + 1"'
 *
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 *
 * 注意:不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "1 + 1"
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = " 2-1 + 2 "
 * 输出：3
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "(1+(4+5+2)-3)+(6+8)"
 * 输出：23
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 3 * 10^5
 * s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
 * s 表示一个有效的表达式
 * '+' 不能用作一元运算(例如， "+1" 和 "+(2 + 3)" 无效)
 * '-' 可以用作一元运算(即 "-1" 和 "-(2 + 3)" 是有效的)
 * 输入中不存在两个连续的操作符
 * 每个数字和运行的计算将适合于一个有符号的 32位 整数
 *
 *
 */

// @lc code=start
function calculate(s: string): number {
  const leftStack = [];
  let str = s;

  let i = 0;
  for (; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(') {
      leftStack.push(i);
    } else if (ch === ')') {
      if (leftStack.length <= 0) return NaN;

      const start = leftStack.pop();
      // 括号内值计算
      const subExpression = str.substring(start + 1, i);
      const result = analyze(subExpression);

      // 生成去除该括号后的算式
      str = str.substring(0, start) + result + str.substring(i + 1);
      // 回到括号起始位置
      i = start;
    }
  }

  // console.log(str);
  return analyze(str);
}

function analyze(s: string): number {
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

(() => {
  // console.log(calculate('3+ 4* 5/(3+2)') === 7);
  // console.log(calculate('1+(1+(4+5+2)-3)+(6+8)') === 24);
  // console.log(calculate('(1+(4+5+2)-3)+(6+8)') === 23);
  // console.log(calculate('(     -2)') === -2);
  // console.log(calculate('1-(     -2)') === 3);
  // console.log(calculate('(1-(3-4))') === 2);
  console.log(calculate('- (3 - (- (4 + 5) ) )') === -12);
})();
