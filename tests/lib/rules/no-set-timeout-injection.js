/**
 * @fileoverview Prevent setTimeout() and setInterval() injection
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-set-timeout-injection.js');

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

ruleTester.run('no-set-timeout-injection', rule, {
  valid: [
    {
      code: `
          let crontrolledInput = 'console.log(1+1)';

          function resolveJavascriptFunction(userControlledInput) {
            setTimeout(function () {
              return crontrolledInput;
            }, 1000);
          }
        `,
    },
  ],
  invalid: [
    {
      code: `
        let crontrolledInput = 'console.log(1+1)';

        function resolveJavascriptFunction(userControlledInput) {
          return setTimeout(userControlledInput, 1000);
        }
        `,
      errors: [{ messageId: 'refInjection' }],
    },
  ],
});
