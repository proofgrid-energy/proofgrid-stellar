# proofgrid-stellar

The planned Stellar verification layer for ProofGrid evidence provenance across independent organizations: issuer verification, integrity, revocation and supersession.

**Status: architecture boundary only.** There is no contract, SDK, deployment or runnable verifier yet. M1 work belongs in [proofgrid-core](https://github.com/proofgrid-energy/proofgrid-core) and [proofgrid-registry](https://github.com/proofgrid-energy/proofgrid-registry). Stellar implementation follows useful core validation and an explicit assessment of existing attestation infrastructure.

Read the [verification boundary](docs/verification-boundary.md) for the input contract, privacy constraints and M5 acceptance gate. Sensitive evidence stays off-chain. Blockchain provenance is not proof of a physical event or warranty approval.

New source is provisionally MPL-2.0. See [LICENSE](LICENSE) and [LICENSING.md](LICENSING.md); earlier Apache grants remain preserved. This README was expanded from the initial title-only template on 2026-09-05.
