/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 *
 * https://leetcode-cn.com/problems/implement-strstr/description/
 *
 * algorithms
 * Easy (39.65%)
 * Likes:    409
 * Dislikes: 0
 * Total Accepted:    151.5K
 * Total Submissions: 381.9K
 * Testcase Example:  '"hello"\n"ll"'
 *
 * 实现 strStr() 函数。
 *
 * 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置
 * (从0开始)。如果不存在，则返回  -1。
 *
 * 示例 1:
 *
 * 输入: haystack = "hello", needle = "ll"
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: haystack = "aaaaa", needle = "bba"
 * 输出: -1
 *
 *
 * 说明:
 *
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 *
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
 *
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const len1 = haystack.length;
  const len2 = needle.length;
  if (len2 === 0) return 0;
  if (len1 < len2) return -1;

  for (let i = 0; i <= len1 - len2; i++) {
    let j = 0;
    while (j < len2) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }
      j++;
    }
    if (j === len2) {
      return i;
    }
  }
  return -1;
};
// @lc code=end

// 这题考察对字符串的遍历操作。判断子串不匹配时中断预测匹配，后移haystack指针进行下一次匹配。

// KMP算法
var strStr = function (haystack, needle) {
  if (needle.length === 0) return 0;

  needle = ' ' + needle;
  const next = KMP(needle);

  const len1 = haystack.length;
  const len2 = needle.length;

  let i = 0;
  let j = 1;
  while (i < len1 && j < len2) {
    if (j === 0 || haystack[i] === needle[j]) {
      // 若当前字符匹配成功，则进行下一字符的匹配
      i++;
      j++;
    } else {
      // 若不匹配，如果前面有已匹配字符子串，j从后缀尾回退到前缀尾，即模式串向右移动`j - next[j]`位
      j = next[j];
    }
  }

  // 匹配成功，返回子串的位置，否则返回-1
  return j === len2 ? i - j + 1 : -1;
};

// 构建确定有限状态转移表next
// 用于生成next数组。其含义为：当前字符之前的字符串中，最大公共前后缀的长度。
//             0   j = 0
// next[j] =   1   公共前后缀长度为0
//             最大公共前后缀长度
function KMP(pattern) {
  const next = [0, 0];
  let i = 1;
  let j = 0;

  while (i < pattern.length) {
    // pattern[j]表示前缀尾，pattern[i]表示后缀尾
    if (j === 0 || pattern[i] === pattern[j]) {
      i++;
      j++;
      next[i] = j;
    } else {
      j = next[j];
    }
  }

  return next;
}

console.log(strStr('abababaababacababaa', 'ababacababa'));
// console.log(strStr('hello', 'll'));
// console.log(strStr('aabaaacd', 'aaa'));
// console.log(strStr('mississippi', 'issip'));
