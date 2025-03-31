/*
 * @lc app=leetcode.cn id=1218 lang=typescript
 *
 * [1218] 最长定差子序列
 *
 * https://leetcode.cn/problems/longest-arithmetic-subsequence-of-given-difference/description/
 *
 * algorithms
 * Medium (50.21%)
 * Likes:    319
 * Dislikes: 0
 * Total Accepted:    60K
 * Total Submissions: 120.9K
 * Testcase Example:  '[1,2,3,4]\n1'
 *
 * 给你一个整数数组 arr 和一个整数 difference，请你找出并返回 arr 中最长等差子序列的长度，该子序列中相邻元素之间的差等于
 * difference 。
 *
 * 子序列 是指在不改变其余元素顺序的情况下，通过删除一些元素或不删除任何元素而从 arr 派生出来的序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [1,2,3,4], difference = 1
 * 输出：4
 * 解释：最长的等差子序列是 [1,2,3,4]。
 *
 * 示例 2：
 *
 *
 * 输入：arr = [1,3,5,7], difference = 1
 * 输出：1
 * 解释：最长的等差子序列是任意单个元素。
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr = [1,5,7,8,5,3,4,2,1], difference = -2
 * 输出：4
 * 解释：最长的等差子序列是 [7,5,3,1]。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10^4
 *
 *
 */

// @lc code=start
function longestSubsequence(arr: number[], difference: number): number {
  let res = 1;
  const hash: Record<string, number> = {};

  for (let i = 0; i < arr.length; i++) {
    const curr = arr[i];
    const next = curr + difference;

    if (hash[curr]) {
      hash[next] = hash[next] ? Math.max(hash[next], hash[curr] + 1) : hash[curr] + 1;
      res = Math.max(hash[next], res);
    } else {
      hash[next] = 1;
    }
    // console.log(hash);
  }
  return res;
}
// @lc code=end

(() => {
  const arr = [1, 5, 7, 8, 5, 3, 4, 2, 1],
    difference = -2;
  console.log(longestSubsequence([1, 2, 3, 4], 1));
  console.log(longestSubsequence([1, 3, 5, 7], 1));
  console.log(longestSubsequence(arr, difference));
})();

// function longestSubsequence(arr: number[], difference: number): number {
//   let res = 0;
//   for (let i = 0; i < arr.length; i++) {
//     let next = arr[i];
//     let j = i;
//     let cnt = 0;

//     while (j < arr.length) {
//       if (arr[j] === next) {
//         next += difference;
//         cnt += 1;
//       }
//       j++;
//     }
//     res = Math.max(res, cnt);
//   }
//   return res;
// }
