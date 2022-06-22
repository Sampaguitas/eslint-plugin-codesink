/**
 * @fileOverview CWE-798: Use of Hard-coded Credentials
 * @author Timothee Desurmont
 */

 'use strict';

 // ------------------------------------------------------------------------------
 // Rule Definition
 // ------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "CWE-798: Use of Hard-coded Credentials",
            category: 'Possible Security Vulnerability',
            recommended: true,
            url: 'https://cwe.mitre.org/data/definitions/522.html',
        },
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
                    context.report({
                        node,
                        message: "Exposed Credentials in connection string",
                    });
                }

                // sql, aws, mws, goolgeapi, nodemailer, firebase
                if (node.parent.type === "Property" && node.parent.key.type === "Identifier" && ["accessKeyId", "secretAccessKey", "user", "password", "auth", "pass", "userName", "MWSAuthToken", "apiKey"].includes(node.parent.key.name)) {
                    context.report({
                        node,
                        message: "Exposed Credentials in configuration object",
                    });
                }

            }
        };
    }
};