# Prevent setTimeout() and setInterval() injection (no-set-timeout-injection)

This rule detects user controlled inputs passed as parameters inside a `setTimeout()` constructor or `setInterval()` function. A bad actor could use it to run arbitrary code (Remote Code Execution). This rule is disabled by default since strings literals aren't allowed in NodeJS environement.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
let crontrolledInput = 'console.log(1+1)';

function resolveJavascriptFunction(userControlledInput) {
  return setTimeout(userControlledInput, 1000);
}
```

Examples of **correct** code for this rule:

```js
let crontrolledInput = 'console.log(1+1)';

function resolveJavascriptFunction(userControlledInput) {
  setTimeout(function () {
    return crontrolledInput;
  }, 1000);
}
```

## Further Reading

- [CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code ('Eval Injection')](https://cwe.mitre.org/data/definitions/95.html)
