# Detect DOM-based WebSocket-URL poisoning sinks (websocket-url-poisoning)

WebSocket-URL poisoning occurs when a script uses controllable data as the target URL of a WebSocket connection. An attacker may be able to use this vulnerability to construct a URL that, if visited by another user, will cause the user's browser to open a WebSocket connection to a URL that is under the attacker's control.

This rule detects the presence of variables being passed to the `WebSocket` constructor as potential sinks.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
<script>
  var chatForm = document.getElementById("chatFrom"); var webSocket = new
  WebSocket(chatForm.getAttribute("action"));
</script>
```

## Further Reading

- [PortSwigger: DOM-based WebSocket-URL poisoning](https://portswigger.net/web-security/dom-based/websocket-url-poisoning)
