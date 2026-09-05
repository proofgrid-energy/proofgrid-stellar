# Security and privacy

This is a developer preview. Report reproducible security problems privately to a repository maintainer through GitHub's private vulnerability reporting when available; otherwise contact a maintainer before disclosing details. No guaranteed response time or formal security audit is claimed.

Use synthetic fixtures. Evidence files and reports can contain customer information; store/share them under your own access controls. Validation does not fetch evidence URLs, verify physical events or establish manufacturer authorization. Reviewed Rule Packs are configuration, not a sandbox for arbitrary hostile schemas. Keep input sizes bounded and do not expose the library directly as an untrusted public service.

Only testnet is supported. Protect manifest salts and signing keys; never commit them. Public issuer activity and successor links are correlatable. Native account data is mutable by its controller; current status does not guarantee irreversible revocation. See docs/attestation-design.md.

No warranty eligibility, legal compliance, production security or financial guarantee follows from a green test suite.
