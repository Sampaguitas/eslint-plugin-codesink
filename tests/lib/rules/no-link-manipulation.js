/**
 * @fileoverview Detect DOM-based link manipulation sinks (no-link-manipulation)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-link-manipulation.js');

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

ruleTester.run('no-link-manipulation', rule, {
  valid: [],
  invalid: [
    {
      code: `
      element.href = (new URLSearchParams(window.location.search)).get('q');
        `,
      errors: [{ messageId: 'linkManipulation' }],
    },
  ],
});
