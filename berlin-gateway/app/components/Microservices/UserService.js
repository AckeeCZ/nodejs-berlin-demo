const rp = require('request-promise');
const config = require('config');

const urls = {
    baseurl: config.microservices.userService.baseurl,
    usersMe: '/api/v1/users/me',
};

exports.validateAccessToken = accessToken => {
    return rp(
        {
            uri: urls.baseurl + urls.usersMe,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            json: true,
        }
    );
};
