# 单调栈算法

单调栈在算法中只做一件事：用 **O(n)** 的复杂度，为数组中每个元素找到它的**前/后**方向上第一个**更大/更小**的元素。

暴力做法需要对每个位置再往左或往右扫描一遍，复杂度 `O(n²)`。当你发现题目归根到底在问"离我最近的、比我大/小的那个在哪里"，就应该想到单调栈。

## 解题决策树

```text
题目涉及"元素之间的相对大小关系"
│
├─ 需要找每个元素左/右方向第一个更大/更小元素？
│  └─ 是 → 单调栈通用模板 .................... → 见下方
│
├─ 找到边界后，需要用弹出元素计算面积/体积/贡献？
│  └─ 是 → 弹出时结算 ........................ → 见变体 B
│
├─ 数组是循环的？
│  └─ 是 → 遍历两倍长度 + 取模 ................ → 见变体 C
│
└─ 与单调性无关，只是括号匹配 / LIFO？
   └─ 是 → 普通栈，不属于本专题
```

## 核心思路

维护一个栈，栈内元素始终保持单调。遍历数组时：

1. 若当前元素**不破坏**栈的单调性 → 直接入栈。
2. 若当前元素**破坏**了单调性 → 不断弹出栈顶，直到恢复单调后再入栈。

关键在于：**弹出的瞬间**和**入栈的瞬间**各代表一种信息，根据题意选择在哪个时机更新答案。

## 通用模板

```ts
function monotonicStack(arr: number[]): number[] {
  const n = arr.length;
  const res = Array(n).fill(-1);
  const stack: number[] = []; // stores indices

  // --- variant A: change loop direction ---
  // forward  (i = 0 → n-1): finds "previous" bound
  // backward (i = n-1 → 0): finds "next" bound
  for (let i = 0; i < n; i++) {

    // --- variant B: change compare operator ---
    // >=  keeps ascending  stack → finds previous/next *smaller*
    // <=  keeps descending stack → finds previous/next *greater*
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      const top = stack.pop()!;

      // [settle on pop] — optional
      // When popped, `top` has found its right bound (i) and left bound (new stack top).
      // Useful for area/volume problems (trapping rain water, largest rectangle).
      // e.g. const left = stack.length ? stack[stack.length - 1] : -1;
      //      result += calcArea(left, top, i);
    }

    // [settle on push] — optional
    // Current stack top (if any) is the answer for arr[i].
    // Useful for "previous smaller/greater" queries.
    if (stack.length > 0) {
      res[i] = stack[stack.length - 1];
    }

    stack.push(i);
  }
  return res;
}
```

根据实际问题，只需调整两个旋钮（遍历方向、比较符号），再选择在 **pop 时结算** 还是 **push 时结算**，即可覆盖所有单调栈题型。

## 变体速查

### 变体 A — 遍历方向

| 需求 | 遍历方向 | 说明 |
| ---- | -------- | ---- |
| **上一个**更大/更小 | 正序 `i: 0 → n-1` | 入栈时，栈顶就是左边第一个满足条件的 |
| **下一个**更大/更小 | 倒序 `i: n-1 → 0` | 入栈时，栈顶就是右边第一个满足条件的 |

### 变体 B — 弹出时结算（面积/体积类问题）

接雨水、柱状图最大矩形等题，不只是要找到边界，还需要在弹出栈顶时**立即用左右边界计算贡献**。模板中 `[settle on pop]` 区域就是放这段逻辑的位置。

以接雨水（42）为例，弹出 `top` 后：

- 左边界 = 新栈顶
- 右边界 = 当前遍历位置 `i`
- 水量 = `(min(h[left], h[i]) - h[top]) * (i - left - 1)`

### 变体 C — 循环数组

当数组首尾相连时（如 503 下一个更大元素 II），将遍历长度扩展到 `2n`，索引取模即可：

```ts
for (let i = 2 * n - 1; i >= 0; i--) {
  const idx = i % n;
  while (stack.length > 0 && arr[stack[stack.length - 1]] <= arr[idx]) {
    stack.pop();
  }
  res[idx] = stack.length === 0 ? -1 : arr[stack[stack.length - 1]];
  stack.push(idx);
}
```

### 变体 D — 单调栈 + 额外约束

316 去除重复字母 / 1081 不同字符的最小子序列这类题，在单调栈基础上增加了"每个字符只能出现一次"的约束。核心仍是维护单调递增栈，但弹出前需要额外判断"后面还有没有这个字符"。

## 易错清单

1. **栈里存索引还是存值？** 绝大多数情况存**索引**，需要值时用 `arr[stack[...]]` 取。只存值会丢失位置信息，导致无法计算宽度/距离。
2. **比较用 `>=` 还是 `>`？** 取决于相等元素是否也要弹出。如果题目要求"严格大于"，用 `>=` 弹出相等的；如果允许相等，用 `>` 保留。
3. **遍历结束后栈不为空**，通常意味着这些元素没有对应的边界（前/后无更大/更小），需根据题意把它们设为默认值（-1、0、n 等）。
4. **正序 vs 倒序搞反**，直接导致求出的是"上一个"而非"下一个"，或反过来。

## 题型参考

| 题目 | 核心变体 |
| ---- | -------- |
| `[496] 下一个更大元素 I` | 倒序遍历 + 递增栈，push 时结算 |
| `[503] 下一个更大元素 II` | 变体 C 循环数组 + 倒序遍历 |
| `[739] 每日温度` | 倒序遍历 + 递增栈，记录距离差 |
| `[42] 接雨水` | 正序遍历 + 递减栈，变体 B pop 时结算水量 |
| `[84] 柱状图中最大的矩形` | 正序遍历 + 递增栈，变体 B pop 时结算面积 |
| `[316] 去除重复字母` | 变体 D 单调栈 + 字符唯一约束 |
