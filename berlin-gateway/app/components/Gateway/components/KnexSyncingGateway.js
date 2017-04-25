const _ = require('lodash');
const SyncingGateway = require('./SyncingGateway');

class KnexSyncingGateway extends SyncingGateway {

    constructor(options) {

        if (!options || !options.knex) {
            throw new Error('Cannot instantiate KnexGateway without Knex!');
        }

        super(options);
        this.knex = this.options.knex;
    }

    sync() {
        this.knex('routes')
            .then(data => {
                this.nextStepRoutes = data;
                super.sync();
            })
            .catch(e => {
                console.warn('Failed syncing routes from DB', e.stack);
            });
    }
}

module.exports = KnexSyncingGateway;
