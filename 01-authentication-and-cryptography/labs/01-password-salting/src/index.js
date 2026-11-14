const { sha256, sha256WithSalt } = require('./hashing');
const { buildToyLookupTable, lookupHash } = require('./rainbow-table');
const { hashPassword, verifyPassword } = require('./password-storage');

async function main() {
  const password = 'correct-horse-battery-staple';

  console.log('\n=== 1. Unsalted SHA-256 ===');
  const hash1 = sha256(password);
  const hash2 = sha256(password);
  console.log('First hash: ', hash1);
  console.log('Second hash:', hash2);
  console.log('Hashes match:', hash1 === hash2);

  console.log('\n=== 2. Salted SHA-256 demonstration (not for real storage) ===');
  const saltA = 'demo-salt-A';
  const saltB = 'demo-salt-B';
  const saltedHashA = sha256WithSalt(password, saltA);
  const saltedHashB = sha256WithSalt(password, saltB);
  console.log('Salt A hash:', saltedHashA);
  console.log('Salt B hash:', saltedHashB);
  console.log('Hashes match:', saltedHashA === saltedHashB);

  console.log('\n=== 3. Tiny educational lookup tables ===');
  const candidates = ['123456', 'password', 'qwerty', 'letmein'];

  const unsaltedTable = buildToyLookupTable(candidates);
  const knownCandidateHash = sha256('password');
  console.log(
    'Unsalted table finds candidate:',
    lookupHash(unsaltedTable, knownCandidateHash)
  );

  const saltedTableA = buildToyLookupTable(candidates, saltA);
  const saltedTableB = buildToyLookupTable(candidates, saltB);
  const saltedTargetA = sha256WithSalt('password', saltA);

  console.log(
    'Table built with the same salt finds candidate:',
    lookupHash(saltedTableA, saltedTargetA)
  );
  console.log(
    'Table built with a different salt finds candidate:',
    lookupHash(saltedTableB, saltedTargetA)
  );
  console.log('Note: these are tiny lookup-table illustrations, not true rainbow tables.');

  console.log('\n=== 4. Password storage with scrypt ===');
  const record = await hashPassword(password);
  console.log('Stored record (salt is not secret):');
  console.log(JSON.stringify(record, null, 2));
  console.log('Correct password accepted:', await verifyPassword(password, record));
  console.log('Incorrect password accepted:', await verifyPassword('wrong-password', record));

  const secondRecord = await hashPassword(password);
  console.log('Same password gets a different salt:', record.salt !== secondRecord.salt);
  console.log('Same password gets a different derived hash:', record.hash !== secondRecord.hash);
}

main().catch((error) => {
  console.error('Demo failed:', error);
  process.exitCode = 1;
});
