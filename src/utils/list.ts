export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val?: T, next?: ListNode<T> | null) {
    this.val = val === undefined ? (0 as T) : val;
    this.next = next === undefined ? null : next;
  }
}

function serialize<T>(root: ListNode<T> | null): Array<T> {
  const res: Array<T> = [];
  let curr = root;
  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

function deserialize<T>(data: string | Array<T>, loopPosition?: number): ListNode<T> | null {
  try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
  } catch (e) {
    throw Error(e instanceof Error ? e.message : String(e));
  }
  if (!(data instanceof Array)) throw Error('cannot parse array');
  if (data.length === 0) return null;

  const head = new ListNode<T>(data[0]);
  let curr = head;

  data.slice(1).forEach(ele => {
    const node = new ListNode(ele);
    curr.next = node;
    curr = curr.next;
  });

  if (loopPosition !== undefined) {
    let temp: ListNode<T> | null = head;
    let loopIndex = loopPosition;
    while (temp && loopIndex > 0) {
      temp = temp.next;
      loopIndex -= 1;
    }
    if (temp && loopIndex === 0) {
      curr.next = temp;
    }
  }

  return head;
}

function getNode<T>(root: ListNode<T> | null, index: number): ListNode<T> | null {
  let curr = root;
  while (curr && index > 0) {
    curr = curr.next;
    index -= 1;
  }
  return curr;
}

function hasCycle<T>(head: ListNode<T> | null): boolean {
  let quick = head;
  let slow = head;
  while (quick && quick.next) {
    quick = quick.next.next;
    slow = slow ? slow.next : null;
    if (slow === quick) {
      return true;
    }
  }
  return false;
}

export class DoublyListNode<T = number> {
  val: T;
  prev: DoublyListNode<T> | null;
  next: DoublyListNode<T> | null;
  constructor(val?: T, prev?: DoublyListNode<T> | null, next?: DoublyListNode<T> | null) {
    this.val = val === undefined ? (0 as T) : val;
    this.prev = prev === undefined ? null : prev;
    this.next = next === undefined ? null : next;
  }
}

function doublySerialize<T>(head: DoublyListNode<T> | null): Array<T> {
  const res: Array<T> = [];
  let curr = head;
  while (curr !== null) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

function doublyDeserialize<T>(data: string | Array<T>): DoublyListNode<T> | null {
  try {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
  } catch (e) {
    throw Error(e instanceof Error ? e.message : String(e));
  }
  if (!(data instanceof Array)) throw Error('cannot parse array');
  if (data.length === 0) return null;

  const head = new DoublyListNode<T>(data[0]);
  let curr = head;

  data.slice(1).forEach(ele => {
    const node = new DoublyListNode(ele);
    node.prev = curr;
    curr.next = node;
    curr = curr.next;
  });

  return head;
}

function doublyGetNode<T>(head: DoublyListNode<T> | null, index: number): DoublyListNode<T> | null {
  let curr = head;
  while (curr && index > 0) {
    curr = curr.next;
    index -= 1;
  }
  return curr;
}

class DoublyListUtils<T = number> {
  public serialize(head: DoublyListNode<T> | null): Array<T> {
    return doublySerialize(head);
  }

  public deserialize(data: string | Array<T>): DoublyListNode<T> | null {
    return doublyDeserialize<T>(data);
  }

  public getNode(head: DoublyListNode<T> | null, index: number): DoublyListNode<T> | null {
    return doublyGetNode(head, index);
  }
}

const DoublyList = new DoublyListUtils();

class ListUtils<T = number> {
  public serialize(root: ListNode<T> | null): Array<T> {
    return serialize(root);
  }

  public deserialize(data: string | Array<T>, loopPosition?: number): ListNode<T> | null {
    return deserialize<T>(data, loopPosition);
  }

  public getNode(root: ListNode<T> | null, index: number): ListNode<T> | null {
    return getNode(root, index);
  }

  public hasCycle(head: ListNode<T> | null): boolean {
    return hasCycle(head);
  }
}

const List = new ListUtils();

const listGlobal = globalThis as typeof globalThis & {
  ListNode?: typeof ListNode;
  List?: typeof List;
  DoublyListNode?: typeof DoublyListNode;
  DoublyList?: typeof DoublyList;
};

listGlobal.ListNode = ListNode;
listGlobal.List = List;
listGlobal.DoublyListNode = DoublyListNode;
listGlobal.DoublyList = DoublyList;
