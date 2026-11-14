# SBU Software Security

A practical learning repository documenting cybersecurity and software security studies, coursework, hands-on labs, and independent experiments associated with Shahid Beheshti University.

The focus is on understanding security principles and applying them to the design and development of more secure software.

## Scope

This repository separates course assignments from independent practical work:

- **Coursework:** assignment questions, written answers, and course-related notes.
- **Labs:** controlled, reproducible experiments that turn concepts into practice.
- **Software security:** practical applications of security principles to software and APIs.

> **Academic context:** This repository documents participation in a course. It is not a degree, university transcript, or claim of a formal Computer Science qualification. Use the course's exact official title in your CV and profile.

## Current repository structure

```text
.
├── README.md
├── LICENSE
├── .gitignore
├── course/
│   ├── README.md
│   └── syllabus.md
├── resources/
│   └── README.md
└── 01-authentication-and-cryptography/
    ├── README.md
    ├── homework/
    │   ├── CS-HW1.pdf
    │   └── homework-01-authentication-cryptography.md
    ├── labs/
    │   ├── README.md
    │   ├── 01-password-salting/
    │   │   ├── README.md
    │   │   ├── package.json
    │   │   ├── src/
    │   │   └── tests/
    │   ├── 02-biometric-metrics/
    │   ├── 03-hash-vs-hmac/
    │   ├── 04-diffie-hellman-mitm/
    │   ├── 05-mfa-design/
    │   └── 06-symmetric-vs-asymmetric/
    └── resources.md
```

The folders for Labs 02–06 currently contain planning documents. Their implementations will be added as the work progresses.

## Progress

### Authentication and Cryptography

- [x] Lab 01 — Password Salting and Hashing
- [ ] Lab 02 — Biometric Metrics
- [ ] Lab 03 — Hash vs. HMAC
- [ ] Lab 04 — Diffie–Hellman and MITM
- [ ] Lab 05 — MFA Design
- [ ] Lab 06 — Symmetric vs. Asymmetric

### Planned topics

The following topics are possible future areas for study. They are not represented as completed course sections or existing directories:

- Network Security
- Web Application Security
- Vulnerability Assessment
- Secure Software Development

Only add topics that were actually covered in the course or that you have independently studied. Clearly label independent work.

## Practical lab standard

Each lab should explain:

1. **Objective** — what the experiment demonstrates.
2. **Background** — the relevant security concepts.
3. **Setup** — requirements and how to run it.
4. **Implementation** — the code or procedure.
5. **Experiments** — the tests performed.
6. **Results** — observed output, with secrets removed.
7. **Security analysis** — what the results mean and what they do not prove.
8. **Mitigation** — defensive recommendations.
9. **References** — authoritative documentation.

## Safety and responsible use

All practical exercises must be performed in local, intentionally vulnerable, or otherwise explicitly authorized environments. Do not test systems without permission. Never commit real credentials, private keys, tokens, personal data, or sensitive course information.

## Technology

The implementation language may vary by lab. JavaScript/TypeScript and Node.js are useful choices for connecting these topics to software engineering, but use the tool that best demonstrates each concept.

## License

The repository's license applies only to original material that you create and have the right to license. Third-party course materials, university documents, certificates, and other copyrighted content retain their original rights. See [LICENSE](LICENSE) and [course/README.md](course/README.md).
