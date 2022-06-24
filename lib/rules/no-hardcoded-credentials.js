/**
 * @fileOverview Prevent hard-coded credentials
 * @author Timothee Desurmont
 */

 'use strict';

 const docsUrl = require('../util/docsUrl');
 const report = require('../util/report');

 // ------------------------------------------------------------------------------
 // Rule Definition
 // ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */

 const messages = {
    connectionString: 'Exposed credentials in connection string',
    configurationObject: 'Exposed Credentials in configuration object'
}

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prevent hard-coded credentials',
            category: 'Possible Security Vulnerability',
            recommended: true,
            url: docsUrl('no-hardcoded-credentials.md'),
        },
        messages
    },
    create(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            // visitor functions for different types of nodes
            Literal(node) {
                
                if (/mongodb(\+srv)?:\/\/[^:/?#\[\]@]+:[^:/?#\[\]@]+@/.test(node.value)) {
                    report(context, messages.connectionString, 'connectionString', { node });
                }

                // sql, aws, mws, goolgeapi, nodemailer, firebase
                if (node.parent.type === "Property" && node.parent.key.type === "Identifier" && ["accessKeyId", "secretAccessKey", "user", "password", "auth", "pass", "userName", "MWSAuthToken", "apiKey"].includes(node.parent.key.name)) {
                    report(context, messages.configurationObject, 'configurationObject', { node });
                }

            }
        };
    }
};