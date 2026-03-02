/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 *
 * https://leetcode.cn/problems/sort-an-array/description/
 *
 * algorithms
 * Medium (55.58%)
 * Likes:    560
 * Dislikes: 0
 * Total Accepted:    362.4K
 * Total Submissions: 652K
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个整数数组 nums，请你将该数组升序排列。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5 * 10^4
 * -5 * 10^4 <= nums[i] <= 5 * 10^4
 *
 *
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
  sort(0, nums.length - 1);
  return nums;

  function sort(left: number, right: number) {
    if (left >= right) {
      return;
    }
    // 对 [left, right] 进行一次快排
    // 使得所有 nums[left, index-1] <= nums[index] < nums[p+1, right]
    const index = partition(left, right);
    // 之后对左右两侧的数组递归进行快排
    sort(left, index - 1);
    sort(index + 1, right);
  }

  // 一次快排能够达到的效果是，将数组其中一个值(pivot)的位置归位
  function partition(left: number, right: number) {
    // 随便选取一个基准值
    const pivot = nums[left];

    let i = left + 1;
    let j = right;

    while (i <= j) {
      // 从左侧遍历，找到比基准值大的数，从右侧找比基准值小的数
      while (i <= right && nums[i] <= pivot) i++;
      while (j > left && nums[j] >= pivot) j--;

      // 此时交换两边的数，使得[left,i]都比pivot小，[j,right]都比pivot大；
      if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    // 多次重复循环使得最终i=j+1，此时交换基准值和nums[j]。
    [nums[left], nums[j]] = [nums[j], nums[left]];
    // 从而满足：基准值pivot左侧的值都比它小，右侧的值都比它大。即 **pivot已经完全归位**。
    // 返回已经排好序的值的位置，这个值已经不需要调整位置了，接下来从它两侧继续递归
    return j;
  }
}
// @lc code=end

(() => {
  // function sortArray(nums: number[]): number[] {
  //   sort(0, nums.length - 1);
  //   return nums;

  //   function sort(left: number, right: number) {
  //     if (left === right) {
  //       // 单个元素不用排序
  //       return;
  //     }
  //     const mid = Math.floor((left + right) / 2);
  //     sort(left, mid);
  //     sort(mid + 1, right);
  //     merge(left, mid, right);
  //   }

  //   function merge(left: number, mid: number, right: number) {
  //     const temp = [];
  //     let l = left;
  //     let r = mid + 1;
  //     while (l < mid + 1 || r < right + 1) {
  //       if (l === mid + 1) {
  //         // 左侧数组已经全部合并，则将右边剩余数组直接拼接下来
  //         temp.push(nums[r]);
  //         r += 1;
  //       } else if (r === right + 1) {
  //         // 右侧数组已经全部合并，则将左边剩余数组直接拼接下来
  //         temp.push(nums[l]);
  //         l += 1;
  //       } else if (nums[l] > nums[r]) {
  //         // 左右指针两数相比取较小值，并前进指针
  //         temp.push(nums[r]);
  //         r += 1;
  //       } else {
  //         // temp[l] <= temp[r]
  //         temp.push(nums[l]);
  //         l += 1;
  //       }
  //     }
  //     // 原地更新数组
  //     for (let i = left; i <= right; i++) {
  //       nums[i] = temp[i - left];
  //     }
  //   }
  // }
  LCT.func(sortArray).auto();
})();
