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

table.set("Elephant", "leaves AND grass");
console.log(table.get("Elephant")); // leaves AND grass
