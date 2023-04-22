namespace dll {
  class Node {
    public pre: Node | null = null;
    public next: Node | null = null;

    constructor(public data: any) {}
  }

  class DoublyLinkedList {
    public head: Node | null = null;
    public tail: Node | null = null;
    public length = 0;
    constructor() {}

    public push(data: any) {
      const node = new Node(data);
      if (!this.head) {
        this.head = this.tail = node;
      } else {
        this.tail.next = node;
        node.pre = this.tail;
        this.tail = node;
      }
      this.length++;

      return true;
    }

    public pop() {
      if (!this.head || this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length = 0;
      } else {
        this.tail = this.tail.pre;
        this.tail.next = null;
        this.length--;
      }
    }

    public unshift(data: any) {
      const node = new Node(data);
      if (!this.head) {
        this.head = this.tail = node;
      } else {
        this.head.pre = node;
        node.next = this.head;
        this.head = node;
      }
      this.length++;

      return true;
    }

    public shift() {
      if (!this.head || this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length = 0;
      } else {
        this.head = this.head.next;
        this.head.pre = null;
        this.length--;
      }
    }

    public get(index: number) {
      if (index >= this.length || index < 0) return undefined;
      const midPointGreater = Math.floor(this.length / 2) > index;
      let curNode = midPointGreater ? this.head : this.tail;

      if (midPointGreater) {
        for (let i = 0; i < index; i++) {
          curNode = curNode.next;
        }
      } else {
        for (let i = this.length - 1; i > index; i--) {
          curNode = curNode.pre;
        }
      }

      return curNode;
    }

    public set(index: number, data: any) {
      const node = this.get(index);
      if (!node) return false;
      node.data = data;
      return true;
    }

    public insert(index: number, data: any) {
      if (index === 0) return this.unshift(data);
      if (index === this.length) return this.push(data);
      if (index > this.length || index < 0) return undefined;
      const newNode = new Node(data);
      const currentIndexNode = this.get(index);
      const preIndexNode = currentIndexNode.pre;
      preIndexNode.next = newNode;
      newNode.next = currentIndexNode;
      currentIndexNode.pre = newNode;
      return true;
    }

    public remove(index: number) {
      if (index === 0) return this.shift();
      if (index === this.length - 1) return this.pop();
      if (index >= this.length || index < 0) return undefined;

      const currentIndexNode = this.get(index);
      const preIndexNode = currentIndexNode.pre;
      const nextIndexNode = currentIndexNode.next;

      preIndexNode.next = nextIndexNode;
      nextIndexNode.pre = preIndexNode;
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
}
