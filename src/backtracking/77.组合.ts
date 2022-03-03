/*
 * @lc app=leetcode.cn id=77 lang=typescript
 *
 * [77] 组合
 *
 * https://leetcode-cn.com/problems/combinations/description/
 *
 * algorithms
 * Medium (76.97%)
 * Likes:    879
 * Dislikes: 0
 * Total Accepted:    288K
 * Total Submissions: 374.2K
 * Testcase Example:  '4\n2'
 *
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 *
 * 你可以按 任何顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 4, k = 2
 * 输出：
 * [
 * ⁠ [2,4],
 * ⁠ [3,4],
 * ⁠ [2,3],
 * ⁠ [1,2],
 * ⁠ [1,3],
 * ⁠ [1,4],
 * ]
 *
 * 示例 2：
 *
 *
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
function combine(n: number, k: number): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  backtrack(n);
  return res;

  function backtrack(end: number) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }

    for (let i = end; i >= 1; i--) {
      path.push(i);
      backtrack(i - 1);
      path.pop();
    }
  }
}
// @lc code=end

(() => {
  const n = 4,
    k = 2;
  console.log(combine(n, k));
})();
