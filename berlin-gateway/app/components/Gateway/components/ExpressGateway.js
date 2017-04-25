const express = require('express');
const _ = require('lodash');
const httpProxy = require('http-proxy');
const RouteMapper = require('./RouteMapper');
const pathToRegexp = require('path-to-regexp');

class ExpressGateway extends RouteMapper {

    /**
     * @param options
     */
    constructor(options) {
        super(_.defaultsDeep({}, options, {
            proxy: {
                changeOrigin: true,
                ignorePath: true,
            }
        }));

        this.proxy = httpProxy.createProxyServer(this.options.proxy);
        this.proxy.on('error', (err, req, res) => {
            res.status(503);
            try {
                res.setHeader('Content-Type', 'application/json');
            } catch (_err) {
                winston.error('Error 503', {
                    message: _.get(err, 'message'),
                    stack: _.get(err, 'stack'),
                    trycatchmessage: _.get(_err, 'message'),
                    trycatchstack: _.get(_err, 'stack')
                })
            }
            res.write(JSON.stringify({code: 503, message: err.message}));
            res.end();
        });
        this.syncRouter(this.options.routes);

        const handler = this.expressHandler();

        const bindMethods = ['dismiss', 'syncRouter', 'getRoutes'];
        _.map(bindMethods, method => {
            handler[method] = this[method].bind(this);
        });

        handler.dismiss = this.dismiss.bind(this);
        handler.proxy = this.proxy;
        handler.options = this.options;
        return handler;
    }

    expressHandler() {
        return (req, res, next) => {
            if (this.router) {
                return this.router(req, res, next);
            }
            next();
        }
    }

    routeHandler(route) {
        return (req, res, next) => {
            // replace wildcards the same Express does
            const toPath = pathToRegexp.compile(route.out);
            let target = ((route.service || '') + toPath(req.params)).trim();

            // Add the same querystring
            const qs = req.url.match(/^.+[^\?]\?(.+)$/);
            if (qs) {
                target += '?' + qs[1];
            }

            this.proxy.web(req, res, {target});
        }
    }

    registerRoute(route, router) {
        super.registerRoute(route);
        router.all(route.in, (req, res, next) => {
            req.route = route;
            this.routeHandler(route)(req, res, next);
        });
    }

    syncRouter(routes) {
        const router = express.Router();
        this.setRoutes({});
        _.map(routes || this.routes, route => {
            this.registerRoute(route, router);
        });
        this.router = router;
    }

    dismiss() {
        delete this.router;
    }
}

module.exports = ExpressGateway;
