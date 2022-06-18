/**
 * @fileOverview Detect improperly controlled modifications of object prototype attributes
 * @author Timothee Desurmont
 */

 'use strict';

 // ------------------------------------------------------------------------------
 // Rule Definition
 // ------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",
        messages: {
            1: "Improperly controlled modification of an object attribute detected, Possible Prototype Pollution (CWE-1321).",
        },
        docs: {
            description: "Detect Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')",
            category: 'Possible Security Vulnerability',
            recommended: true,
            url: 'https://cwe.mitre.org/data/definitions/1321.html',
        },
        // fixable: "code",
        hasSuggestions: true
    },
    create(context) {
        return {
            MemberExpression(node) {

                // We are only interested in computed nodes that are inside an AssignmentExpression (fe: object[key] = value)
                if (!node.computed || node.parent.type !== "AssignmentExpression") return;

                // Miditgation 1: if code contains Object.freeze(Object.prototype), it is not vulnerable to prototype pollution;
                if (isFrozen(context)) return;

                // checks if the computed expression is on the right side of the assignment (fe: object = object[key])
                let isRightOperand = node.parent.right.loc === node.loc;

                if (isRightOperand && !isBlocking(context, node)) {
                    console.log("parent:", node.parent.type);
                    context.report({
                        node,
                        message: "Improperly Controlled Modification of Object Prototype Attributes inside a function.",
                        suggest: [
                            {
                                desc: "CodeSink: Use a deny list of dengerous attributes.",
                                fix: function(fixer) {
                                    return fixer.insertTextBefore(node.parent, `if(${node.property.name} === "__proto__" || ${node.property.name} === "constructor" || ${node.property.name} === "prototype") return;\n\n`);
                                }
                            },
                            {
                                desc: "CodeSink: Freeze the object prototype.",
                                fix: function(fixer) {
                                    return fixer.insertTextBefore(context.getAncestors()[0], "Object.freeze(Object.prototype);\n\n");
                                }
                            }
                        ]
                    });
                }
            }
        };
    }
};

 // ------------------------------------------------------------------------------
 // Functions
 // ------------------------------------------------------------------------------

function isFrozen(context) {
    return context.getAncestors().some(function(ancestor) {
        return ancestor.hasOwnProperty("body") && Array.isArray(ancestor.body) && ancestor.body.some(function (expressionStatement) {
            return (expressionStatement.type === "ExpressionStatement"
                && expressionStatement.expression.type === "CallExpression"
                && expressionStatement.expression.callee.type === "MemberExpression"
                && expressionStatement.expression.callee.object.name === "Object"
                && expressionStatement.expression.callee.property.name === "freeze"
                && expressionStatement.expression.arguments.length === 1
                && expressionStatement.expression.arguments[0].type === "MemberExpression"
                && expressionStatement.expression.arguments[0].object.name === "Object"
                && expressionStatement.expression.arguments[0].property.name === "prototype"
            );
        });
    });
}

function isBlocking(context, node) {
    return context.getAncestors().some(function(ancestor) {
        switch(ancestor.type) {
            case "ForOfStatement": return isNodeIncluded(ancestor, node) && isBlockingForOfStatement(ancestor, node);
            case "ForStatement": return isNodeIncluded(ancestor, node) && isBlockingForStatement(ancestor, node);
            case "ExpressionStatement": return isNodeIncluded(ancestor, node) && isBlockingExpressionStatement(ancestor, node);
            default: return false;
        }
    });
}

function isNodeIncluded(ancestor, node) {
    return ancestor.range[0] <= node.range[0] && ancestor.range[1] >= node.range[1];
}

function isPrototypeAttributesBlocked(ifStatementTest, node) {
    let blackList = ["__proto__", "constructor", "prototype"];
    let seenAttributes = [];

    function testLogicalExpression(logicalExpression) {
        if (logicalExpression.type === "LogicalExpression" && logicalExpression.operator === "||") {
            testLogicalExpression(logicalExpression.left);
            testLogicalExpression(logicalExpression.right);
        } else if (logicalExpression.type === "BinaryExpression" && logicalExpression.operator === "===") {
            if (logicalExpression.left.type === "Identifier" && logicalExpression.left.name === node.property.name && logicalExpression.right.type === "Literal" && blackList.includes(logicalExpression.right.value)) {
                seenAttributes.push(logicalExpression.right.value);
            } else if (logicalExpression.right.type === "Identifier" && logicalExpression.right.name === node.property.name && logicalExpression.left.type === "Literal" && blackList.includes(logicalExpression.left.value)) {
                seenAttributes.push(logicalExpression.right.value);
            }
        }
    }

    testLogicalExpression(ifStatementTest);

    return blackList.every(attributes => seenAttributes.includes(attributes));
}


function isBlockingExpressionStatement(expressionStatement, node) {
    if (expressionStatement.expression.type === "CallExpression"
        && expressionStatement.expression.arguments.length !== 0
        && expressionStatement.expression.arguments[0].type === "FunctionExpression"
        && expressionStatement.expression.arguments[0].params.length !== 0
        && expressionStatement.expression.arguments[0].params[0].type === "Identifier") {
            return expressionStatement.expression.arguments[0].params[0].name === node.property.name && expressionStatement.expression.arguments[0].body.body.some(function(ifStatement) {
                return ifStatement.type === "IfStatement" && isContinueStatement(ifStatement.consequent.body) && isPrototypeAttributesBlocked(ifStatement.test, node);
            });
    }
    return false;
}

function isBlockingForOfStatement(forOfStatement, node) {
    return forOfStatement.left.declarations.some(function(variableDeclarator) {
        return variableDeclarator.id.name === node.parent.right.property.name && forOfStatement.body.body.some(function(ifStatement) {
            return ifStatement.type === "IfStatement" && isContinueStatement(ifStatement.consequent.body) && isPrototypeAttributesBlocked(ifStatement.test, node);
        });
    });
}

function isBlockingForStatement(forStatement, node) {
    
    function getForStatementMemberExpressionObject(forStatementTest) {
        if (forStatementTest.right.type === "MemberExpression" && forStatementTest.right.object.type === "Identifier") {
            return forStatementTest.right.object.name;
        } else if (forStatementTest.left.type === "MemberExpression" && forStatementTest.left.object.type === "Identifier") {
            return forStatementTest.left.object.name;
        }
    }

    let variableDeclaratorIdentifyer = forStatement.init.declarations[0].id.name;
    let memberExpressionObject = getForStatementMemberExpressionObject(forStatement.test);
    if (node.property.hasOwnProperty("object") && node.property.hasOwnProperty("property")) {
        return memberExpressionObject === node.property.object.name && variableDeclaratorIdentifyer === node.property.property.name && forStatement.body.body.some(function(ifStatement) {
            return ifStatement.type === "IfStatement" && isContinueStatement(ifStatement.consequent.body);
        });
    }; 
}

function isContinueStatement(ifStatementConsequentBody) {
    return ifStatementConsequentBody.length === 0 || ifStatementConsequentBody.some(continueStatement => ["ContinueStatement", "ReturnStatement"].includes(continueStatement.type));
}