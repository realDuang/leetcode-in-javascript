/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (61.39%)
 * Likes:    811
 * Dislikes: 0
 * Total Accepted:    234.5K
 * Total Submissions: 381.9K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用 一次 。
 *
 * 注意：解集不能包含重复的组合。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 *
 * 示例 2:
 *
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 *
 *
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  let currSum = 0;
  backtrack([], 0);
  return res;

  function backtrack(path: number[], start: number) {
    if (currSum === target) {
      res.push([...path]);
      return;
    }

    if (currSum > target) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      // 做选择
      path.push(candidates[i]);
      currSum += candidates[i];
      // 回溯
      backtrack(path, i + 1);
      // 撤销选择
      currSum -= candidates[i];
      path.pop();
    }
  }
}
// @lc code=end

(() => {
  const candidates = [10, 1, 2, 7, 6, 1, 5],
    target = 8;
  console.log(combinationSum2(candidates, target));
})();
