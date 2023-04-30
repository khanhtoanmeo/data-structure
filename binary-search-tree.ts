namespace bst {
  class Node {
    public left: Node | null = null;
    public right: Node | null = null;

    public constructor(public value: number) {}
  }

  class BinarySearchTree {
    public root: Node | null = null;

    public insert(value: number) {
      const newNode = new Node(value);
      if (!this.root) this.root = newNode;
      else {
        let curNode = this.root;
        while (curNode) {
          if (curNode.value < value) {
            if (curNode.right) {
              curNode = curNode.right;
              continue;
            }
            curNode.right = newNode;
            break;
          } else if (curNode.value > value) {
            if (curNode.left) {
              curNode = curNode.left;
              continue;
            }
            curNode.left = newNode;
            break;
          }
        }
      }
    }
    public find(value: number) {
      let curNode = this.root;
      while (curNode) {
        if (curNode.value === value) return curNode;
        else if (curNode.value < value) {
          curNode = curNode.right;
        } else if (curNode.value > value) {
          curNode = curNode.left;
        }
      }
      return undefined;
    }

    public bfs() {
      const queue = [];
      const visited = [];

      queue.push(this.root);
      while (queue.length > 0) {
        const curNode = queue.pop();
        if (curNode.left) queue.unshift(curNode.left);
        if (curNode.right) queue.unshift(curNode.right);

        visited.push(curNode.value);
      }
      return visited;
    }

    public preOrderDfs() {
      const visited = [];

      function visit(node: Node) {
        visited.push(node.value);
        if (node.left) visit(node.left);
        if (node.right) visit(node.right);
      }

      visit(this.root);

      return visited;
    }

    public postOrderDfs() {
      const visited = [];

      function visit(node: Node) {
        if (node.left) visit(node.left);
        if (node.right) visit(node.right);
        visited.push(node.value);
      }

      visit(this.root);

      return visited;
    }

    public inOrderDfs() {
      const visited = [];

      function visit(node: Node) {
        if (node.left) visit(node.left);
        visited.push(node.value);
        if (node.right) visit(node.right);
      }

      visit(this.root);

      return visited;
    }
  }
}
