const crud = require('routes/crud');
const config = require('config');
module.exports = function(app) {
    app.get('/', (req, res, next) => {
        res.json({it: 'works'});
    });

    app.use('/api/v1', crud);
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
