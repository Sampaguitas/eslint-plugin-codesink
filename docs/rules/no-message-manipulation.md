# Detect Web message manipulation sinks (no-message-manipulation)

Web message vulnerabilities arise when a script sends attacker-controllable data as a web message to another document within the browser. An attacker may be able to use the web message data as a source by constructing a web page that, if visited by a user, will cause the user's browser to send a web message containing data that is under the attacker's control. For more information about the using web messages as a source, please refer to the Controlling the web-message source page.

This rule detects the presence of variables inside `element.postMessage()` method.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
window.postMessage(userControlledVariable, '*');
```

## Further Reading

- [PortSwigger: Web message manipulation](https://portswigger.net/web-security/dom-based/web-message-manipulation)
