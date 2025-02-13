/*
 * @lc app=leetcode.cn id=87 lang=typescript
 *
 * [87] 扰乱字符串
 *
 * https://leetcode.cn/problems/scramble-string/description/
 *
 * algorithms
 * Hard (47.08%)
 * Likes:    586
 * Dislikes: 0
 * Total Accepted:    67.8K
 * Total Submissions: 143.8K
 * Testcase Example:  '"great"\n"rgeat"'
 *
 * 使用下面描述的算法可以扰乱字符串 s 得到字符串 t ：
 *
 * 如果字符串的长度为 1 ，算法停止
 * 如果字符串的长度 > 1 ，执行下述步骤：
 *
 * 在一个随机下标处将字符串分割成两个非空的子字符串。即，如果已知字符串 s ，则可以将其分成两个子字符串 x 和 y ，且满足 s = x + y
 * 。
 * 随机 决定是要「交换两个子字符串」还是要「保持这两个子字符串的顺序不变」。即，在执行这一步骤之后，s 可能是 s = x + y 或者 s = y +
 * x 。
 * 在 x 和 y 这两个子字符串上继续从步骤 1 开始递归执行此算法。
 *
 *
 *
 *
 * 给你两个 长度相等 的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。如果是，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "great", s2 = "rgeat"
 * 输出：true
 * 解释：s1 上可能发生的一种情形是：
 * "great" --> "gr/eat" // 在一个随机下标处分割得到两个子字符串
 * "gr/eat" --> "gr/eat" // 随机决定：「保持这两个子字符串的顺序不变」
 * "gr/eat" --> "g/r / e/at" // 在子字符串上递归执行此算法。两个子字符串分别在随机下标处进行一轮分割
 * "g/r / e/at" --> "r/g / e/at" // 随机决定：第一组「交换两个子字符串」，第二组「保持这两个子字符串的顺序不变」
 * "r/g / e/at" --> "r/g / e/ a/t" // 继续递归执行此算法，将 "at" 分割得到 "a/t"
 * "r/g / e/ a/t" --> "r/g / e/ a/t" // 随机决定：「保持这两个子字符串的顺序不变」
 * 算法终止，结果字符串和 s2 相同，都是 "rgeat"
 * 这是一种能够扰乱 s1 得到 s2 的情形，可以认为 s2 是 s1 的扰乱字符串，返回 true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "abcde", s2 = "caebd"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：s1 = "a", s2 = "a"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * s1.length == s2.length
 * 1
 * s1 和 s2 由小写英文字母组成
 *
 *
 */

// @lc code=start
function isScramble(s1: string, s2: string): boolean {
  if (s1 === s2) return true;
  if (s1.length !== s2.length) return false;
  const s1len = s1.length;

  const dp: number[][][] = Array(s1len)
    .fill(0)
    .map(x =>
      Array(s1len)
        .fill(0)
        .map(x => Array(s1len + 1).fill(0))
    );

  return dfs(0, 0, s1len);

  // 设s1 的分割点为 i，s2 的分割点为 j，比较后面长度为 len 的字符串
  function dfs(i: number, j: number, len: number): boolean {
    // 如果已经计算过该情况，直接返回结果
    if (dp[i][j][len] !== 0) return dp[i][j][len] === 1;

    const a = s1.substring(i, i + len),
      b = s2.substring(j, j + len);

    if (a === b) {
      dp[i][j][len] = 1;
      return true;
    }
    if (!checkFrequency(a, b)) {
      dp[i][j][len] = -1;
      return false;
    }

    // 若 a 和 b 的值不相等，但词频相同，则需要判断是否扰乱
    // 从 s1和 s2 往后 1 位开始比较到 len-1 位
    for (let k = 1; k < len; k++) {
      // 如果未发生扰乱
      if (dfs(i, j, k) && dfs(i + k, j + k, len - k)) {
        dp[i][j][len] = 1;
        return true;
      }

      // 如果发生了扰乱
      if (dfs(i, len - k + j, k) && dfs(i + k, j, len - k)) {
        dp[i][j][len] = 1;
        return true;
      }
    }

    // 以上所有情况都不成立，则标记为不可行
    dp[i][j][len] = -1;
    return false;
  }
}

// 检查两个字符串的词频是否一致
function checkFrequency(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false;

  const arr: number[] = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    const s1chIndex = s1[i].charCodeAt(0) - 97;
    arr[s1chIndex] += 1;
    const s2chIndex = s2[i].charCodeAt(0) - 97;
    arr[s2chIndex] -= 1;
  }

  return arr.every(x => x === 0);
}
// @lc code=end

(() => {
  const s1 = 'great',
    s2 = 'rgeat';
  console.log(isScramble(s1, s2));
})();

// 如题意的暴力递归搜索方式
// function isScramble(s1: string, s2: string): boolean {
//   if (s1 === s2) return true;
//   if (s1.length !== s2.length) return false;
//   if (!checkFrequency(s1, s2)) return false;

//   const len = s1.length;

//   // 设分割点位置为 i
//   for (let i = 1; i < len; i++) {
//     const x = s1.substring(0, i);
//     const y = s1.substring(i);

//     // 第一种，分割不交换位置的情况
//     const l1 = s2.substring(0, i);
//     const r1 = s2.substring(i);
//     if (isScramble(x, l1) && isScramble(y, r1)) return true;

//     //  第二种，分割交换位置的情况，此时 s2 的分割点为 len-i
//     const l2 = s2.substring(0, len - i);
//     const r2 = s2.substring(len - i);
//     if (isScramble(x, r2) && isScramble(y, l2)) return true;
//   }

//   return false;
//
// // 检查两个字符串的词频是否一致
// function checkFrequency(s1: string, s2: string): boolean {
//   if (s1.length !== s2.length) return false;

//   const arr: number[] = new Array(26).fill(0);

//   for (let i = 0; i < s1.length; i++) {
//     const s1chIndex = s1[i].charCodeAt(0) - 97;
//     arr[s1chIndex] += 1;
//     const s2chIndex = s2[i].charCodeAt(0) - 97;
//     arr[s2chIndex] -= 1;
//   }

//   return arr.every(x => x === 0);
// }
