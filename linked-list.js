class _Node {
    constructor(value) {
        this.value = value ? value : null;
        this.nextNode = null;
        this.prevNode = null;
    }
}

class LinkedList {
    #head = null;
    #tail = null;
    #size = 0;

    /** Returns the number of items in the list */
    get size() {
        return this.#size;
    }

    /** The value of the first item, or `null` if the list is empty */
    get head() {
        return this.#head === null ? null : this.#head.value;
    }

    /** The value of the last item, or `null` if the list is empty */
    get tail() {
        return this.#tail === null ? null : this.#tail.value;
    }

    /**
     * Creates a linked list from an array
     * @param {Array} array Array from which to create the list
     */
    static from(array) {
        const list = new LinkedList();
        for (let value of array) {
            list.append(value);
        }
        return list;
    }

    /**
     * Adds a value at the end of the list. May be chained
     * @param {any} value Value to append to the end of the list
     */
    append(value) {
        const newNode = new _Node(value);
        this.#size++;
        if (this.#head === null) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            newNode.prevNode = this.#tail;
            this.#tail.nextNode = newNode;
            this.#tail = newNode;
        }
        return this;
    }

    /**
     * Adds a value at the beginning of the list. May be chained
     * @param {any} value Value to be added at the beginning of the list
     */
    prepend(value) {
        const newNode = new _Node(value);
        this.#size++;
        if (this.#head === null) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            newNode.nextNode = this.#head;
            this.#head.prevNode = newNode;
            this.#head = newNode;
        }
        return this;
    }

    /**
     * Returns the value at the specified index
     * @param {number} index The index of the desired value
     */
    at(index) {
        return this.#nodeAt(index).value;
    }

    /** Deletes the last item of the list and returns its value*/
    pop() {
        if (this.#isEmpty()) return null;
        this.#size--;
        const node = this.#tail;
        const newTail = this.#tail.prevNode;
        newTail.nextNode = null;
        this.#tail = newTail;
        return node.value;
    }

    /** Deletes the first item of the list and returns its value */
    shift() {
        if (this.#isEmpty()) return null;
        this.#size--;
        const node = this.#head;
        const newHead = this.#head.nextNode;
        newHead.prevNode = null;
        this.#head = newHead;
        return node.value;
    }

    /**
     * Returns `true` if the list contains the specified value, or `false` if it doesn't
     * @param {any} value The value whose index we'd like to know
     */
    contains(value) {
        if (this.#isEmpty()) return false;
        let current = this.#head;
        while (current.nextNode !== null) {
            if (current.value === value) return true;
            current = current.nextNode;
        }
        return false;
    }

    /**
     * Returns the index of the specified value, or `null` if it's not in the list.
     * @param {any} value The value we're searching for
     */
    find(value) {
        if (this.#isEmpty()) return null;
        let current = this.#head;
        let index = 0;
        while (current.nextNode !== null) {
            if (current.value === value) return index;
            current = current.nextNode;
            index++;
        }
        return null;
    }

    /** Returns a string that contains every item on the list */
    toString() {
        if (this.#isEmpty()) return "null";
        let string = "";
        let current = this.#head;
        while (current !== null) {
            string += `( ${current.value} ) -> `;
            current = current.nextNode;
        }
        return string + "null";
    }

    /**
     * Inserts the specified value at the index, and shifts the elements around it to accomodate it. May be chained
     * @param {any} value The value to insert into the list
     * @param {number} index The index to insert the value at
     */
    insertAt(value, index) {
        if (index === this.#size) {
            this.append(value);
            return this;
        }
        this.#indexHandler(index);
        this.#size++;
        const newNode = new _Node(value);
        let oldNode = this.#nodeAt(index);
        newNode.prevNode = oldNode.prevNode;
        newNode.nextNode = oldNode;
        oldNode.prevNode.nextNode = newNode;
        oldNode.prevNode = newNode;
        return this;
    }

    /**
     * Removes the item at the specified index and shifts the elements around it. May be chained
     * @param {number} index The index whose item we'd like to remove
     */
    removeAt(index) {
        this.#indexHandler(index);
        this.#size--;
        const node = this.#nodeAt(index);
        node.prevNode.nextNode = node.nextNode;
        return this;
    }

    /**
     * Replaces the item at the specified index with the provided value. May be chained
     * @param {any} value The new value of the item
     * @param {number} index The index we're replacing
     */
    replaceAt(value, index) {
        this.#indexHandler(index);
        const node = this.#nodeAt(index);
        node.value = value;
        return this;
    }

    // PRIVATE METHODS

    /** Returns `true` if the list is empty, otherwise returns `false` */
    #isEmpty() {
        return this.#size === 0;
    }

    /**
     * Returns the actual node element at the specified index
     * @param {number} index The index to retrieve
     * @returns {_Node | null}
     */
    #nodeAt(index) {
        this.#indexHandler(index);
        let current = this.#head;
        for (let i = 0; i < index; i++) {
            current = current.nextNode;
        }
        return current;
    }

    /**
     * Throws an error if the provided index cannot be accessed
     * @param {number} index The index to check
     */
    #indexHandler(index) {
        if (typeof index !== "number" || index !== Math.floor(index))
            throw new TypeError(`Index must be a whole number`);
        if (index < 0) throw new RangeError(`Index must be 0 or higher!`);
        if (index >= this.#size)
            throw new RangeError(`Index "${index}" does not exist!`);
    }
}

module.exports = LinkedList;
