/**
 * @fileOverview Detect DOM-based document-domain manipulation sinks (no-domain-manipulation)
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

const recomendation = 'Possible DOM-based document-domain manipulation sink.';

const messages = {
  domainManipulation: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect DOM-based document-domain manipulation sinks (no-domain-manipulation)',
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
          node.left?.property?.name === 'domain' &&
          !!findIdentifier(node.right)
        ) {
          // document.domain
          report(context, messages.domainManipulation, 'domainManipulation', {
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
