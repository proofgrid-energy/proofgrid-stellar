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
