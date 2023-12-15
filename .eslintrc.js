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
    'no-eval-injection': 'warn',
    'no-evil-regex': 'warn',
    'no-hardcoded-credentials': 'warn',
    'no-open-redirect': 'warn',
    'no-path-traversal': 'warn',
    'no-regex-injection': 'warn',
    'no-set-timeout-injection': 'warn',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
