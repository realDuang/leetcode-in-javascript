/*
 * @lc app=leetcode.cn id=78 lang=typescript
 *
 * [78] 子集
 *
 * https://leetcode-cn.com/problems/subsets/description/
 *
 * algorithms
 * Medium (80.27%)
 * Likes:    1455
 * Dislikes: 0
 * Total Accepted:    360.7K
 * Total Submissions: 449.3K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 *
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
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
 * nums 中的所有元素 互不相同
 *
 *
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
  const res: number[][] = [];
  backtrack([], 0);
  return res;

  function backtrack(path: number[], start: number) {
    // 类似前序遍历，将所有符合要求的节点入 path
    res.push([...path]);

    for (let i = start; i < nums.length; i++) {
      // 节点入栈并递归下一选择
      path.push(nums[i]);
      backtrack(path, i + 1);
      // 撤销选择
      path.pop();
    }
  }
}
// @lc code=end

(() => {
  const nums = [1, 2, 3];
  console.log(subsets(nums));
})();
