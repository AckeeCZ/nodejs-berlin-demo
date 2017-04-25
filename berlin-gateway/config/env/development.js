/**
 * Expose
 */

module.exports = {
    gateway: {
        routes: [
            {
                in: '/api/v1/auth**',
                out: '/api/v1/auth**',
                service: 'http://localhost:3008'
            },
            {
                in: '/api/v1/berliners**',
                out: '/api/v1/berliners**',
                service: 'http://localhost:3009'
            },
        ],
    },
    microservices: {
        userService: {
            baseurl: 'http://localhost:3008',
        },
    },
};
