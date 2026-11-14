const {
  randomBytes,
  scrypt: scryptCallback,
  timingSafeEqual
} = require('node:crypto');
const { promisify } = require('node:util');

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 2 ** 14, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

async function hashPassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new TypeError('Password must be a non-empty string.');
  }

  const salt = randomBytes(16);
  const derivedKey = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);

  return {
    algorithm: 'scrypt',
    salt: salt.toString('hex'),
    hash: derivedKey.toString('hex'),
    params: { N: SCRYPT_OPTIONS.N, r: SCRYPT_OPTIONS.r, p: SCRYPT_OPTIONS.p, keyLength: KEY_LENGTH }
  };
}

async function verifyPassword(password, storedRecord) {
  if (
    typeof password !== 'string' ||
    !storedRecord ||
    storedRecord.algorithm !== 'scrypt' ||
    typeof storedRecord.salt !== 'string' ||
    typeof storedRecord.hash !== 'string'
  ) {
    return false;
  }

  try {
    const salt = Buffer.from(storedRecord.salt, 'hex');
    const expectedKey = Buffer.from(storedRecord.hash, 'hex');

    if (salt.length !== 16 || expectedKey.length !== KEY_LENGTH) {
      return false;
    }

    const derivedKey = await scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS);

    return timingSafeEqual(derivedKey, expectedKey);
  } catch {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };
