/*
 * @lc app=leetcode.cn id=208 lang=typescript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
class Trie {
  isEnd: boolean;
  children: Map<string, Trie>;

  constructor() {
    this.isEnd = false;
    this.children = new Map();
  }

  insert(word: string): void {
    if (word.length === 0) {
      this.isEnd = true;
      return;
    }
    const ch = word[0];
    const trie = this.children.has(ch) ? this.children.get(ch)! : new Trie();
    trie.insert(word.slice(1));
    this.children.set(ch, trie);
  }

  search(word: string): boolean {
    if (word.length === 0) return this.isEnd;
    const ch = word[0];
    if (!this.children.has(ch)) return false;
    return this.children.get(ch)!.search(word.slice(1));
  }

  startsWith(prefix: string): boolean {
    if (prefix.length === 0) return true;
    const ch = prefix[0];
    if (!this.children.has(ch)) return false;
    return this.children.get(ch)!.startsWith(prefix.slice(1));
  }
}
// @lc code=end

// Tests
(() => {
  const trie = new Trie();
  trie.insert('apple');
  console.log('search apple:', trie.search('apple')); // true
  console.log('search app:', trie.search('app')); // false
  console.log('startsWith app:', trie.startsWith('app')); // true
  trie.insert('app');
  console.log('search app:', trie.search('app')); // true
  console.log('search banana:', trie.search('banana')); // false
  console.log('startsWith ban:', trie.startsWith('ban')); // false
  trie.insert('');
  console.log('search empty:', trie.search('')); // true
})();
