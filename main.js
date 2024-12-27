const HashMap = require("./hashmap");

const table = new HashMap();

// ["Elephant", "cheetah", "lion", "gnu", "gazelle", "Zebra", "Giraffe"].forEach(
//     (animal) => console.log(`${animal.padStart(10)}: ${table.hash(animal)}`),
// );

const animals = {
    Elephant: "leaves",
    cheetah: "meat",
    lion: "meat",
    gnu: "grass",
    gazelle: "grass",
    Zebra: "grass",
    Giraffe: "leaves",
};

for (let diet in animals) table.set(diet, animals[diet]);
console.log(table.get("Elephant")); // leaves
console.log(table.get("Zebra")); // grass
console.log(table.get("gnu")); // grass
console.log(table.get("dragon!")); // null
console.log();

table.set("Elephant", "leaves AND grass");
console.log(table.get("Elephant")); // leaves AND grass
console.log();

console.log(table.has("Zebra")); // true
console.log(table.has("dragon")); // false
console.log();

console.log(table.remove("gazelle")); // true
console.log(table.get("gazelle")); // null
console.log(table.remove("gazelle")); // false
console.log();

console.log(table.length); // 6

console.log(table.clear().length); // 0
