/*
 * @lc app=leetcode.cn id=211 lang=typescript
 *
 * [211] 添加与搜索单词 - 数据结构设计
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
  console.log('search pad:', dict.search('pad'));   // false
  console.log('search bad:', dict.search('bad'));   // true
  console.log('search .ad:', dict.search('.ad'));   // true
  console.log('search b..:', dict.search('b..'));   // true
  console.log('search ...:', dict.search('...'));   // true
  console.log('search ..:', dict.search('..'));     // false
  console.log('search .:', dict.search('.'));        // false
  console.log('search ....:', dict.search('....'));  // false

  // Edge: single char with wildcard
  const dict2 = new WordDictionary();
  dict2.addWord('a');
  console.log('search .:', dict2.search('.'));       // true
  console.log('search a:', dict2.search('a'));       // true
  console.log('search ..:', dict2.search('..'));     // false
})();
