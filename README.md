# eslint-plugin-codesink

Detect most common security vulnerabilities in NodeJS projects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-codesink`:

```
$ npm install eslint-plugin-codesink --save-dev
```

## Usage

Add `eslint-plugin-codesink` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["eslint-plugin-codesink"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "codesink/no-hardcoded-credentials": 2
  }
}
```

If you fork or clone this project, create a `settings.json` file inside the .vscode folder located in the root directory of your project and paste the following code:

```json
{
  "eslint.options": {
    "rulePaths": ["lib/rules"]
  }
}
```

## Supported Rules

- [codesink/no-hardcoded-credentials](https://github.com/Sampaguitas/eslint-plugin-codesink/blob/main/docs/rules/no-hardcoded-credentials.md)
