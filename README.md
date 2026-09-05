# ProofGrid Stellar

[![CI](https://github.com/proofgrid-energy/proofgrid-stellar/actions/workflows/ci.yml/badge.svg)](https://github.com/proofgrid-energy/proofgrid-stellar/actions/workflows/ci.yml)

**Private evidence commitments and issuer-status verification on Stellar testnet.**

An organization can share a ProofGrid record and signed manifest privately with another organization. The recipient can check the record's integrity, apply its own issuer trust policy, and look up the issuer's current public status without sharing a private storage system.

**Status: functional testnet developer preview.** Synthetic issuance, verification, supersession and revocation have been exercised on live testnet. This adapter verifies commitments and current issuer status; it does not verify physical events, manufacturer approval or permanent revocation. Production readiness remains future work.

## Where this repository fits

[ProofGrid Core](https://github.com/proofgrid-energy/proofgrid-core) defines the evidence schemas and assessment CLI/SDK. [ProofGrid Registry](https://github.com/proofgrid-energy/proofgrid-registry) supplies source-backed manufacturer packs. This optional adapter adds signatures, private salted commitments and public status through native Stellar account data.

Core and registry work without Stellar. This repository includes its own pinned core artifact and installs without sibling checkouts. Only testnet is supported; no custom Soroban contract is deployed.

## Quick start: offline demo

Requires **Node.js 24+**, npm and Git.

```sh
git clone https://github.com/proofgrid-energy/proofgrid-stellar.git
cd proofgrid-stellar
npm ci
npm test
npm run demo
```

Expected: **23 tests pass** for the September 5, 2026 preview. The demo prints two results: `verified`, then `revoked`, both explicitly labeled `offline simulated ledger (not live verification)`. After installing dependencies, these checks need no live ledger or wallet.

**Windows PowerShell:** use `npm.cmd` in place of `npm`. If Node is installed in `C:\Program Files\nodejs` but commands are not found:

```powershell
$env:Path = "C:\Program Files\nodejs;$env:Path"
node --version
npm.cmd --version
```

This adjusts only the current terminal. Run each command separately and let it finish; copy commands without terminal prompts.

## Run the live testnet lifecycle

This opt-in command needs internet access. It creates an ephemeral account, requests test funds from Friendbot and publishes only synthetic commitments and status metadata. It uses no real funds or customer records.

```sh
npm run demo:testnet
```

Expected progress:

```text
Funding a new ephemeral TESTNET account; no real funds or private evidence.
Issued first commitment.
Issued successor commitment.
Independent lookup confirms supersession.
Independent lookup confirms revocation.
```

The final JSON report includes transaction hashes and confirms active verification, supersession, revocation, tampering rejection and unknown-issuer rejection. Each successful run writes `.local-checks/testnet-result.json` (ignored by Git). The temporary signing key is neither logged nor saved and is discarded when the process exits.

An earlier successful run is preserved in [docs/testnet-result.json](docs/testnet-result.json). A separate maintainer-run lifecycle on September 5, 2026 also passed at ledgers 4519308–4519311. These are historical testnet observations; the network can reset. [CI](https://github.com/proofgrid-energy/proofgrid-stellar/actions/workflows/ci.yml) runs offline tests and the simulated demo, not live transactions.

### If Friendbot cannot be resolved

An error such as `getaddrinfo ENOENT friendbot.stellar.org` means the funding hostname could not be resolved. That run stops before issuing ProofGrid commitments. In PowerShell, check DNS and Node lookup separately:

```powershell
Resolve-DnsName friendbot.stellar.org -Type A
node -e "require('node:dns').lookup('friendbot.stellar.org', console.log)"
```

When Node returns an address without an error, retry `npm.cmd run demo:testnet`. Successful DNS resolution alone does not guarantee the service is reachable. Preserve certificate verification; package reinstallation does not fix DNS lookup failures.

## How verification works

1. Validate a synthetic or privately held record against the core evidence schema.
2. Canonicalize it with RFC 8785, bind it to the protocol/network/schema/issuer and random identifier, and create a SHA-256 commitment using a random 256-bit salt.
3. Sign the commitment and retain the record and manifest privately.
4. Publish the commitment and current status in the issuer's native Stellar account data.
5. The recipient checks the signature, recomputes the commitment, applies an explicit manufacturer/schema-scoped trust policy, and queries current status.

| Private material | Public metadata |
| --- | --- |
| Record, salt and signed manifest | Issuer account and random attestation ID |
| Invoices, serial numbers, photos, logs and storage pointers | Commitment, status and optional successor ID |

Issuer activity, transaction timing and successor links remain correlatable. Random salts prevent identical records from automatically producing stable public commitments; they do not remove all metadata leakage.

## API

See the runnable [offline example](examples/offline-demo.mjs) and [testnet example](examples/testnet-demo.mjs) for record and trust-policy construction.

| Export | Purpose |
| --- | --- |
| `createAttestation(record, keypair)` | Create a private salted and signed manifest for a valid record |
| `verifyAttestation(record, manifest, trustPolicy, lookup)` | Verify integrity, consumer trust and supplied current status |
| `testnetLookup(issuer, id)` | Read current status from the fixed testnet Horizon gateway |
| `submitTestnetStatus(manifest, keypair, state?, successorId?)` | Issue or update status using the issuer's key |
| `buildStatusTransaction(account, manifest, state?, successorId?)` | Build an unsigned testnet transaction for external signing |
| `encodeStatus(manifest, state?, successorId?)` / `decodeStatus(bytes)` | Encode or decode the public status entry |

Verification returns `verified`, `invalid`, `unknown`, `untrusted_issuer`, `revoked` or `superseded`. Missing or unavailable ledger state remains `unknown`. Owning a signing key alone does not authorize a manufacturer: the consumer must explicitly enable the issuer for the record's manufacturer and schema version.

The package is a private development artifact, not an npm release. The [source entry point](src/index.mjs) exports the API; the pinned core tarball and its provenance live in [vendor/](vendor/).

## Trust and production limits

Native account data is mutable by its controller. The submission helper rejects reuse/reactivation and requires an active same-issuer successor, but an issuer can bypass the helper. This does **not** enforce irreversible revocation or preserve an independently verified history.

Current-status verification trusts the configured Horizon gateway. It is not a light-client proof. Custody, key rotation, multisig, gateway redundancy and AttestProtocol interoperability require further work. Record integrity also does not establish accurate measurements, authentic document contents or physical truth.

See [design and alternatives](docs/attestation-design.md), the [backlog](docs/backlog.md) and [security guidance](SECURITY.md). Keep signing keys, manifest salts and customer evidence out of Git and public reports.

## Contribute

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Current work includes detecting or preventing issuer reactivation, explicit rotation/custody policy, gateway failure handling and interoperability research. Contributions need precise trust assumptions and tests for tampered, missing, revoked and untrusted inputs. Live tests remain opt-in and use synthetic data only.

## License

New ProofGrid source uses [MPL-2.0](LICENSE). [LICENSING.md](LICENSING.md) preserves earlier Apache grants and third-party notices. The vendored core artifact carries its own notices and source/hash provenance.
