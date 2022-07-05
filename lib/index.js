/**
 * @fileoverview Detect most common security vulnerabilities in NodeJS projects
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

module.exports.configs = {
  recommended: {
    plugins: ['code-sink'],
    rules: {
      'code-sink/no-eval-injection': 'error',
      'code-sink/no-hardcoded-credentials': 'error',
    },
  },
};

// import processors
module.exports.processors = {
  // add your processors here
};
