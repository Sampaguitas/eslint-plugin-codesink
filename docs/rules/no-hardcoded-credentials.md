# Prevent hard-coded credentials (no-hardcoded-credentials)

The rule detects hard-coded credentials that have been left in the code and should be removed before you push your code to a public repository. The rule looks for well known packages used to establish connection to third party cloud services, and ensures that the variables or configuration objects that you pass in the connection methods do not refer to Literals stored somewehere in your public files.

## Demonstrative Examples

Examples of **incorrect** code for this rule:

```js
// /aws-sdk.config.update()
var AWS = require('aws-sdk');

const ACCESS_KEY_ID = 'secret';
const SECRET_ACCESS_KEY = 'secret';
const REGION = 'eu-west-3';
const AWS_BUCKET_NAME = 'awsBucketName';

const configs = {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
};

AWS.config.update(configs);
```

Examples of **correct** code for this rule:

```js
// /aws-sdk.config.update()
var AWS = require('aws-sdk');

const ACCESS_KEY_ID = process.env.accessKeyId;
const SECRET_ACCESS_KEY = process.env.secretAccessKey;
const REGION = 'eu-west-3';
const AWS_BUCKET_NAME = 'awsBucketName';

const configs = {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
};

AWS.config.update(configs);
```

## Further Reading

- [CWE-798: Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798)
- [CWE-259: Use of Hard-coded Password](https://cwe.mitre.org/data/definitions/259.html)
- [CWE-321: Use of Hard-coded Cryptographic Key](https://cwe.mitre.org/data/definitions/321.html)
