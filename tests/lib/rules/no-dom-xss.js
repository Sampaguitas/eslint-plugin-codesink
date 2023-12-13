/**
 * @fileoverview Prevent DOM-based XSS (no-dom-xss)
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-dom-xss.js');

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

ruleTester.run('no-dom-xss', rule, {
  valid: [],
  invalid: [
    {
      code: `
        function trackSearch(query) {
          document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">');
        }
        var query = (new URLSearchParams(window.location.search)).get('search');
          if (query) {
            trackSearch(query);
        }
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
        subject.insertAdjacentHTML(positionSelect.value, variable);
        `,
      errors: [{ messageId: 'domXss' }],
    },
  ],
});
