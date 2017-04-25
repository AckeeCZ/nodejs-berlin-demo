const BearerStrategy = require('passport-http-bearer').Strategy;
const UserService = require('components/Microservices/UserService');

module.exports = new BearerStrategy(
    function(token, done) {
        return UserService.validateAccessToken(token).then(user => {
            return done(null, user);
        }).catch((err) => {
            return done(err, false);
        });
    }
);
