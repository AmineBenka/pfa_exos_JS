const filterEven = require('./skeleton');

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
        fn: () => filterEven([1, 2, 3, 4, 5, 6]),
        expected: [2, 4, 6]
    },
    {
        name: "empty array",
        fn: () => filterEven([]),
        expected: []
    },
    {
        name: "no even numbers",
        fn: () => filterEven([1, 3, 5, 7]),
        expected: []
    },
    {
        name: "all even numbers",
        fn: () => filterEven([2, 4, 6, 8]),
        expected: [2, 4, 6, 8]
    },
    {
        name: "mixed values",
        fn: () => filterEven([10, 15, 20, 25, 30]),
        expected: [10, 20, 30]
    }
];

runTests(tests);
