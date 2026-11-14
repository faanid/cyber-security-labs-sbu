const test = require('node:test');
const assert = require('node:assert/strict');
const { sha256, sha256WithSalt } = require('../src/hashing');
const { buildToyLookupTable, lookupUnsaltedHash } = require('../src/rainbow-table');
const { hashPassword, verifyPassword } = require('../src/password-storage');

test('same input produces the same unsalted SHA-256 digest', () => {
  assert.equal(sha256('hello'), sha256('hello'));
});

test('different salts produce different demonstration hashes', () => {
  assert.notEqual(
    sha256WithSalt('hello', 'salt-one'),
    sha256WithSalt('hello', 'salt-two')
  );
});

test('toy lookup table can find a candidate for an unsalted hash', () => {
  const table = buildToyLookupTable(['123456', 'password', 'letmein']);
  assert.equal(lookupUnsaltedHash(table, sha256('password')), 'password');
});

test('scrypt password record verifies the correct password only', async () => {
  const record = await hashPassword('correct-password');
  assert.equal(await verifyPassword('correct-password', record), true);
  assert.equal(await verifyPassword('incorrect-password', record), false);
});

test('the same password receives a fresh random salt', async () => {
  const first = await hashPassword('same-password');
  const second = await hashPassword('same-password');
  assert.notEqual(first.salt, second.salt);
  assert.notEqual(first.hash, second.hash);
});

test('empty passwords are rejected when creating a record', async () => {
  await assert.rejects(() => hashPassword(''), {
    name: 'TypeError'
  });
});
