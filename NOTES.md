# loops

[1] while loop
[2] for loop
[3] doWile loop
[4] forIn loop
[5] forOf -> continue

# iterations

[1] .forEach -> return
[2] .map
[3] .filter
[4] .reduce
[5] .reduceRight
[6] .every
[7] .some
[8] .indexOf
[9] .lastIndexOf
[10] .find

# right-hand inside for loop

array = array[parameter]

# left-hand

array[parameter] = value

# find source in array iterations

```js
pathArray.forEach(function(attr) {
// our sink
}
```

["FunctionExpression", "ArrowFunctionExpression"].includes(ancestor.type)
ancestor.params.some(p => p.name === node.name)
["forEach", "map", "filter", ].includes(ancestor.parent.calle.property.name)

Javascript loop statements

```js
let pathArray = ['__proto__', 'polluted'];

//ForOfStatement (attr, loops, continue)
for (let attr of pathArray) {
  objectToModify = objectToModify[attr];
}

//WhileStatement (attr[i], loops, continue)
let i = 0;
while (i < pathArray.length) {
  objectToModify = objectToModify[pathArray[i]];
}

//ForStatement (attr[i], loops, continue)
for (let i = 0; i < pathArray.length; i++) {
  objectToModify = objectToModify[pathArray[i]];
}

//ForInStatement (attr[i], loops, continue)
for (let i in pathArray) {
  objectToModify = objectToModify[pathArray[i]];
}
```

nodemailer.createTransport({
host: "smtp.example.com",
port: 587,
secure: false, // upgrade later with STARTTLS
auth: {
user: "username",
pass: "password",
},
});

let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
type: "OAuth2",
user: "user@example.com",
accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
},
});

let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
type: "OAuth2",
user: "user@example.com",
clientId: "000000000000-xxx0.apps.googleusercontent.com",
clientSecret: "XxxxxXXxX0xxxxxxxx0XXxX0",
refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
expires: 1484314697598,
},
});

let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
type: "OAuth2",
user: "user@example.com",
serviceClient: "113600000000000000000",
privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...",
accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
expires: 1484314697598,
},
});

let poolConfig = "smtps://username:password@smtp.example.com/?pool=true";
