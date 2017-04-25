const _ = require('lodash');

class RouteMapper {

    constructor(options) {
        this.setRoutes({});
        this.setOptions(options);
    }

    setOptions(options) {
        this.options = _.defaults({}, options, {
            // default options
            routes: [],
        });
    }

    setRoutes(routes) {
        this.routes = {};
        _.map(routes, route => this.registerRoute(route));
    }

    hasRoute(route) {
        return !!this.routes[(route || {}).in];
    }

    getRoutes() {
        return this.routes;
    }

    registerRoute(route) {
        this.routes[route.in] = route;
    }

    unregisterRoute(route) {
        _.unset(this.routes, route.in);
    }
}

module.exports = RouteMapper;

RouteMapper.routeEquals = (a, b) => {
    return a === b || (a && b && a.in === b.in && a.out === b.out && a.service === b.service);
};
