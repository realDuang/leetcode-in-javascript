/*
 * @lc app=leetcode.cn id=278 lang=typescript
 *
 * [278] 第一个错误的版本
 *
 * https://leetcode-cn.com/problems/first-bad-version/description/
 *
 * algorithms
 * Easy (45.29%)
 * Likes:    496
 * Dislikes: 0
 * Total Accepted:    219.5K
 * Total Submissions: 484.8K
 * Testcase Example:  '5\n4'
 *
 *
 * 你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。
 *
 * 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
 *
 * 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version
 * 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, bad = 4
 * 输出：4
 * 解释：
 * 调用 isBadVersion(3) -> false
 * 调用 isBadVersion(5) -> true
 * 调用 isBadVersion(4) -> true
 * 所以，4 是第一个错误的版本。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 1, bad = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

const solution = function (isBadVersion: (version: number) => boolean) {
  return function (n: number): number {
    let left = 1;
    let right = n;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (isBadVersion(mid)) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    if (left <= n && isBadVersion(left)) {
      return left;
    }
    return n + 1;
  };
};
// @lc code=end

(() => {
  const n = 1;
  const bad = 1;
  const isBadVersion = (version: number) => version >= bad;
  console.log(solution(isBadVersion)(n));
})();
