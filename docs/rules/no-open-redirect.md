# Prevent DOM-based open redirect (no-open-redirect)

The rule detects the presence of variables inside `location.assign()`, `location.replace()` `open()`, `XMLHttpRequest.open()`, `XMLHttpRequest.send()`, `jQuery.ajax()`, `$.ajax()` or being assigned to `location`, `location.host`, `location.hostname`, `location.href`, `location.pathname`, `location.search`, `location.protocol`, `element.srcdoc` sinks. User countrol inputs can potentially lead to DOM-based open redirect.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>location.href = returnUrl;</script>
```

## Further Reading

- [CWE-601: URL Redirection to Untrusted Site ('Open Redirect')](https://cwe.mitre.org/data/definitions/601.html)
