/*
 * @lc app=leetcode.cn id=283 lang=typescript
 *
 * [283] 移动零
 *
 * https://leetcode-cn.com/problems/move-zeroes/description/
 *
 * algorithms
 * Easy (64.04%)
 * Likes:    1345
 * Dislikes: 0
 * Total Accepted:    566.5K
 * Total Submissions: 884.7K
 * Testcase Example:  '[0,1,0,3,12]'
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 示例:
 *
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 *
 * 说明:
 *
 *
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  const len = nums.length;
  // 指针每次指向第一个零的位置
  let point = 0;
  for (let i = 0; i < len; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i];
      nums[i] = nums[point];
      nums[point] = temp;
      point += 1;
    }
  }
}
// @lc code=end

(() => {
  LCT.inPlace(moveZeroes).cases(
    [[[0, 1, 0, 3, 12]], [1, 3, 12, 0, 0]],
    [[[4, 2, 4, 0, 0, 3, 0, 5, 1, 0]], [4, 2, 4, 3, 5, 1, 0, 0, 0, 0]]
  );

  // function moveZeroes(nums: number[]): void {
  //   const len = nums.length;
  //   let left = 0;
  //   let right = 0;
  //   while (left < len && right < len) {
  //     while (left < len && nums[left] !== 0) left += 1;

  //     right = left + 1;
  //     while (right < len && nums[right] === 0) right += 1;

  //     if (left >= len || right >= len) break;

  //     const temp = nums[left];
  //     nums[left] = nums[right];
  //     nums[right] = temp;
  //   }
  // }
})();
