/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;

    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;

    if (this.head !== null) {
      newNode.next = this.head;
      this.head = newNode;
    }

  }

  /** pop(): return & remove last item. */

  pop() {
    let lastItem = this.tail;
    this.tail = null;

    return lastItem
  }

  /** shift(): return & remove first item. */

  shift() {
    let firstItem = this.head;
    this.head = this.head.next;

    return firstItem
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let i = 0;
    let current = this.head;
    while (current !== null) {
      if (i === idx) {
        return this.head.val
      }
      i++;
      current = current.next;
    }
    return undefined
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let i = 0;
    let current = this.head;
    while (current !== null) {
      if (i === idx) {
        current.val = val;
        return
      }
      current = current.next;
      i++;
    }
    return undefined
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let i = 0;
    let newNode = new Node(val)

    // Handle inserting at the head (including empty list)
    if (idx === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current !== null) {
      if (i === idx - 1) {
        newNode.next = current.next;
        current.next = newNode;
        return
      }
      current = current.next;
      i++;
    }
    return undefined
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    let current = this.head;
    let previous = null;
    let i = 0;

    // List is empty
    if (current === null) {
      return undefined
    }

    // Removing the head node
    if (idx === 0) {
      let removedVal = current.val;
      current = current.next; // Move head to the next node
      return removedVal
    }

    while (current !== null && i < idx) {
      previous = current;
      current = current.next;
      i++;
    }

    // If current is null, idx was out of bounds
    if (current === null) {
      return undefined
    }

    // Remove the node
    if (previous !== null) {
      previous.next = current.next; // Skip over the node to be removed
    }

    return current.val // Return the removed node's value
  }

  /** average(): return an average of all values in the list */

  average() {
    let current = this.head;

    if (current === null) {
      // Handle empty list case. Return 0, or perhaps null, 
      // depending on what makes sense for your application.
      return 0;
    }

    let sum = 0;
    let count = 0;

    while (current !== null) {
      sum += current.val;
      count += 1;
      current = current.next;
    }
    return sum / count
  }
}
module.exports = LinkedList;
