class HashMap {
    #capacity = 17;
    #loadFactor = 0.8;

    /**
     * Takes in a string and returns a hashed number
     * @param {string} string The string to be hashed
     */
    hash(string) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }
        return hashCode % this.#capacity;
    }
}

module.exports = HashMap;
