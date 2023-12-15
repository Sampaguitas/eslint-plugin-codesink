# Prevent DOM-based XSS (no-dom-xss)

The rule detects the presence of variables inside `document.write()` and `document.writeln()` or being assigned to `document.domain`, `element.innerHTML`, `element.outerHTML`, `element.insertAdjacentHTML` and `element.onevent` sinks as well as jQuery `insertAfter()`, `insertBefore()`, `before()`, `html()`, `prepend()`, `replaceAll()`, `replaceWith()`, `wrap()`, `wrapInner()`, `wrapAll()`, `has()`, `constructor()`, `init()`, `index()`, `jQuery.parseHTML()`, `$.parseHTML()` sinks. User countrol inputs can potentially lead to DOM-XSS.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>
    function trackSearch(query) {
        document.write('<img src="/resources/images/tracker.gif?searchTerms=' + query + '">');
    }
    var query = (new URLSearchParams(window.location.search)).get('search');
    if (query) {
        trackSearch(query);
    }
</script>
```

DOM-based XSS vulnerabilities usually arise when JavaScript takes data from an attacker-controllable source, and passes it to a sink that supports dynamic code execution.

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
- [PortSwigger: DOM-based XSS](https://portswigger.net/web-security/cross-site-scripting/dom-based)
