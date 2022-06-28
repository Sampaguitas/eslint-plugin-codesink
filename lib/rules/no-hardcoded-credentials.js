/**
 * @fileOverview Prevent hard-coded credentials
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

const recomendation = 'Never commit this string to your public repository.';

const messages = {
  packageConfigs: `Exposed credentials in {{package}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent hard-coded credentials',
      category: 'Possible Security Vulnerability',
      recommended: true,
      url: docsUrl(__filename),
    },
    messages,
  },
  create(context) {
    //----------------------------------------------------------------------
    // Variables
    //----------------------------------------------------------------------

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
    ];

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function getArgument(scope, node) {
      try {
        if (node.type === 'NewExpression' && node.arguments[0].type === 'Identifier') {
          let variable = utils.findVariable(scope, node.arguments[0]);
          return variable.defs[0].node.init;
        } else if (
          node.parent.type === 'CallExpression' &&
          node.parent.arguments[0].type === 'Identifier'
        ) {
          let variable = utils.findVariable(scope, node.parent.arguments[0]);
          return variable.defs[0].node.init;
        } else {
          return node.parent.arguments[0];
        }
      } catch (_e) {
        return;
      }
    }

    function getExposedCredentials(scope, node) {
      let exposedStrings = [];
      function recursive(p) {
        if (p.value.type === 'ObjectExpression') {
          p.value.properties.forEach(sub => recursive(sub));
        } else if (
          p.type === 'Property' &&
          p.key.type === 'Identifier' &&
          authKeys.includes(p.key.name)
        ) {
          if (p.value.type === 'Literal') {
            exposedStrings.push(p.value);
          } else if (p.value.type === 'Identifier') {
            try {
              let variable = utils.findVariable(scope, p.value).defs[0].node.init;
              if (!!variable && variable.type === 'Literal') {
                exposedStrings.push(variable);
              }
            } catch (_e) {
              return;
            }
          }
        }
      }
      node.properties.forEach(p => recursive(p));
      return exposedStrings;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // sql, aws, mws, goolgeapi, nodemailer, firebase
      'Program:exit'() {
        const tracker = new utils.ReferenceTracker(context.getScope());
        const traceMap = {
          'aws-sdk': {
            config: {
              update: {
                [utils.ReferenceTracker.READ]: true,
              },
            },
          },
          'firebase/app': {
            initializeApp: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
          nodemailer: {
            createTransport: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
          mysql: {
            createConnection: {
              [utils.ReferenceTracker.READ]: true,
            },
            createPool: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
          tedious: {
            Connection: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
            },
          },
          mongoose: {
            connect: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
        };

        for (const { node, path } of tracker.iterateCjsReferences(traceMap)) {
          let argument = getArgument(context.getScope(), node);
          if (!!argument) {
            if (argument.type === 'ObjectExpression') {
              let exposedCredentials = getExposedCredentials(context.getScope(), argument);
              exposedCredentials.forEach(e => {
                report(context, messages.packageConfigs, 'packageConfigs', {
                  node: e,
                  data: { package: `${path.join('.')}()` },
                });
              });
            } else if (argument.type === 'Literal') {
              report(context, messages.packageConfigs, 'packageConfigs', {
                node: argument,
                data: { package: `${path.join('.')}()` },
              });
            }
          }
        }
      },
    };
  },
};
