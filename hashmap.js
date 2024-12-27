const LinkedList = require("./linked-list");

class HashMap {
    #initialCapacity = 17;
    #capacity = this.#initialCapacity;
    #loadFactor = 0.75;
    #length = 0;
    #buckets = Array.from({ length: this.#capacity }, () => new Bucket());

    /** How many entries there are in the map */
    get length() {
        return this.#length;
    }

    /** The fraction used out of the current capacity of the map.
     * When the load approaches the private loadFactor, the map will grow.
     */
    get load() {
        return this.#length / this.#capacity;
    }

    /**
     * Returns a filled hashmap created from the iterable. If the object
     * is an array, it should contain subarrays such as [key, value]. If it
     * is an object, every entry should be key: value
     * @param {[[string, any]] | Object} obj
     * @returns {HashMap}
     */
    static from(obj) {
        if (Array.isArray(obj)) return this.#fromArray(obj);
        else return this.#fromObject(obj);
    }

    /**
     * Sets the key to the specified value
     * @param {string} key The key for the value
     * @param {any} value The value to be stored
     */
    set(key, value) {
        if (!this.has(key)) {
            this.#length++;
            this.#checkGrowth();
        }
        const bucket = this.#getBucket(key);
        const index = bucket.find(key);
        const pair = { key, value };
        if (index === null) {
            bucket.append(pair);
        } else {
            bucket.replaceAt(pair, index);
        }
        return this;
    }

    /**
     * Gets the value at the specified key
     * @param {string} key The key we're retrieving
     */
    get(key) {
        const bucket = this.#getBucket(key);
        const index = bucket.find(key);
        if (index === null) return null;
        return bucket.at(index).value;
    }

    /**
     * Returns `true` if the map contains a certain key, or `false` if it doesn't
     * @param {string} key The key to find
     */
    has(key) {
        const bucket = this.#getBucket(key);
        if (bucket.find(key) === null) return false;
        return true;
    }

    /**
     * Remove the item with the specified key. If the key is found and
     * removed, returns `true`. If it isn't found, returns `false`.
     * @param {string} key The key in question
     */
    remove(key) {
        const bucket = this.#getBucket(key);
        const index = bucket.find(key);
        if (index === null) return false;
        bucket.removeAt(index);
        this.#length--;
        return true;
    }

    /** Clears all the entries */
    clear() {
        this.#length = 0;
        this.#buckets = Array.from(
            { length: this.#capacity },
            () => new Bucket(),
        );
        return this;
    }

    /** Clears the entries and resets capacity */
    reset() {
        this.#capacity = this.#initialCapacity;
        this.clear();
        return this;
    }

    /**
     * Returns an array with every key in the map
     * @returns {string[]}
     */
    keys() {
        const entries = this.entries();
        const keys = entries.map((entry) => entry[0]);
        return keys;
    }

    /**
     * Returns an array with all the values in the map
     * @returns {Array}
     */
    values() {
        const entries = this.entries();
        const values = entries.map((entry) => entry[1]);
        return values;
    }

    /**
     * Returns an array of arrays with every entry in the map, wherein each
     * array [0] is the key and [1] is its value
     * @returns {[string, any]}
     */
    entries() {
        const arr = [];
        if (this.#length === 0) return arr;
        for (let bucket of this.#buckets) {
            const items = bucket.all();
            const entries = items.map((entry) => [entry.key, entry.value]);
            arr.push(entries);
        }
        return arr.flat();
    }

    // PRIVATE METHODS

    /**
     * Takes in a string and returns a hashed number
     * @param {string} string The string to be hashed
     */
    #hash(string) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
            hashCode = hashCode % this.#capacity;
        }
        return hashCode;
    }

    /**
     * Returns the bucket that contains a key
     * @param {string} key The key whose hash is the index of the bucket
     */
    #getBucket(key) {
        const hashCode = this.#hash(key);
        return this.#buckets[hashCode];
    }

    /** Checks if the map is at capacity, and rebuilds it if it is */
    #checkGrowth() {
        const maxItems = this.#capacity * this.#loadFactor;
        if (this.#length > maxItems) {
            this.#grow();
            this.#length++;
        }
    }

    /** Rebuilds the hashmap at double the size */
    #grow() {
        const entries = this.entries();
        this.#capacity = this.#capacity + this.#initialCapacity;
        this.clear();
        for (let entry of entries) {
            this.set(entry[0], entry[1]);
        }
    }

    static #fromArray(arr) {
        const map = new HashMap();
        while (map.#capacity < arr.length)
            map.#capacity += map.#initialCapacity;
        map.clear();
        for (let entry of arr) {
            map.set(entry[0], entry[1]);
        }
        return map;
    }

    static #fromObject(obj) {
        const arr = [];
        for (let property in obj) {
            arr.push([property, obj[property]]);
        }
        return this.#fromArray(arr);
    }
}

class Bucket extends LinkedList {
    /** Finds an object where the property object.key === key; if none is found, returns null
     * @param {string} key
     */
    find(key) {
        const callback = (item) => item.key;
        return super.find({ key }, callback);
    }
}

module.exports = HashMap;
