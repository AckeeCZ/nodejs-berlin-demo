const Credentials = require('components/Credentials');

exports.register = (req, res, next) => {
    const accessToken = Credentials.generateAccessToken({id: req.body.id, name: req.body.name});
    res.out = {accessToken};
    return next();
};

exports.detail = (req, res, next) => {
    res.out = req.user;
    return next();
};
