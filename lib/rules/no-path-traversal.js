/**
 * @fileOverview Detect Path Traversal
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

const recomendation = 'Never allow user controlled input inside paths.';

const messages = {
  pathTraversal: `Path Traversal in {{reference}} {{startPosition}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect Path Traversal',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    return {
      MemberExpression: function (node) {
        if (
          node.object.type === 'Identifier' &&
          node.object.name === 'require' &&
          node.property.type === 'Identifier' &&
          node.property.name === 'apply'
        ) {
          report(context, messages.pathTraversal, 'pathTraversal', {
            node,
            data: {
              reference: node.object.name + '.' + node.property.name,
              startPosition: `(line ${node.loc.start.line})`,
            },
          });
        }
      },
      CallExpression: function (node) {
        if (node.callee.type === 'Identifier') {
          if (
            node.callee.name === 'require' ||
            node.callee.name === 'import' ||
            node.callee.name === 'readFileSync' ||
            node.callee.name === 'readdirSync' ||
            node.callee.name === 'statSync'
          ) {
            node.arguments.forEach(function (arg) {
              if (arg.type !== 'Literal') {
                const isConst =
                  context.getDeclaredVariables(arg).filter(variable => variable.writeable === false)
                    .length > 0;
                if (!isConst) {
                  report(context, messages.pathTraversal, 'pathTraversal', {
                    node,
                    data: {
                      reference: node.callee.name,
                      startPosition: `(line ${node.loc.start.line})`,
                    },
                  });
                }
              }
            });
          }
        }
      },
    };
  },
};
