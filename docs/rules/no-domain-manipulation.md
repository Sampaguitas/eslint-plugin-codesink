# Prevent DOM-based document-domain manipulation (no-domain-manipulation)

Document-domain manipulation vulnerabilities arise when a script uses attacker-controllable data to set the document.domain property. An attacker may be able to use the vulnerability to construct a URL that, if visited by another user, will cause the response page to set an arbitrary document.domain value.

The document.domain property is used by browsers in their enforcement of the same origin policy. If two pages from different origins explicitly set the same document.domain value, then those two pages can interact in unrestricted ways.

This rule detects the presence of variables being assigned to `document.domain`.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>document.domain = location.hash.slice(1);</script>
```

## Further Reading

- [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
- [PortSwigger: DOM-based document-domain manipulation](https://portswigger.net/web-security/dom-based/document-domain-manipulation)
