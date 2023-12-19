# eslint-plugin-codesink

Detect common javascript sinks that lead to web application vulnerabilities.

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
    'codesink/no-dom-xss': 'warn',
    'codesink/no-open-redirect': 'warn',
    'codesink/no-eval-injection': 'warn',
    'codesink/no-cookie-manipulation': 'warn',
    'codesink/no-domain-manipulation': 'warn',
    'codesink/no-websocket-url-poisoning': 'warn',
    'codesink/no-link-manipulation': 'warn',
    'codesink/no-message-manipulation': 'warn',
    'codesink/no-path-traversal': 'warn',
    'codesink/no-evil-regex': 'warn',
    'codesink/no-regex-injection': 'warn',
    'codesink/no-hardcoded-credentials': 'warn',
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

### `Detect DOM-based XSS`

- Rule: [codesink/no-dom-xss](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-dom-xss.md)
- Recommended: `true`

### `Detect DOM-based open redirect`

- Rule: [codesink/no-open-redirect](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-open-redirect.md)
- Recommended: `true`

### `Detect DOM-based JavaScript injection`

- Rule: [codesink/no-eval-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-eval-injection.md)
- Recommended: `true`

### `Detect DOM-based Cookie Manipulation`

- Rule: [codesink/no-cookie-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-cookie-manipulation.md)
- Recommended: `true`

### `Detect DOM-based document-domain manipulation`

- Rule: [codesink/no-document-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-document-manipulation.md)
- Recommended: `true`

### `Detect DOM-based WebSocket-URL poisoning`

- Rule: [codesink/websocket-url-poisoning](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/websocket-url-poisoning.md)
- Recommended: `true`

### `Detect DOM-based link manipulation`

- Rule: [codesink/no-link-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-link-manipulation.md)
- Recommended: `true`

### `Detect Web message manipulation sinks`

- Rule: [codesink/no-message-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-message-manipulation.md)
- Recommended: `true`

### `Detect Path Traversal`

- Rule: [codesink/no-path-traversal](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-path-traversal.md)
- Recommended: `true`

### `Detect evil Regex`

- Rule: [codesink/no-evil-regex](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-evil-regex.md)
- Recommended: `true`

### `Detect Regex injection`

- Rule: [codesink/no-regex-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-regex-injection.md)
- Recommended: `true`

### `Detect hard-coded credentials`

- Rule: [codesink/no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md)
- Recommended: `true`
