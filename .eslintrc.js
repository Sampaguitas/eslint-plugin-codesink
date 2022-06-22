"use strict";

module.exports = {
    root: true,
    env: {
        // "browser": true,
        // "commonjs": true,
        // "es2021": true,
        // "mocha": true,
        "node": true,
    },
    // parserOptions: {
    //     ecmaVersion: "latest",
    // },
    rules: {
        "no-prototype-pollution": "error",
        "no-hardcoded-credentials": "error",
    },
    overrides: [
        {
          files: ["tests/**/*.js"],
          env: { mocha: true },
        },
    ],
};
