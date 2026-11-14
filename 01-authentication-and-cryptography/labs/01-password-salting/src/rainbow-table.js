const { sha256 } = require('./hashing');

function buildToyLookupTable(candidates) {
  const table = new Map();

  for (const candidate of candidates) {
    table.set(sha256(candidate), candidate);
  }

  return table;
}

function lookupUnsaltedHash(table, hash) {
  return table.get(hash) ?? null;
}

function lookupSaltedHash(table, passwordHash, salt) {
 
  const { sha256WithSalt } = require('./hashing');
  return table.get(passwordHash) ?? null;
}

module.exports = {
  buildToyLookupTable,
  lookupUnsaltedHash,
  lookupSaltedHash
};
