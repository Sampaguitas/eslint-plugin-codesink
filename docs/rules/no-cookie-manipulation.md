# Prevent DOM-based Cookie Manipulation (no-cookie-manipulation)

DOM-based cookie-manipulation vulnerabilities arise when a script writes attacker-controllable data into the value of a cookie. If the website unsafely reflects values from cookies without HTML-encoding them, an attacker can use cookie-manipulation techniques to exploit this behavior.

This rule detects the presence of variables being assigned to `document.cookie`.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>document.cookie = 'cookieName='+location.hash.slice(1);</script>
```

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
- [PortSwigger: DOM-based cookie manipulation](https://portswigger.net/web-security/dom-based/cookie-manipulation)
