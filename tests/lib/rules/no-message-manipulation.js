/**
 * @fileoverview Detect Web message manipulation sinks (no-message-manipulation)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-message-manipulation.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
});

ruleTester.run('no-message-manipulation', rule, {
  valid: [],
  invalid: [
    {
      code: `
          window.postMessage(userControlledVariable, '*');
        `,
      errors: [{ messageId: 'default' }],
    },
  ],
});
