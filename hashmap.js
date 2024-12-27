const LinkedList = require("./linked-list");

class HashMap {
    #capacity = 17;
    #loadFactor = 0.8;
    #buckets = Array.from({ length: this.#capacity }, () => new Bucket());

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
        if (index === null) bucket.append(pair);
        else bucket.replaceAt(pair, index);
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
