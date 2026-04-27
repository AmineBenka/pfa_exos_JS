const bubbleSort = require('./skeleton');

const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    cyan: "\x1b[36m"
};

function deepEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function runTests(tests) {
    let passed = 0;

    console.log(`${colors.cyan}Running ${tests.length} tests...\n${colors.reset}`);

    tests.forEach((t, i) => {
        try {
            const result = t.fn();

            if (deepEqual(result, t.expected)) {
                console.log(`${colors.green}✔ Test ${i + 1} - ${t.name}${colors.reset}`);
                passed++;
            } else {
                console.log(`${colors.red}✘ Test ${i + 1} - ${t.name}${colors.reset}`);
                console.log(`   expected: ${JSON.stringify(t.expected)}`);
                console.log(`   received: ${JSON.stringify(result)}`);
            }

        } catch (e) {
            console.log(`${colors.red}✘ Test ${i + 1} - ${t.name} (exception)${colors.reset}`);
            console.log(`   ${e.message}`);
        }
    });

    console.log(`\n${passed}/${tests.length} tests passed`);

    if (passed !== tests.length) {
        process.exit(1);
    }
}

const tests = [
    {
        name: "basic case",
        fn: () => bubbleSort([5, 2, 8, 1, 9]),
        expected: [1, 2, 5, 8, 9]
    },
    {
        name: "already sorted",
        fn: () => bubbleSort([1, 2, 3, 4]),
        expected: [1, 2, 3, 4]
    },
    {
        name: "reverse order",
        fn: () => bubbleSort([5, 4, 3, 2, 1]),
        expected: [1, 2, 3, 4, 5]
    },
    {
        name: "empty array",
        fn: () => bubbleSort([]),
        expected: []
    },
    {
        name: "single element",
        fn: () => bubbleSort([42]),
        expected: [42]
    }
];

runTests(tests);
