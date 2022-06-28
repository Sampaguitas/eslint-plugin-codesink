'use strict';

const path = require('path');

function docsUrl(ruleName) {
  let docName = path.basename(ruleName).replace(/\.[jt]s$/, '.md');
  return `https://github.com/Sampaguitas/eslint-plugin-codesink/tree/main/docs/rules/${docName}`;
}

module.exports = docsUrl;
