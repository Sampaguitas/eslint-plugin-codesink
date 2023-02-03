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
    'no-set-timeout-injection': 'error',
    'no-evil-regex': 'error',
    'no-hardcoded-credentials': 'error',
    'no-eval-injection': 'error',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
