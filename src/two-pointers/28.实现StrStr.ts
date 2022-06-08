/*
 * @lc app=leetcode.cn id=28 lang=typescript
 *
 * [28] 实现 strStr()
 *
 * https://leetcode.cn/problems/implement-strstr/description/
 *
 * algorithms
 * Easy (40.64%)
 * Likes:    1450
 * Dislikes: 0
 * Total Accepted:    659.2K
 * Total Submissions: 1.6M
 * Testcase Example:  '"hello"\n"ll"'
 *
 * 实现 strStr() 函数。
 *
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0
 * 开始）。如果不存在，则返回  -1 。
 *
 * 说明：
 *
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 *
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf()
 * 定义相符。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：haystack = "hello", needle = "ll"
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：haystack = "aaaaa", needle = "bba"
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= haystack.length, needle.length <= 10^4
 * haystack 和 needle 仅由小写英文字符组成
 *
 *
 */

// @lc code=start
function strStr(haystack: string, needle: string): number {
  needle = ' ' + needle;
  const next = KMP(needle);

  const haystackLen = haystack.length;
  const needleLen = needle.length;

  let i = 0;
  let j = 1;
  while (i < haystackLen && j < needleLen) {
    if (j === 0 || haystack[i] === needle[j]) {
      // 若当前字符匹配成功，则进行下一字符的匹配
      i++;
      j++;
    } else {
      // 若不匹配，如果前面有已匹配字符子串，j从后缀尾回退到前缀尾，即模式串向右移动`j - next[j]`位
      j = next[j];
    }
  }

  // 若匹配成功，返回子串的起始位置，否则返回-1
  return j === needleLen ? i - j + 1 : -1;

  // 构建确定有限状态转移表next
  // 用于生成next数组。其含义为：当前字符之前的字符串中，最大公共前后缀的长度。
  // next[i] 表示，在 0~i 的字符串中，最长的相等前后缀子串长度
  //             0   j = 0
  // next[j] =   1   公共前后缀长度为0
  //             最大公共前后缀长度
  function KMP(pattern: string) {
    const next = Array(pattern.length).fill(0);
    let i = 1;
    let j = 0;

    while (i < pattern.length) {
      // pattern[j]表示前缀尾，pattern[i]表示后缀头
      if (j === 0 || pattern[i] === pattern[j]) {
        // 当needle[i] === needle[j] 时，前进指针，并更新最长相等前后缀 next[i]
        i++;
        j++;
        next[i] = j;
      } else {
        // 当needle[i] !== needle[j] 时，要找到之前相等的前后缀索引继续匹配
        // 因此
        j = next[j];
      }
    }

    return next;
  }
}
// @lc code=end

// function strStr(haystack: string, needle: string): number {
//   let start = 0;
//   let p = 0;
//   let i = 0;
//   while (i < haystack.length) {
//     if (haystack[i] !== needle[p]) {
//       start += 1;
//       p = 0;
//       i = start;
//     } else {
//       p += 1;
//       i += 1;
//     }
//     if (p === needle.length) {
//       return start;
//     }
//   }
//   return -1;
// }

(() => {
  const haystack = 'mississippi',
    needle = 'issip';
  console.log(strStr(haystack, needle));
})();
