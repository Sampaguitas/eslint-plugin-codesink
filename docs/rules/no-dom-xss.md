# Prevent eval, exec, spawn and new Function injection (no-dom-xss)

The rule detects the use of `document.write()` and `document.writeln()` methods. which could be used by a malicious actor to inject HTML tags or a script element and execute javascript code.

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

This vulnerability can be mitigated by encoding output data, validate input on arrival, using content security policy (CSP).

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
