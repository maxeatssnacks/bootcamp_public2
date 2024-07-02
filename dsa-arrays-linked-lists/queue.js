const LinkedList = require("./linked-list");

class Queue {
    constructor() {
        this.size = 0;
        this.first = null;
        this.last = null;
        this._list = new LinkedList();
    }
}