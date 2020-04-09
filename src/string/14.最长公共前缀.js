/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (34.79%)
 * Likes:    699
 * Dislikes: 0
 * Total Accepted:    122.3K
 * Total Submissions: 351.4K
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1:
 *
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 *
 *
 * 示例 2:
 *
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 *
 *
 * 说明:
 *
 * 所有输入只包含小写字母 a-z 。
 *
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length <= 0) return '';
  for (let i = 0; i < strs[0].length; i++) {
    const flag = strs.every(str => str[i] === strs[0][i]);
    if (!flag) {
      return strs[0].substring(0, i);
    }
  }
  return strs[0];
};
// @lc code=end

// easy题，没想到啥好解决方法，直接暴力遍历查询。
console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
