/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 *
 * https://leetcode.cn/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (75.13%)
 * Likes:    2203
 * Dislikes: 0
 * Total Accepted:    770.5K
 * Total Submissions: 1M
 * Testcase Example:  '"aab"'
 *
 * 给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a"
 * 输出：[["a"]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 16
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
function partition(s: string): string[][] {
  function isPalindrome(str: string): boolean {
    let l = 0;
    let r = str.length - 1;
    while (l < r) {
      if (str[l] !== str[r]) return false;
      l++;
      r--;
    }
    return true;
  }

  const res: string[][] = [];

  function helper(start: number, path: string[]) {
    if (start === s.length && path.length !== 0) {
      res.push([...path]);
      return;
    }
    for (let i = start + 1; i <= s.length; i++) {
      const subStr = s.substring(start, i);
      if (isPalindrome(subStr)) {
        // 做选择
        path.push(subStr);
        helper(i, path);
        // 取消选择
        path.pop();
      }
    }
  }

  helper(0, []);
  return res;
}
// @lc code=end

(() => {
  LCT.func(partition).auto();

  LCT.func(partition).cases([
    {
      input: ['abacaba'],
      output: [
        ['a', 'b', 'a', 'c', 'a', 'b', 'a'],
        ['a', 'b', 'a', 'c', 'aba'],
        ['a', 'b', 'aca', 'b', 'a'],
        ['a', 'bacab', 'a'],
        ['aba', 'c', 'a', 'b', 'a'],
        ['aba', 'c', 'aba'],
        ['abacaba']
      ]
    }
  ]);
})();
