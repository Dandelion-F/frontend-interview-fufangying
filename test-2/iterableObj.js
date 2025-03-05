function run_1() {
    Object.prototype[Symbol.iterator] = function* () {
        yield* Object.values(this);
    };
}

function run_2() {
    Object.prototype[Symbol.iterator] = function* () {
        for (const key in this) {
            if (Object.hasOwn(this, key)) {
                yield this[key];
            }
        }
    };
}

function run_3() {
    Object.prototype[Symbol.iterator] = function () {
        const values = Object.values(this);
        let index = 0;
        return {
            next: () => {
                if (index < values.length) {
                    return {
                        value: values[index++],
                        done: false,
                    };
                }
                return { done: true };
            },
        };
    };
}

run_3();
const [a, b] = { a: 1, b: 2 };
console.log(a, b);