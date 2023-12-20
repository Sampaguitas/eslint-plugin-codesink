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

| Vulnerability sinks                    | Rule                                                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| DOM-based XSS                          | [no-dom-xss](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-dom-xss.md)                             |
| DOM-based open redirect                | [no-open-redirect](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-open-redirect.md)                 |
| DOM-based JavaScript injection         | [no-eval-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-eval-injection.md)               |
| DOM-based Cookie manipulation          | [no-cookie-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-cookie-manipulation.md)     |
| DOM-based document-domain manipulation | [no-document-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-document-manipulation.md) |
| DOM-based WebSocket-URL poisoning      | [websocket-url-poisoning](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/websocket-url-poisoning.md)   |
| DOM-based link manipulation            | [no-link-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-link-manipulation.md)         |
| Web message manipulation               | [no-message-manipulation](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-message-manipulation.md)   |
| Path traversal                         | [no-path-traversal](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-path-traversal.md)               |
| Evil regex                             | [no-evil-regex](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-evil-regex.md)                       |
| Regex injection                        | [no-regex-injection](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-regex-injection.md)             |
| Hard-coded credentials                 | [no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md) |
