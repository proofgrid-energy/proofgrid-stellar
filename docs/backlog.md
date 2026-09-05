# Contributor backlog

1. **Irreversible revocation.** Compare authenticated transaction history and an existing attestation contract against mutable native data. Acceptance: prevent or detect reactivation/deletion by issuer, independent verification, privacy review and testnet evidence.
2. **AttestProtocol interoperability.** Pin and inspect deployment/SDK versions and prototype a salt-preserving adapter. Acceptance: no raw evidence on-chain; matching/revoked/unknown issuer tests.
3. **Issuer rotation and custody.** Specify key lifetimes, revocation authority and multisig support. Acceptance: old/new/compromised key tests, consumer-controlled trust policy and no implicit authority inheritance.
4. **Ledger gateway redundancy.** Compare providers or verify history without relying on a single current-state response. Acceptance: stale/divergent/missing provider behavior never returns verified.
