
const config = require('config');

const base = 'http://babysitting.eu-gb.mybluemix.net';
const routes = [];
config.gateway.httpServices[0].endpoints
    .map(ep => {
        const path = '/api/v1' + ep.api;
        routes.push({
            in: path,
            out: path,
            service: base
        });
    });

module.exports = routes;
