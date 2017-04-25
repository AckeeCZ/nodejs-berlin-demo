'use strict'; // eslint-disable-line strict

require('use-strict');

const express = require('express');
const passport = require('passport');
const config = require('config');

const app = express();
const port = process.env.PORT || config.port;

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap passport config
require('./config/passport')(passport, config);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(port);
console.log(`App started on port ${port}`);
