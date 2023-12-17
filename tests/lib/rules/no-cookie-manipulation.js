/**
 * @fileoverview Prevent DOM-based Cookie Manipulation (no-cookie-manipulation)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-cookie-manipulation.js');

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

ruleTester.run('no-cookie-manipulation', rule, {
  valid: [],
  invalid: [
    {
      code: `
      document.cookie = 'cookieName='+location.hash.slice(1);
        `,
      errors: [{ messageId: 'cookieManipulation' }],
    },
  ],
});
