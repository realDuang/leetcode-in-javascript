/*
 * @lc app=leetcode.cn id=127 lang=typescript
 *
 * [127] 单词接龙
 *
 * https://leetcode.cn/problems/word-ladder/description/
 *
 * algorithms
 * Hard (48.18%)
 * Likes:    1241
 * Dislikes: 0
 * Total Accepted:    183.6K
 * Total Submissions: 381.1K
 * Testcase Example:  '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]'
 *
 * 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列 beginWord -> s1 ->
 * s2 -> ... -> sk：
 *
 *
 * 每一对相邻的单词只差一个字母。
 * 对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
 * sk == endWord
 *
 *
 * 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回 从 beginWord 到 endWord 的 最短转换序列
 * 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
 *
 *
 * 示例 1：
 *
 *
 * 输入：beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log","cog"]
 * 输出：5
 * 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
 *
 *
 * 示例 2：
 *
 *
 * 输入：beginWord = "hit", endWord = "cog", wordList =
 * ["hot","dot","dog","lot","log"]
 * 输出：0
 * 解释：endWord "cog" 不在字典中，所以无法进行转换。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= beginWord.length <= 10
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 5000
 * wordList[i].length == beginWord.length
 * beginWord、endWord 和 wordList[i] 由小写英文字母组成
 * beginWord != endWord
 * wordList 中的所有字符串 互不相同
 *
 *
 */

// @lc code=start
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;

  // 双向 BFS
  let queue1: string[] = [beginWord];
  let visited1 = new Set<string>();
  visited1.add(beginWord);
  let queue2: string[] = [endWord];
  let visited2 = new Set<string>();
  visited2.add(endWord);

  let step = 1;
  const wordSet = new Set<string>(wordList);

  while (queue1.length > 0 && queue2.length > 0) {
    // 永远选择更小的当前步骤选项集合进行 BFS，可以减少遍历次数
    if (queue1.length > queue2.length) {
      const tempQueue = queue1;
      queue1 = queue2;
      queue2 = tempQueue;
      const temp = visited1;
      visited1 = visited2;
      visited2 = temp;
    }

    let len = queue1.length;
    while (len--) {
      const curWord = queue1.shift();
      // 如果此时从一侧中遍历到的单词恰好已经被另一侧遍历过了，说明此时找到了最短路径
      if (visited2.has(curWord)) return step;

      const nextValidWords = findNextValidWords(curWord, wordSet);
      for (const nextWord of nextValidWords) {
        if (!visited1.has(nextWord)) {
          queue1.push(nextWord);
          visited1.add(nextWord);
        }
      }
    }
    step += 1;
  }
  return 0;

  function findNextValidWords(curWord: string, wordSet: Set<string>): string[] {
    const nextValidWords: string[] = [];

    // 单词集合比对遍历法，适合单词集合个数较少的情况，复杂度 word.length * wordSet.size
    for (const nextWord of wordSet) {
      let count = 0;
      for (let i = 0; i < curWord.length; i++) {
        if (curWord[i] !== nextWord[i]) {
          count += 1;
        }
        if (count > 1) break;
      }
      if (count === 1) nextValidWords.push(nextWord);
    }

    return nextValidWords;
  }
}
// @lc code=end

(() => {
  const beginWord = 'hit',
    endWord = 'cog',
    wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
  console.log(ladderLength(beginWord, endWord, wordList));
})();

// function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
//   if (!wordList.includes(endWord)) return 0;

//   const wordSet = new Set(wordList);
//   const queue: string[] = [beginWord];
//   let step = 1;

//   while (queue.length > 0) {
//     let len = queue.length;
//     while (len--) {
//       const curWord = queue.shift();
//       if (curWord === endWord) return step;

//       const nextValidWords = findNextValidWords(curWord, wordSet);
//       for (const nextWord of nextValidWords) {
//         queue.push(nextWord);
//         // 从字典中删除，避免重复访问
//         wordSet.delete(nextWord);
//       }
//     }
//     step += 1;
//   }
//   return 0;

//   function findNextValidWords(curWord: string, wordSet: Set<string>): string[] {
//     const nextValidWords: string[] = [];

//     // 单词集合比对遍历法，适合单词集合个数较少的情况，复杂度 word.length * wordSet.size
//     // for (const nextWord of wordSet) {
//     //   let count = 0;
//     //   for (let i = 0; i < curWord.length; i++) {
//     //     if (curWord[i] !== nextWord[i]) {
//     //       count += 1;
//     //     }
//     //     if (count > 1) break;
//     //   }
//     //   if (count === 1) nextValidWords.push(nextWord);
//     // }

//     // 26个字母遍历法，适合单词集合个数较多的情况，复杂度 word.length * 26
//     for (let i = 0; i < curWord.length; i++) {
//       for (let j = 97; j <= 122; j++) {
//         const nextWord = curWord.slice(0, i) + String.fromCharCode(j) + curWord.slice(i + 1);
//         if (wordSet.has(nextWord)) {
//           nextValidWords.push(nextWord);
//           wordSet.delete(nextWord);
//         }
//       }
//     }
//     return nextValidWords;
//   }
// }
