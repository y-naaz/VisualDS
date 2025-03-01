class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  
  class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.map = new Map();
      this.head = new Node(0, 0);  // Dummy head
      this.tail = new Node(0, 0);  // Dummy tail
      this.head.next = this.tail;
      this.tail.prev = this.head;
    }
  
    _remove(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  
    _insert(node) {
      node.next = this.head.next;
      node.prev = this.head;
      this.head.next.prev = node;
      this.head.next = node;
    }
  
    get(key) {
      if (!this.map.has(key)) return -1;
      
      let node = this.map.get(key);
      this._remove(node);
      this._insert(node);
      
      return node.value;
    }
  
    put(key, value) {
      if (this.map.has(key)) {
        this._remove(this.map.get(key));
      }
      
      let newNode = new Node(key, value);
      this._insert(newNode);
      this.map.set(key, newNode);
      
      if (this.map.size > this.capacity) {
        let lru = this.tail.prev;
        this._remove(lru);
        this.map.delete(lru.key);
      }
    }
  }
  
  export default LRUCache;
  