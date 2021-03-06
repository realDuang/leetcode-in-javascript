/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (74.47%)
 * Likes:    614
 * Dislikes: 0
 * Total Accepted:    103.2K
 * Total Submissions: 138K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 *
 * 示例:
 *
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const res = [];
  backtrack(nums, []);
  return res;

  function backtrack(rest, path) {
    if (rest.length === 0) {
      res.push(path);
      return;
    }
    for (let i = 0; i < rest.length; i++) {
      // 若选择该元素，剩余可选数减除该元素，路径增加该元素
      const num = rest.splice(i, 1)[0];
      backtrack(rest, [...path, num]);
      // 否则恢复该元素后，进行其他分支递归
      rest.splice(i, 0, num);
    }
  }
};

// @lc code=end

console.log(permute([1, 2, 3]));
