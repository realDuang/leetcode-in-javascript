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
  // 归并排序法
  function merge(left: number, mid: number, right: number) {
    const temp: number[] = [];
    // 将nums[lef~right]分成两半，两两依次比对，每次将较小的那个加入到临时数组中
    let i = left;
    let j = mid + 1;
    while (i <= mid && j <= right) {
      if (nums[i] <= nums[j]) temp.push(nums[i++]);
      else temp.push(nums[j++]);
    }

    // 最后至多只可能有一个子数组有剩余，且里面的元素都大于temp，直接平移挪过去
    while (i <= mid) temp.push(nums[i++]);
    while (j <= right) temp.push(nums[j++]);

    // 此时temp是已经完成排序的nums[lef~right]，直接覆盖到对应位置的值
    for (let k = 0; k < temp.length; k++) nums[left + k] = temp[k];
  }

  function sort(l: number, r: number) {
    if (l >= r) return;

    const mid = (l + r) >> 1;
    sort(l, mid);
    sort(mid + 1, r);
    merge(l, mid, r);
  }

  sort(0, nums.length - 1);
  return nums;
}
// @lc code=end

// 快速排序法
// function sort(l: number, r: number) {
//   if (l >= r) return;

//   // 对 [l, r] 进行一次快排
//   // 使得所有 nums[l, index-1] <= nums[index] < nums[p+1, r]
//   const index = partition(l, r);
//   // 之后对左右两侧的数组递归进行快排
//   sort(l, index - 1);
//   sort(index + 1, r);
// }

// // 一次快排能够达到的效果是，将数组其中一个值(pivot)的位置归位
// function partition(left: number, right: number) {
//   // 随便选取一个基准值
//   const pivot = nums[left];

//   let i = left + 1;
//   let j = right;

//   while (i <= j) {
//     // 从左侧遍历，找到比基准值大的数，从右侧找比基准值小的数
//     while (i <= right && nums[i] <= pivot) i++;
//     while (j > left && nums[j] >= pivot) j--;

//     // 此时交换两边的数，使得[left,i]都比pivot小，[j,right]都比pivot大；
//     if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
//   }
//   // 多次重复循环使得最终i=j+1，此时交换基准值和nums[j]。
//   [nums[left], nums[j]] = [nums[j], nums[left]];
//   // 从而满足：基准值pivot左侧的值都比它小，右侧的值都比它大。即 **pivot已经完全归位**。
//   // 返回已经排好序的值的位置，这个值已经不需要调整位置了，接下来从它两侧继续递归
//   return j;
// }

(() => {
  LCT.func(sortArray).auto();
})();
