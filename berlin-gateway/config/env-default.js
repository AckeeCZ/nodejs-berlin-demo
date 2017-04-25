/**
 *
 * Default to all the environments, if you do not rewrite it, it became this
 */

module.exports = {
    port: 3007,
    jwt: {
        secret: 'a3j3ar8aejter1jj5j4j',
        lifetime: 3600,
        innerToken: {
            secret: 'etj3t8jerata3we87kpiuo',
        },
    },
};
