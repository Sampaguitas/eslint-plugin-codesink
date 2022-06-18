/**
 * @fileoverview Enforce newlines between operands of ternary expressions
 * @author Timothee Desurmont
 */

 "use strict";
 
 //------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require("../../../lib/rules/no-prototype-pollution.js");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaVersion: "latest"
    }
  });

ruleTester.run("no-prototype-pollution", rule, {
    valid: [
        {
            // definition: "right hand computed memeber expression inside a forEach loop with Object.freeze mitigation",
            code: `
            Object.freeze(Object.prototype);

            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;

                pathArray.forEach(function(attr) {
                        
                    if (typeof objectToModify[attr] !== "object") {
                        objectToModify[attr] = {};
                    }

                    objectToModify = objectToModify[attr];
                });

                objectToModify[attributeToSet] = value;
                return object;
            }
            `
        },
        {
            // definition: "right hand computed memeber expression inside a forEach loop, dengerous attributes being escaped",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
            
                pathArray.forEach(function(attr) {
            
                    if (attr === "__proto__" || attr === "constructor" || attr === "prototype") {
                        return;
                    }
                         
                    if (typeof objectToModify[attr] !== "object") {
                        objectToModify[attr] = {};
                    }
            
                    objectToModify = objectToModify[attr];
                });
            
                objectToModify[attributeToSet] = value;
                return object;
            }
            `
        },
        {
            // definition: "right hand computed memeber expression inside a forOf loop, dengerous attributes being escaped",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
                
                for (const attr of pathArray) {
            
                    if (attr === "__proto__" || attr === "constructor" || attr === "prototype") {
                        continue;
                    }
                         
                    if (typeof objectToModify[attr] !== "object") {
                        objectToModify[attr] = {};
                    }
            
                    objectToModify = objectToModify[attr];
                }
            
                objectToModify[attributeToSet] = value;
                return object;
            }
            `
        },
        {
            // definition: "right hand computed memeber expression inside a for loop, dengerous attributes being escaped",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
            
                for (let i = 0; i < pathArray.length; i++) {
            
                    if (pathArray[i] === "__proto__" || pathArray[i] === "constructor" || pathArray[i] === "prototype") {
                        continue;
                    }
                         
                    if (typeof objectToModify[pathArray[i]] !== "object") {
                        objectToModify[pathArray[i]] = {};
                    }
            
                    objectToModify = objectToModify[pathArray[i]];
                }
            
                objectToModify[attributeToSet] = value;
                return object;
            }
            `
        }
    ],
    invalid: [
        {
            // definition: "right hand computed memeber expression inside a forEach loop without mitigation",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
        
                pathArray.forEach(function(attr) {
                        
                    if (typeof objectToModify[attr] !== "object") {
                        objectToModify[attr] = {};
                    }
        
                    objectToModify = objectToModify[attr];
                });
        
                objectToModify[attributeToSet] = value;
                return object;
            }
            `,
            errors: [{ messageId: 1 }]
        },
        {
            // definition: "right hand computed memeber expression inside a forOf loop without mitigation",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
                
                for (const attr of pathArray) {
                         
                    if (typeof objectToModify[attr] !== "object") {
                        objectToModify[attr] = {};
                    }
            
                    objectToModify = objectToModify[attr];
                }
            
                objectToModify[attributeToSet] = value;
                return object;
            }
            `,
            errors: [{ messageId: 1 }]
        },
        {
            // definition: "right hand computed memeber expression inside a for loop without mitigation",
            code: `
            function setValueByPath(object, path, value) {
                const pathArray = path.split(".");
                const attributeToSet = pathArray.pop();
                let objectToModify = object;
            
                for (let i = 0; i < pathArray.length; i++) {
                         
                    if (typeof objectToModify[pathArray[i]] !== "object") {
                        objectToModify[pathArray[i]] = {};
                    }
            
                    objectToModify = objectToModify[pathArray[i]];
                }
            
                objectToModify[attributeToSet] = value;
                return object;
            }
            `,
            errors: [{ messageId: 1 }]
        }
    ]
});