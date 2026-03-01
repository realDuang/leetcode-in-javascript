/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 *
 * https://leetcode-cn.com/problems/single-number/description/
 *
 * algorithms
 * Easy (65.92%)
 * Likes:    1144
 * Dislikes: 0
 * Total Accepted:    171.7K
 * Total Submissions: 259.4K
 * Testcase Example:  '[2,2,1]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 *
 * 说明：
 *
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 *
 * 示例 1:
 *
 * 输入: [2,2,1]
 * 输出: 1
 *
 *
 * 示例 2:
 *
 * 输入: [4,1,2,1,2]
 * 输出: 4
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    res = res ^ nums[i];
  }
  return res;
};
// @lc code=end

// 由于题目要求时间复杂度O(n)，空间复杂度O(1)，因此不能使用排序算法，也不能使用hash-table。
// 本题使用二进制异或的性质来完成：两个数字异或 a^b 是将 a 和 b 的二进制每一位进行运算，如果同一位的数字相同则为0，不同则为1。
console.log(singleNumber([4, 10, 3, 1, 2, 1, 3, 7, 4, 10, 2]));
