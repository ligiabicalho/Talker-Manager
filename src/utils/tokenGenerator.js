// ref: https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
const crypto = require('crypto');

function tokenGenerator() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = tokenGenerator;