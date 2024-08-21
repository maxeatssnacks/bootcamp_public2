/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    let toSumStack = [this.root];
    let sum = 0;
    while (toSumStack.length) {
      let current = toSumStack.pop();

      sum += current.val;

      for (let child of current.children) {
        toSumStack.push(child)
      }
    }

    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    let toCheckStack = [this.root];
    let count = 0;
    while (toCheckStack.length) {
      let current = toCheckStack.pop();

      if (current.val % 2 === 0) {
        count++;
      }

      for (let child of current.children) {
        toCheckStack.push(child)
      }
    }

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    let toCheckStack = [this.root];
    let count = 0;

    while (toCheckStack.length) {
      let current = toCheckStack.pop();

      if (current.val > lowerBound) {
        count++;
      }

      for (let child of current.children) {
        toCheckStack.push(child)
      }
    }
    return count;
  }
}

module.exports = { Tree, TreeNode };
