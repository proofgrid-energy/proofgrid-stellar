# ProofGrid verification boundary

SPDX-License-Identifier: MPL-2.0. Status: design boundary only, 2026-09-05.

ProofGrid's core schema/Rule Pack work must be useful without a blockchain. This repository will address the separate problem of verification between organizations that do not share database control: who issued a statement, whether it changed, and whether it was revoked or replaced.

## Later input contract

Consume a supported, explicitly versioned core manifest. The current schema version is a draft representation, not a signing or hash-canonicalization specification. Do not hash arbitrary JSON serialization and claim interoperable verification. Canonicalization, excluded fields, commitment construction, domain separation, issuer binding, signature verification and revision rules must be specified and tested before M5.

M1 references express lifecycle relationships only. A field labelled verified is a producer assertion, not proof of an authorized issuer. A revocation flag is not an authenticated revocation. Issuer identity, authorization scope and validity at event time remain verification inputs.

## Off-chain and on-chain boundary

Keep customer identity/contact, exact location, invoices, photos, raw logs and technician personal data off-chain. Storage stays producer-controlled and storage-agnostic; core is not an evidence hosting service.

Candidate public metadata is limited to schema/version, issuer reference, pseudonymous event reference, a privacy-reviewed commitment, issuance time and revocation/supersession references. This is a candidate list, not permission to publish every field. Exact serials, stable asset identifiers, storage URLs, timestamps and low-entropy evidence hashes can expose relationships or permit guessing. Evaluate those risks before choosing a public commitment scheme.

Blockchain can support integrity and provenance of an issued statement; it cannot establish the truth of a physical inspection, repair or measurement. No trust score, warranty approval or technician certification follows from an attestation.

## M5 acceptance gate

1. Explain which cross-organizational property worsens without Stellar; compare against signed off-chain records and existing verification infrastructure.
2. Recheck current official Stellar attestation options before choosing an adapter or writing Soroban contracts.
3. Specify issuer authority, verification, key rotation, revocation and supersession semantics. Preserve prior records and distinguish invalid, unknown and revoked results.
4. Demonstrate verification by an independent consumer and rejection of altered data, unknown/unauthorized issuers and revoked statements.
5. Prove the prototype publishes no sensitive evidence or reversible low-entropy commitments and does not require shared private storage ownership.

If a useful design requires private evidence on-chain, or Stellar adds no material cross-organizational property, reconsider this layer. No SDK, network transaction, contract, wallet or live verification is implemented in M1. No additional repository is needed.
