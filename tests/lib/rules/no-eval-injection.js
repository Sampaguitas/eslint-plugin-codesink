/**
 * @fileoverview Prevent eval injection
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-eval-injection.js');

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

ruleTester.run('no-eval-injection', rule, {
  valid: [
    {
      code: `
          const addition = new Function("a", "b", "return a+b");
          addition(1, 1)
        `,
    },
  ],
  invalid: [
    {
      code: `
      function resolveJavascriptFunction(object) {
        var func;
      
        try {
          func = new Function('return ' + object);
          return func();
        } catch (error) {
          return NIL;
        }
      }
        `,
      errors: [{ messageId: 'refInjection' }],
    },
  ],
});
