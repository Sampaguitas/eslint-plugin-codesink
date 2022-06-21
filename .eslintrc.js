module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "mocha": true,
        "node": true,
        // "es6": true
    },
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    // "parserOptions": { "ecmaVersion": 6 },
    "rules": {
        "no-prototype-pollution": "error",
        "no-exposed-credentials": "error",
    }
};
