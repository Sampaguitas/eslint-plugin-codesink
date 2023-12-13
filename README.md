# eslint-plugin-codesink

Identifies code sinks in `javascript`, `typescript`, and `HTML` files that can potentially lead to web application vulnerabilities.

## Installation

```sh
# minimal installation:
npm i eslint eslint-plugin-codesink
# for html and typescript support:
npm install eslint-plugin-html typescript@4.1.6 @typescript-eslint/parser @typescript-eslint/eslint-plugin@5.0.0-alpha.42
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
  parser: '@typescript-eslint/parser',
  plugins: ['codesink', 'html', '@typescript-eslint'],
  rules: {
    //add specific rules to your project here
    'codesink/no-open-redirect': 2,
    'codesink/no-dom-xss': 2,
    'codesink/no-eval-injection': 2,
    'codesink/no-evil-regex': 2,
    'codesink/no-hardcoded-credentials': 2,
    'codesink/no-path-traversal': 2,
    'codesink/no-regex-injection': 2,
    'codesink/no-set-timeout-injection': 2,
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

## Supported Rules

### `Prevent DOM-based open redirect`

- Rule: [codesink/no-open-redirect](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-open-redirect.md)
- Recommended: `true`

### `Prevent DOM-based XSS`

- Rule: [codesink/no-dom-xss](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-dom-xss.md)
- Recommended: `true`

### `Prevent Path Traversal`

- Rule: [codesink/no-path-traversal](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-path-traversal.md)
- Recommended: `true`

### `Prevent evil Regex`

- Rule: [codesink/no-evil-regex](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-evil-regex.md)
- Recommended: `true`

### `Prevent Regex injection`

- Rule: [codesink/no-regex-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-regex-injection.md)
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
