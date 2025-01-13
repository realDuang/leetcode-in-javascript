/*
 * @lc app=leetcode.cn id=1456 lang=typescript
 *
 * [1456] 定长子串中元音的最大数目
 *
 * https://leetcode.cn/problems/maximum-number-of-vowels-in-a-substring-of-given-length/description/
 *
 * algorithms
 * Medium (59.44%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    80.6K
 * Total Submissions: 135.6K
 * Testcase Example:  '"abciiidef"\n3'
 *
 * 给你字符串 s 和整数 k 。
 *
 * 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
 *
 * 英文中的 元音字母 为（a, e, i, o, u）。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abciiidef", k = 3
 * 输出：3
 * 解释：子字符串 "iii" 包含 3 个元音字母。
 *
 *
 * 示例 2：
 *
 * 输入：s = "aeiou", k = 2
 * 输出：2
 * 解释：任意长度为 2 的子字符串都包含 2 个元音字母。
 *
 *
 * 示例 3：
 *
 * 输入：s = "leetcode", k = 3
 * 输出：2
 * 解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
 *
 *
 * 示例 4：
 *
 * 输入：s = "rhythms", k = 4
 * 输出：0
 * 解释：字符串 s 中不含任何元音字母。
 *
 *
 * 示例 5：
 *
 * 输入：s = "tryhard", k = 4
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 由小写英文字母组成
 * 1 <= k <= s.length
 *
 *
 */

// @lc code=start
function maxVowels(s: string, k: number): number {
  let res = 0;
  let temp = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  let l = 0;
  let r = k - 1;

  // 把0 ~ k-1 范围内的元音数统计出来
  for (let i = l; i < r; i++) {
    if (vowels.includes(s[i])) {
      temp++;
    }
  }

  // 滑动窗口
  while (r < s.length) {
    if (vowels.includes(s[r])) {
      temp++;
    }

    res = Math.max(res, temp);

    if (vowels.includes(s[l])) {
      temp--;
    }

    l++;
    r++;
  }

  return res;
}
// @lc code=end

(() => {
  const s = 'abciiidef',
    k = 3;
  console.log(maxVowels(s, k));
})();
