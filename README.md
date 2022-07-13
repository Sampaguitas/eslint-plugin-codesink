# eslint-plugin-codesink

Detect most common security vulnerabilities in NodeJS projects

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
    //add codeskink to your list of plugins
    'eslint-plugin-codesink',
  ],
  rules: {
    //add specific rules to your project here
    'codesink/no-eval-injection': 2,
    'codesink/no-set-timeout-injection': 2,
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

### `Prevent eval, exec and spawn injection`

- Rule: [codesink/no-eval-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-eval-injection.md)
- Recommended: `true`

### `Prevent setTimeout and setInterval injection`

- Rule: [codesink/no-set-timeout-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-set-timeout-injection.md)
- Recommended: `false`

### `Prevent hard-coded credentials`

- Rule: [codesink/no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md)
- Recommended: `true`
