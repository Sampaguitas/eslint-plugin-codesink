# Detect DOM-based link manipulation sinks (no-link-manipulation)

DOM-based link-manipulation vulnerabilities arise when a script writes attacker-controllable data to a navigation target within the current page, such as a clickable link or the submission URL of a form. An attacker might be able to use this vulnerability to construct a URL that, if visited by another application user, will modify the target of links within the response.

This rule detects the presence of variables being assigned to `element.href`, `element.src`, `element.action` properties.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
element.href = new URLSearchParams(window.location.search).get('q');
```

## Further Reading

- [PortSwigger: DOM-based link manipulation](https://portswigger.net/web-security/dom-based/link-manipulation)
