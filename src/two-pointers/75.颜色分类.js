/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 *
 * https://leetcode-cn.com/problems/sort-colors/description/
 *
 * algorithms
 * Medium (54.69%)
 * Likes:    384
 * Dislikes: 0
 * Total Accepted:    71.1K
 * Total Submissions: 130K
 * Testcase Example:  '[2,0,2,1,1,0]'
 *
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 *
 * 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 *
 * 注意:
 * 不能使用代码库中的排序函数来解决这道题。
 *
 * 示例:
 *
 * 输入: [2,0,2,1,1,0]
 * 输出: [0,0,1,1,2,2]
 *
 * 进阶：
 *
 *
 * 一个直观的解决方案是使用计数排序的两趟扫描算法。
 * 首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let p1 = 0;
  let p2 = nums.length - 1;
  let cur = p1;
  while (cur <= p2) {
    if (nums[cur] === 0) {
      const temp = nums[cur];
      nums[cur] = nums[p1];
      nums[p1] = temp;
      p1++;
      cur++;
    } else if (nums[cur] === 2) {
      const temp = nums[cur];
      nums[cur] = nums[p2];
      nums[p2] = temp;
      p2--;
    } else {
      cur++;
    }
  }
};
// @lc code=end

// 这是一道原地算法，并且只遍历一遍数组，因此考虑用首尾双指针解题。
// 由于总共只有三个数的排序，因此遍历数组时，遇到0向左边指针交换，2向右边指针交换即可。因此在遍历过的数字中，首指针永远指向第一个不为0的位置，尾指针永远指向最后一个不为2的位置。
// 这里面的核心思想跟快速排序有点像，都是首尾指针与目标位置交换。不过由于总共只有三个数，因此在循环内即可完成最终位置交换，不需要再递归子数组了。

const arr = [2, 1, 0, 2, 2, 1, 0, 0, 1, 1, 2];
sortColors(arr);
console.log(arr);
