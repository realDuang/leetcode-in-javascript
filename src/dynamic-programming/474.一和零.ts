/*
 * @lc app=leetcode.cn id=474 lang=typescript
 *
 * [474] 一和零
 *
 * https://leetcode-cn.com/problems/ones-and-zeroes/description/
 *
 * algorithms
 * Medium (62.00%)
 * Likes:    677
 * Dislikes: 0
 * Total Accepted:    95.5K
 * Total Submissions: 152.9K
 * Testcase Example:  '["10","0001","111001","1","0"]\n5\n3'
 *
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。
 *
 *
 * 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。
 *
 * 如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
 * 输出：4
 * 解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
 * 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1
 * ，大于 n 的值 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["10", "0", "1"], m = 1, n = 1
 * 输出：2
 * 解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 600
 * 1 <= strs[i].length <= 100
 * strs[i] 仅由 '0' 和 '1' 组成
 * 1 <= m, n <= 100
 *
 *
 */

// @lc code=start
function findMaxForm(strs: string[], m: number, n: number): number {
  // 获取每个字符串的0，1个数，形成背包初始值
  const counts: [zeroCnt: number, oneCnt: number][] = strs.map(str => {
    let zeroCnt = 0;
    let oneCnt = 0;
    str.split('').forEach(x => {
      if (x === '1') {
        oneCnt += 1;
      } else {
        zeroCnt += 1;
      }
    });
    return [zeroCnt, oneCnt];
  });

  const dp = Array(m + 1)
    .fill(0)
    .map(x => Array(n + 1).fill(0));

  // 如果取当前第i个字符串，则将dp[i-1][j - counts[i]][0]][k - counts[i]][1]] + 1 与 dp[i-1][j][k] 比较取较大值
  // 如果不取当前第i个字符串，则与 dp[i-1][j][k] 的结果相同
  // 由于 dp[i] 只与dp [i-1] 有关，因此，可以省略一层空间复杂度。将 m 与 n 倒序遍历即可不污染上一层的遍历值
  for (let i = 0; i < strs.length; i++) {
    const [zeroCnt, oneCnt] = counts[i];
    for (let j = m; j >= zeroCnt; j--) {
      for (let k = n; k >= oneCnt; k--) {
        dp[j][k] = Math.max(dp[j][k], dp[j - zeroCnt][k - oneCnt] + 1);
      }
    }
  }

  return dp[m][n];
}
// @lc code=end

(() => {
  const strs = ['10', '0', '1'],
    m = 1,
    n = 1;
  console.log(findMaxForm(strs, m, n));
})();
