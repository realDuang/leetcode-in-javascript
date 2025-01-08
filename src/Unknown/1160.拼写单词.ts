/*
 * @lc app=leetcode.cn id=1160 lang=typescript
 *
 * [1160] 拼写单词
 *
 * https://leetcode.cn/problems/find-words-that-can-be-formed-by-characters/description/
 *
 * algorithms
 * Easy (68.08%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    83.1K
 * Total Submissions: 122K
 * Testcase Example:  '["cat","bt","hat","tree"]\n"atach"'
 *
 * 给你一份『词汇表』（字符串数组） words 和一张『字母表』（字符串） chars。
 *
 * 假如你可以用 chars 中的『字母』（字符）拼写出 words 中的某个『单词』（字符串），那么我们就认为你掌握了这个单词。
 *
 * 注意：每次拼写（指拼写词汇表中的一个单词）时，chars 中的每个字母都只能用一次。
 *
 * 返回词汇表 words 中你掌握的所有单词的 长度之和。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["cat","bt","hat","tree"], chars = "atach"
 * 输出：6
 * 解释：
 * 可以形成字符串 "cat" 和 "hat"，所以答案是 3 + 3 = 6。
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["hello","world","leetcode"], chars = "welldonehoneyr"
 * 输出：10
 * 解释：
 * 可以形成字符串 "hello" 和 "world"，所以答案是 5 + 5 = 10。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 1000
 * 1 <= words[i].length, chars.length <= 100
 * 所有字符串中都仅包含小写英文字母
 *
 *
 */

// @lc code=start
function countCharacters(words: string[], chars: string): number {
  const charMap: Map<string, number> = new Map();
  for (const ch of chars) {
    const cnt = charMap.get(ch) ?? 0;
    charMap.set(ch, cnt + 1);
  }

  let res = 0;
  for (const word of words) {
    const temp = new Map(charMap);
    let flag = true;

    for (const ch of word) {
      const cnt = temp.get(ch) ?? 0;
      if (cnt > 0) {
        temp.set(ch, cnt - 1);
      } else {
        flag = false;
        break;
      }
    }

    if (flag) {
      res += word.length;
    }
  }

  return res;
}
// @lc code=end

(() => {
  const words = ['cat', 'bt', 'hat', 'tree'],
    chars = 'atach';
  console.log(countCharacters(words, chars));
  // Output: 6
  // Explanation:
  // You can form "cat" and "hat" from chars, so the answer is 3 + 3 = 6.
})();
