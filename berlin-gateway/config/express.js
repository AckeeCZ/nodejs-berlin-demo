const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('config');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';

module.exports = function(app, passport) {
    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512,
    }));

    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(morgan('combined'));

    app.use(bodyParser.json());
    app.use(methodOverride(function(req, res) { // eslint-disable-line no-unused-vars
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            const method = req.body._method;
            delete req.body._method;
            return method;
        }
        return null;
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());
};
