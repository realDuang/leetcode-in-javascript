/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (61.59%)
 * Likes:    426
 * Dislikes: 0
 * Total Accepted:    102.2K
 * Total Submissions: 165.2K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 示例 1:
 *
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 *
 * 说明:
 *
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 先对前k个数建立小顶堆，从倒数第一个非叶子节点开始堆化
  for (let i = Math.floor(k / 2) - 1; i >= 0; i--) {
    heapify(nums, i, k);
  }
  // 从第K个后遍历剩下元素，如果有元素比堆顶大，则交换两者后重新堆化，维持小顶堆的个数永远为K
  for (let i = k; i < nums.length; i++) {
    if (nums[i] >= nums[0]) {
      swap(nums, i, 0);
      heapify(nums, 0, k);
    }
  }
  // 由于小顶堆的个数为K，因此第一个元素即为数组第K大元素
  return nums[0];
};

function heapify(arr, i, len) {
  // 直到该节点没有子节点为止
  while (i * 2 + 1 < len) {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    // 取左右子节点中较小的那个与当前节点比较值
    let temp = left;
    if (right < len && arr[right] < arr[left]) {
      temp = right;
    }
    // 若当前节点值比两个子节点的值都小，则下沉停止
    if (arr[i] < arr[temp]) break;
    swap(arr, i, temp);
    // 交换后将当前位置置为子节点的位置，继续下一次下沉比较
    i = temp;
  }
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// @lc code=end

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
