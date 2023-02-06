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
  rules: {
    'no-eval-injection': 'error',
    'no-evil-regex': 'error',
    'no-hardcoded-credentials': 'error',
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
