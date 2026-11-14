const { sha256, sha256WithSalt } = require('./hashing');

function buildToyLookupTable(candidates, salt = null) {
  const table = new Map();

  for (const candidate of candidates) {
    const hash =
      salt === null
        ? sha256(candidate)
        : sha256WithSalt(candidate, salt);

    table.set(hash, candidate);
  }

  return table;
}

function lookupHash(table, hash) {
  return table.get(hash) ?? null;
}

module.exports = {
  buildToyLookupTable,
  lookupHash
};
