/*
 * @lc app=leetcode.cn id=875 lang=typescript
 *
 * [875] 爱吃香蕉的珂珂
 *
 * https://leetcode.cn/problems/koko-eating-bananas/description/
 *
 * algorithms
 * Medium (49.11%)
 * Likes:    305
 * Dislikes: 0
 * Total Accepted:    71.4K
 * Total Submissions: 145.3K
 * Testcase Example:  '[3,6,7,11]\n8'
 *
 * 珂珂喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。
 *
 * 珂珂可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k
 * 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 *
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 *
 * 返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：piles = [3,6,7,11], h = 8
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：piles = [30,11,23,4,20], h = 5
 * 输出：30
 *
 *
 * 示例 3：
 *
 *
 * 输入：piles = [30,11,23,4,20], h = 6
 * 输出：23
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= piles.length <= 10^4
 * piles.length <= h <= 10^9
 * 1 <= piles[i] <= 10^9
 *
 *
 */

// @lc code=start
function minEatingSpeed(piles: number[], h: number): number {
  let l = 0;
  let r = Number.MAX_SAFE_INTEGER;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    const time = fx(mid);
    // target 为守卫不在的时间，使用左边界的二分法逼近最优解时间
    if (time < h) {
      r = mid;
    } else if (time > h) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;

  // 设 x 为每小时吃香蕉的个数，则 fx 为吃完所有香蕉所需的时间
  function fx(x: number) {
    let hours = 0;
    for (let i = 0; i < piles.length; i++) {
      hours += Math.ceil(piles[i] / x);
    }
    return hours;
  }
}
// @lc code=end

(() => {
  const piles = [30, 11, 23, 4, 20],
    h = 5;
  console.log(minEatingSpeed(piles, h));
})();
