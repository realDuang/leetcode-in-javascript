/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode-cn.com/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (35.54%)
 * Likes:    441
 * Dislikes: 0
 * Total Accepted:    35.8K
 * Total Submissions: 100.4K
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字母的最小子串。
 *
 * 示例：
 *
 * 输入: S = "ADOBECODEBANC", T = "ABC"
 * 输出: "BANC"
 *
 * 说明：
 *
 *
 * 如果 S 中不存这样的子串，则返回空字符串 ""。
 * 如果 S 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  if (s === t) return s;

  // 生成需求字符个数hash表
  const map = {};
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    map[ch] = map[ch] || 0;
    map[ch]++;
  }
  const mapLength = Object.keys(map).length;

  // 设定res的初始值，理论上需要无穷大的字符串，事实上合法返回的最长字符串就只可能是s，因此只要比s长的字符串都可以作为初始字符串
  const initRes = s + ' ';
  let res = initRes;

  // 初始化滑动窗口
  const window = {};
  // 表示滑动窗口中有多少个字符已经满足要求了
  let valid = 0;

  let left = 0;
  let right = 0;
  while (right < s.length) {
    // 取得将移入窗口的字符，之后从右扩大窗口，并针对窗口内数据进行相应更新
    const ch = s[right];
    right++;
    if (map[ch] && map[ch] > 0) {
      window[ch] = window[ch] || 0;
      window[ch]++;
      if (window[ch] === map[ch]) valid++;
    }

    while (valid === mapLength) {
      // 此处更新res
      if (right - left < res.length) {
        res = s.substring(left, right);
      }

      // 取得将移出窗口的字符，之后从左缩小窗口，并针对窗口内数据进行相应更新
      const dropCh = s[left];
      left++;
      if (map[dropCh] && map[dropCh] > 0) {
        if (window[dropCh] === map[dropCh]) valid--;
        window[dropCh]--;
      }
    }
  }

  return res === initRes ? '' : res;
};
// @lc code=end

console.log(minWindow('aasdvc', 'ac'));
