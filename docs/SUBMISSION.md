# Private evidence commitments and issuer status on Stellar

Prepared for the October 9, 2026 Stellar Wave submission.

## Purpose and implemented utility

The adapter signs salted commitments to private solar evidence and publishes commitment/current-status metadata through native Stellar account data. Independent consumers verify signatures, consumer-controlled issuer trust, and active/revoked/superseded status.

## Reproduce the implementation

Node 24+; `npm ci`, `npm test`, `npm run demo`. The offline demo is explicitly simulated. `npm run demo:testnet` is an opt-in synthetic lifecycle using an ephemeral signing key.

## Evidence and supported scope

The October 7 live synthetic lifecycle passed active, superseded, revoked, tampering and unknown-issuer checks; docs/testnet-result-2026-10-07.json records four transaction hashes at ledgers 5072870–5072873. Historical September evidence remains preserved. Current status is mutable by the issuer, not permanent revocation. No custom Soroban contract, physical-event verification, or manufacturer authorization is claimed.

Evidence reference: [October 7 Testnet lifecycle](testnet-result-2026-10-07.json).
Baseline source revision: `daea1e55779bca2442ffa4796ef08ec975f56e4d`. Final reviewed preparation revision and CI
results belong in [VERIFICATION_OCT09.md](VERIFICATION_OCT09.md).

## Maintainers and contributor work

Maintainers: xteesamz and EthTobi; contact via GitHub, available anytime.
See [MAINTAINERS.md](../MAINTAINERS.md), [CONTRIBUTING.md](../CONTRIBUTING.md),
[SECURITY.md](../SECURITY.md), and [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md).
The [focused engineering backlog](WAVE_BACKLOG.md) describes real work, relevant
files, tests, and acceptance criteria. Draft complexity values require maintainer
review and app enrollment; they do not establish approval or earned points.

## Before applying

- Confirm the Drips Wave App covers this repository and check application slots.
- Publish the reviewed backlog issues and preserve links to their acceptance checks.
- Publish these preparation changes through a reviewed PR with passing CI.
- Apply under the implemented scope above; no production/adoption claims are implied.

## Explorer evidence rechecked October 8

[Issuer account](https://stellar.expert/explorer/testnet/account/GB3R2WMQIFOEXHFYBOD7WZ3ZDRMBBAMDC3KRPCVY7IBNKGRZTRGZUGPP)

- [Lifecycle transaction 1](https://stellar.expert/explorer/testnet/tx/9f6633ac9ece3c46a4a29cdb1686bc8dfda42f25e764d2a36083031ce685ffba) — ledger 5072870; successful transaction lookup rechecked October 8.
- [Lifecycle transaction 2](https://stellar.expert/explorer/testnet/tx/b75f42a32294cc32b7a6d2608ba562621e4537f9cf95fd6ff61b223994a63946) — ledger 5072871; successful transaction lookup rechecked October 8.
- [Lifecycle transaction 3](https://stellar.expert/explorer/testnet/tx/4ca3cddd9bf4c32a48046b146c952cc1f8534166416f9b5053c4ee7e4321a53d) — ledger 5072872; successful transaction lookup rechecked October 8.
- [Lifecycle transaction 4](https://stellar.expert/explorer/testnet/tx/1adc35dffe7a2872c4868b0873d77e3c5ccb837c45f6f1b51d29c601c90bf85d) — ledger 5072873; successful transaction lookup rechecked October 8.

These are native account-data operations; no custom contract ID is applicable. The lifecycle report establishes synthetic active/superseded/revoked verification; transaction lookups alone do not prove physical evidence.
