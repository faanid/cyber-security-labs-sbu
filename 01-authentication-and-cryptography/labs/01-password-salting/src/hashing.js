const { createHash } = require('node:crypto');

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function sha256WithSalt(password, salt) {
  return sha256(`${salt}:${password}`);
}

module.exports = { sha256, sha256WithSalt };
