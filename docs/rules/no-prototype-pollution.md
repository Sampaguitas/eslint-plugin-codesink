# CWE-1321: Improperly Controlled Modification of Object Prototype Attributes ('Prototype Pollution')

The software receives input from an upstream component that specifies attributes that are to be initialized or updated in an object, but it does not properly control modifications of attributes of the object prototype.

## Rule Details

By adding or modifying attributes of an object prototype, it is possible to create attributes that exist on every object, or replace critical attributes with malicious ones. This can be problematic if the software depends on existence or non-existence of certain attributes, or uses pre-defined attributes of object prototype (such as hasOwnProperty, toString or valueOf).

This weakness is usually exploited by using a special attribute of objects called proto, constructor or prototype. Such attributes give access to the object prototype. This weakness is often found in code that assigns object attributes based on user input, or merges or clones objects recursively.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js

function setValueByPath (object, path, value) {
    const pathArray = path.split(".");
    const attributeToSet = pathArray.pop();
    let objectToModify = object;
    for (const attr of pathArray) {
        if (typeof objectToModify[attr] !== 'object') {
            objectToModify[attr] = {};
        }
        objectToModify = objectToModify[attr];
    }
    objectToModify[attributeToSet] = value;
    return object;
}

```

Examples of **correct** code for this rule:

```js

function setValueByPath (object, path, value) {
    const pathArray = path.split(".");
    const attributeToSet = pathArray.pop();
    let objectToModify = object;
    for (const attr of pathArray) {
        // Ignore attributes which resolve to object prototype
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

```

## Potential Mitigations

### Phase: Implementation

By freezing the object prototype first (for example, ``Object.freeze(Object.prototype)``), modification of the prototype becomes impossible.

**Effectiveness: High**

**Note**: While this can mitigate this weakness completely, other methods are recommended when possible, especially in components used by upstream software ("libraries").

***

### Phase: Architecture and Design

By blocking modifications of attributes that resolve to object prototype, such as proto or prototype, this weakness can be mitigated.

**Effectiveness: High**

***

### Phase: Implementation

By using an object without prototypes (via ``Object.create(null)`` ), adding object prototype attributes by accessing the prototype via the special attributes becomes impossible, mitigating this weakness.

**Effectiveness: High**

***

### Phase: Implementation
Map can be used instead of objects in most cases. If Map methods are used instead of object attributes, it is not possible to access the object prototype or modify it.

**Effectiveness: Moderate**

***

## Further Reading

* [CWE-1321: Improperly Controlled Modification of Object Prototype Attributes](https://cwe.mitre.org/data/definitions/1321.html)
* [REF-1148: Olivier Arteau. "Prototype pollution attack in NodeJS application". 2018-05-15](https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf)
