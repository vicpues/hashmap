# Hashmap asignment

A basic hashmap module for The Odin Project's [fullstack javascript course](https://www.theodinproject.com/lessons/javascript-hashmap).

The implementation is an ES6 class {HashMap} exported as a CommonJS module. Each bucket in the map is an extension of my previous [linked list module](https://github.com/vicpues/linked-lists), with some overrides and bugfixes applied.

Properties:

-   `.length` - The amount of entries in the map.
-   `.load` - The fraction of the map's space that is currently in use.

Static methods:

-   `HashMap.from(obj)` - Creates a hashmap from an iterable \<obj\>, which may be a two-dimensional array or an object with keys and values.

Instance methods:

-   `.set(key, value)` - Sets the specified \<key\> to the provided \<value\>, and grows the hashmap if necessary. May be chained.
-   `.get(key)` - Returns the value found in the provided \<key\>.
-   `.has(key)` - Returns `true` if the hashmap contains the provided \<key\>, or `false` if it doesn't contain it.
-   `.remove(key)` - Deletes the entry found in the provided \<key\>, and returns `true` if the
    key was successfully removed. If the key did not exist, returns `false`.
-   `.clear()` - Deletes every entry in the map but keeps its current size. May be chained.
-   `.reset()` - Deletes every entry and resets the size of the map.
-   `.keys()` - Returns an array with all the keys in the map.
-   `.values()` - Returns an array with all the values stored in the map.
-   `.entries()` - Returns an array of arrays, where each subarray contains a [key, value] pair.
