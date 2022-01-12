export class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T, next?: ListNode<T> | null) {
    this.val = val;
    this.next = next === undefined ? null : next;
  }
}

export function serialize<T>(root: ListNode<T>): Array<T> {
  const res: Array<T> = [];
  let curr = root;
  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

export function deserialize<T>(data: string | Array<T>, loopPosition?: number): ListNode<T> {
  try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
  } catch (e) {
    throw Error(e);
  }
  if (!(data instanceof Array)) throw Error('cannot parse array');

  const head = new ListNode<T>(null);
  let curr = head;

  data.forEach(ele => {
    const node = new ListNode(ele);
    curr.next = node;
    curr = curr.next;
  });

  if (loopPosition !== undefined) {
    let temp = head;
    while (loopPosition >= 0) {
      temp = temp.next;
      loopPosition -= 1;
    }
    curr.next = temp;
  }

  return head.next;
}

export function getNode<T>(root: ListNode<T>, index: number): ListNode<T> {
  let curr = root;
  while (curr && index > 0) {
    curr = curr.next;
    index -= 1;
  }
  return curr;
}

export function hasCycle<T>(head: ListNode<T> | null): boolean {
  let quick = head;
  let slow = head;
  while (quick && quick.next) {
    quick = quick.next.next;
    slow = slow.next;
    if (slow === quick) {
      return true;
    }
  }
  return false;
}
