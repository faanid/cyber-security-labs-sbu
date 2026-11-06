# Lab 01 — Password Salting and Hashing

**Status:** Planned  
**Classification:** Independent practical lab  
**Related homework:** Question 1

## Objective

Demonstrate why unique salts make precomputed password-hash tables less reusable, and compare the behavior of unsalted and salted password hashes.

## Planned experiments

1. Hash the same sample password without a salt.
2. Hash the same sample password with two different salts.
3. Compare the resulting hashes.
4. Use a tiny, locally generated demonstration lookup table to explain precomputation and why a unique salt defeats direct reuse.
5. Explain why a real password-storage system should use a password-hashing function such as Argon2id or scrypt rather than a fast general-purpose hash such as SHA-256.

## Security notes

Use fictional sample passwords only. This is an educational demonstration, not a password-cracking tool. Do not use real credentials or publish recovered passwords.

## Implementation

_To be added._

## Results and analysis

_To be added._

## References

- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Node.js Crypto documentation](https://nodejs.org/api/crypto.html)
