# 二分搜索专题

 对于二分法，`Donald Knuth`曾经说过：

> Although the basic idea of binary search is comparatively straightforward, the details can be surprisingly tricky.

尽管二分法理解起来很简单，但是在实现上确实会有许多隐藏的坑点。而恰恰就是这些坑点，使得我们日常写的二分的程序里总是出 bug。

因此，理解二分的具体实现方式非常重要，我们可以根据场景，灵活的选择恰当的二分法来实现。

二分法需要抉择的两个部分在于：**搜索的终止条件**，以及**新搜索范围的确立**。

我们可以带着这两个问题，看下实际的题目中该如何判断。

## 数组元素无重复的二分查找

[704. 二分查找](https://leetcode-cn.com/problems/binary-search/) 中，我们可以看到二分查找的基本形态：数组**有序**且元素**不重复**。

由于元素不重复，因此只要找到相等的元素一次，即可返回内容，否则当前指针位置不需要记录，直接转移即可。

因此，我们选用全闭区间的 [left, right] 的二分查找思路。

当发现结果 mid 与 target 不匹配时，直接将边界移动到结果 mid 的左侧或右侧，以达到不重复判断的效果。

最后的终止条件为：

1. 第一次查询到匹配结果
2. 左侧指针大于右侧指针，即 left = right + 1

因此是 left <= right 作为循环条件。

```ts
function search(nums: number[], target: number): number {
  // 搜索范围的确立
  let left = 0;
  let right = nums.length - 1;

  // 搜索的终止条件
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 搜索范围的重新确立
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] === target) {
      return mid;
    }
  }
  return -1;
}
```

那么，对于有重复元素的二分查找法该怎么做呢？其实实现的思路也是类似的，抓住关键要点：**搜索的终止条件**，以及**新搜索范围的确立**。

对于有重复元素的数据，先要判断，需要返回的索引，是第一次出现该元素的索引，还是最后一次出现该元素的索引？

## 二分查找返回第一次出现该元素的索引

若是需要返回第一次出现该元素的索引，那么，函数应该要探查并返回二分查找的左边界。

于是，与上一种情况的解法不同，第一次查询到匹配结果后，不应该直接返回，而是将右边界移动到该结果的左侧，在剩余的元素中继续查找是否还存在符合要求的结果。

于是判断搜索范围的算法变成了这样：

```ts
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] === target) {
      right = mid - 1;
    }
```

搜索范围确立后，接下来我们来看，搜索该何时结束呢？

通过简单的模拟行为我们可以发现，若是依照上面的方式进行循环下来，最终退出 while 循环时，指针 left 是一定等于 right + 1 的。

那么这里就会出现一种异常状况，就是当 target 比所有元素都大时，此时 right 将一直指向最右侧元素，又因为 left = right + 1，此时 left 指针会出现越界的情况。

因此我们需要做一下越界的异常处理，当 left 越界时，说明无法匹配到 target 元素，此时结果返回-1。

那么其余情况呢？很简单，看 left 指针指向的元素是否与 target 相等即可。若与 target 相等则直接返回 left，否则说明数组中不含有 target 元素，返回-1。

贴出最终代码：

```ts
function search(nums: number[], target: number): number {
  // 搜索范围的确立
  let left = 0;
  let right = nums.length - 1;

  // 搜索的终止条件
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 搜索范围的重新确立
    if (nums[mid] >= target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  if (left < nums.length && nums[left] === target) {
    return left;
  }
  return -1;
}
```

## 二分查找返回最后一次出现该元素的索引

其实思路与返回第一次索引完全一致，仅将判断相等是缩小边界的逻辑，从缩小右边界变成缩小左边界即可，判断越界的逻辑同理。这里就直接贴出代码实现了。

```ts
function search(nums: number[], target: number): number {
  // 搜索范围的确立
  let left = 0;
  let right = nums.length - 1;

  // 搜索的终止条件
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 搜索范围的重新确立
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] <= target) {
      left = mid + 1;
    }
  }
  if (right >= 0 && nums[right] === target) {
    return right;
  }
  return -1;
}
```

可以依照这种思路来实现一下 [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)，你会有不一样的收获。
