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

                // We are only interested in computed nodes that are inside an AssignmentExpression (fe: object[key] = value) node object should not be computed
                if (!node.computed || node.parent.type !== "AssignmentExpression" || !node.object.type === "Identifier") return;

                // Miditgation 1: if code contains Object.freeze(Object.prototype), it is not vulnerable to prototype pollution;
                if (isFrozen(context)) return;

                let codeSink = new CodeSink(node);

                if (codeSink.isRightOperand && !codeSink.isEscaped()) {

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

class CodeSink {
    constructor(node) {
        //deny list of dengerous attributes
        let denyList = ["__proto__", "constructor", "prototype"];

        // checks if the computed expression is on the right side of the assignment ( fe: object = object[attr] )
        this.isRightOperand = node.parent.right.loc === node.loc;

        // return the name of the object (fe: object in object[attr] )
        this.objectName = node.object.name;
        
        // checks if the node property type is also a memeber expression ( fe: object[arr[i]] === true)
        this.isMemberExpression = node.property.type === "MemberExpression";

        //  returns the name of the attribute if the node property is not a member expression (fe: attr in object[attr] )
        this.attribute = node.property.type !== "MemberExpression" ? node.property.name : "";

        // returns the name of the array if the node property is a memeber expression ( fe: arr in object[arr[i]])
        this.array = node.property.type === "MemberExpression" ? node.property.object.name : "";

        // returns the name of the iterator if the node property is a memeber expression ( fe: i in object[arr[i]])
        this.iterator = node.property.type === "MemberExpression" ? node.property.property.name : "";

        // checks if the computed expression is inside an IfStatement which prevents degerous attributes injection
        this.isEscaped = function() {
            
            if (!node.parent.parent.parent.parent || node.parent.parent.parent.parent.type !== "IfStatement") return false;
            if (this.isEscapedExclude(node.parent.parent.parent.parent)) return true;
            return this.isEscapedInclude(node.parent.parent.parent.parent);
        }

        // checks if all elements from the denylist are present in the unary expression ( fe: !["__proto__", "constructor", "prototype"].includes(attr) )
        this.isEscapedExclude = function(ifStatement) {
            console.log("isMemberExpression:", this.isMemberExpression);
            if (!isUnaryCallExpression(ifStatement.test) || !isArrayExpressionIncludes(ifStatement.test.argument) || !this.isCallExpressionFirstArgument(ifStatement.test.argument)) return false;
            return (!!denyList.every(b => Object.keys(ifStatement.test.argument.callee.object.elements).map(e => ifStatement.test.argument.callee.object.elements[e].value).includes(b) ));
        }

        // checks if all elements from the denylist are not present in the array expression ( fe: ["foo", "bar"].includes(attr) )
        this.isEscapedInclude = function(ifStatement) {
            if (!isArrayExpressionIncludes(ifStatement.test) || !this.isCallExpressionFirstArgument(ifStatement.test)) return false;
            return (!denyList.some(b => Object.keys(ifStatement.test.callee.object.elements).map(e => ifStatement.test.callee.object.elements[e].value).includes(b) ));
        }

        // checks if the left hand side of the .includes correspond to our attribute or array element to ( fe: .includes(attr) or .includes(arr[i]) )
        this.isCallExpressionFirstArgument = function(callExpression) {

            if (callExpression === undefined) return false;
            if (callExpression.arguments.length === 0) return false;
            if (this.isMemberExpression) {
                if (callExpression.arguments[0].type !== "MemberExpression") return false;
                if (callExpression.arguments[0].object.type !== "Identifier") return false;
                if (callExpression.arguments[0].object.name !== this.array) return false;
                if (callExpression.arguments[0].property.type !== "Identifier") return false;
                return callExpression.arguments[0].property.name === this.iterator;
            } else {
                if (callExpression.arguments[0].type !== "Identifier") return false;
                return callExpression.arguments[0].name === this.attribute;
            }
        }
    }
}

// ---------------Add this chunk to lib/utils?-----------------

function isArrayExpressionIncludes(callExpression) {
    if (callExpression === undefined) return false;
    if (callExpression.type !== "CallExpression") return false;
    if (callExpression.callee.type !== "MemberExpression") return false;
    if (callExpression.callee.computed === true) return false;
    if (callExpression.callee.property.type !== "Identifier") return false;
    if (callExpression.callee.property.name !== "includes") return false;
    if (callExpression.callee.object.type !== "ArrayExpression") return false;
    if (callExpression.callee.object.elements.length === 0) return false;
    return callExpression.callee.object.elements.every(e => e.type === "Literal");
}

function isUnaryCallExpression(expression) {
    if (expression === undefined) return false;
    if (expression.type !== "UnaryExpression") return false;
    if (expression.operator !== "!") return false;
    return expression.argument.type === "CallExpression";
}

// ---------------Add this chunk to lib/utils-----------------


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