function run() {
    Object.prototype[Symbol.iterator] = function* () {
        yield* Object.values(this)
    };
}

run();
const [a, b] = { a: 1, b: 2 };
console.log(a, b);