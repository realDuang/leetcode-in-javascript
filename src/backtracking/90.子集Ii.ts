/*
 * @lc app=leetcode.cn id=90 lang=typescript
 *
 * [90] 子集 II
 *
 * https://leetcode-cn.com/problems/subsets-ii/description/
 *
 * algorithms
 * Medium (63.35%)
 * Likes:    727
 * Dislikes: 0
 * Total Accepted:    160.3K
 * Total Submissions: 253.1K
 * Testcase Example:  '[1,2,2]'
 *
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,2]
 * 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 *
 *
 *
 *
 */

// @lc code=start
function subsetsWithDup(nums: number[]): number[][] {
  // 先排序
  nums.sort((a, b) => a - b);

  const res: number[][] = [];
  backtrack([], 0);
  return res;

  function backtrack(path: number[], start: number) {
    res.push([...path]);

    for (let i = start; i < nums.length; i++) {
      // 如果遇到值相同的情况，只递归第一个值，其余跳过
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }
      // 选择该节点
      path.push(nums[i]);
      // 回溯
      backtrack(path, i + 1);
      // 撤销选择
      path.pop();
    }
  }
}
// @lc code=end

(() => {
  const nums = [1, 2, 2];
  console.log(subsetsWithDup(nums));
})();
