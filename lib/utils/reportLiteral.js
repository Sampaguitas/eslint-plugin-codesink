'use strict';

const report = require('./report');
const utils = require('eslint-utils');

const authKeys = [
  'accessKeyId',
  'secretAccessKey',
  'auth',
  'user',
  'pass',
  'password',
  'host',
  'database',
  'authentication',
  'userName',
  'server',
  'apiKey',
  'authDomain',
  'databaseURL',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
  'measurementId',
  'connectString',
  'accessToken',
  'clientId',
  'clientSecret',
  'refreshToken',
  'accessToken',
  'serviceClient',
  'privateKey',
  'secretOrKey',
  'client_id',
  'client_secret',
  'access_token',
];

module.exports = function reportLiteral(node, context, message, messageId, data) {
  let sources = [];
  function recurcive(n) {
    switch (n.type) {
      case 'Literal':
        sources.push(n);
        break;
      case 'ObjectExpression':
        n.properties.forEach(p => recurcive(p));
        break;
      case 'Property':
        if (n.value.type === 'ObjectExpression') {
          recurcive(n.value);
        } else if (n.key.type === 'Identifier' && authKeys.includes(n.key.name)) {
          recurcive(n.value);
        }
        break;
      case 'Identifier':
        let variable = utils.findVariable(context.getScope(), n);
        variable.defs.forEach(d => recurcive(d.node));
        break;
      case 'VariableDeclarator':
        recurcive(n.init);
        break;
      default:
    }
  }

  recurcive(node);

  sources.forEach(s => report(context, message, messageId, { node: s, data }));
};
