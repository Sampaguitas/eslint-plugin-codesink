/**
 * @fileOverview Detect hard-coded credentials
 * @author Timothee Desurmont
 */

'use strict';

const docsUrl = require('../utils/docsUrl');
const reportLiteral = require('../utils/reportLiteral');
const utils = require('eslint-utils');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

const recomendation = 'Never commit this string to your public repository.';

const messages = {
  packageConfigs: `Exposed credentials in {{reference}} {{startPosition}}. ${recomendation}`,
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Detect hard-coded credentials',
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

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // sql, aws, mws, goolgeapi, nodemailer, firebase
      'Program:exit'() {
        const tracker = new utils.ReferenceTracker(context.getScope());
        const traceMap = {
          // axios: {
          //   [utils.ReferenceTracker.READ]: true,
          // },
          'aws-sdk': {
            config: {
              update: {
                [utils.ReferenceTracker.READ]: true,
              },
            },
          },
          '@aws-sdk/client-ses': {
            SESClient: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
            },
          },
          'passport-jwt': {
            Strategy: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
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
          oracledb: {
            getConnection: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
          pg: {
            Pool: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
            },
            Client: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
            },
          },
          sequelize: {
            Sequelize: {
              [utils.ReferenceTracker.CONSTRUCT]: true,
            },
          },
          mssql: {
            connect: {
              [utils.ReferenceTracker.READ]: true,
            },
          },
          googleapis: {
            google: {
              blogger: {
                [utils.ReferenceTracker.READ]: true,
              },
            },
          },
        };

        for (const { node, path } of tracker.iterateCjsReferences(traceMap)) {
          if (!!node.parent.arguments) {
            node.parent.arguments.forEach(element => {
              reportLiteral(element, context, messages.packageConfigs, 'packageConfigs', {
                reference: `${path.join('.')}()`,
                startPosition: `(line ${element.loc.start.line})`,
              });
            });
          }
          if (!!node.arguments) {
            node.arguments.forEach(element => {
              reportLiteral(element, context, messages.packageConfigs, 'packageConfigs', {
                reference: `${path.join('.')}()`,
                startPosition: `(line ${element.loc.start.line})`,
              });
            });
          }
        }
      },
    };
  },
};
