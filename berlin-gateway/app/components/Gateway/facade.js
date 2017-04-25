const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});
const config = require('config');
const _ = require('lodash');
const JwtToken = require('components/JwtToken');
const Gateway = require('components/Gateway/components/ExpressGateway');

/**
 * Gateway facade
 * This should be used for accessing Gateway component, do not access Gateway component directly
 */
exports.Router = (options) => {
    const gw = new Gateway(options);
    gw.proxy.on('proxyReq', (proxyReq, req) => {
        const user = req.user;
        if (user) {
            proxyReq.setHeader('Authorization', `Bearer ${exports.createUserToken(user)}`);
        } else {
            proxyReq.removeHeader('Authorization');
        }

        // Need to restream json body, or any body, that is configured in express before gw is mounted.
        if (!_.isEmpty(req.body)) {
            let bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            // stream the content
            proxyReq.write(bodyData);
        }
    });
    return (req, res, next) => {
        // do not proxy if headers are already sent or Libor specific res.out is set.
        if (res.headerSent || res.out) {
            return next();
        }
        return gw(req, res, next);
    }
};

exports.createUserToken = (user) => {
    return (new JwtToken({user}, config.jwt.innerToken.secret)).pack();
};
