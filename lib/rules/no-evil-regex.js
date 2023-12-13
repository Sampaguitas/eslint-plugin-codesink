/**
 * @fileOverview Prevent evil Regex
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const report = require('../utils/report');
const utils = require('eslint-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

const recomendation =
  'Avoid grouping with repetition and alternations with overlapping inside the repeated group.';

const messages = {
  evilRegex: `Evil Regex in {{reference}} {{startPosition}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent evil regex',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    function checkRegExp(node) {
      const source = node.value.source;
      let pattern = /\(((\[.+\]|.+)[?+*]\)|.+\|.+\))[?+*]/;
      if (pattern.test(source)) {
        report(context, messages.evilRegex, 'evilRegex', {
          node,
          data: {
            reference: node.raw || '',
            startPosition: `(line ${node.loc.start.line})`,
          },
        });
      }
    }
    return {
      Literal(node) {
        if (!(node.value instanceof RegExp)) {
          return;
        }
        checkRegExp(node);
      },
      CallExpression(node) {
        if (node.callee.type !== 'Identifier' || node.callee.name !== 'RegExp') {
          return;
        }
        if (node.arguments.length === 0) {
          return;
        }
        const arg = node.arguments[0];
        if (arg.type !== 'Literal' || typeof arg.value !== 'string') {
          return;
        }
        checkRegExp(arg);
      },
    };
  },
};
