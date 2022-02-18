/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (36.17%)
 * Likes:    4709
 * Dislikes: 0
 * Total Accepted:    877.2K
 * Total Submissions: 2.4M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母组成
 *
 *
 */

// @lc code=start
function longestPalindrome(s: string): string {
  let res = '';
  const len = s.length;

  // 双指针思路，使用 i 遍历 s，找出以 s[i] 为中心字符，像两边扩散的最长回文串，并更新答案
  for (let i = 0; i < s.length; i++) {
    // 找到以 s[i] 为中心字符的回文串
    const subString1 = longestSubpalindrome(i, i);
    // 找到以 s[i] 与 s[i+1] 为中心字符的回文串
    const subString2 = longestSubpalindrome(i, i + 1);

    // 更新最长回文子串
    const temp = subString1.length > subString2.length ? subString1 : subString2;
    res = res.length < temp.length ? temp : res;
  }

  return res;

  function longestSubpalindrome(left: number, right: number) {
    while (left >= 0 && right < len && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }
    return s.substring(left + 1, right);
  }
}
// @lc code=end

// function longestPalindrome(s: string): string {
//   let res = '';
//   const len = s.length;
//   // 二维数组，dp[i][j] 表示 s 中 从 i 到 j 的子串是否为回文串
//   const dp: number[][] = Array(len)
//     .fill(0)
//     .map(x => Array(len).fill(0));

//   // 注意遍历顺序！
//   // 这里需要用 i 遍历 s，找到以 i 开头的子串是否为回文串，因此 i 的遍历顺序为倒序
//   for (let i = len - 1; i >= 0; i--) {
//     for (let j = i; j < len; j++) {
//       // 1. 当`j - i = 0`时，即表示当前子串为单个字符，那么一定是回文。
//       // 2. 当`j - i = 1`时，表示当前子串为临近的两个字符，那么只有他们相等时，该子串才为回文。
//       // 3. 其余情况下，当首尾两个字符相等，且去除了首尾字符后的字符串为回文时，当前子串为回文。
//       if (i === j) {
//         dp[i][j] = 1;
//       } else if (j - i === 1) {
//         dp[i][j] = s[i] === s[j] ? 1 : 0;
//       } else {
//         dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
//       }

//       // 当前子串为回文，且长度大于当前 res 时，更新结果
//       if (dp[i][j] && j - i + 1 > res.length) {
//         res = s.substring(i, j + 1);
//       }
//     }
//   }
//   return res;
// }

(() => {
  const s = 'babad';
  console.log(longestPalindrome(s));
})();
