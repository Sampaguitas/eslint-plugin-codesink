/**
 * @fileoverview Detect hard-coded credentials
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
      // mssql.connect()
      code: `
        const sql = require('mssql');

        async () => {
          try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(process.env.secret);
            const result = await sql.query('select * from mytable where id = 1');
            console.dir(result);
          } catch (err) {
            // ... error checks
          }
        };
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
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            nodemailer.createTransport({
                host: process.env.secret,
                port: 587,
                secure: true,
                auth: {
                  type: 'OAuth2',
                  user: process.env.secret,
                  accessToken: process.env.secret,
                },
            });
          `,
    },
    {
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            let transporter = nodemailer.createTransport({
              host: process.env.secret,
              port: 465,
              secure: true,
              auth: {
                type: 'OAuth2',
                user: process.env.secret,
                clientId: process.env.secret,
                clientSecret: process.env.secret,
                refreshToken: process.env.secret,
                accessToken: process.env.secret,
                expires: 1484314697598,
              },
            });
      `,
    },
    {
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            let transporter = nodemailer.createTransport({
              host: process.env.secret,
              port: 465,
              secure: true,
              auth: {
                type: 'OAuth2',
                user: process.env.secret,
                serviceClient: process.env.secret,
                privateKey: process.env.secret,
                accessToken: process.env.secret,
                expires: 1484314697598,
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
      // @aws-sdk/client-ses.SESClient()
      code: `
        const { SESClient } = require('@aws-sdk/client-ses');

        const client = new SESClient({
          accessKeyId: process.env.secret,
          secretAccessKey: process.env.secret,
          region: 'REGION',
        });
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
    {
      // oracledb.getConnection()
      code: `
        const oracledb = require('oracledb');

        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        
        const mypw = process.env.secret;
        
        async function run() {
          let connection;
        
          try {
            connection = await oracledb.getConnection({
              user: process.env.secret,
              password: mypw,
              connectString: process.env.secret,
            });
        
            const result = await connection.execute(
              'SELECT * FROM departments WHERE manager_id = :id',
              [103], // bind value for :id
            );
            console.log(result.rows);
          } catch (err) {
            console.error(err);
          } finally {
            if (connection) {
              try {
                await connection.close();
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
        
        run();
      `,
    },
    {
      // passport-jwt.Strategy()
      code: `
        var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
        var opts = {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.secret,
          issuer: 'accounts.examplesoft.com',
          audience: 'yoursite.net',
        };
        
        passport.use(
          new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({ id: jwt_payload.sub }, function (err, user) {
              if (err) {
                return done(err, false);
              }
              if (user) {
                return done(null, user);
              } else {
                return done(null, false);
                // or you could create a new account
              }
            });
          }),
        );
      `,
    },
    {
      // pg.Pool()
      code: `
        const { Pool } = require('pg');

        const pool = new Pool({
          user: process.env.secret,
          host: process.env.secret,
          database: process.env.secret,
          password: process.env.secret,
          port: 3211,
        });
        pool.query('SELECT NOW()', (err, res) => {
          console.log(err, res);
          pool.end();
        });
      `,
    },
    {
      // pg.Client()
      code: `
        const { Client } = require('pg');

        const client = new Client({
          user: process.env.secret,
          host: process.env.secret,
          database: process.env.secret,
          password: process.env.secret,
          port: 3211,
        });
        client.connect();
        client.query('SELECT NOW()', (err, res) => {
          console.log(err, res);
          client.end();
      });
      `,
    },
    {
      // googleapis.google.blogger()
      code: `
        const { google } = require('googleapis');

        // Each API may support multiple versions. With this sample, we're getting
        // v3 of the blogger API, and using an API key to authenticate.
        const blogger = google.blogger({
          version: 'v3',
          auth: process.env.secret,
        });
        
        const params = {
          blogId: '3213900',
        };
        
        // get the blog details
        blogger.blogs.get(params, (err, res) => {
          if (err) {
            console.error(err);
            throw err;
          }
          console.log("some text");
        });
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
      // mssql.connect()
      code: `
        const sql = require('mssql');

        async () => {
          try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(
              'Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true',
            );
            const result = await sql.query('select * from mytable where id = 1');
            console.dir(result);
          } catch (err) {
            // ... error checks
          }
        };
      `,
      errors: [{ messageId: 'packageConfigs' }],
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
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            nodemailer.createTransport({
                host: 'secret',
                port: 587,
                secure: true,
                auth: {
                  type: 'OAuth2',
                  user: 'secret',
                  accessToken: 'secret',
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
      // nodemailer.createTransport()
      code: `
            let nodemailer = require('nodemailer');

            let transporter = nodemailer.createTransport({
              host: 'secret',
              port: 465,
              secure: true,
              auth: {
                type: 'OAuth2',
                user: 'secret',
                clientId: 'secret',
                clientSecret: 'secret',
                refreshToken: 'secret',
                accessToken: 'secret',
                expires: 1484314697598,
              },
            });
      `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
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

            let transporter = nodemailer.createTransport({
              host: 'secret',
              port: 465,
              secure: true,
              auth: {
                type: 'OAuth2',
                user: 'secret',
                serviceClient: 'secret',
                privateKey: 'secret',
                accessToken: 'secret',
                expires: 1484314697598,
              },
            });
      `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
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
      // @aws-sdk/client-ses.SESClient()
      code: `
        const { SESClient } = require('@aws-sdk/client-ses');

        const client = new SESClient({
          accessKeyId: 'secret',
          secretAccessKey: 'secret',
          region: 'REGION',
        });
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
    {
      // oracledb.getConnection()
      code: `
        const oracledb = require('oracledb');

        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        
        const mypw = 'secret';
        
        async function run() {
          let connection;
        
          try {
            connection = await oracledb.getConnection({
              user: 'secret',
              password: mypw,
              connectString: 'secret',
            });
        
            const result = await connection.execute(
              'SELECT * FROM departments WHERE manager_id = :id',
              [103], // bind value for :id
            );
            console.log(result.rows);
          } catch (err) {
            console.error(err);
          } finally {
            if (connection) {
              try {
                await connection.close();
              } catch (err) {
                console.error(err);
              }
            }
          }
        }
        
        run();
        `,
      errors: [
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
        { messageId: 'packageConfigs' },
      ],
    },
    {
      // passport-jwt.Strategy()
      code: `
        var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
        var opts = {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'secret',
          issuer: 'accounts.examplesoft.com',
          audience: 'yoursite.net',
        };
        
        passport.use(
          new JwtStrategy(opts, function (jwt_payload, done) {
            User.findOne({ id: jwt_payload.sub }, function (err, user) {
              if (err) {
                return done(err, false);
              }
              if (user) {
                return done(null, user);
              } else {
                return done(null, false);
                // or you could create a new account
              }
            });
          }),
        );
      `,
      errors: [{ messageId: 'packageConfigs' }],
    },
    {
      // pg.Pool()
      code: `
        const { Pool } = require('pg');

        const pool = new Pool({
          user: 'secret',
          host: 'secret',
          database: 'secret',
          password: 'secret',
          port: 3211,
        });
        pool.query('SELECT NOW()', (err, res) => {
          console.log(err, res);
          pool.end();
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
      // pg.Client()
      code: `
        const { Client } = require('pg');

        const client = new Client({
          user: 'secret',
          host: 'secret',
          database: 'secret',
          password: 'secret',
          port: 3211,
        });
        client.connect();
        client.query('SELECT NOW()', (err, res) => {
          console.log(err, res);
          client.end();
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
      // googleapis.google.blogger()
      code: `
        const { google } = require('googleapis');

        // Each API may support multiple versions. With this sample, we're getting
        // v3 of the blogger API, and using an API key to authenticate.
        const blogger = google.blogger({
          version: 'v3',
          auth: 'secret',
        });
        
        const params = {
          blogId: '3213900',
        };
        
        // get the blog details
        blogger.blogs.get(params, (err, res) => {
          if (err) {
            console.error(err);
            throw err;
          }
          console.log("some text");
        });
      `,
      errors: [{ messageId: 'packageConfigs' }],
    },
  ],
});
