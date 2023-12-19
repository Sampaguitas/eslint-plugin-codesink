# Detect DOM-based XSS sinks (no-dom-xss)

DOM-based XSS vulnerabilities arise when JavaScript takes data from an attacker-controllable source, and passes it to a sink that supports dynamic code execution.

This rule detects the presence of variables inside `document.write()` and `document.writeln()` methods or being assigned to `document.domain`, `element.innerHTML`, `element.outerHTML`, `element.insertAdjacentHTML` and `element.onevent` properties.

This rule also detects the presence of variables inside jQuery `insertAfter()`, `insertBefore()`, `before()`, `html()`, `prepend()`, `replaceAll()`, `replaceWith()`, `wrap()`, `wrapInner()`, `wrapAll()`, `has()`, `constructor()`, `init()`, `index()`, `$.parseHTML()` methods.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
function trackSearch(query) {
  document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">');
}
var query = new URLSearchParams(window.location.search).get('search');
if (query) {
  trackSearch(query);
}
```

## Further Reading

- [PortSwigger: DOM-based XSS](https://portswigger.net/web-security/cross-site-scripting/dom-based)
- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
