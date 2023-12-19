# Detect DOM-based open redirect sinks (no-open-redirect)

DOM-based open-redirection vulnerabilities arise when a script writes attacker-controllable data into a sink that can trigger cross-domain navigation. An attacker may be able to use this vulnerability to construct a URL that, if visited by another user, will cause a redirection to an arbitrary external domain.

The rule detects the presence of variables inside `location.assign()`, `location.replace()` `open()`, `XMLHttpRequest.open()`, `XMLHttpRequest.send()`, `jQuery.ajax()`, `$.ajax()` methods or being assigned to `location`, `location.host`, `location.hostname`, `location.href`, `location.pathname`, `location.search`, `location.protocol`, `element.srcdoc` properties.

User countrol inputs can potentially lead to DOM-based open redirect.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
let url = /https?:\/\/.+/.exec(location.hash);
if (url) {
  location = url[0];
}
```

## Further Reading

- [PortSwigger: DOM-based open redirection](https://portswigger.net/web-security/dom-based/open-redirection)
