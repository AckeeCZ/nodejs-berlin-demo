const bearer = require('./passport/bearer');

module.exports = function(passport, config) { // eslint-disable-line no-unused-vars
  // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

  // use these strategies
    return passport.use('bearer', bearer);
};
