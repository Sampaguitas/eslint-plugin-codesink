/**
 * @fileOverview Prevent eval injection
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

const recomendation = 'Possible Eval Injection sink.';

const messages = {
  refInjection: `{{reference}} detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent eval injection',
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
          node.callee?.name === 'Function' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // new Function()
          report(context, messages.refInjection, 'refInjection', {
            node,
            data: {
              reference: `new ${node.callee?.name}(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
      CallExpression: function (node) {
        if (
          ['eval', 'exec', 'spawn'].includes(node.callee?.name) &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // 'eval()', 'exec()', 'spawn()'
          report(context, messages.refInjection, 'refInjection', {
            node,
            data: {
              reference: `${node.callee?.name}(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
    };
  },
};
