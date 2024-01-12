export default class FIFOCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = {};
    this.order = [];
  }

  set(key, value) {
    if (this.order.length >= this.maxSize) {
      // Remove the oldest item if the cache is full
      const oldestKey = this.order.shift();
      delete this.cache[oldestKey];
    }

    // Add the new item to the cache and the order array
    this.cache[key] = value;
    this.order.push(key);
  }

  get(key) {
    // Retrieve the item from the cache
    return this.cache[key];
  }

  getAll() {
    // Retrieve all items in the cache in the order they were inserted
    return this.order.map(key => ({ key, value: this.cache[key] }));
  }
}

// Example usage
// const fifoCache = new FIFOCache(3); // Set the maximum size of the cache to 3

// fifoCache.set('1', 'Item 1');
// fifoCache.set('2', 'Item 2');
// fifoCache.set('3', 'Item 3');

// console.log(fifoCache.getAll()); // [{ key: '1', value: 'Item 1' }, { key: '2', value: 'Item 2' }, { key: '3', value: 'Item 3' }]

// fifoCache.set('4', 'Item 4');

// console.log(fifoCache.getAll()); // [{ key: '2', value: 'Item 2' }, { key: '3', value: 'Item 3' }, { key: '4', value: 'Item 4' }]
