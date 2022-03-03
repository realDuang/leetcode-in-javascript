/*
 * @lc app=leetcode.cn id=47 lang=typescript
 *
 * [47] 全排列 II
 *
 * https://leetcode-cn.com/problems/permutations-ii/description/
 *
 * algorithms
 * Medium (64.20%)
 * Likes:    921
 * Dislikes: 0
 * Total Accepted:    254K
 * Total Submissions: 395.6K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,2]
 * 输出：
 * [[1,1,2],
 * ⁠[1,2,1],
 * ⁠[2,1,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 8
 * -10 <= nums[i] <= 10
 *
 *
 */

// @lc code=start
function permuteUnique(nums: number[]): number[][] {
  nums = nums.sort((a, b) => a - b);

  const len = nums.length;
  const res: number[][] = [];
  const visited: boolean[] = [];

  backtrack([]);
  return res;

  function backtrack(path: number[]) {
    if (path.length === len) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < len; i++) {
      // 已记录在路径中的节点跳过
      if (visited[i]) continue;
      // 当前元素和前一个元素值相同，并且前一个元素还没有被使用过的时候，剪枝
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;

      // 选择
      path.push(nums[i]);
      visited[i] = true;

      // 递归
      backtrack(path);

      // 取消选择
      path.pop();
      visited[i] = false;
    }
  }
}
// @lc code=end

(() => {
  const nums = [1, 1, 2];
  console.log(permuteUnique(nums));
})();
