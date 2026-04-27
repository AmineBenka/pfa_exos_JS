const findMax = require('./skeleton');

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
        fn: () => findMax([1, 5, 3, 9, 2]),
        expected: 9
    },
    {
        name: "single element",
        fn: () => findMax([42]),
        expected: 42
    },
    {
        name: "negative numbers",
        fn: () => findMax([-1, -5, -3]),
        expected: -1
    },
    {
        name: "max at beginning",
        fn: () => findMax([100, 50, 25, 10]),
        expected: 100
    },
    {
        name: "mixed values",
        fn: () => findMax([-10, 5, 0, 25, -5]),
        expected: 25
    }
];

runTests(tests);
