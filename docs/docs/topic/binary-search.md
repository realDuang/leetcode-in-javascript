# 二分搜索算法

`Donald Knuth`曾经说过：

> Although the basic idea of binary search is comparatively straightforward, the details can be surprisingly tricky.

二分搜索真正考察的，是你能否先把问题改写成“单调判定”：

1. 找一个确定值（`== target`）
2. 找边界（第一个满足 / 最后一个满足）
3. 找旋转数组中的信息（最小值、目标位置）
4. 在答案空间里二分（最小可行值 / 最大可行值）

本质上，二分只做一件事：用单调性把搜索区间不断缩小。

## 解题决策树

```text
拿到一道“看起来可以二分”的题
│
├─ 数组有序，目标是“是否存在某值”？
│  └─ 是 → 基础二分（命中即返回） .............. → 见「一」
│
├─ 数组有序但有重复，目标是“左/右边界”？
│  └─ 是 → 边界二分（lower/upper bound） ...... → 见「二」
│
├─ 数组是旋转有序，仍要找最小值或目标值？
│  └─ 是 → 旋转数组二分 ........................ → 见「三」
│
├─ 题目在问“最小可行值/最大可行值”？
│  └─ 是 → 判定型二分（答案空间） ............... → 见「四」
│
└─ 不是显式有序数组，但索引到值有单调关系？
  └─ 是 → 判定型二分（隐式单调） ............... → 见「四」
```

## 一、基础二分：找一个确定值

**判断关键词**：有序数组、无重复、命中即返回。

### 通用模板

```ts
function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      // 变体插桩 A：命中处理
      return mid;
    }
  }

  // 变体插桩 B：未命中返回策略
  return -1;
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[704] 二分查找` | 标准模板，命中即返回下标。 |
| `[35] 搜索插入位置` | 未命中时返回 `left`（插入点），不是 `-1`。 |
| `[69] x 的平方根` | 比较 `mid * mid` 与 `x`，注意溢出可用除法判断。 |
| `[367] 有效的完全平方数` | 与 `69` 同型，命中返回 `true`，结束返回 `false`。 |

## 二、边界二分：找第一个/最后一个满足条件的位置

**判断关键词**：有重复元素、左边界、右边界、第一个/最后一个。

边界二分的关键不是 `== target`，而是把问题改写为：

1. 左边界：找第一个 `nums[i] >= target` 的位置。
2. 右边界：找最后一个 `nums[i] <= target` 的位置。

### 2.1 左边界（lower_bound）模板

```ts
function lowerBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length; // 右开区间 [left, right)

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      // mid 可能是答案，保留左半部分
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  // 返回第一个 >= target 的下标，可能等于 nums.length
  return left;
}
```

### 2.2 右边界模板

```ts
function upperBound(nums: number[], target: number): number {
  // 第一个 > target 的位置
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left; // 最后一个 <= target 的位置是 left - 1
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[34] 在排序数组中查找元素的第一个和最后一个位置` | 左边界用 `lowerBound(target)`，右边界用 `upperBound(target)-1`。 |
| `[35] 搜索插入位置` | 直接返回 `lowerBound(target)`。 |
| `[278] 第一个错误的版本` | 本质更接近“找第一个 true”，可放到「四」统一理解。 |

## 三、旋转数组二分

**判断关键词**：旋转有序、断点、最小值、在旋转数组找目标。

旋转数组的本质：数组被分成两段有序区间。每次用 `mid` 判断哪一段有序，再决定去哪里。

### 3.1 找最小值模板

```ts
function findMin(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] > nums[right]) {
      // 最小值在右半段
      left = mid + 1;
    } else {
      // 最小值在左半段（含 mid）
      right = mid;
    }
  }

  return nums[left];
}
```

### 3.2 在旋转数组找目标模板

```ts
function searchInRotated(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) return mid;

    // 先判断哪半边有序
    if (nums[left] <= nums[mid]) {
      // 左半有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[153] 寻找旋转排序数组中的最小值` | 用 `nums[mid]` 与 `nums[right]` 比较，收缩到最小值。 |
| `[33] 搜索旋转排序数组` | 先判断哪边有序，再判断目标是否落在有序段内。 |

## 四、判定型二分：找第一个满足条件的位置

**判断关键词**：最小可行值、最大可行值、API 判定、局部单调关系、找第一个 true。

这类题的共同点是：

1. 不一定直接在“数组值”里找答案。
2. 但一定能写出一个单调的 `predicate(mid)`。
3. 目标通常是找到“第一个让 `predicate(mid)` 为 `true` 的位置”。

它和「二、边界二分」的关系很近：

1. 边界二分可以看成判定型二分在有序数组上的特例。
2. 如果 `predicate(i)` 能写成 `nums[i] >= target`，那就是 `lower_bound`。
3. 如果 `predicate(mid)` 来自可行性检查、API、局部趋势，就更适合归到这一类。

### 通用模板

```ts
function firstTrue(left: number, right: number): number {
  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (predicate(mid)) {
      // mid 已满足条件，继续压左边界
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

### 变体注释 A：答案空间二分

当 `mid` 表示“候选答案”时，通常写成：

```ts
function binarySearchAnswer(low: number, high: number): number {
  while (low < high) {
    const mid = low + ((high - low) >> 1);

    if (check(mid)) {
      // mid 可行，尝试更小的答案
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}
```

这里的 `check(mid)` 表示“答案 `mid` 是否可行”。

### 变体注释 B：隐式单调二分

当 `mid` 表示“位置 / 版本号 / 某个状态”时，通常写成：

```ts
function firstTrue(left: number, right: number): number {
  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (predicate(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
```

这里的 `predicate(mid)` 可能来自：

1. 某个 API，例如 `isBadVersion(mid)`。
2. 某种局部关系，例如比较 `nums[mid]` 和 `nums[mid + 1]`。
3. 某种索引映射后的单调判定。

题型参考（框架微调）：

| 题目 | 在模板上的插桩点 |
| ---- | ---------------- |
| `[278] 第一个错误的版本` | `predicate(mid) = isBadVersion(mid)`，本质是找第一个 true。 |
| `[875] 爱吃香蕉的珂珂` | `check(k)` = 在速度 `k` 下总耗时是否 `<= h`。 |
| `[410] 分割数组的最大值` | `check(mid)` = 能否在 `<= m` 段内完成分割。 |
| `[1011] 在 D 天内送达包裹的能力` | `check(cap)` = 以运力 `cap` 是否能在 `D` 天送完。 |
| `[162] 寻找峰值` | 用 `nums[mid]` 与 `nums[mid + 1]` 的关系确定方向。 |
| `[374] 猜数字大小` | 根据 `guess(mid)` 的返回值决定向左还是向右收缩。 |

---

## 易错点清单

1. 区间定义混乱：`[left, right]` 和 `[left, right)` 混用。
2. 循环条件写错：`left <= right` 与 `left < right` 不匹配。
3. 边界二分命中时直接返回，导致漏掉更左/更右结果。
4. `mid` 计算有溢出风险，建议 `left + ((right-left)>>1)`。
5. 结束后不做边界检查（尤其是 `left` 可能等于 `nums.length`）。

## 总结：解题速查表

| 目标 | 优先二分模式 | 关键理由 |
| ---- | ------------ | -------- |
| 找某个确定值 | 基础二分 | 命中即可返回 |
| 找第一次/最后一次出现 | 边界二分 | 本质是找满足条件的最左/最右位置 |
| 旋转有序数组查询 | 旋转数组二分 | 每轮至少有一段有序可用于剪枝 |
| 最小可行值/最大可行值 | 判定型二分 | 把问题转成 `check(mid)` 的单调判定 |
| API 判定或局部单调关系 | 判定型二分 | 本质是找第一个满足条件的位置 |
