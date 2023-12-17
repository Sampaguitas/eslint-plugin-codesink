/**
 * @fileoverview Prevent DOM-based JavaScript injection (no-eval-injection)
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
  valid: [],
  invalid: [
    {
      code: `
      let controllableSource = 'console.log(1+1)';
      function resolveJavascriptFunction(controllableSource) {
        var func;
      
        try {
          func = new Function('return ' + controllableSource);
          return func();
        } catch (error) {
          return NIL;
        }
      }
        `,
      errors: [{ messageId: 'refInjection' }],
    },
    {
      code: `
        let controllableSource = 'console.log(1+1)';

        function resolveJavascriptFunction(controllableSource) {
          return setTimeout(controllableSource, 1000);
        }
        `,
      errors: [{ messageId: 'refInjection' }],
    },
    {
      code: `
          const tagString = '<div>I am a div node</div>';
          const range = document.createRange();
          
          // Make the parent of the first div in the document become the context node
          range.selectNode(document.getElementsByTagName('div').item(0));
          const documentFragment = range.createContextualFragment(tagString);
          document.body.appendChild(documentFragment);
        `,
      errors: [{ messageId: 'refInjection' }],
    },
  ],
});
