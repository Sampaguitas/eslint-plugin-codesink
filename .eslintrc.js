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
  parser: '@typescript-eslint/parser',
  plugins: ['html', '@typescript-eslint'],
  rules: {
    'no-dom-xss': 'warn',
    'no-open-redirect': 'warn',
    'no-eval-injection': 'warn',
    'no-cookie-manipulation': 'warn',
    'no-domain-manipulation': 'warn',
    'no-websocket-url-poisoning': 'warn',
    'no-path-traversal': 'warn',
    'no-evil-regex': 'warn',
    'no-regex-injection': 'warn',
    'no-hardcoded-credentials': 'warn',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
