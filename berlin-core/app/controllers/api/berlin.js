const Credentials = require('components/Credentials');

exports.list = (req, res, next) => {
    const message = `Hi user ${req.user.name} here is a list`;
    res.out = {message, list: [{array: 'of'}, {objets: 'yay!'}]};
    return next();
};

exports.detail = (req, res, next) => {
    res.out = req.user;
};
