const test = require('node:test');
const assert = require('node:assert/strict');
const { sha256, sha256WithSalt } = require('../src/hashing');
const { buildToyLookupTable, lookupHash } = require('../src/rainbow-table');
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

test('unsalted toy lookup table finds a candidate', () => {
  const table = buildToyLookupTable(['123456', 'password', 'letmein']);

  assert.equal(lookupHash(table, sha256('password')), 'password');
});

test('salted toy lookup table finds a candidate when the salt matches', () => {
  const salt = 'test-salt';
  const table = buildToyLookupTable(['123456', 'password', 'letmein'], salt);

  assert.equal(
    lookupHash(table, sha256WithSalt('password', salt)),
    'password'
  );
});

test('a lookup table built with a different salt does not find the target', () => {
  const table = buildToyLookupTable(['123456', 'password', 'letmein'], 'salt-one');
  const targetHash = sha256WithSalt('password', 'salt-two');

  assert.equal(lookupHash(table, targetHash), null);
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
