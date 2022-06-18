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

```js
for (attr of pathArray) {
// our sink
}
```