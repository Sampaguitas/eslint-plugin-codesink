/**
 * @fileOverview Prevent DOM-based Cookie Manipulation (no-cookie-manipulation)
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

const recomendation = 'Possible DOM-based Cookie Manipulation sink.';

const messages = {
  cookieManipulation: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent DOM-based Cookie Manipulation (no-cookie-manipulation)',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    return {
      AssignmentExpression: function (node) {
        if (
          node.left?.object?.name === 'document' &&
          node.left?.property?.name === 'cookie' &&
          !!findIdentifier(node.right)
        ) {
          // document.cookie
          report(context, messages.cookieManipulation, 'cookieManipulation', {
            node,
            data: {
              reference: `${node.left?.object?.name}.${node.left?.property?.name} ${node.operator} ${node.right?.type}`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
    };
  },
};
