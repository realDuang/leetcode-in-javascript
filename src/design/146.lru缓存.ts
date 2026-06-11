/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 *
 * https://leetcode.cn/problems/lru-cache/description/
 *
 * algorithms
 * Medium (55.44%)
 * Likes:    3796
 * Dislikes: 0
 * Total Accepted:    1.1M
 * Total Submissions: 2M
 * Testcase Example:  '["LRUCache","put","put","get","put","get","put","get","get","get"]\n' +
  '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]'
 *
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 *
 * 实现 LRUCache 类：
 *
 *
 *
 *
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组
 * key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 *
 *
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 *
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 *
 * 解释
 * LRUCache lRUCache = new LRUCache(2);
 * lRUCache.put(1, 1); // 缓存是 {1=1}
 * lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
 * lRUCache.get(1);    // 返回 1
 * lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
 * lRUCache.get(2);    // 返回 -1 (未找到)
 * lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
 * lRUCache.get(1);    // 返回 -1 (未找到)
 * lRUCache.get(3);    // 返回 3
 * lRUCache.get(4);    // 返回 4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= capacity <= 3000
 * 0 <= key <= 10000
 * 0 <= value <= 10^5
 * 最多调用 2 * 10^5 次 get 和 put
 *
 *
 */

// @lc code=start
class LRUCache {
  capacity: number;

  lastNode: DoublyListNode<{ key: number; val: number }>;
  dummy: DoublyListNode<{ key: number; val: number }>;
  hash: Map<number, DoublyListNode<{ key: number; val: number }>>;

  constructor(capacity: number) {
    this.capacity = capacity;

    this.dummy = new DoublyListNode({ key: -1, val: -1 });
    this.lastNode = this.dummy;
    this.hash = new Map();
  }

  get(key: number): number {
    const node = this.hash.get(key);
    if (!node) return -1;

    // 删掉原有位置的 node
    node.prev!.next = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.lastNode = node.prev!;

    // 将当前 node 挪到链表尾部
    node.prev = this.lastNode;
    node.next = null;
    this.lastNode.next = node;
    this.lastNode = node;

    return node.val.val;
  }

  put(key: number, value: number): void {
    // 如果之前有就删掉
    const node = this.hash.get(key);
    if (node) {
      node.val.val = value;
      node.prev!.next = node.next;
      if (node.next) node.next.prev = node.prev;
      else this.lastNode = node.prev!;

      // 挪到尾部
      node.prev = this.lastNode;
      node.next = null;
      this.lastNode.next = node;
      this.lastNode = node;
      return;
    }

    // 增加节点到尾部
    const newNode = new DoublyListNode({ key, val: value }, this.lastNode, null);
    this.lastNode.next = newNode;
    this.lastNode = newNode;
    this.hash.set(key, newNode);

    // 超长了，就删掉最久没被访问的头结点
    if (this.hash.size > this.capacity) {
      const lru = this.dummy.next!;
      this.hash.delete(lru.val.key);
      this.dummy.next = lru.next;
      if (lru.next) lru.next.prev = this.dummy;
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

(() => {
  LCT.cls(LRUCache).calls(
    ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
    [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
    [null, null, null, 1, null, -1, null, -1, 3, 4]
  );
})();
