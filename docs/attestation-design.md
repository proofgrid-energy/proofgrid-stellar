# Testnet attestation design

Reviewed 2026-09-05. This is an optional adapter for consumers who do not share database ownership. Core assessment works without it.

## Alternatives and decision

| Option | Benefit and limitation |
| --- | --- |
| Signed off-chain manifests | Portable issuer/content integrity; current revocation discovery depends on a shared status service or index. |
| [AttestProtocol](https://docs.attest.so/chains/stellar/overview) | Existing Stellar schemas, attestations and revocation. Worth future interoperability work; deployment governance, resolver choices and data privacy require separate review. |
| Native Stellar account data | Existing consensus-backed public status per issuer; no custom contract or deployment required. Small enough to test the trust hypothesis. |

Selected the third option for this testnet prototype. Removing Stellar removes shared ledger ordering and independently retrievable current status, leaving only an issuer signature and separate status-distribution problem. This does not prove that Stellar is always preferable to a signed transparency log. [Stellar Manage Data](https://developers.stellar.org/docs/data/apis/horizon/api-reference/resources/operations/object/manage-data) allows account entries up to 64 bytes, with account authorization and reserve requirements. Only testnet is implemented.

## Commitment and disclosure protocol

Private manifest: protocol proofgrid-attestation/0.1, TESTNET network passphrase, core schema version, random 128-bit ID, issuer public key, random 256-bit salt, commitment and Ed25519 signature. Canonicalize 4.0.0 implements [RFC 8785](https://github.com/erdtman/canonicalize). Digest is SHA-256 of canonical JSON containing protocol, network, schema_version, id, issuer, salt and the entire supported evidence record. Signature input is UTF-8(protocol + NUL + hexadecimal digest). Reject unsupported versions, non-JSON values, malformed Unicode and invalid signatures.

Public data key: pg1: followed by the 32-character random ID. Public value: version byte 1, state byte (0 active, 1 revoked, 2 superseded), 32-byte commitment; supersession adds the successor's 16-byte random ID. Total 34 or 50 bytes. Salt, record, serial, invoice, exact location, logs and storage pointers are not sent. The secret salt prevents practical low-entropy guessing while it remains secret; holders with the manifest can verify the disclosed record. Issuer activity, ledger timing and successor links remain publicly correlatable.

## Authority and status

The consumer supplies an explicit enabled-key policy scoped to manufacturer and schema version. Key ownership alone is not manufacturer authorization. No producer field can add its issuer to that policy. Key rotation needs a separately reviewed policy update; retired keys are disabled by the consumer. This minimal signer uses one account key, not a multisig custody workflow.

An issuer creates active entries; the submit helper refuses reuse or reactivation and requires an existing active same-issuer successor for supersession. It retains the original entry and updates its status. IMPORTANT: these transitions are enforced by the helper, not an immutable contract. An account controller can bypass it and overwrite/delete/reactivate account data. Current-state verification is therefore not a guarantee of permanent revocation or append-only history. Production irreversible semantics require contract enforcement or authenticated history validation. Account compromise is an issuer-trust failure.

Live verification uses a fixed HTTPS testnet Horizon provider. It is a trusted ledger-data gateway, not a light-client proof. Unavailable/deleted status returns unknown, never verified. Offline callbacks are explicitly simulated and make no freshness claim. Testnet resets can erase status. No mainnet transaction or real-fund operation is implemented.

## Acceptance and remaining work

Tests cover content/key/network tampering, unsupported schema, canonical ordering, random commitments, explicit trust, current revocation/supersession, unavailable state and public payload inspection. The optional live demo issues synthetic records, independently reads current state, supersedes and revokes them. Its report records transaction hashes only after all assertions pass. Production custody, irreversible revocation, provider redundancy and interoperability are documented backlog, not implemented claims.
