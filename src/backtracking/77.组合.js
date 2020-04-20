/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (73.30%)
 * Likes:    251
 * Dislikes: 0
 * Total Accepted:    45.5K
 * Total Submissions: 61.9K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 *
 * 示例:
 *
 * 输入: n = 4, k = 2
 * 输出:
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = [];
  backtrack(k, [], 1);
  return res;

  function backtrack(k, path, start) {
    if (k === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(k - 1, path, i + 1);
      path.pop();
    }
  }
};
// @lc code=end

console.log(combine(4, 2));
