'use strict';

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['html', '@typescript-eslint'],
  rules: {
    'no-dom-xss': 'error',
    'no-eval-injection': 'error',
    'no-evil-regex': 'error',
    'no-hardcoded-credentials': 'error',
    'no-open-redirect': 'error',
    'no-path-traversal': 'error',
    'no-regex-injection': 'error',
    'no-set-timeout-injection': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
