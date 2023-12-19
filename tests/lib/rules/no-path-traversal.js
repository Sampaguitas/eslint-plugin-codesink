/**
 * @fileoverview Detect Path Traversal
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-path-traversal.js');

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

ruleTester.run('no-path-traversal', rule, {
  valid: [
    {
      code: `
      require('./locale/foo.js');
        `,
    },
  ],
  invalid: [
    {
      code: `
        require('./locale/' + name);
      `,
      errors: [{ messageId: 'pathTraversal' }],
    },
  ],
});
