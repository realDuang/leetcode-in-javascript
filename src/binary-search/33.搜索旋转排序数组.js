/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (36.49%)
 * Likes:    623
 * Dislikes: 0
 * Total Accepted:    97.7K
 * Total Submissions: 266K
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 *
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 *
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 *
 * 你可以假设数组中不存在重复的元素。
 *
 * 你的算法时间复杂度必须是 O(log n) 级别。
 *
 * 示例 1:
 *
 * 输入: nums = [4,5,6,7,0,1,2], target = 0
 * 输出: 4
 *
 *
 * 示例 2:
 *
 * 输入: nums = [4,5,6,7,0,1,2], target = 3
 * 输出: -1
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  if (!nums || nums.length === 0) return -1;

  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (nums[mid] >= nums[left]) {
      // 说明[left, mid]之间是有序的
      if (target < nums[mid] && target >= nums[left]) {
        // 因为[left, mid]有序，若target在左侧范围内，则一定会大于nums[left]小于nums[mid]
        right = mid - 1;
      } else {
        // 反之一定不在该本次二分的有序范围内，递归右侧
        left = mid + 1;
      }
    } else if (nums[mid] <= nums[right]) {
      // 说明[mid, right]之间是有序的
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

// @lc code=end

console.log(search([5, 6, 7, 8, 9, 2, 3, 4], 3));

// 由于题目要求时间复杂度为O(lgn)，因此必须要利用二分法来解。最容易想到的方法就是既然有序数组只旋转了一次，那么只需要先二分找到旋转起始点，然后二分查找有序数组即可。时间复杂度为O(2lgn),符合要求

// var search = function(nums, target) {
//   if (!nums || nums.length === 0) return -1;

//   // 找到旋转数组的起始位置，寻找左边界
//   let left = 0;
//   let right = nums.length;
//   let start = 0;
//   while (left < right) {
//     const mid = Math.floor((left + right) / 2);
//     if (nums[mid] > nums[mid + 1]) {
//       start = mid + 1;
//       break;
//     } else {
//       if (nums[mid] > nums[left]) {
//         left = mid + 1;
//       } else {
//         right = mid;
//       }
//     }
//   }

//   if (start === 0) {
//     // 若数组没有旋转，则数组本身有序直接二分查找即可
//     left = 0;
//     right = nums.length - 1;
//   } else {
//     if (target > nums[0]) {
//       // 若目标值比第一个数大，则目标值必在[0, start - 1]之间
//       left = 0;
//       right = start - 1;
//     } else if (target < nums[0]) {
//       // 若目标值比第一个数小，则目标值必在[start, nums.length - 1]之间
//       left = start;
//       right = nums.length - 1;
//     } else {
//       // 若目标值为第一个数，则直接返回对应位置
//       return 0;
//     }
//   }

//   // 二分查找
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     if (target === nums[mid]) {
//       return mid;
//     } else if (nums[mid] < target) {
//       left = mid + 1;
//     } else {
//       right = mid - 1;
//     }
//   }
//   return -1;
// };

// 由于有序数组只旋转一次，那么对于任意一点，一定有左侧或者右侧符合单调递增，另一侧不符合。可以利用这一特性在一次遍历中二分缩小查找比对范围。

// var search = function(nums, target) {
//   if (!nums || nums.length === 0) return -1;

//   let left = 0;
//   let right = nums.length - 1;
//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2);
//     if (target === nums[mid]) {
//       return mid;
//     } else if (nums[mid] >= nums[left]) {
//       // 说明[left, mid]之间是有序的
//       if (target < nums[mid] && target >= nums[left]) {
//         right = mid - 1;
//       } else {
//         left = mid + 1;
//       }
//     } else if (nums[mid] <= nums[right]) {
//       // 说明[mid, right]之间是有序的
//       if (target > nums[mid] && target <= nums[right]) {
//         left = mid + 1;
//       } else {
//         right = mid - 1;
//       }
//     }
//   }
//   return -1;
// };
