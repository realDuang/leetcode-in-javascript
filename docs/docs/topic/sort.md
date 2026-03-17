# 排序算法

面对排序题，第一步先明确目标约束：你到底需要原地、稳定、最坏复杂度保证，还是只需要 TopK / 第 K 大这类部分有序。

## 解题决策树

```text
拿到一道排序相关题
│
├─ 只需要第 K 大 / TopK，不需要完整有序？
│  └─ 是 → 快速选择 / 堆 ................. → 见「一」「三」
│
├─ 需要稳定排序（相同元素相对次序不变）？
│  └─ 是 → 归并排序 ....................... → 见「二」
│
├─ 需要原地 + 平均性能优秀？
│  └─ 是 → 快速排序 ....................... → 见「一」
│
├─ 需要最坏 O(NlogN) 且 O(1) 额外空间？
│  └─ 是 → 堆排序 ......................... → 见「三」
│
└─ 数据范围小、值域有限（如 0/1/2、分数桶）？
   └─ 是 → 计数/桶/基数排序 ............... → 见「四」
```

## 一、快速排序与快速选择

**判断关键词**：原地排序、分区（partition）、第 K 大、不要求稳定。

快速排序本质是“选基准 + 分区”，把基准放到最终位置后递归处理左右区间。

快速选择（Quickselect）与快排同源：只递归进入“包含答案”的一侧，因此平均复杂度是 `O(N)`。

### 关键片段

```ts
function partition(left: number, right: number): number {
  const pivot = nums[left];
  let i = left + 1;
  let j = right;

  while (i <= j) {
    while (i <= right && nums[i] <= pivot) i++;
    while (j > left && nums[j] >= pivot) j--;
    if (i < j) [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  [nums[left], nums[j]] = [nums[j], nums[left]];
  return j;
}

// quicksort 形式，partition 后递归左右两侧
function sort(l: number, r: number): void {
  if (l >= r) return;
  const index = partition(l, r);
  sort(l, index - 1);
  sort(index + 1, r);
}

// quickselect 形式，其实就是快速排序，但只取一侧排序
function quickSelect(l: number, r: number): number {
  if (l >= r) return nums[l];
  const index = partition(l, r);

  if (index < target) {
    return quickSelect(index + 1, r);
  } else if (index > target) {
    return quickSelect(l, index - 1);
  }
  return nums[target];
}
```

题型参考（框架微调）：

| 题目 | 在快排/快选框架上的微调点 |
| ---- | ------------------------- |
| `[912] 排序数组` | 标准快排；工程上建议随机化基准以避免退化。 |
| `[215] 数组中的第 K 个最大元素` | 用 quickselect，只递归一侧，不做完整排序。 |
| `[75] 颜色分类` | 三路划分（<, =, >）替代普通双路 partition。 |
| `[324] 摆动排序 II` | 常见做法是先找中位数，再做三向切分 + 虚拟索引映射。 |

## 二、归并排序

**判断关键词**：稳定排序、链表排序、逆序对/跨区间统计。

归并排序是“先分后治”的代表。它的价值不止是排序本身，还在于可以在 merge 阶段顺便统计跨区间信息。

### 关键片段

```ts
function merge(left: number, mid: number, right: number): void {
  const temp: number[] = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      // 变体：在这里统计“左侧更小元素”数量（如逆序对）
      temp.push(nums[i++]);
    }
    else {
      // 变体：在这里统计“右侧更小元素”数量（如逆序对）
      temp.push(nums[j++]);
    }
  }

  // 处理剩余的 left/right，变体逻辑这里也要加一份
  while (i <= mid) {
    // 变体：在这里统计“左侧剩余元素”数量（如逆序对）
    temp.push(nums[i++]);
  }
  while (j <= right) {
    // 变体：在这里统计“右侧剩余元素”数量（如逆序对）
    temp.push(nums[j++]);
  }

  // 把 temp 写回 nums
  for (let k = 0; k < temp.length; k++) nums[left + k] = temp[k];
}

// 标准归并排序框架, 先递归分解到单元素，再合并回去
function sort(l: number, r: number) {
  if (l >= r) return;
  const mid = (l + r) >> 1;
  sort(l, mid);
  sort(mid + 1, r);

  // 变体：此时左右区间已经各自有序，可以在 merge 前后做统计
  merge(l, mid, r);
}
```

题型参考（框架微调）：

| 题目 | 在归并框架上的微调点 |
| ---- | -------------------- |
| `[912] 排序数组` | 标准归并；更稳定但需要 `O(N)` 辅助空间。 |
| `[148] 排序链表` | 链表场景优先归并，天然稳定且便于拆分合并。 |
| `[315] 计算右侧小于当前元素的个数` | 在 merge 过程中累计“右侧更小元素”计数。 |
| `[493] 翻转对` | 在 merge 前后增加双指针统计满足条件的跨区间对数。 |

## 三、堆排序与 TopK

**判断关键词**：最坏 `O(NlogN)`、原地排序、TopK、流式数据。

堆排序通过“建堆 + 反复弹堆顶”完成排序。很多题不需要完整堆排序，只需要维护一个大小为 `k` 的堆。

### 关键片段

```ts
// 从 i 位置自顶向下调整堆，保持大顶堆性质（即对于每一个子树，父节点都不小于子节点）
// 下沉调整，适用于堆顶元素被替换后恢复堆性质
// 其实就是每次将当前节点与左右子节点比较，找到最大的交换，并从交换子节点继续向下调整，直到满足堆性质或到达叶子节点
function heapifyDown(i: number, heapSize: number): void {
  while (true) {
    const left = i * 2 + 1;
    const right = left + 1;
    let largest = i;

    // 变体：如果是小顶堆，比较条件改为 < 即可
    if (left < heapSize && nums[left] > nums[largest]) largest = left;
    if (right < heapSize && nums[right] > nums[largest]) largest = right;
    if (largest === i) break;
    [nums[i], nums[largest]] = [nums[largest], nums[i]];
    i = largest;
  }
}

function sort(): void {
  // 建堆，从最后一个非叶子节点开始自底向上调整，最后一个非叶节点可以通过最后一个节点的父节点找出
  // parent = (child - 1) >> 1, lastChild = nums.length - 1
  for (let i = (nums.length - 2) >> 1; i >= 0; i--) {
    heapifyDown(i, nums.length);
  }

  // 堆排序：每次把堆顶交换到末尾，并缩小堆大小
  // 变体：TopK 场景下，不用完整排序，只需要比较前k次即可
  for (let i = nums.length - 1; i > 0; i--) {
    // 遍历元素 x：若 x > 堆顶换则替换并下沉
    [nums[0], nums[i]] = [nums[i], nums[0]];
    heapifyDown(0, i);
  }
}

// 如果是将新元素放到堆尾，一路比较上浮，使得变成大顶堆，使用 heapifyUp 函数
// 上浮调整，适用于新元素加入堆尾后恢复堆性质
// 每次将当前节点与父节点比较，如果当前节点更大（对于大顶堆），则交换，并继续向上调整，直到满足堆性质或到达根节点
function heapifyUp(i: number): void {
  while (i > 0) {
    const parent = (i - 1) >> 1;
    // 如果已满足大顶堆条件
    // 变体：如果是小顶堆，比较条件改为 >= 即可
    if (nums[i] <= nums[parent]) break;

    [nums[i], nums[parent]] = [nums[parent], nums[i]];
    i = parent;
  }
}

```

题型参考（框架微调）：

| 题目 | 在堆框架上的微调点 |
| ---- | ------------------ |
| `[912] 排序数组` | 完整堆排序：建大顶堆后将堆顶交换到数组尾部。 |
| `[215] 数组中的第 K 个最大元素` | 用大小为 `k` 的最小堆，空间 `O(k)`。 |
| `[347] 前 K 个高频元素` | 堆元素改为 `(freq, val)`，按频次比较。 |
| `[703] 数据流中的第 K 大元素` | 在线场景持续维护固定大小最小堆。 |

## 四、非比较排序（补充）

**判断关键词**：值域小、整数位数有限、线性期望复杂度。

当题目给出强约束（如元素范围很小、都是非负整数、位数有限）时，非比较排序往往比 `O(NlogN)` 更优。

1. 计数排序：值域 `[0, M]` 且 `M` 不大时可用，复杂度 `O(N + M)`。
2. 桶排序：数据分布较均匀时效果好，先分桶再桶内排序。
3. 基数排序：按位排序，适合位数固定的整数或字符串。

题型参考（框架微调）：

| 题目 | 在非比较排序框架上的微调点 |
| ---- | -------------------------- |
| `[75] 颜色分类` | 本质是 3 值计数/分区问题，可视作计数排序特例。 |
| `[164] 最大间距` | 常用桶排序思想，利用抽屉原理避免完整排序。 |
| `[912] 排序数组` | 若数据范围小，可用计数排序替代比较排序。 |

---

## 总结：解题速查表

| 目标 | 优先算法 | 关键理由 |
| ---- | -------- | -------- |
| 完整排序 + 原地 + 平均快 | 快速排序 | 常数小，工程常用 |
| 完整排序 + 稳定 | 归并排序 | 合并过程稳定可控 |
| 完整排序 + 最坏保证 | 堆排序 | `O(NlogN)` 下界稳定 |
| 第 K 大 / TopK | 快速选择 / 小根堆 | 不必完整排序 |
| 值域有限 | 计数/桶/基数 | 可做到线性级别 |
