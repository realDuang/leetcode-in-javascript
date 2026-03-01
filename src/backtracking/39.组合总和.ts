/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (72.75%)
 * Likes:    1727
 * Dislikes: 0
 * Total Accepted:    398.3K
 * Total Submissions: 547.5K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target
 * 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 *
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 *
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：candidates = [2,3,6,7], target = 7
 * 输出：[[2,2,3],[7]]
 * 解释：
 * 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
 * 7 也是一个候选， 7 = 7 。
 * 仅有这两种组合。
 *
 * 示例 2：
 *
 *
 * 输入: candidates = [2,3,5], target = 8
 * 输出: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * 示例 3：
 *
 *
 * 输入: candidates = [2], target = 1
 * 输出: []
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= candidates.length <= 30
 * 1 <= candidates[i] <= 200
 * candidate 中的每个元素都 互不相同
 * 1 <= target <= 500
 *
 *
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  let currSum = 0;
  backtrack([], 0);
  return res;

  function backtrack(path: number[], start: number) {
    // 满足要求，输出
    if (currSum === target) {
      res.push([...path]);
      return;
    }
    // 当前和已经大于 target，则直接剪枝
    if (currSum > target) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      // 做选择
      currSum += candidates[i];
      path.push(candidates[i]);
      // 回溯
      backtrack(path, i);
      // 撤销选择
      currSum -= candidates[i];
      path.pop();
    }
  }
}
// @lc code=end

(() => {
  const candidates = [3, 2, 6, 7],
    target = 7;
  console.log(combinationSum(candidates, target));
})();
