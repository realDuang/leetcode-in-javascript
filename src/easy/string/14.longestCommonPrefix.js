/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
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
