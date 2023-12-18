/**
 * @fileOverview Prevent DOM-based WebSocket-URL poisoning (websocket-url-poisoning)
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

const recomendation = 'Possible DOM-based WebSocket-URL poisoning sink.';

const messages = {
  webSocketUrlPoisoning: `{{reference}} detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent DOM-based WebSocket-URL poisoning',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    return {
      NewExpression: function (node) {
        if (
          node.callee?.name === 'WebSocket' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // new WebSocket()
          report(context, messages.webSocketUrlPoisoning, 'webSocketUrlPoisoning', {
            node,
            data: {
              reference: `new ${node.callee?.name}(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
    };
  },
};
