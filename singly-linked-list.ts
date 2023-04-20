class _Node {
  public next: _Node | null = null;
  constructor(public data: any) {
    this.data = data;
  }
}

class SinglyLinkedList {
  public head: _Node | null = null;
  public tail: _Node | null = null;
  public length = 0;

  public push<T>(value: T): _Node {
    const node = new _Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;

    return node;
  }

  public pop() {
    if (this.length <= 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let currentNode = this.head;
      while (currentNode.next.next) {
        currentNode = currentNode.next;
      }
      this.tail = currentNode;
      this.tail.next = null;
      this.length--;
    }
  }

  public unshift<T>(value: T) {
    const node = new _Node(value);

    if (!this.head) this.head = this.tail = node;
    else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;

    return node;
  }

  public shift() {
    if (this.length <= 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      this.head = this.head.next;
      this.length--;
    }
  }

  public get(index: number) {
    if (index >= this.length || index < 0) return undefined;

    let curNode = this.head;

    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
    return curNode;
  }

  public set<T>(index: number, data: T) {
    const node = this.get(index);

    if (!node) return false;
    node.data = data;
    return true;
  }

  public insert(index: number, data: any) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return this.push(data);
    if (index === 0) return this.unshift(data);

    const node = new _Node(data);

    const curIndexNode = this.get(index);
    const preIndexNode = this.get(index - 1);
    preIndexNode.next = node;
    node.next = curIndexNode;
    this.length++;
    return node;
  }

  public remove(index: number) {
    if (index < 0 || index >= this.length) return false;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();

    const previousNode = this.get(index - 1);
    const currentNode = previousNode.next;
    const followingNode = currentNode.next;
    previousNode.next = followingNode;
    this.length--;
    return true;
  }

  public reverse() {
    if (this.length === 0) return undefined;
    if (this.length === 1) return this;

    const lastNode = this.get(this.length - 1);

    for (let i = this.length - 2; i >= 0; i--) {
      let curNode = this.get(i);
      curNode.next.next = curNode;
      if (i === 0) {
        this.tail = curNode;
        curNode.next = null;
      }
    }

    this.head = lastNode;
    return this;
  }

  public log() {
    let node = this.head;
    let arr = [];
    while (node) {
      arr.push(node.data);
      node = node.next;
    }

    console.log(arr);
  }
}
