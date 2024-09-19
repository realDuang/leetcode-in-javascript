/*
 * @lc app=leetcode.cn id=350 lang=typescript
 *
 * [350] 两个数组的交集 II
 *
 * https://leetcode.cn/problems/intersection-of-two-arrays-ii/description/
 *
 * algorithms
 * Easy (57.74%)
 * Likes:    1057
 * Dislikes: 0
 * Total Accepted:    529.3K
 * Total Submissions: 915.2K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给你两个整数数组 nums1 和 nums2
 * ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 *
 *
 * 示例 2:
 *
 *
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[4,9]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 1000
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 如果给定的数组已经排好序呢？你将如何优化你的算法？
 * 如果 nums1 的大小比 nums2 小，哪种方法更优？
 * 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
 *
 *
 */

// @lc code=start
function intersect(nums1: number[], nums2: number[]): number[] {
  let res: number[] = [];

  const hash1: Record<string, number> = {};
  const hash2: Record<string, number> = {};

  for (const num of nums1) {
    if (hash1[num] === undefined) {
      hash1[num] = 1;
    } else {
      hash1[num] += 1;
    }
  }

  for (const num of nums2) {
    if (hash2[num] === undefined) {
      hash2[num] = 1;
    } else {
      hash2[num] += 1;
    }
  }

  for (const key of Object.keys(hash1)) {
    const cnt = Math.min(hash1[key], hash2[key] ?? 0);
    if (cnt > 0) {
      res = res.concat(Array(cnt).fill(Number(key)));
    }
  }

  return res;
}
// @lc code=end

(() => {
  const nums1 = [1, 2, 2, 1],
    nums2 = [2, 2];
  console.log(intersect(nums1, nums2));
})();
