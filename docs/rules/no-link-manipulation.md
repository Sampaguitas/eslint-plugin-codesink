# Prevent DOM-based link manipulation (no-link-manipulation)

DOM-based link-manipulation vulnerabilities arise when a script writes attacker-controllable data to a navigation target within the current page, such as a clickable link or the submission URL of a form. An attacker might be able to use this vulnerability to construct a URL that, if visited by another application user, will modify the target of links within the response.

This rule detects the presence of variables being assigned to `element.href`, `element.src`, `element.action`.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>element.href = (new URLSearchParams(window.location.search)).get('q');</script>
```

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
- [PortSwigger: DOM-based link manipulation](https://portswigger.net/web-security/dom-based/link-manipulation)
