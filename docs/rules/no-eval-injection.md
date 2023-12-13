# Prevent eval, exec, spawn and new Function injection (no-eval-injection)

The rule detects the presence of variables inside `new Function()`, `eval()`, `exec()`, `spawn()` sinks. A bad actor could use it to run arbitrary code (Remote Code Execution). User countrol inputs can potentially lead to Code Injection.

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

## Further Reading

- [CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code ('Eval Injection')](https://cwe.mitre.org/data/definitions/95.html)
