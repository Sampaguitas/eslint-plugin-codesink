# Prevent DOM-based JavaScript injection (no-eval-injection)

DOM-based JavaScript-injection vulnerabilities arise when a script executes attacker-controllable data as JavaScript.

The rule detects the presence of variables inside `new Function()`, `eval()`, `exec()`, `spawn()`, `setTimeout()`, `setInterval()`, `setImmediate()`, `execCommand()`, `execScript()`, `msSetImmediate()`, `range.createContextualFragment()`, `crypto.generateCRMFRequest()` sinks.

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

-[PortSwigger: DOM-based JavaScript injection](https://portswigger.net/web-security/dom-based/javascript-injection)
