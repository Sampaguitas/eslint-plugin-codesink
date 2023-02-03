# Prevent Evil Regex (no-eval-injection)

The rule detects possible Evil Regex. A Regex pattern is called Evil Regex if it can get stuck on crafted input.

Evil Regex contains:
. Grouping with repetition
. Inside the repeated group: - Repetition - Alternation with overlapping

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
let pattern = /(a+)+/;
```

Examples of **correct** code for this rule:

```js
let pattern = /a+/;
```

## Further Reading

- [CWE-1333: Inefficient Regular Expression Complexity](https://cwe.mitre.org/data/definitions/1333.html)
- [OWASP: Regular expression Denial of Service - ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
