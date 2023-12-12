'use strict';

module.exports = function findIdentifier(expression) {
  switch (expression.type) {
    case 'Identifier':
      return expression;
    case 'BinaryExpression':
      return findIdentifier(expression.left) || findIdentifier(expression.right);
    case 'TemplateLiteral':
      return expression.expressions.find(findIdentifier);
    default:
      return null;
  }
};
