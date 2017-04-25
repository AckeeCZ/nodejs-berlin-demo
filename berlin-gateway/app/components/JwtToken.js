const jwt = require('jwt-simple');
const config = require('config');

function JwtToken(data, secret) {
    this.data = data;

    const now = new Date();
    this.iat = data.iat ? data.iat : now.getTime();
    this.exp = data.exp ? data.exp :
        new Date(this.iat + config.jwt.lifetime * 1000).getTime();

    this._secret = secret || config.jwt.secret;
}

JwtToken.prototype = {
    isExpired() {
        return this.exp < new Date().getTime();
    },
    pack() {
        const payload = this.data;
        payload.iat = this.iat;
        payload.exp = this.exp;
        return jwt.encode(payload, this._secret);
    },
};

JwtToken.unpack = function(packed, secret) {
    let data;
    try {
        data = jwt.decode(packed, secret || config.jwt.secret);
    } catch (ex) {
        return false;
    }
    const unpacked = new this(data);
    delete unpacked.data.iat;
    delete unpacked.data.exp;
    return unpacked;
};

module.exports = JwtToken;
