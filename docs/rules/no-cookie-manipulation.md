# Detect DOM-based Cookie Manipulation sinks (no-cookie-manipulation)

DOM-based cookie-manipulation vulnerabilities arise when a script writes attacker-controllable data into the value of a cookie. If the website unsafely reflects values from cookies without HTML-encoding them, an attacker can use cookie-manipulation techniques to exploit this behavior.

This rule detects the presence of variables being assigned to `document.cookie` property.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
document.cookie = 'cookieName=' + location.hash.slice(1);
```

## Further Reading

- [PortSwigger: DOM-based cookie manipulation](https://portswigger.net/web-security/dom-based/cookie-manipulation)
