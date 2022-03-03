/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (78.50%)
 * Likes:    1800
 * Dislikes: 0
 * Total Accepted:    526.4K
 * Total Submissions: 670.5K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 6
 * -10 <= nums[i] <= 10
 * nums 中的所有整数 互不相同
 *
 *
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];
  backtrack(nums);
  return res;

  function backtrack(rest: number[]) {
    if (rest.length === 0) {
      res.push([...path]);
      return;
    }
    rest.forEach((num, index) => {
      // 做选择
      path.push(num);
      // 回溯
      rest.splice(index, 1);
      backtrack(rest);
      // 取消选择
      rest.splice(index, 0, num);
      path.pop();
    });
  }
}
// @lc code=end

(() => {
  const nums = [1, 2, 3];
  console.log(permute(nums));
})();
