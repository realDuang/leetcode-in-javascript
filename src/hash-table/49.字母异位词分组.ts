/*
 * @lc app=leetcode.cn id=49 lang=typescript
 *
 * [49] 字母异位词分组
 *
 * https://leetcode.cn/problems/group-anagrams/description/
 *
 * algorithms
 * Medium (68.80%)
 * Likes:    2204
 * Dislikes: 0
 * Total Accepted:    1M
 * Total Submissions: 1.5M
 * Testcase Example:  '["eat","tea","tan","ate","nat","bat"]'
 *
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 *
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 示例 2:
 *
 *
 * 输入: strs = [""]
 * 输出: [[""]]
 *
 *
 * 示例 3:
 *
 *
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 10^4
 * 0 <= strs[i].length <= 100
 * strs[i] 仅包含小写字母
 *
 *
 */

// @lc code=start
function groupAnagrams(strs: string[]): string[][] {
  const map: Map<string, string[]> = new Map();

  for (const str of strs) {
    const temp = Array(26).fill(0);
    for (const ch of str) {
      const index = ch.charCodeAt(0) - 97;
      temp[index] += 1;
    }
    const key = temp.join(',');
    const group = map.get(key);
    if (group) {
      group.push(str);
    } else {
      map.set(key, [str]);
    }
  }

  return Array.from(map.values());
}
// @lc code=end

(() => {
  const normalize = (groups: string[][]): string[][] =>
    groups.map(group => [...group].sort()).sort((a, b) => (a.join(',') < b.join(',') ? -1 : 1));

  LCT.func(groupAnagrams).auto({
    judge: (actual: string[][], expected: string[][]) =>
      JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected))
  });
})();
