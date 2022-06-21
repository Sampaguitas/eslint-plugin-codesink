/**
 * @fileOverview Detect exposed credentials
 * @author Timothee Desurmont
 */

 'use strict';

 // ------------------------------------------------------------------------------
 // Rule Definition
 // ------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Detect Insufficiently Protected Credentials (CWE-522)",
            category: 'Possible Security Vulnerability',
            recommended: true,
            url: 'https://cwe.mitre.org/data/definitions/522.html',
        },
    },
    create(context) {
        return {
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