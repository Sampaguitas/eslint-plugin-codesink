# eslint-plugin-codesink

Detect most common security vulnerabilities in NodeJS projects

## Installation

```sh
npm i eslint eslint-plugin-codesink --save-dev
```

## Usage

Add the following configuration to your `.eslintrc.js` file:

```js
'use strict';

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    //add codeskink to your list of plugins
    'eslint-plugin-codesink',
  ],
  rules: {
    //add specific rules to your project here
    'codesink/no-eval-injection': 2,
    'codesink/no-evil-regex': 2,
    'codesink/no-set-timeout-injection': 2,
    'codesink/no-hardcoded-credentials': 2,
  },
};
```

Add the following command to `package.json' scripts:

```json
"scripts": {
    "lint": "eslint .",
}
```

To run eslint from your terminal:

```sh
npm run lint
```

## Testing

Type the following to test all the rules:

```sh
npm run test
```

## Supported Rules

### `Prevent evil Regex`

- Rule: [codesink/no-evil-regex](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-evil-regex.md)
- Recommended: `true`

### `Prevent hard-coded credentials`

- Rule: [codesink/no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md)
- Recommended: `true`

### `Prevent eval, exec and spawn injection`

- Rule: [codesink/no-eval-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-eval-injection.md)
- Recommended: `true`

### `Prevent setTimeout and setInterval injection`

- Rule: [codesink/no-set-timeout-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-set-timeout-injection.md)
- Recommended: `false`
