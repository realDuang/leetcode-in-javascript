# 前缀和算法

前缀和只做一件事：通过 **O(n)** 预处理，将任意"连续区间的聚合查询"降到 **O(1)**。

核心等式：`sum(l, r) = preSum[r + 1] - preSum[l]`。一次减法代替一次遍历——当你发现题目反复在问"某段子数组的和 / 积 / 异或"，就应该想到前缀和。

## 解题决策树

```text
题目涉及"连续子数组的区间聚合"
│
├─ 需要多次查询任意区间和？
│  └─ 是 → 一维前缀和 ........................ → 见「一」
│
├─ 需要统计"和为 k 的子数组个数"或类似计数？
│  └─ 是 → 前缀和 + 哈希计数 .................. → 见「二」
│
├─ 区间是二维矩形？
│  └─ 是 → 二维前缀和 ........................ → 见「三」
│
├─ 不是查询区间和，而是"对区间做批量加减"？
│  └─ 是 → 差分数组（前缀和的逆运算） ........ → 见「四」
│
└─ 数组元素会动态修改，又需要区间查询？
   └─ 是 → 树状数组 / 线段树，不属于本专题
```

## 一、一维前缀和

**判断关键词**：区间和、O(1) 查询、子数组求和。

预处理一个长度为 `n + 1` 的数组，使得 `preSum[i]` 等于原数组前 `i` 个元素之和。之后任意区间 `[l, r]` 的和只需一次减法。

### 通用模板

```ts
function buildPrefixSum(nums: number[]): number[] {
  const n = nums.length;
  const preSum = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  return preSum;
}

// query: sum of nums[left..right]
function rangeSum(preSum: number[], left: number, right: number): number {
  return preSum[right + 1] - preSum[left];
}
```

## 二、前缀和 + 哈希计数

**判断关键词**：和为 k 的子数组个数、可被 k 整除的子数组。

单纯的前缀和能回答"这段区间的和是多少"，但当问题变成"有多少段区间的和等于 k"时，需要搭配哈希表记录已出现的前缀和。

核心思路：遍历到位置 `i` 时，当前前缀和为 `cur`，若之前存在前缀和 `cur - k`，说明中间那段区间的和恰好为 `k`。

### 哈希计数模板

```ts
function subarraySumCount(nums: number[], k: number): number {
  const map = new Map<number, number>();
  map.set(0, 1); // empty prefix
  let cur = 0;
  let count = 0;

  for (const num of nums) {
    cur += num;
    // --- variant: change `cur - k` to other targets ---
    // e.g. for "divisible by k", use (cur % k + k) % k as key
    count += map.get(cur - k) ?? 0;
    map.set(cur, (map.get(cur) ?? 0) + 1);
  }
  return count;
}
```

> **为什么不能用滑动窗口？** 当数组允许负数时，窗口扩展/收缩无法保证区间和的单调性——缩小窗口不一定使和减小。前缀和 + 哈希没有单调性要求，因此是更通用的方案。

## 三、二维前缀和

**判断关键词**：矩形区域和、二维子矩阵求和。

将一维的思路扩展到二维。`preSum[r][c]` 表示从 `(0,0)` 到 `(r-1,c-1)` 的矩形区域元素总和。查询任意矩形 `(r1,c1)-(r2,c2)` 使用容斥原理：

`area = preSum[r2+1][c2+1] - preSum[r1][c2+1] - preSum[r2+1][c1] + preSum[r1][c1]`

### 二维构建与查询模板

```ts
function build2DPrefixSum(matrix: number[][]): number[][] {
  const m = matrix.length;
  const n = matrix[0].length;
  const pre = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      pre[r + 1][c + 1] =
        matrix[r][c] + pre[r][c + 1] + pre[r + 1][c] - pre[r][c];
    }
  }
  return pre;
}

function rangeSum2D(
  pre: number[][],
  r1: number, c1: number,
  r2: number, c2: number
): number {
  return pre[r2 + 1][c2 + 1] - pre[r1][c2 + 1] - pre[r2 + 1][c1] + pre[r1][c1];
}
```

## 四、差分数组

**判断关键词**：对区间 `[l, r]` 批量加减、多次区间修改后求最终数组。

差分是前缀和的逆运算。对差分数组 `diff` 做一次前缀和还原即得到原数组。当需要对 `[l, r]` 整体加 `val` 时，只需 `diff[l] += val; diff[r + 1] -= val`，最后一次性还原。

### 差分模板

```ts
function applyRangeUpdates(
  n: number,
  updates: [left: number, right: number, val: number][]
): number[] {
  const diff = Array(n + 1).fill(0);
  for (const [l, r, val] of updates) {
    diff[l] += val;
    diff[r + 1] -= val;
  }
  // restore original array via prefix sum
  const res = Array(n);
  res[0] = diff[0];
  for (let i = 1; i < n; i++) {
    res[i] = res[i - 1] + diff[i];
  }
  return res;
}
```

## 易错清单

1. **前缀和数组长度是 `n + 1`，不是 `n`**。`preSum[0] = 0` 代表空前缀，漏掉它会导致 `rangeSum(0, r)` 越界。
2. **哈希表初始化要放 `(0, 1)`**。表示"空前缀和为 0 出现过 1 次"，否则从索引 0 开始的合法子数组会被漏掉。
3. **二维容斥加错符号**。画一个 2×2 的格子手推一遍，确认"减去两条边、加回重叠角"。
4. **差分数组 `diff[r + 1]` 越界**。数组大小应为 `n + 1`，或者在 `r + 1 < n` 时才减。

## 题型参考

| 题目 | 核心技法 |
| ---- | -------- |
| `[303] 区域和检索 - 数组不可变` | 一维前缀和，O(1) 区间查询 |
| `[304] 二维区域和检索 - 矩形区域` | 二维前缀和 + 容斥原理 |
| `[560] 和为 K 的子数组` | 前缀和 + 哈希计数 |
| `[930] 和相同的二元子数组` | 前缀和 + 哈希计数（0-1 数组变体） |
| `[238] 除自身以外数组的乘积` | 前缀积 + 后缀积（前缀和思想的乘法推广） |
| `[307] 区域和检索 - 数组可修改` | 树状数组（前缀和 + 动态更新，进阶） |
