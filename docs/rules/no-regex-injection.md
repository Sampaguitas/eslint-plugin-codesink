# Prevent Regex Injection (no-regex-injection)

The rule detects possible user controlled input inside a RegExp Constructor.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
function testMatch(pattern, input) {
  let regex = new RegExp(pattern);
  return input.match(regex);
}

let matches = testMatch(/(a+)+/, 'aaaaaaaaaaaaaaa!');
```

Examples of **correct** code for this rule:

```js
function testMatch(input) {
  let regex = /foo/;
  return input.match(regex);
}

let matches = testMatch('aaaaaaaaaaaaaaa!');
```

## Further Reading

- [CWE-1333: Inefficient Regular Expression Complexity](https://cwe.mitre.org/data/definitions/1333.html)
- [OWASP: Regular expression Denial of Service - ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
