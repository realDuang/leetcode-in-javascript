/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 *
 * https://leetcode-cn.com/problems/jump-game-ii/description/
 *
 * algorithms
 * Hard (31.37%)
 * Likes:    392
 * Dislikes: 0
 * Total Accepted:    35.5K
 * Total Submissions: 105.9K
 * Testcase Example:  '[2,3,1,1,4]'
 *
 * 给定一个非负整数数组，你最初位于数组的第一个位置。
 * 
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
 * 
 * 示例:
 * 
 * 输入: [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 * 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 * 
 * 
 * 说明:
 * 
 * 假设你总是可以到达数组的最后一个位置。
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  if (nums.length <= 1) return 0;
  let res = 0;
  let i = 0;
  for (let cur = 0; cur < nums.length - 1; res++) {
    console.log(cur);
    const temp = cur;
    while (i <= temp) {
      cur = Math.max(cur, i + nums[i]);
      i++;
    }
    if (temp === cur) return -1;
  }
  return res;
};
// @lc code=end

console.log(jump([2, 3, 1, 1, 4, 1]));

// 这道题使用的核心方法是贪婪法。从第一个点开始，贪婪它所能到达的最远位置，并存下来，并预测这两个位置之间是否有下一跳能达到更远位置的点，如果没有则取这一跳的结果位置，如果有则取下一跳能达到更远的点，并在该位置进行下一次上述计算。直到当前位置已经到数组尾。
// 这里要注意的一点是，若一次计算后，下一跳的值没有发生变化的话，说明没有任何一跳能到达数组尾，返回-1。