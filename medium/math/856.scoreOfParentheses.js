/*
 * @lc app=leetcode id=856 lang=javascript
 *
 * [856] Score of Parentheses
 */

// @lc code=start
/**
 * @param {string} S
 * @return {number}
 */
var scoreOfParentheses = function(S) {
  let res = 0;
  const stack = [];
  for (let ele of S) {
    if (ele === '(') {
      stack.push(res);
      res = 0;
    } else {
      const temp = res === 0 ? 1 : res * 2;
      res = stack.pop() + temp;
    }
  }
  return res;
};
// @lc code=end

console.log(scoreOfParentheses('(()(()))'));

// 涉及到括号匹配的题一般采用栈来解是比较合适的。
// 这道题中我们可以遍历字符串，若遇到左括号，则把之前的计算结果压入栈，并重置当前计数。遇到右括号时，就能算出与之匹配的括号内整体的分数了，这里分两种情况：若res = 0，则说明上一个符号就是左括号，那么根据规则1，取temp值为1；若res不为0，则说明之前已经有右括号更新了res了，此时应该匹配规则3，取temp值为res * 2。再根据规则2，更新当前计算结果为栈顶值 + temp。
// 由于字符串最后一个字符一定是右括号，那么遍历结束时，整体得分就已经存在了res中了，因此直接返回res即可。
