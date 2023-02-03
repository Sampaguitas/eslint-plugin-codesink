/**
 * @fileoverview Prevent evil Regex
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-evil-regex.js');

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

ruleTester.run('no-evil-regex', rule, {
  valid: [
    {
      code: `
          const pattern = /abc/;
        `,
    },
  ],
  invalid: [
    {
      code: `
      const pattern = /(a+)+/;
        `,
      errors: [{ messageId: 'evilRegex' }],
    },
  ],
});
