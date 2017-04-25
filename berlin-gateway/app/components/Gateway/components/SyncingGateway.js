const  _ = require('lodash');
const ExpressGateway = require('./ExpressGateway');
const RouteMapper = require('./RouteMapper');

class SyncingGateway {

    constructor(options) {
        this.gw = new ExpressGateway(options);
        this.options = this.gw.options;
        this.options.interval = _.parseInt(this.options.interval) || 2500;
        this.interval = null;
        this.nextStepRoutes = null;
    }

    startSync() {
        this.interval = setInterval(this.sync.bind(this), this.options.interval);
    }

    stopSync() {
        clearInterval(this.interval);
        this.interval = null;
    }

    sync() {
        if (this.shouldSync(this.nextStepRoutes)) {
            console.log('Sync: Syncing', JSON.stringify(this.nextStepRoutes));
            this.gw.syncRouter(this.nextStepRoutes);
            this.nextStepRoutes = null;
        } else {
            console.log('Sync: No-Change');
        }
    }

    shouldSync(routes) {
        const currentRoutes=  this.gw.getRoutes();
        const dirtyRoutes = _.filter(routes, route =>
                !_.has(currentRoutes, route.in) // dont have that route yet 
            ||  !RouteMapper.routeEquals(route, currentRoutes[route.in])
        );
        return dirtyRoutes.length > 0;
    }
}

module.exports = SyncingGateway;
