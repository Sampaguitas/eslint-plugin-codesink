# Prevent eval injection (no-eval-injection)

The rule detects user controlled inputs passed as parameters inside a `new Function()` constructor, `eval()` function, `exec()` and `spown()` child processes. A bad actor could use it to run arbitrary code (Remote Code Execution).

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
function resolveJavascriptFunction(object) {
  var func;

  try {
    func = new Function('return ' + object);
    return func();
  } catch (error) {
    return NIL;
  }
}
```

Examples of **correct** code for this rule:

```js
const addition = new Function('a', 'b', 'return a+b');
addition(1, 1);
```

## Further Reading

- [CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code ('Eval Injection')](https://cwe.mitre.org/data/definitions/95.html)
