/**
 * @fileOverview Prevent setTimeout() and setInterval() injection
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const reportControlled = require('../utils/reportControlled');

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
      description: 'Prevent setTimeout() and setInterval() injection',
      category: 'Possible Security Vulnerability',
      recommended: false,
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
      CallExpression: function (node) {
        if (
          node.callee.type === 'Identifier' &&
          ['setTimeout', 'setInterval'].includes(node.callee.name)
        ) {
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
