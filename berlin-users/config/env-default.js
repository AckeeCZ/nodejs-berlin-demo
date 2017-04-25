/**
 *
 * Default to all the environments, if you do not rewrite it, it became this
 */

module.exports = {
    jwt: {
        secret: 'SuperSecretBerlinApp',
        lifetime: 3600,
    },
};
