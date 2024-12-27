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
    table.set(thing, colors[thing])
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
