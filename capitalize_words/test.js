const capitalizeWords = require('./skeleton');

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
        fn: () => capitalizeWords("hello world"),
        expected: "Hello World"
    },
    {
        name: "single word",
        fn: () => capitalizeWords("javascript"),
        expected: "Javascript"
    },
    {
        name: "already capitalized",
        fn: () => capitalizeWords("Hello World"),
        expected: "Hello World"
    },
    {
        name: "empty string",
        fn: () => capitalizeWords(""),
        expected: ""
    },
    {
        name: "multiple words",
        fn: () => capitalizeWords("the quick brown fox"),
        expected: "The Quick Brown Fox"
    }
];

runTests(tests);
