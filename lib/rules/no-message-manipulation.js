/**
 * @fileOverview Detect Web message manipulation sinks (no-message-manipulation)
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const report = require('../utils/report');
const findIdentifier = require('../utils/findIdentifier');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

const recomendation = 'Possible Web message manipulation sink.';

const messages = {
  default: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect Web message manipulation sinks (no-message-manipulation)',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    return {
      CallExpression: function (node) {
        if (
          node.callee?.property?.name === 'postMessage' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // element.postMessage()
          report(context, messages.default, 'default', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
    };
  },
};
