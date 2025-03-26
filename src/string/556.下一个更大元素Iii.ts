/*
 * @lc app=leetcode.cn id=556 lang=typescript
 *
 * [556] 下一个更大元素 III
 *
 * https://leetcode.cn/problems/next-greater-element-iii/description/
 *
 * algorithms
 * Medium (36.83%)
 * Likes:    373
 * Dislikes: 0
 * Total Accepted:    53.4K
 * Total Submissions: 145K
 * Testcase Example:  '12'
 *
 * 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 -1 。
 *
 * 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：21
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 21
 * 输出：-1
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
function nextGreaterElement(n: number): number {
  const strN = n.toString().split('');

  // 要找到第一个更大的数，需要找到最后一个数字在递增的位置，
  // 例如 12385764，要找到的是 5
  let i = strN.length - 2;
  while (i >= 0 && strN[i] >= strN[i + 1]) {
    i--;
  }

  // 说明所有数字组成是非递增的，不可能组成更大的数字了
  if (i < 0) return -1;

  // 由于上面的条件可知，右侧的部分(764)一定是非递增的
  // 因此一定能从后向前找到第一个大于 5 且最接近的数，为 6
  let j = strN.length - 1;
  while (strN[j] <= strN[i]) {
    j--;
  }

  //  把右侧的数换到左侧，就能得到左侧 12386xxx，一定是大于原有数的最接近的左侧数字
  [strN[i], strN[j]] = [strN[j], strN[i]];
  // 而右侧的部分(754)一定是非递增的，将它反转改成非递减(457)，则一定组成右侧部分最小的数字
  const rightPart = strN.slice(i + 1).reverse();
  // 将两侧拼接起来则得到结果
  const res = [...strN.slice(0, i + 1), ...rightPart].join('');

  return Number(res) > Math.pow(2, 31) - 1 ? -1 : Number(res);
}
// @lc code=end

(() => {
  console.log(nextGreaterElement(112));
})();
