/*
 * @lc app=leetcode.cn id=315 lang=typescript
 *
 * [315] 计算右侧小于当前元素的个数
 *
 * https://leetcode.cn/problems/count-of-smaller-numbers-after-self/description/
 *
 * algorithms
 * Hard (44.43%)
 * Likes:    1168
 * Dislikes: 0
 * Total Accepted:    107.9K
 * Total Submissions: 242.9K
 * Testcase Example:  '[5,2,6,1]'
 *
 * 给你一个整数数组 nums ，按要求返回一个新数组 counts 。数组 counts 有该性质： counts[i] 的值是  nums[i]
 * 右侧小于 nums[i] 的元素的数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,6,1]
 * 输出：[2,1,1,0]
 * 解释：
 * 5 的右侧有 2 个更小的元素 (2 和 1)
 * 2 的右侧仅有 1 个更小的元素 (1)
 * 6 的右侧有 1 个更小的元素 (1)
 * 1 的右侧有 0 个更小的元素
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [-1]
 * 输出：[0]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [-1,-1]
 * 输出：[0,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
function countSmaller(nums: number[]): number[] {
  const res = Array(nums.length).fill(0);

  // 将数组每个元素的原始位置也记录下来
  const arr: { val: number; index: number }[] = nums.map((val, index) => ({ val, index }));

  function merge(left: number, mid: number, right: number) {
    // temp 永远存储的是遍历过程中最小的若干值
    const temp: { val: number; index: number }[] = [];
    // 重点：记录 temp 中有多少个值是从右半区来的
    let rightCnt = 0;

    // 将 nums[lef~right]分成两半，两两依次比对，每次将较小的那个加入到临时数组中
    let i = left;
    let j = mid + 1;
    while (i <= mid && j <= right) {
      if (arr[i].val <= arr[j].val) {
        // 每当左半区的值放入temp，就知道在原数组的这个区间中，在它的右侧且比它小的有 rightCnt 个
        res[arr[i].index] += rightCnt;
        temp.push(arr[i++]);
      } else {
        // 每当右半区放入temp，记录值+1
        rightCnt++;
        temp.push(arr[j++]);
      }
    }

    // 因为右半区都已经归位了，其实在这里 rightCnt 就等于 右半区的个数 right-mid
    // 对于左半区的剩余元素，每个都要加上rightCnt，右半区所有元素都比当前元素小
    while (i <= mid) {
      res[arr[i].index] += rightCnt;
      temp.push(arr[i++]);
    }
    while (j <= right) temp.push(arr[j++]);

    for (let k = 0; k < temp.length; k++) arr[left + k] = temp[k];
  }

  function divide(l: number, r: number) {
    if (l >= r) return;
    const mid = (l + r) >> 1;
    divide(l, mid);
    divide(mid + 1, r);
    merge(l, mid, r);
  }

  divide(0, nums.length - 1);
  return res;
}
// @lc code=end

(() => {
  LCT.func(countSmaller).auto();
})();
