/**
 * @fileOverview Detect Regex Injection
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

const recomendation = 'Never allow user controlled input inside a RegExp Constructor.';

const messages = {
  regexInjection: `Regex Injection in {{reference}} {{startPosition}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect Regex Injection',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    function checkForIdentifier(expression) {
      if (expression.type === 'Identifier') {
        return expression;
      } else if (expression.type === 'BinaryExpression') {
        let result = checkForIdentifier(expression.left);
        return result || checkForIdentifier(expression.right);
      } else if (expression.type === 'TemplateLiteral') {
        return expression.expressions.find(checkForIdentifier);
      }
      return null;
    }
    return {
      NewExpression(node) {
        if (node.callee.name === 'RegExp') {
          let identifier = checkForIdentifier(node.arguments[0]);
          if (!!identifier) {
            report(context, messages.regexInjection, 'regexInjection', {
              node,
              data: {
                reference: `new RegExp(${identifier.name || ''})`,
                startPosition: `(line ${identifier.loc.start.line})`,
              },
            });
          }
        }
      },
    };
  },
};
