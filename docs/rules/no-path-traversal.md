# Prevent Path Traversal (no-path-traversal)

The rule detects possible user controlled input inside require, import, readFileSync, readdirSync and statSync

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
require('./locale/' + name);
```

Examples of **correct** code for this rule:

```js
require('./locale/foo.js');
```

## Further Reading

- [CWE-22: Improper Limitation of a Pathname to a Restricted Directory (Path Traversal)](https://cwe.mitre.org/data/definitions/22.html)
