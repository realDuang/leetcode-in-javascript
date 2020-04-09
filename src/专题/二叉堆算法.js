// 大顶堆、优先级队列的解题算法————二叉堆算法

class MaxHeap {
  constructor(arr) {
    this.len = 0;
    this.arr = [undefined];

    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  parent(k) {
    return Math.floor(k / 2);
  }

  left(k) {
    return k * 2;
  }

  right(k) {
    return k * 2 + 1;
  }

  // 交换两元素位置
  swap(a, b) {
    const temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  }

  // 大顶堆上浮函数
  swim(k) {
    // 直到浮到栈顶为止
    while (k > 1) {
      // 若当前值小于父节点的值，则上浮停止
      const temp = this.parent(k);
      if (this.arr[k] <= this.arr[temp]) break;
      this.swap(k, temp);
      // 交换后将当前位置置为父节点的位置，继续下一次上浮比较
      k = temp;
    }
  }

  // 大顶堆下沉函数
  sink(k) {
    let temp = k;
    while (true) {
      // 左右子节点与当前节点比较，若有子节点值比当前节点值大则交换，若没有则说明当前节点已经是最小了，建堆完毕
      if (this.left(k) <= this.len && this.arr[this.left(k)] > this.arr[k]) {
        temp = this.left(k);
      }
      if (this.right(k) <= this.len && this.arr[this.right(k)] > this.arr[k]) {
        temp = this.right(k);
      }
      if (temp === k) break;
      this.swap(this.arr, k, temp);
      // 交换后将当前位置置为子节点的位置，继续下一次下沉比较
      k = temp;
    }
    // // 直到该节点没有子节点为止
    // while (this.left(k) <= this.len) {
    //   // 取左右子节点中较大的那个与当前节点比较值
    //   let temp = this.left(k);
    //   if (this.right(k) <= this.len && this.arr[this.left(k)] < this.arr[this.right(k)]) {
    //     temp = this.right(k);
    //   }
    //   // 若当前节点值比两个子节点的值都大，则下沉停止
    //   if (this.arr[k] > this.arr[temp]) break;
    //   this.swap(k, temp);
    //   // 交换后将当前位置置为子节点的位置，继续下一次下沉比较
    //   k = temp;
    // }
  }

  getMax() {
    return this.arr[1];
  }

  // 插入一个元素，先把元素放于堆的最后，然后上浮该元素
  insert(num) {
    this.len++;
    this.arr[this.len] = num;
    this.swim(this.len);
  }

  // 删除最大元素即删除堆顶元素，先将堆顶元素与最后一个元素位置互换，然后删除最后一个元素，接下来只需要将现堆顶元素下沉即可。
  deleteMax() {
    this.swap(1, this.len);
    const max = this.arr.pop();
    this.len--;
    this.sink(1);
    return max;
  }
}

const maxHeap = new MaxHeap([3, 7, 1, 5, 6, 4]);
console.log('max heap:', maxHeap);
maxHeap.insert(2);
console.log('after insert:', maxHeap);
console.log('delete max:', maxHeap.deleteMax());
console.log('current max:', maxHeap.getMax());
console.log('after delete:', maxHeap);
