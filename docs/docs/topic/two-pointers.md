# 双指针框架

处理双指针题时，先建立指针关系模型，比直接套题解更关键：

1. 相向而行（`left <-> right`）
2. 同向扫描（`slow -> fast`）
3. 速度差（`slow` 与 `fast=2x`）
4. 双源归并（`p1` 与 `p2`）
5. 中心扩展（`l <- center -> r`）

指针关系选对，很多 `O(N^2)` 暴力都能降到 `O(N)`。

## 解题决策树

```text
拿到一道双指针相关题
│
├─ 有序数组 / 对称结构，需要两端往中间逼近？
│  └─ 是 → 对撞指针 ........................ → 见「一」
│
├─ 链表问题，涉及环 / 中点 / 倒数第 K 个？
│  └─ 是 → 快慢指针（链表） ................. → 见「二」
│
├─ 数组原地改写（去重 / 移除 / 分区）？
│  └─ 是 → 读写指针（数组快慢） ............. → 见「三」
│
├─ 需要合并两个有序序列？
│  └─ 是 → 归并双指针 ....................... → 见「四」
│
├─ 回文/对称，需要从中心向两侧扩散？
│  └─ 是 → 中心扩展指针 ..................... → 见「五」
│
└─ 连续子数组/子串，需要维护一个合法区间？
   └─ 是 → 滑动窗口（同向双指针） ........... → 见「六」
```

## 一、对撞指针

**判断关键词**：有序数组、两端逼近、配对求和、最值面积、原地反转。

### 通用模板

```ts
function collide(nums: number[]): void {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const state = evaluate(nums, left, right);

    if (hit(state)) {
      // 变体插桩 A：收集答案 / 更新最优值
      onHit(nums, left, right);

      // 变体插桩 B：命中后的移动策略
      left++;
      right--;
    }
    else if (needBigger(state)) {
      // 当前偏小，通常移动 left
      left++;
    }
    else {
      // 当前偏大，通常移动 right
      right--;
    }

    // 变体插桩 C：去重逻辑（组合题常用）
    // while (left < right && nums[left] === nums[left - 1]) left++;
    // while (left < right && nums[right] === nums[right + 1]) right--;
  }
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[167] 两数之和 II` | `onHit` 直接返回下标对。 |
| `[15] 三数之和` | 外层先固定一个数，再进入对撞；外层和内层都要去重。 |
| `[11] 盛最多水的容器` | `evaluate` 为面积；每次移动短板侧指针。 |
| `[42] 接雨水` | 状态改为 `leftMax/rightMax`，在短板侧累加答案。 |
| `[344] 反转字符串` | `onHit` 变成交换；每轮固定双指针同时内移。 |
| `[977] 有序数组的平方` | 比较两端绝对值，从结果数组尾部回填。 |

## 二、快慢指针（链表）

**判断关键词**：环检测、入环点、中点、倒数第 K 个。

### 通用模板

```ts
function fastSlow(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    // 变体插桩 A：相遇判定
    if (slow === fast) {
      break;
    }
  }

  // 变体插桩 B：无环返回
  // if (!fast || !fast.next) return null;

  // 变体插桩 C：第二阶段逻辑
  // 重置一指针到 head，同速前进，再次相遇即目标点
  return null;
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[141] 环形链表` | 相遇即 `true`，循环结束即 `false`。 |
| `[142] 环形链表 II` | 相遇后进入第二阶段，求入环点。 |
| `[876] 链表的中间结点` | 不需要相遇分支，循环结束直接返回 `slow`。 |
| `[19] 删除链表的倒数第 N 个结点` | 改成固定间距：`fast` 先走 `n` 步后双指针同步。 |

## 三、读写指针（数组快慢）

**判断关键词**：原地修改、过滤保留、去重、移动元素。

`fast` 负责读全数组，`slow` 指向下一个可写位置。

### 通用模板

```ts
function rewriteInPlace(nums: number[]): number {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast++) {
    // 变体插桩 A：保留条件
    if (shouldKeep(nums[fast], slow, nums)) {
      // 变体插桩 B：写入策略（覆盖 or 交换）
      nums[slow] = nums[fast];
      slow++;
    }
  }

  // 变体插桩 C：收尾处理（如填充尾部）
  return slow; // 新有效长度
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[26] 删除有序数组中的重复项` | `shouldKeep` 变成“当前值不等于已写入区最后一个值”。 |
| `[27] 移除元素` | `shouldKeep` 变成“当前值不等于 val”。 |
| `[283] 移动零` | 只保留非零，写入策略改成交换可保持相对顺序。 |
| `[75] 颜色分类` | 升级为三路划分（`p0`、`cur`、`p2`）。 |

## 四、归并双指针

当输入本身就是两个有序来源时，最稳妥的线性策略就是双指针归并。

**判断关键词**：两个有序源、稳定合并、原地归并。

### 通用模板

```ts
function mergeTwoSorted(a: number[], b: number[]): number[] {
  const res: number[] = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    // 变体插桩 A：比较规则
    if (a[i] <= b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }

  // 变体插桩 B：拼接剩余部分
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);

  return res;
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[88] 合并两个有序数组` | 改为从尾部回填，避免覆盖未处理元素。 |
| `[21] 合并两个有序链表` | 把数组 push 改成链表指针重连。 |
| `[86] 分隔链表` | 变体是双链拆分再拼接，不是标准 merge。 |
| `[23] 合并 K 个升序链表` | 在二路 merge 上叠分治或最小堆。 |

## 五、中心扩展指针

这类题不从两端出发，而是先选一个中心，再向两侧验证是否还能扩张。

**判断关键词**：回文子串、中心对称、向外扩散。

### 通用模板

```ts
function expand(s: string, l: number, r: number): [number, number] {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  // 有效区间是 [l + 1, r - 1]
  return [l + 1, r - 1];
}

function solveByCenters(s: string): void {
  for (let i = 0; i < s.length; i++) {
    // 变体插桩 A：奇数中心
    const odd = expand(s, i, i);
    // 变体插桩 B：偶数中心
    const even = expand(s, i, i + 1);

    // 变体插桩 C：更新“最长”或“计数”
    updateAnswer(odd, even);
  }
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[5] 最长回文子串` | 每次取更长区间。 |
| `[647] 回文子串` | 把“取最长”改为“累计每次合法扩展数量”。 |

## 六、滑动窗口（同向双指针）

和普通双指针不同，窗口题的核心是维护“当前区间状态”，而不是枚举每个子区间。

**判断关键词**：连续区间、最长/最短、满足条件子数组。

### 通用模板

```ts
function windowTemplate(nums: number[]): void {
  let left = 0;
  const state = initState();

  for (let right = 0; right < nums.length; right++) {
    // 变体插桩 A：扩窗
    add(state, nums[right]);

    // 变体插桩 B：缩窗（按目标定义 valid / invalid）
    while (needShrink(state)) {
      remove(state, nums[left]);
      left++;
    }

    // 变体插桩 C：更新答案（长度 / 个数 / 最优值）
    updateAnswer(left, right, state);
  }
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| --- | --- |
| `[209] 长度最小的子数组` | 区间和达标就缩窗，维护最短长度。 |
| `[713] 乘积小于 K 的子数组` | 乘积超标就缩窗，按 `right-left+1` 计数。 |
| `[3] 无重复字符的最长子串` | 出现重复就缩窗，维护最长长度。 |
| `[76] 最小覆盖子串` | 先扩到覆盖，再缩到最短覆盖。 |

---

## 易错点清单

1. 指针边界条件写错（`<` 和 `<=` 混用）。
2. 去重时机写错（移动前还是移动后）。
3. 原地写入覆盖了尚未读取的数据。
4. 链表题未使用 `dummy` 导致头结点边界复杂。
5. 滑动窗口状态更新顺序前后不一致。

## 总结：解题速查表

| 目标 | 优先指针模式 | 关键理由 |
| --- | --- | --- |
| 有序数组配对 / 求和 | 对撞指针 | 单调收缩，线性排除无效解 |
| 链表环 / 入环点 | 快慢指针 | 利用速度差获取结构信息 |
| 数组原地过滤改写 | 读写指针 | `O(1)` 额外空间稳定改写 |
| 双有序源合并 | 归并双指针 | 线性稳定合并 |
| 回文中心问题 | 中心扩展指针 | 局部扩散模型天然匹配 |
| 连续区间约束 | 滑动窗口 | 扩窗+缩窗维持区间合法 |
