/**
 * @fileOverview Prevent DOM-based XSS (no-dom-xss)
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

const recomendation = 'Possible DOM-XSS sink.';

const messages = {
  domXss: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent DOM-based XSS (no-dom-xss)',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    return {
      CallExpression: function (node) {
        if (
          node.callee?.object?.name === 'document' &&
          ['write', 'writeln'].includes(node.callee?.property?.name) &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // document.write(), document.writeln()
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          node.callee?.property?.name === 'insertAdjacentHTML' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // 'insertAdjacentHTML()'
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          node.callee?.object?.callee?.name === '$' &&
          [
            'attr',
            'on',
            'add',
            'after',
            'append',
            'animate',
            'insertAfter',
            'insertBefore',
            'before',
            'html',
            'prepend',
            'replaceAll',
            'replaceWith',
            'wrap',
            'wrapInner',
            'wrapAll',
            'has',
            'constructor',
            'init',
            'index',
          ].includes(node.callee?.property?.name) &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // $().attr(), $().on()...
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `$(${node.callee?.object?.arguments
                .map(a => a.value || a.name)
                .join(', ')}).${node.callee?.property?.name}(${node.arguments
                .map(n => n.type)
                .join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        }
        if (
          node.callee?.object?.name === '$' &&
          node.callee?.property?.name === 'parseHTML' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // $.parseHTML()
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `$.parseHTML(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (node.callee?.property?.name === 'addEventListener') {
          // 'onevent'
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${node.callee?.property?.name}(${node.arguments[0]?.value})`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
      AssignmentExpression: function (node) {
        if (
          node.left?.object?.name === 'document' &&
          node.left?.property?.name === 'domain' &&
          !!findIdentifier(node.right)
        ) {
          // document.domain
          report(context, messages.domXss, 'domXss', {
            node,
            data: {
              reference: `${node.left?.object?.name}.${node.left?.property?.name} ${node.operator} ${node.right?.type}`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          ['innerHTML', 'outerHTML'].includes(node.left?.property?.name) &&
          !!findIdentifier(node.right)
        ) {
          // element.innerHTML, outerHTML
          report(context, messages.domXss, 'domXss', {
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
