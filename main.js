const HashMap = require("./hashmap");

const table = new HashMap();

["Elephant", "cheetah", "lion", "gnu", "gazelle", "Zebra", "Giraffe"].forEach(
    (animal) => console.log(`${animal.padStart(10)}: ${table.hash(animal)}`),
);
