/**
 * @fileOverview Prevent DOM-based link manipulation (no-link-manipulation)
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

const recomendation = 'Possible DOM-based link manipulation sink.';

const messages = {
  linkManipulation: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent DOM-based link manipulation (no-link-manipulation)',
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
          node.left?.object?.name !== 'location' &&
          ['href', 'src', 'action'].includes(node.left?.property?.name) &&
          !!findIdentifier(node.right)
        ) {
          // element.href, element.src, element.action
          report(context, messages.linkManipulation, 'linkManipulation', {
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
