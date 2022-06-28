/**
 * @fileoverview Detect prototype pollution
 * @author Timothee Desurmont
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require('eslint').RuleTester;
var rule = require('../../../lib/rules/no-hardcoded-credentials.js');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
});

ruleTester.run('no-hardcoded-credentials', rule, {
  valid: [
    {
      // tedious,
      code: `
            var Connection = require('tedious').Connection;

            var config = {
                server: process.env.secret, //update me
                authentication: {
                type: 'default',
                options: {
                    userName: process.env.secret, //update me
                    password: process.env.secret, //update me
                },
                },
                options: {
                // If you are on Microsoft Azure, you need encryption:
                encrypt: true,
                database: process.env.secret, //update me
                },
            };
            
            var connection = new Connection(config);
            connection.on('connect', function (err) {
                // If no error, then good to proceed.
                console.log('Connected');
            });
            
            connection.connect();
        `,
    },
    {
      // firebase/app.initializeApp()
      code: `
            const firebase = require('firebase/app');

            const firebaseConfig = {
                apiKey: process.env.secret,
                authDomain: process.env.secret,
                databaseURL: process.env.secret,
                projectId: process.env.secret,
                storageBucket: process.env.secret,
                messagingSenderId: process.env.secret,
                appId: process.env.secret,
                measurementId: process.env.secret,
            };
            firebase.initializeApp(firebaseConfig);
          `,
    },
    {
      // mysql.createPool()
      code: `
            let mysql = require('mysql');

            var pool = mysql.createPool({
            connectionLimit: 5,
            host: process.env.secret,
            user: process.env.secret,
            password: process.env.secret,
            database: process.env.secret,
            });
        `,
    },
    {
      // mysql.createConnection()
      code: `
            let mysql = require('mysql');

            let connection = mysql.createConnection({
            host: process.env.secret,
            user: process.env.secret,
            password: process.env.secret,
            database: process.env.secret,
            });
        `,
    },
    {
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            nodemailer.createTransport({
                host: process.env.secret,
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.secret,
                    pass: process.env.secret,
                },
            });
          `,
    },
    {
      // aws-sdk.config.update()
      code: `
        var AWS = require('aws-sdk');

        AWS.config.update({
            accessKeyId:process.env.secret,
            secretAccessKey:process.env.secret,
            region: REGION,
        });
        `,
    },
    {
      // aws-sdk.config.update()
      code: `
        var AWS = require('aws-sdk');

        const ACCESS_KEY_ID = process.env.secret;
        const SECRET_ACCESS_KEY = process.env.secret;
        const REGION = 'eu-west-3';
        const AWS_BUCKET_NAME = 'awsBucketName';

        const configs = {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
            region: REGION,
        };

        AWS.config.update(configs);
        `,
    },
    {
      // mongoose.cconnect()
      code: `
        const mongoose = require('mongoose');

        mongoose
          .connect(process.env.mongoUri)
          .then(() => {
            console.log('Connected to MongoDB');
          })
          .catch(err => console.log(err));
        `,
    },
  ],
  invalid: [
    {
      // tedious.Connection()
      code: `
        var Connection = require('tedious').Connection;

        var config = {
            server: 'your_server.database.windows.net', //update me
            authentication: {
            type: 'default',
            options: {
                userName: 'your_username', //update me
                password: 'your_password', //update me
            },
            },
            options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'your_database', //update me
            },
        };
        
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            // If no error, then good to proceed.
            console.log('Connected');
        });
        
        connection.connect();
        `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // firebase/app.initializeApp()
      code: `
        const firebase = require('firebase/app');

        const firebaseConfig = {
            apiKey: 'secret',
            authDomain: 'secret',
            databaseURL: 'secret',
            projectId: 'secret',
            storageBucket: 'secret',
            messagingSenderId: 'secret',
            appId: 'secret',
            measurementId: 'secret',
        };

        firebase.initializeApp(firebaseConfig);
          `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // mysql.createPool()
      code: `
        let mysql = require('mysql');

        var pool = mysql.createPool({
        connectionLimit: 5,
        host: 'secret',
        user: 'secret',
        password: 'secret',
        database: 'secret',
        });
        `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // mysql.createConnection()
      code: `
        let mysql = require('mysql');

        let connection = mysql.createConnection({
        host: 'secret',
        user: 'secret',
        password: 'secret',
        database: 'secret',
        });
        `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // nodemailer.createTransport()
      code: `
        let nodemailer = require('nodemailer');

        nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: 'username',
                pass: 'password',
            },
        });
        `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // aws-sdk.config.update()
      code: `
        var AWS = require('aws-sdk');

        AWS.config.update({
            accessKeyId: 'secret',
            secretAccessKey: 'secret',
            region: REGION,
        });
        `,
      errors: [{ messageId: 'packageConfigs' }, { messageId: 'packageConfigs' }],
    },
    {
      // aws-sdk.config.update()
      code: `
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
        `,
      errors: [{ messageId: 'packageConfigs' }, { messageId: 'packageConfigs' }],
    },
    {
      // mongoose.cconnect()
      code: `
        const mongoose = require('mongoose');

        mongoose
          .connect(
            'mongodb+srv://username:password@cluster0.abcd.mongodb.net/myFirstApp?retryWrites=true&w=majority',
          )
          .then(() => {
            console.log('Connected to MongoDB');
          })
          .catch(err => console.log(err));
        `,
      errors: [{ messageId: 'packageConfigs' }],
    },
    {
      // mongoose.cconnect()
      code: `
        const mongoose = require('mongoose');

        const MONGO_URI =
          'mongodb+srv://username:password@cluster0.abcd.mongodb.net/myFirstApp?retryWrites=true&w=majority';
        
        mongoose
          .connect(MONGO_URI)
          .then(() => {
            console.log('Connected to MongoDB');
          })
          .catch(err => console.log(err));
        `,
      errors: [{ messageId: 'packageConfigs' }],
    },
  ],
});
