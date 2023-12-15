'use strict';

module.exports = function findIdentifier(expression) {
  switch (expression.type) {
    case 'Identifier':
    case 'CallExpression':
    case 'FunctionExpression':
    case 'NewExpression':
      return expression;
    case 'TemplateLiteral':
      return expression.expressions.find(findIdentifier);
    case 'BinaryExpression':
      return findIdentifier(expression.left) || findIdentifier(expression.right);
    case 'MemberExpression':
      return findIdentifier(expression.object) || findIdentifier(expression.property);
    default:
      return null;
  }
};
