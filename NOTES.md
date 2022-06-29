# loops

[1] while loop
[2] for loop
[3] doWile loop
[4] forIn loop
[5] forOf -> continue

# iterations

[1] .forEach -> return
[2] .map
[3] .filter
[4] .reduce
[5] .reduceRight
[6] .every
[7] .some
[8] .indexOf
[9] .lastIndexOf
[10] .find

# right-hand inside for loop

array = array[parameter]

# left-hand

array[parameter] = value

# find source in array iterations

```js
pathArray.forEach(function(attr) {
// our sink
}
```

["FunctionExpression", "ArrowFunctionExpression"].includes(ancestor.type)
ancestor.params.some(p => p.name === node.name)
["forEach", "map", "filter", ].includes(ancestor.parent.calle.property.name)

Javascript loop statements

```js
let pathArray = ['__proto__', 'polluted'];

//ForOfStatement (attr, loops, continue)
for (let attr of pathArray) {
  objectToModify = objectToModify[attr];
}

//WhileStatement (attr[i], loops, continue)
let i = 0;
while (i < pathArray.length) {
  objectToModify = objectToModify[pathArray[i]];
}

//ForStatement (attr[i], loops, continue)
for (let i = 0; i < pathArray.length; i++) {
  objectToModify = objectToModify[pathArray[i]];
}

//ForInStatement (attr[i], loops, continue)
for (let i in pathArray) {
  objectToModify = objectToModify[pathArray[i]];
}
```
