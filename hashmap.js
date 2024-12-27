const LinkedList = require("./linked-list");

class HashMap {
    #initialCapacity = 17;
    #capacity = this.#initialCapacity;
    #loadFactor = 0.8;
    #length = 0;
    #buckets = Array.from({ length: this.#capacity }, () => new Bucket());

    get length() {
        return this.#length;
    }

    /**
     * Takes in a string and returns a hashed number
     * @param {string} string The string to be hashed
     */
    hash(string) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
            hashCode = hashCode % this.#capacity;
        }
        return hashCode;
    }

    /**
     * Sets the key to the specified value
     * @param {string} key The key for the value
     * @param {any} value The value to be stored
     */
    set(key, value) {
        // TODO: grow buckets if reaching loadfactor
        const bucket = this.#getBucket(key);
        const index = bucket.find(key);
        const pair = { key, value };
        if (index === null) {
            bucket.append(pair);
            this.#length++;
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

    /** Clears all the buckets and resets capacity */
    clear() {
        this.#capacity = this.#initialCapacity;
        this.#length = 0;
        this.#buckets = Array.from(
            { length: this.#capacity },
            () => new Bucket(),
        );
        return this;
    }

    /**
     * Returns an array with every key in the map
     * @returns {string[]}
     */
    keys() {
        const arr = [];
        if (this.#length === 0) return arr;
        for (let bucket of this.#buckets) {
            let items = bucket.all();
            const keys = items.map((item) => item.key);
            arr.push(keys);
        }
        return arr.flat();
    }

    /**
     * Returns an array with all the values in the map
     * @returns {Array}
     */
    values() {
        const arr = [];
        if (this.#length === 0) return arr;
        for (let bucket of this.#buckets) {
            let items = bucket.all();
            const values = items.map((item) => item.value);
            arr.push(values);
        }
        return arr.flat();
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
     * Returns the bucket that contains a key
     * @param {string} key The key whose hash is the index of the bucket
     */
    #getBucket(key) {
        const hashCode = this.hash(key);
        return this.#buckets[hashCode];
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
