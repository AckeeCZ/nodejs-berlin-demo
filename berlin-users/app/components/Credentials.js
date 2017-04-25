const JwtToken = require('components/JwtToken');

/**
 * Credential class for generating tokens for users
 */
class Credentials {
    /**
     * @param {User} user User is used for generating tokens
     */
    constructor(user) {
        this.accessToken = Credentials.generateAccessToken(user);
    }

    /**
     * Generates access token, which is used for authentication
     * @param {User} user User is used for generating tokens
     * @return {string} Access token
     */
    static generateAccessToken(user) {
        const accessToken = new JwtToken({
            user: {
                id: user.id,
                name: user.name,
            },
        });
        return accessToken.pack();
    }
}

module.exports = Credentials;
