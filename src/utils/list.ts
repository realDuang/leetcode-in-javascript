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
};

listGlobal.ListNode = ListNode;
listGlobal.List = List;
