/**
 * @fileOverview Prevent dom xss
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const report = require('../utils/report');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

const recomendation = 'A bad actor could use it to inject javascript code.';

const messages = {
  domXss: `Prevent the use of {{reference}} {{startPosition}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent dom xss',
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
          node.object?.name === 'document' &&
          ['write', 'writeln'].includes(node.property?.name)
        ) {
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `document.${node.property?.name}`,
              startPosition: `(line ${node.loc.start.line})`,
            },
          });
        }
      },
    };
  },
};
