/**
 * @fileOverview Prevent DOM-based open redirect (no-open-redirect)
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

const recomendation = 'Possible DOM-based open redirect sink.';

const messages = {
  openRedirect: `"{{reference}}" detected in (line {{startPosition}}). ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent Open Redirect',
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
          node.callee?.object?.name === 'location' &&
          ['assign', 'replace'].includes(node.callee?.property?.name) &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // location.assign(), location.replace()
          report(context, messages.openRedirect, 'openRedirect', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          node.callee?.object?.name === 'window' &&
          node.callee?.property?.name === 'open' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // 'window.open
          report(context, messages.openRedirect, 'openRedirect', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          node.callee?.object?.name === 'XMLHttpRequest' &&
          ['open', 'send'].includes(node.callee?.property?.name) &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // XMLHttpRequest.open(), XMLHttpRequest.send()
          report(context, messages.openRedirect, 'openRedirect', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${
                node.callee?.property?.name
              }(${node.arguments.map(n => n.type).join(', ')})`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (
          ['jQuery', '$'].includes(node.callee?.object?.name) &&
          node.callee?.property?.name === 'ajax' &&
          node.arguments.some(argument => !!findIdentifier(argument))
        ) {
          // jQuery.ajax(), $.ajax()
          report(context, messages.openRedirect, 'openRedirect', {
            node,
            data: {
              reference: `${node.callee?.object?.name}.${node.callee?.property?.name}()`,
              startPosition: node.loc.start.line,
            },
          });
        }
      },
      AssignmentExpression: function (node) {
        if (
          node.left?.object?.name === 'location' &&
          ['host', 'hostname', 'href', 'pathname', 'search', 'protocol'].includes(
            node.left?.property?.name,
          ) &&
          !!findIdentifier(node.right)
        ) {
          // location.host, hostname, href, pathname, search, protocol
          report(context, messages.openRedirect, 'openRedirect', {
            node,
            data: {
              reference: `${node.left?.object?.name}.${node.left?.property?.name} ${node.operator} ${node.right?.type}`,
              startPosition: node.loc.start.line,
            },
          });
        } else if (node.left?.property?.name === 'srcdoc' && !!findIdentifier(node.right)) {
          // element.innerHTML, outerHTML
          report(context, messages.openRedirect, 'openRedirect', {
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
