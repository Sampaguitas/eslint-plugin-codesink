/**
 * @fileOverview Prevent eval injection
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const reportControlled = require('../utils/reportControlled');
const utils = require('eslint-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

const recomendation = 'A bad actor could use it to run arbitrary code.';

const messages = {
  refInjection: `Prevent user controled inputs inside {{reference}} {{startPosition}}. ${recomendation}`,
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
    //----------------------------------------------------------------------
    // Variables
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'Program:exit'() {
        const tracker = new utils.ReferenceTracker(context.getScope());
        const traceMap = {
          eval: {
            [utils.ReferenceTracker.READ]: true,
          },
        };

        for (const { node, path } of tracker.iterateGlobalReferences(traceMap)) {
          console.log(node);
          if (node.type === 'Identifier' && node.parent.type === 'CallExpression') {
            node.parent.arguments.forEach(element => {
              reportControlled(element, context, messages.refInjection, 'refInjection', {
                reference: `${path.join('.')}()`,
                startPosition: `(line ${element.loc.start.line})`,
              });
            });
          }
        }
      },
      NewExpression: function (node) {
        if (node.callee.type === 'Identifier' && node.callee.name === 'Function') {
          node.arguments.forEach(element => {
            reportControlled(element, context, messages.refInjection, 'refInjection', {
              reference: `new Function() constructor`,
              startPosition: `(line ${element.loc.start.line})`,
            });
          });
        }
      },
      CallExpression: function (node) {
        if (node.callee.type === 'Identifier' && ['exec', 'spawn'].includes(node.callee.name)) {
          node.arguments.forEach(element => {
            reportControlled(element, context, messages.refInjection, 'refInjection', {
              reference: `${node.callee.name}()`,
              startPosition: `(line ${element.loc.start.line})`,
            });
          });
        }
      },
    };
  },
};
