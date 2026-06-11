/*
 * @lc app=leetcode.cn id=211 lang=typescript
 *
 * [211] 添加与搜索单词 - 数据结构设计
 *
 * https://leetcode.cn/problems/design-add-and-search-words-data-structure/description/
 *
 * algorithms
 * Medium (51.67%)
 * Likes:    639
 * Dislikes: 0
 * Total Accepted:    122.1K
 * Total Submissions: 236.3K
 * Testcase Example:  '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n' +
  '[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]'
 *
 * 请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。
 *
 * 实现词典类 WordDictionary ：
 *
 *
 * WordDictionary() 初始化词典对象
 * void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
 * bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些
 * '.' ，每个 . 都可以表示任何一个字母。
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入：
 *
 * ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 * [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * 输出：
 * [null,null,null,null,false,true,true,true]
 *
 * 解释：
 * WordDictionary wordDictionary = new WordDictionary();
 * wordDictionary.addWord("bad");
 * wordDictionary.addWord("dad");
 * wordDictionary.addWord("mad");
 * wordDictionary.search("pad"); // 返回 False
 * wordDictionary.search("bad"); // 返回 True
 * wordDictionary.search(".ad"); // 返回 True
 * wordDictionary.search("b.."); // 返回 True
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= word.length <= 25
 * addWord 中的 word 由小写英文字母组成
 * search 中的 word 由 '.' 或小写英文字母组成
 * 最多调用 10^4 次 addWord 和 search
 *
 *
 */

// @lc code=start
class WordDictionary {
  isEnd: boolean;
  children: Map<string, WordDictionary>;

  constructor() {
    this.isEnd = false;
    this.children = new Map();
  }

  addWord(word: string): void {
    if (word.length === 0) {
      this.isEnd = true;
      return;
    }
    const ch = word[0];
    const node = this.children.has(ch) ? this.children.get(ch)! : new WordDictionary();
    node.addWord(word.slice(1));
    this.children.set(ch, node);
  }

  search(word: string): boolean {
    if (word.length === 0) return this.isEnd;

    const ch = word[0];
    if (ch === '.') {
      const choices: Array<WordDictionary> = Array.from(this.children.values());
      return choices.some(choice => choice.search(word.slice(1)));
    } else if (!this.children.has(ch)) {
      return false;
    } else {
      return this.children.get(ch)!.search(word.slice(1));
    }
  }
}
// @lc code=end

// Tests
(() => {
  const dict = new WordDictionary();
  dict.addWord('bad');
  dict.addWord('dad');
  dict.addWord('mad');
  console.log('search pad:', dict.search('pad')); // false
  console.log('search bad:', dict.search('bad')); // true
  console.log('search .ad:', dict.search('.ad')); // true
  console.log('search b..:', dict.search('b..')); // true
  console.log('search ...:', dict.search('...')); // true
  console.log('search ..:', dict.search('..')); // false
  console.log('search .:', dict.search('.')); // false
  console.log('search ....:', dict.search('....')); // false

  // Edge: single char with wildcard
  const dict2 = new WordDictionary();
  dict2.addWord('a');
  console.log('search .:', dict2.search('.')); // true
  console.log('search a:', dict2.search('a')); // true
  console.log('search ..:', dict2.search('..')); // false
})();
