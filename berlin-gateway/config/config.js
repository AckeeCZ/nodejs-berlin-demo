const path = require('path');
const fs = require('fs');
const defaultEnv = require('env-default');
const _ = require('lodash');

const defaults = {
    root: path.normalize(`${__dirname}/..`),
};

const envs = {};
fs.readdirSync(`${__dirname}/env`).forEach(function(file) {
    if (~file.indexOf('.js')) {
        envs[file.substring(0, file.length - 3)] = _.merge(
            {},
            defaultEnv,
            require(`${__dirname}/env/${file}`), // eslint-disable-line global-require
            defaults);
    }
});

module.exports = envs[process.env.NODE_ENV || 'development'];
