/**
 * @fileoverview Prevent DOM-based WebSocket-URL poisoning (websocket-url-poisoning)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-websocket-url-poisoning.js');

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

ruleTester.run('no-websocket-url-poisoning', rule, {
  valid: [],
  invalid: [
    {
      code: `
        var chatForm = document.getElementById("chatFrom"); var webSocket = new
        WebSocket(chatForm.getAttribute("action"));
      `,
      errors: [{ messageId: 'webSocketUrlPoisoning' }],
    },
  ],
});
