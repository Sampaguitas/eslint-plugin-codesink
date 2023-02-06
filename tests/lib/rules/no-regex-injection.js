/**
 * @fileoverview Prevent Regex Injection
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-regex-injection.js');

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

ruleTester.run('no-regex-injection', rule, {
  valid: [
    {
      code: `
        function testMatch(input) {
          let regex = /foo/;
          return input.match(regex);
        }
        
        let matches = testMatch('aaaaaaaaaaaaaaa!');
        `,
    },
  ],
  invalid: [
    {
      code: `
        function testMatch(pattern, input) {
          let regex = new RegExp(pattern);
          return input.match(regex);
        }
        
        let matches = testMatch(/(a+)+/, 'aaaaaaaaaaaaaaa!');
        `,
      errors: [{ messageId: 'evilRegex' }],
    },
  ],
});
