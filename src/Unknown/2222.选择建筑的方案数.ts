/*
 * @lc app=leetcode.cn id=2222 lang=typescript
 *
 * [2222] 选择建筑的方案数
 *
 * https://leetcode.cn/problems/number-of-ways-to-select-buildings/description/
 *
 * algorithms
 * Medium (49.80%)
 * Likes:    40
 * Dislikes: 0
 * Total Accepted:    6.4K
 * Total Submissions: 12.9K
 * Testcase Example:  '"001101"'
 *
 * 给你一个下标从 0 开始的二进制字符串 s ，它表示一条街沿途的建筑类型，其中：
 *
 *
 * s[i] = '0' 表示第 i 栋建筑是一栋办公楼，
 * s[i] = '1' 表示第 i 栋建筑是一间餐厅。
 *
 *
 * 作为市政厅的官员，你需要随机 选择 3 栋建筑。然而，为了确保多样性，选出来的 3 栋建筑 相邻 的两栋不能是同一类型。
 *
 *
 * 比方说，给你 s = "001101" ，我们不能选择第 1 ，3 和 5 栋建筑，因为得到的子序列是 "011" ，有相邻两栋建筑是同一类型，所以
 * 不合 题意。
 *
 *
 * 请你返回可以选择 3 栋建筑的 有效方案数 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "001101"
 * 输出：6
 * 解释：
 * 以下下标集合是合法的：
 * - [0,2,4] ，从 "001101" 得到 "010"
 * - [0,3,4] ，从 "001101" 得到 "010"
 * - [1,2,4] ，从 "001101" 得到 "010"
 * - [1,3,4] ，从 "001101" 得到 "010"
 * - [2,4,5] ，从 "001101" 得到 "101"
 * - [3,4,5] ，从 "001101" 得到 "101"
 * 没有别的合法选择，所以总共有 6 种方法。
 *
 *
 * 示例 2：
 *
 * 输入：s = "11100"
 * 输出：0
 * 解释：没有任何符合题意的选择。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= s.length <= 10^5
 * s[i] 要么是 '0' ，要么是 '1' 。
 *
 *
 */

// @lc code=start
function numberOfWays(s: string): number {
  // 注意到，符合要求的长度为3的子序列只有两种情况，010和101，
  // 所以只需要遍历中间元素，统计两侧为0和1的个数即可
  const len = s.length;

  // 统计字符串中0和1的个数
  const count1 = s.split('1').length - 1;
  const count0 = len - count1;

  let res = 0;

  // 遍历到当前位置1的个数
  let curCount1 = 0;

  for (let i = 0; i < len; i++) {
    if (s[i] === '1') {
      // 左侧0的个数，等于当前位置总数减去当前位置1的个数
      const cntL0 = i - curCount1;
      // 右侧0的个数，等于总0个数减去左侧0的个数
      const cntR0 = count0 - cntL0;
      res += cntL0 * cntR0;

      curCount1 += 1;
    } else {
      // 左侧1的个数
      const cntL1 = curCount1;
      // 右侧1的个数，等于总1个数减去左侧1的个数
      const cntR1 = count1 - cntL1;
      res += cntL1 * cntR1;
    }
  }
  return res;
}
// @lc code=end

(() => {
  const s = '001101';
  console.log(numberOfWays(s));

  // Over Time Limit
  // function numberOfWays(s: string): number {
  //   let res = 0;
  //   const len = s.length;
  //   for (let i = 0; i < len - 2; i++) {
  //     for (let j = i + 1; j < len - 1; j++) {
  //       if (s[i] === s[j]) continue;
  //       for (let k = j + 1; k < len; k++) {
  //         if (s[j] !== s[k]) res += 1;
  //       }
  //     }
  //   }
  //   return res;
  // }
})();
