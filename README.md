# eslint-plugin-codesink

Yet another eslint-plugin to detect comon vulnerabilities in NodeJS projects...

## Description

In computing, a sink, or data sink generally refers to the destination of data flow. This plugin not only detects vulnerability sinks but also checks if the source could be exploited by a malisious actor, and if no mitigations have already been put in place by the developer in order to reduce the amount of false positives returned by the linter.

## Installation

```sh
npm i eslint eslint-plugin-codesink --save-dev
```

## Usage

Add the following configuration to your `.eslintrc` file:

```js
'use strict';

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    //this adds codeskink to your list of plugins
    'eslint-plugin-codesink',
  ],
  extends: [
    //unable all codesink recomented rules
    'plugin:codesink/recommended',
  ],
  rules: {
    //or add specific rules to your project here
    'codesink/no-hardcoded-credentials': 2,
  },
};
```

## Testing

Type the following to test all the rules:

```sh
npm run test
```

## Supported Rules

### `Prevent eval injection`

- Rule: [codesink/no-eval-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-eval-injection.md)
- Weekness: [CWE-95 - Improper Neutralization of Directives in Dynamically Evaluated Code ('Eval Injection')](https://cwe.mitre.org/data/definitions/95.html)
- Recommended: `true`

---

### `Prevent hard-coded credentials`

- Rule: [codesink/no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md)
- Weakness: [CWE-798 - Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)
- Recommended: `true`
