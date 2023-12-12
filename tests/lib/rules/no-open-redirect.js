/**
 * @fileoverview Prevent DOM-based open redirect (no-open-redirect)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-open-redirect.js');

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

ruleTester.run('no-open-redirect', rule, {
  valid: [],
  invalid: [
    {
      code: `
        location.href = url
        `,
      errors: [{ messageId: 'openRedirect' }],
    },
  ],
});
