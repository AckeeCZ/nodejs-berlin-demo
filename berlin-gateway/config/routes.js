
const config = require('config');

const gateway = require('components/Gateway/facade');
const passport = require('passport');
const gwBearerAuth = (req, res, next) => {
    passport.authenticate('bearer', (err, user, info) => {
        if (err && err.status !== 401) {
            return next(err);
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = function(app) {
    app.get('/', (req, res, next) => {
        res.json({working: 'yess'});
    });
    app.use(gwBearerAuth, gateway.Router({routes: config.gateway.routes}));

    // Default error handler
    app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
        res.status(500);
        return res.json({err, message: err.message});
    });

    // Default middleware, that ends everything - either parse return value or send 404 if nothing was found
    app.use(function(req, res, next) { // eslint-disable-line no-unused-vars
        if (res.out) {
            return res.json(res.out);
        }

        res.status(404);
        return res.json(new Error('Not Found'));
    });
};
