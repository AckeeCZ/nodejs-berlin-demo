const BearerStrategy = require('passport-http-bearer').Strategy;
const JwtToken = require('components/JwtToken');
const config = require('config');

module.exports = new BearerStrategy(
    function(token, done) {
        const unpacked = JwtToken.unpack(token);

        if (unpacked === false) { // error unpacking token = invalid token
            return done(new Error('Invalid token'), false);
        }
        // check token expiration-stamp
        if (unpacked.isExpired()) {
            return done(new Error('Token expired'), false);
        }

        return done(null, unpacked.data.user);
    }
);
