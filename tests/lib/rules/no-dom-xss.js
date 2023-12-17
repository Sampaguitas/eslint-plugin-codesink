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
        function trackSearch(query) {
          document.writeln('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">');
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
          let controllableSource = location.search;
          list.insertAdjacentHTML('beforebegin', controllableSource);
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          document.domain = controllableSource;
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          element.innerHTML = controllableSource;
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          element.outerHTML = controllableSource;
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          $(function () {
            $('#backLink').attr('href', new URLSearchParams(window.location.search).get('returnUrl'));
          });
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          $(window).on('hashchange', function () {
            var element = $(location.hash);
            element[0].scrollIntoView();
          });
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          $('.inner').append(controllableSource);
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          $('img').after(controllableSource);
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          $('#box').animate(controllableSource);
        `,
      errors: [{ messageId: 'domXss' }],
    },
    {
      code: `
          let controllableSource = location.search;
          $.parseHTML(controllableSource);
        `,
      errors: [{ messageId: 'domXss' }],
    },
  ],
});
