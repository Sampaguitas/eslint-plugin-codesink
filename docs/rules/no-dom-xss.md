# Prevent DOM-based XSS (no-dom-xss)

The rule detects the presence of variables inside `document.write()` and `document.writeln()` or being assigned to `document.domain`, `element.innerHTML`, `element.outerHTML`, `element.insertAdjacentHTML` and `element.onevent` sinks. User countrol inputs can potentially lead to DOM-XSS. This vulnerability can be mitigated by encoding output data, validate input on arrival, using content security policy (CSP).

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

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
