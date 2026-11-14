# Lab 01 — Password Salting and Hashing

<sub>Status: Completed — educational implementation and automated tests are included.</sub>

A small Node.js project demonstrating why unsalted password hashes are vulnerable to precomputed lookup attacks, how salts change password hashes, and how to derive password hashes using Node.js `scrypt`.

## Learning objectives

- Generate and compare SHA-256 hashes.
- Observe that the same password produces the same unsalted hash.
- Use different salts to produce different derived values for the same password.
- Build deliberately tiny, educational lookup tables and observe their limitations.
- Store and verify passwords using `scrypt`, a password-based key derivation function.

## Requirements

- Node.js 18 or later
- No third-party dependencies

## Run

```bash
npm start
```

Run the automated tests:

```bash
npm test
```

## Project structure

```text
src/
├── hashing.js
├── index.js
├── password-storage.js
└── rainbow-table.js
tests/
└── password-storage.test.js
```

## What the demonstration shows

1. **Unsalted SHA-256:** identical input produces an identical digest. This makes equal passwords recognizable and allows an attacker to reuse precomputed password-to-hash mappings.
2. **Salted SHA-256 demonstration:** adding a different salt changes the digest, so a lookup table built for one salt does not directly match hashes made with another salt.
3. **Toy lookup tables:** these are tiny dictionaries of precomputed SHA-256 values, not real-world rainbow tables. They illustrate the lookup idea only. The salted lookup table is built for one specific salt; a table built with a different salt will not match the target hash.
4. **Password storage with scrypt:** each password gets a cryptographically random salt. The salt and derived key are stored; verification derives a new key and compares it using a timing-safe comparison.

## Important security notes

- **Do not use plain SHA-256 to store passwords.** SHA-256 is designed to be fast. Fast general-purpose hashes make large-scale password guessing cheaper.
- **A salt is not a password-hashing algorithm.** It prevents identical passwords from sharing the same stored hash and makes precomputed tables less reusable, but it does not make a fast hash suitable for password storage.
- **Use a password-hashing function** such as Argon2id, scrypt, or PBKDF2 with appropriate parameters. This lab uses Node.js built-in `scrypt` to avoid external dependencies.
- Salts are not secret. They should be unique and generated with a cryptographically secure random number generator.
- This is an educational example, not a complete production authentication system. Production systems also need rate limiting, secure session handling, password reset protections, transport security, and operational controls.
- The toy lookup tables are intentionally small and must never be used as security tools.

## Suggested experiments

- Change the sample password and observe the output.
- Run the program multiple times. The scrypt salt and derived key should change because a new random salt is generated.
- Store the same password twice and compare the records.
- Verify the correct password, then try an incorrect one.
- Build a lookup table with one salt, then try to look up a hash generated with another salt.

## References

- [Node.js Crypto API](https://nodejs.org/api/crypto.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
