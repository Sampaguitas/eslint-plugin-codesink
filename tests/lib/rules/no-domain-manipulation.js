/**
 * @fileoverview Prevent DOM-based document-domain manipulation (no-domain-manipulation)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-domain-manipulation.js');

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

ruleTester.run('no-domain-manipulation', rule, {
  valid: [],
  invalid: [
    {
      code: `
          document.domain = location.hash.slice(1);
        `,
      errors: [{ messageId: 'domainManipulation' }],
    },
  ],
});
