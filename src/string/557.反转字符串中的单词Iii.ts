/*
 * @lc app=leetcode.cn id=557 lang=typescript
 *
 * [557] 反转字符串中的单词 III
 *
 * https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/description/
 *
 * algorithms
 * Easy (74.35%)
 * Likes:    383
 * Dislikes: 0
 * Total Accepted:    186.1K
 * Total Submissions: 250.3K
 * Testcase Example:  '"Let\'s take LeetCode contest"'
 *
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 *
 *
 *
 * 示例：
 *
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 *
 *
 */

// @lc code=start
function reverseWords(s: string): string {
  const words = s.split(' ');
  const reverseWords = words.map(word => {
    return word
      .split('')
      .reverse()
      .join('');
  });
  return reverseWords.join(' ');
}
// @lc code=end

(() => {
  const s = "Let's take LeetCode contest";
  console.log(reverseWords(s));
})();
