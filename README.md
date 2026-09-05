# proofgrid-stellar

Optional private-evidence commitments and Stellar testnet status verification for ProofGrid. It works without shared private storage and does not turn evidence assertions into physical truth or warranty approval.

**Status: functional testnet developer preview.** A real synthetic lifecycle passed: issue, independent current-state verification, supersession, revocation, altered-record rejection and untrusted-issuer rejection. [Recorded transaction hashes](docs/testnet-result.json). Testnet can reset; these are historical observations.

## Run

Node 24+ and npm (npm.cmd in PowerShell):

```sh
npm ci
npm test
npm run demo
```

The offline demo explicitly simulates ledger lookup. To run the real opt-in testnet lifecycle:

```sh
npm run demo:testnet
```

This creates a temporary testnet account using Friendbot, publishes only synthetic random commitments/status, verifies transitions and discards its key. It uses no real funds. Results go under ignored .local-checks/. CI runs offline tests and the simulated demo, not live network transactions.

## API

- createAttestation(record, keypair): returns a private salted/signed manifest for a schema-valid record.
- verifyAttestation(record, manifest, trustPolicy, lookup): returns verified, invalid, unknown, untrusted_issuer, revoked or superseded. The consumer's trust policy explicitly scopes enabled issuer keys to manufacturer and schema.
- testnetLookup(issuer, id): retrieves current public status from the fixed testnet Horizon gateway.
- submitTestnetStatus(manifest, keypair, state?, successorId?): issues or changes testnet status with the issuer key. The helper refuses reuse/reactivation and requires an active same-issuer successor.
- buildStatusTransaction(account, manifest, state?, successorId?): builds an unsigned testnet transaction for external signing.

Records, salts, invoices, serial numbers, personal data and storage pointers stay off-chain. A holder privately shares record and manifest with a verifier. Only issuer account, random ID, commitment and status/successor metadata are public. Issuer activity and successor links remain correlatable. Never commit production keys or private manifests.

## Trust limits

Native account data is mutable by the account controller. Helper transition checks do not enforce irreversible revocation on-chain; a controller can bypass them. This verifies current issuer status through a trusted Horizon gateway, not immutable history or a light-client proof. Missing/unavailable state remains unknown. Key rotation requires a separate consumer-policy decision. Only testnet is supported.

See [design and alternatives](docs/attestation-design.md), [contributor guide](CONTRIBUTING.md), [backlog](docs/backlog.md) and [security](SECURITY.md). AttestProtocol interoperability, irreversible revocation, multisig custody and gateway redundancy remain real engineering work. No custom Soroban contract is deployed.

## License

ProofGrid source uses MPL-2.0; earlier Apache grants and third-party notices remain preserved. See [LICENSING.md](LICENSING.md). The pinned core artifact carries its own source-commit/hash provenance in vendor/ and does not require a sibling checkout.
