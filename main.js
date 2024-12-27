const HashMap = require("./hashmap");

const table = new HashMap();

const colors = {
    apple: "red",
    banana: "yellow",
    carrot: "orange",
    dog: "brown",
    elephant: "gray",
    frog: "green",
    grape: "purple",
    hat: "black",
    "ice cream": "white",
    jacket: "blue",
    kite: "pink",
    lion: "golden",
};

for (let thing in colors) {
    table.set(thing, colors[thing]);
}

table.set("apple", "green");
console.log(table.get("apple"), table.length); // green 12
console.log();

table.set("dog", "black");
console.log(table.get("dog"), table.length); // black 12
console.log();

console.log(table.load.toFixed(3)); // 0.706
table.set("moon", "silver");
console.log(table.get("moon"), table.length); // silver 13
console.log(table.load.toFixed(3)); // 0.353
console.log();

table.set("hat", "red & green");
console.log(table.get("hat"), table.length); // red & green 13
console.log();

console.log(table.get("dinosaur")); // null
console.log();

console.log(table.has("apple")); // true
console.log(table.has("dinosaur")); // false
console.log();

table.remove("kite");
console.log(table.has("kite")); // false
console.log();

console.log(table.length); // 12
console.log();

console.log(table.keys()); // [ 'banana', 'apple', 'moon', 'hat', 'frog', 'ice cream', 'lion', 'grape', 'dog', 'jacket', 'elephant', 'carrot' ]
console.log();

console.log(table.values()); // [ 'yellow', 'green', 'silver', 'red & green', 'green', 'white', 'golden', 'purple', 'black', 'blue', 'gray', 'orange' ]
console.log();

console.log(table.entries());
/*
    [
        [ 'banana', 'yellow' ],
        [ 'apple', 'green' ],
        [ 'moon', 'silver' ],
        [ 'hat', 'red & green' ],
        [ 'frog', 'green' ],
        [ 'ice cream', 'white' ],
        [ 'lion', 'golden' ],
        [ 'grape', 'purple' ],
        [ 'dog', 'black' ],
        [ 'jacket', 'blue' ],
        [ 'elephant', 'gray' ],
        [ 'carrot', 'orange' ]
    ]
*/
console.log();

console.log(table.clear().entries(), table.length); // [] 0
console.log();

const fruits = [
    ["grape", "sweet"],
    ["melon", "sweet"],
    ["lemon", "sour"],
    ["tomato", "umami"],
];
console.log(HashMap.from(fruits).keys()); // [ 'melon', 'tomato', 'grape', 'lemon' ]
console.log();

const fish = {
    tuna: "ocean",
    catfish: "river",
    trout: "river",
    salmon: "both",
};
console.log(HashMap.from(fish).keys()); // [ 'tuna', 'salmon', 'trout', 'catfish' ]
console.log();
