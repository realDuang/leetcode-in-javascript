# 回溯问题


## 排列、组合系列

这些都是最经典的回溯问题，可以从这里发现回溯解题最基本的套路，其实就是三步：**选择**、**递归**、**取消选择**。

使用 `path` 记录遍历路径，在递归执行后记得将当前选择节点取消，以复原路径。

### 集合元素唯一且不可重复选择

此种题型的集合中元素不存在重复，且在子集中每种元素仅允许取一次。

此种情况下是最基本的三步法执行套路，只要遵循选择、递归、撤销选择，整个遍历框架就已经实现了。

接下来就仅需根据题意，找到合适的时机输出当前路径即可。

例如在 `[78] 子集` 中，我们将每一次遍历的过程都输出，而在 `[77] 组合` 中，仅当路径长度等于目标长度时才输出。

```ts
function backtrack(path: number[], start: number) {
  // 根据题目条件，满足时输出结果
  ...

  for (let i = start; i < nums.length; i++) {
    // 做选择，将当前节点入栈
    path.push(nums[i]);
    // 回溯下一层级
    backtrack(path, i + 1);
    // 撤销选择
    path.pop();
  }
}
```

排列问题的套路会稍有少许不同。

由于排列情况下，可选择范围并不是当前 index 右侧的元素，而是除当前已选择节点外的所有元素，因此我们需要多一个 visited 数组来记录当前节点是否被访问过。

解法如下：

```ts
function backtrack(path: number[]) {
  if (path.length === len) {
    res.push([...path]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    // 排除掉已选择的
    if (visited[i]) continue;

    // 选择
    path.push(nums[i]);
    visited[i] = true;
    // 回溯
    backtrack(path);
    // 取消选择
    path.pop();
    visited[i] = false;
  }
}
```

题型参考：

1. `[78] 子集`
2. `[77] 组合`
3. `[46] 全排列`

### 集合元素不唯一

此种题型的集合中元素存在重复，但子集的选择中，每种元素仅允许取一次。

这一题型相比上一种，由于可能存在重复，因此需要对重复的元素在选择前进行剪枝。

为了顺利区分某元素是否重复，在算法开始前必须要进行一次排序。

这样在遍历过程中，如果遇到当前节点与前一个值相等时，则直接跳过，从而完成剪枝。

```ts
nums.sort();
...

function backtrack(path: number[], start: number) {
 // 根据题目条件，满足时输出结果
 ...

 for (let i = start; i < nums.length; i++) {
   // 剪枝，如果遇到值相同的情况，跳过
   if (i > start && nums[i] === nums[i - 1]) {
     continue;
   }
   // 选择该节点
   path.push(nums[i]);
   // 回溯
   backtrack(path, i + 1);
   // 撤销选择
   path.pop();
 }
}
```

排列问题也做类似修改即可。

```ts
nums.sort();
...

function backtrack(path: number[]) {
  if (path.length === len) {
    res.push([...path]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
      // 排除掉已选择的
      if (visited[i]) continue;
      // 当前元素和前一个元素值相同，并且前一个元素还没有被使用过的时候，剪枝
      // 保证选取元素相对位置有序，从而保证不对同一元素重复选取
      if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) {
        continue;
      }

      // 选择
      path.push(nums[i]);
      visited[i] = true;
      // 回溯
      backtrack(path);
      // 取消选择
      path.pop();
      visited[i] = false;
  }
}
```

题型参考：

1. `[90] 子集 II`
2. `[40] 组合总和 II`
3. `[47] 全排列 II`

### 集合元素可重复选择

此种题型允许子集在选择过程中对元素重复选取。

此种情形相比情形一，不需要去重，因此在回溯时，index 值不需要变化。

```ts
function backtrack(path: number[], start: number) {
  // 根据题目条件，满足时输出结果
  ...

  for (let i = start; i < nums.length; i++) {
    // 做选择，将当前节点入栈
    path.push(nums[i]);
    // 回溯下一层级
    backtrack(path, i);
    // 撤销选择
    path.pop();
  }
}
```

题型参考：

1. `[39] 组合总和`

## N 皇后问题

题型参考：

1. `[51] N 皇后`
2. `[52] N 皇后 II`
