/*
 * @lc app=leetcode.cn id=201 lang=typescript
 *
 * [201] 数字范围按位与
 *
 * https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/description/
 *
 * algorithms
 * Medium (53.07%)
 * Likes:    364
 * Dislikes: 0
 * Total Accepted:    56K
 * Total Submissions: 105.4K
 * Testcase Example:  '5\n7'
 *
 * 给你两个整数 left 和 right ，表示区间 [left, right] ，返回此区间内所有数字 按位与 的结果（包含 left 、right
 * 端点）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：left = 5, right = 7
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：left = 0, right = 0
 * 输出：0
 *
 *
 * 示例 3：
 *
 *
 * 输入：left = 1, right = 2147483647
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 *
 *
 */

// @lc code=start
function rangeBitwiseAnd(left: number, right: number): number {
  let shift = 0;
  // 找到公共前缀
  while (left < right) {
    left >>= 1;
    right >>= 1;
    ++shift;
  }
  return left << shift;
}
// @lc code=end

(() => {
  const left = 5,
    right = 7;
  console.log(rangeBitwiseAnd(left, right));
})();
