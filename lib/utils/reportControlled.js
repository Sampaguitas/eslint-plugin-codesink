'use strict';

const report = require('./report');
const utils = require('eslint-utils');

module.exports = function reportControlled(node, context, message, messageId, data) {
  let sources = [];
  function recurcive(n) {
    switch (n.type) {
      case 'Identifier':
        let variable = utils.findVariable(context.getScope(), n);
        if (!!variable?.identifiers) {
          variable.identifiers.forEach(d => {
            if (d.parent.type === 'VariableDeclarator' && d.parent?.init?.type === 'Literal')
              return;
            sources.push(d);
          });
        }
        break;
      case 'BinaryExpression':
      case 'LogicalExpression':
        recurcive(n.left);
        recurcive(n.right);
        break;
      case 'TemplateLiteral':
        n.expressions.forEach(e => recurcive(e));
        break;
      default:
    }
  }

  recurcive(node);

  sources.forEach(s => report(context, message, messageId, { node: s, data }));
};
