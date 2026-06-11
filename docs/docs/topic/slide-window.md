# 滑动窗口算法

滑动窗口真正要训练的，不是记住几段代码，而是先把题目改写成：

1. 维护一个连续区间 `[left, right)`（左闭右开）。
2. 用少量状态描述这个区间是否满足要求。
3. 每次只让一个元素进窗口、一个元素出窗口。
4. 在移动过程中更新答案。

它本质上是“同向双指针 + 区间状态维护”。

很多暴力解法会枚举所有子数组 / 子串，再判断是否合法，复杂度通常是 `O(n^2)`。如果题目只关心**连续区间**，并且窗口状态能在元素进出时被增量维护，那就应该优先想到滑动窗口。

## 解题决策树

```text
拿到一道连续子数组 / 子串题
│
├─ 窗口长度固定为 k？
│  └─ 是 → 定长滑动窗口 ........................ → 见「一」
│
├─ 目标是“最长”，并且窗口不合法时需要缩小？
│  └─ 是 → 最长合法窗口 ........................ → 见「二」
│
├─ 目标是“最短 / 最小覆盖”，并且窗口一旦合法就继续压缩？
│  └─ 是 → 最短覆盖窗口 ........................ → 见「三」
│
├─ 目标是统计“满足条件的子数组 / 子串个数”？
│  └─ 是 → 计数型滑动窗口 ........................ → 见「四」
│
└─ 虽然是连续区间，但窗口状态无法 O(1) 增量维护？
   └─ 是 → 可能不适合滑窗，考虑前缀和 / 单调队列 / 二分等
```

## 一、定长滑动窗口

**判断关键词**：长度固定、大小为 `k` 的子数组、平均值、最大和、异位词匹配。

这类题最稳定，因为窗口长度不会变。核心只是在每轮：

1. 右边加入新元素。
2. 如果窗口超过 `k`，左边移出旧元素。
3. 当窗口长度恰好为 `k` 时更新答案。

### 通用模板

```ts
function fixedWindow(nums: number[], k: number): void {
  let left = 0;
  let right = 0;
  const state = initState();

  while (right < nums.length) {
    // expand: add right element
    const el = nums[right];
    right++;

    add(state, el);

    // shrink: window exceeds k
    if (right - left > k) {
      remove(state, nums[left]);
      left++;
    }

    // update: window size equals k
    if (right - left === k) {
      updateAnswer(left, right, state);
    }
  }
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[643] 子数组最大平均数 I` | `state` 维护窗口和，窗口满 `k` 时更新最大值。 |
| `[438] 找到字符串中所有字母异位词` | `state` 维护字符频次，窗口长度等于 `p.length` 时判断是否匹配。 |
| `[567] 字符串的排列` | 与 `438` 同型，命中后直接返回 `true`。 |

## 二、最长合法窗口

**判断关键词**：最长、最多、至多、无重复、窗口一旦不合法就缩小。

这类题的套路是：

1. 先不断扩张右边界。
2. 如果窗口不合法，就不断缩小左边界，直到重新合法。
3. 每轮结束后，当前窗口通常就是“以 `right` 结尾的最长合法窗口”，此时更新答案。

### 通用模板

```ts
function longestWindow(nums: number[]): number {
  let left = 0;
  let right = 0;
  let ans = 0;
  const state = initState();

  while (right < nums.length) {
    // expand: add right element
    const el = nums[right];
    right++;

    add(state, el);

    // shrink: window is invalid
    while (needShrink(state)) {
      remove(state, nums[left]);
      left++;
    }

    // update: window is valid again
    ans = Math.max(ans, right - left);
  }

  return ans;
}
```

`needShrink(state)` 通常表示“当前窗口不合法”，例如：

1. 出现重复字符。
2. 某个元素出现次数超过允许值。
3. 代价 / 成本 / 替换次数超过上限。

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[3] 无重复字符的最长子串` | `needShrink` = 当前字符出现次数大于 `1`。 |
| `[904] 水果成篮` | `needShrink` = 窗口内不同元素种类数大于 `2`。 |
| `[1004] 最大连续1的个数 III` | `needShrink` = 窗口内 `0` 的个数大于 `k`。 |
| `[424] 替换后的最长重复字符` | `needShrink` = 窗口长度减去最高频字符数大于 `k`。 |

## 三、最短覆盖窗口

**判断关键词**：最短、最小覆盖、刚满足条件、窗口一旦合法就继续压缩。

这类题和“最长合法窗口”正好相反：

1. 先扩张右边界，直到窗口第一次满足要求。
2. 一旦满足，就尽量缩小左边界，看看能不能得到更短答案。
3. 缩到即将不合法为止，再继续扩张右边界。

### 通用模板

```ts
function minWindowTemplate(s: string): string {
  let left = 0;
  let right = 0;
  let bestLeft = 0;
  let bestLen = Infinity;
  const state = initState();

  while (right < s.length) {
    // expand: add right element
    const ch = s[right];
    right++;

    add(state, ch);

    // shrink: window is valid, keep compressing
    while (isValid(state)) {
      if (right - left < bestLen) {
        bestLen = right - left;
        bestLeft = left;
      }

      remove(state, s[left]);
      left++;
    }
  }

  return bestLen === Infinity ? "" : s.slice(bestLeft, bestLeft + bestLen);
}
```

这里的关键不是“窗口合法时立刻停下”，而是：

1. 合法后先记录答案。
2. 然后继续缩，逼出更短的合法区间。

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[76] 最小覆盖子串` | `isValid` = 当前窗口已经覆盖 `t` 的所有字符需求。 |
| `[209] 长度最小的子数组` | `isValid` = 窗口和大于等于 `target`。 |

## 四、计数型滑动窗口

**判断关键词**：有多少个、统计子数组个数、统计子串个数。

这类题最容易卡住的点，不是窗口怎么移动，而是**为什么一次可以贡献很多答案**。

通常有两种经典模型。

### 4.1 至多型计数：`atMost(k)`

如果题目满足“窗口越小越容易合法”，那么可以先求：

1. 至多 `k` 个不同字符。
2. 至多 `k` 个奇数。
3. 至多 `k` 次替换 / 翻转。

此时模板通常是：窗口不合法就缩，合法后把“以 `right` 结尾的所有合法窗口”一次加入答案。

```ts
function countAtMost(nums: number[], k: number): number {
  let left = 0;
  let right = 0;
  let ans = 0;
  const state = initState();

  while (right < nums.length) {
    // expand: add right element
    const el = nums[right];
    right++;

    add(state, el);

    // shrink: window is invalid
    while (needShrink(state)) {
      remove(state, nums[left]);
      left++;
    }

    // count: all valid windows ending at right - 1
    ans += right - left;
  }

  return ans;
}
```

为什么是 `right - left`？
因为 `right` 已经自增，当前窗口为 `[left, right)`，合法窗口为：`[left, right)`、`[left + 1, right)`、...、`[right - 1, right)`，共 `right - left` 个。

常见技巧：

```ts
exactly(k) = atMost(k) - atMost(k - 1)
```

题型参考：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[992] K 个不同整数的子数组` | 先写 `atMost(k)`，再做差。 |
| `[1248] 统计「优美子数组」` | 把“奇数个数至多 `k`”写成 `atMost(k)`。 |

### 4.2 满足后收缩型计数

另一类题是：窗口一旦满足条件，就不断缩左边界，并把缩窗过程中产生的信息累加到答案里。

这类题通常需要额外思考“当前这个 `right` 对答案的贡献是什么”，没有统一到一行公式，但核心流程仍然一样：

1. 扩张右边界直到满足条件。
2. 在缩小左边界的过程中统计贡献。
3. 把贡献累加到总答案。

题型参考：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[1358] 包含所有三种字符的子字符串数目` | 一旦窗口包含 `a`、`b`、`c`，当前 `left` 之前的起点都可贡献答案。 |
| `[713] 乘积小于 K 的子数组` | 本质可看成"至多型计数"，合法后同样累加 `right - left`。 |

## 五、滑动窗口真正要想清楚的 3 个问题

无论题目长什么样，最后都要落到这 3 个问题：

1. `state` 维护什么？
例如：频次数组、窗口和、不同元素个数、最大频次、零的数量。

2. 什么时候缩窗？
也就是 `needShrink(state)` 或 `isValid(state)` 的定义。

3. 在什么时机更新答案？
通常有 3 种：
- 窗口长度恰好等于 `k` 时更新。
- 窗口重新合法后更新“最长”。
- 窗口刚合法时反复缩窗，更新“最短”或累计“个数”。

如果这 3 个问题都能回答清楚，代码基本就写出来了。

## 易错点清单

1. 区间定义不统一：模板统一使用 `[left, right)` 左闭右开，`right` 先自增再操作，窗口大小为 `right - left`。
2. 扩窗和缩窗时忘记同步更新 `state`。
3. 更新答案的时机不对，导致少算或多算。
4. 把“最长合法窗口”和“最短覆盖窗口”的缩窗逻辑写反。
5. 计数题不知道为什么能一次加上 `right - left`。
6. 用对象统计频次时，字符减到 `0` 后忘记处理，导致种类数判断错误。

## 总结：解题速查表

| 目标 | 优先滑窗模式 | 关键理由 |
| ---- | ------------ | -------- |
| 固定长度区间最值 / 判断 | 定长滑动窗口 | 窗口大小固定，按进一出一维护状态 |
| 最长满足条件的区间 | 最长合法窗口 | 不合法就缩，合法后更新最大长度 |
| 最短满足条件的区间 | 最短覆盖窗口 | 一旦合法就继续压缩，逼近最优答案 |
| 统计满足条件的区间个数 | 计数型滑动窗口 | 每个 `right` 往往能一次贡献多个窗口 |
| 无法增量维护窗口状态 | 不一定适合滑窗 | 需要考虑其他数据结构或算法 |
