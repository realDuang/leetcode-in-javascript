/*
 * @lc app=leetcode.cn id=763 lang=typescript
 *
 * [763] 划分字母区间
 *
 * https://leetcode.cn/problems/partition-labels/description/
 *
 * algorithms
 * Medium (79.03%)
 * Likes:    1424
 * Dislikes: 0
 * Total Accepted:    521.9K
 * Total Submissions: 660.5K
 * Testcase Example:  '"ababcbacadefegdehijhklij"'
 *
 * 给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。例如，字符串 "ababcc" 能够被分为 ["abab",
 * "cc"]，但类似 ["aba", "bcc"] 或 ["ab", "ab", "cc"] 的划分是非法的。
 *
 * 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。
 *
 * 返回一个表示每个字符串片段的长度的列表。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：
 * 划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
 * 每个字母最多出现在一个片段中。
 * 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
 *
 * 示例 2：
 *
 *
 * 输入：s = "eccbbbbdec"
 * 输出：[10]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 500
 * s 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
function partitionLabels(s: string): number[] {
  const charMap: Map<string, number[]> = new Map();
  const res: number[] = [];

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!charMap.get(ch)) {
      charMap.set(ch, []);
    }
    charMap.get(ch)!.push(i);
  }

  const charSet = Array.from(charMap.values());

  let begin = 0;
  let end = 0;
  for (const set of charSet) {
    const left = set[0];
    const right = set[set.length - 1];

    // 与当前区间有交集则区间取并集
    if (left <= end) {
      end = Math.max(end, right);
    } else {
      // 与当前集合没有交集，则旧区间计算长度，并新开区间
      res.push(end - begin + 1);
      begin = left;
      end = right;
    }
  }

  res.push(end - begin + 1);

  return res;
}
// @lc code=end

(() => {
  LCT.func(partitionLabels).auto();
})();
