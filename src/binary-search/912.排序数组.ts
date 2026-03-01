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
    // 使得 nums[left, index-1] <= nums[index] < nums[p+1, right]
    const index = partition(left, right);
    // 之后对左右两侧的数组递归进行快排
    sort(left, index - 1);
    sort(index + 1, right);
  }

  function partition(left: number, right: number) {
    const flag = nums[left];
    let l = left + 1;
    let r = right;
    while (l <= r) {
      while (l < right && nums[l] <= flag) {
        l += 1;
      }
      while (r > left && nums[r] > flag) {
        r -= 1;
      }
      // 此时 [left, l) 所有元素都小于 flag，(r, right] 所有元素都大于 flag
      if (l >= r) {
        break;
      }
      // 此时存在 nums[l] > flag, nums[r] <= flag，因此将两者数值进行交换
      // 使得[left, l+1) 所有元素都小于 flag，(r-1, right] 所有元素都大于 flag
      swap(l, r);
    }
    // 此时l = r + 1。r 的左侧元素都小于 flag，右侧元素都大于 flag
    // 因此，r 的位置为 flag 排序后应当在的位置，做一次交换
    swap(left, r);
    // 返回元素有序的位置
    return r;
  }

  function swap(i: number, j: number) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
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
  const nums = [5, 1, 1, 2, 0, 0];
  console.log(sortArray(nums));
})();
