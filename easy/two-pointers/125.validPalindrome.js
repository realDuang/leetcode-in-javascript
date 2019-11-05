/*
 * @lc app=leetcode id=125 lang=javascript
 *
 * [125] Valid Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  const str = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let p1 = 0;
  let p2 = str.length - 1;
  while (p1 < p2) {
    if (str[p1] !== str[p2]) {
      return false;
    }
    p1++;
    p2--;
  }
  return true;
};
// @lc code=end

// 设置头尾双指针比对
console.log(isPalindrome('race a ecar'));
