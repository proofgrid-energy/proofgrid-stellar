# Focused engineering backlog

Six issue drafts reviewed against current source and existing open issues for the
October 9 submission. These are engineering tasks, not approval or earned points.
Proposed complexity is subject to maintainer review and Drips app configuration.

## 1. Define deterministic ledger gateway disagreement handling

## Description & Context

Current verification relies on supplied current-state lookup evidence.

## Proposed Complexity

High (200 points proposed); planning label `complexity: high`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Define provider result/freshness metadata.
- [ ] Test unavailable, stale, matching and conflicting responses.
- [ ] Return unknown for disagreement or insufficient freshness.
- [ ] Preserve verified/revoked/superseded behavior and consumer issuer policy.
- [ ] Keep tests offline.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

src/testnet.mjs; src/index.mjs; test/

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## 2. Detect issuer reactivation and deletion in attestation history

## Description & Context

Native account status is mutable and cannot currently guarantee irreversible revocation.

## Proposed Complexity

High (200 points proposed); planning label `complexity: high`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Specify historical verification or a compatible attestation contract boundary.
- [ ] Reproduce revoked-to-active/deleted status scenarios with synthetic fixtures.
- [ ] Prevent or explicitly detect reactivation.
- [ ] Preserve private salts/records off-chain.
- [ ] Document trust and privacy limits.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

src/index.mjs; src/testnet.mjs; docs/attestation-design.md

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## 3. Prototype salt-preserving AttestProtocol interoperability

## Description & Context

Interoperability could avoid inventing an incompatible attestation format.

## Proposed Complexity

High (200 points proposed); planning label `complexity: high`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Pin and inspect official deployed interface/SDK revision.
- [ ] Map a salted commitment without publishing evidence or salts.
- [ ] Cover active/revoked/unknown issuer cases.
- [ ] Record differences and unsupported semantics.
- [ ] Do not infer deployment equivalence from local mocks.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

src/; docs/; examples/; test/

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## 4. Specify issuer key rotation and custody trust rules

## Description & Context

Issuer identity and key lifetime need explicit rotation and compromise handling.

## Proposed Complexity

High (200 points proposed); planning label `complexity: high`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Define old/new/compromised key and revocation authority behavior.
- [ ] Preserve consumer-controlled manufacturer/schema trust.
- [ ] Add negative authority-inheritance tests.
- [ ] Specify multisig boundaries.
- [ ] Avoid publishing signing secrets.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

src/index.mjs; docs/attestation-design.md; test/

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## 5. Bound manifest and evidence verification input sizes

## Description & Context

Plain JSON/canonicalization checks need clear limits for integration into untrusted ingestion.

## Proposed Complexity

Medium (150 points proposed); planning label `complexity: medium`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Document limits for manifest fields and record structure.
- [ ] Test excessive nesting, large payloads and malformed Unicode.
- [ ] Reject unsupported sizes before expensive work.
- [ ] Preserve deterministic commitment compatibility or version the protocol change.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

src/index.mjs; test/; SECURITY.md

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## 6. Refresh the documented synthetic Testnet lifecycle evidence

## Description & Context

Historical Testnet evidence can become stale after network resets.

## Proposed Complexity

Medium (150 points proposed); planning label `complexity: medium`.
Actual enrollment and points must be set in the Drips app after approval.

## Requirements & Acceptance Criteria

- [ ] Run the opt-in ephemeral-account lifecycle on current Testnet.
- [ ] Record network, timestamp, transaction hashes and ledger observations.
- [ ] Verify active/superseded/revoked and negative integrity/trust cases.
- [ ] Publish no salts/private records/keys.
- [ ] Distinguish live observations from offline simulations.
- [ ] Include relevant positive/negative regression evidence; required CI passes.

## Relevant Files & Architecture

examples/testnet-demo.mjs; docs/testnet-result.json; docs/verification-boundary.md

## Verification

`npm test; npm run demo`. Network checks remain opt-in.

## Contribution Guidelines

Agree bounded scope with xteesamz or EthTobi through GitHub. Use a focused PR
with `Closes #<issue_id>`, actual check results, and remaining limitations.

## Published issue links

- [Define deterministic ledger gateway disagreement handling](https://github.com/proofgrid-energy/proofgrid-stellar/issues/1)
- [Detect issuer reactivation and deletion in attestation history](https://github.com/proofgrid-energy/proofgrid-stellar/issues/2)
- [Prototype salt-preserving AttestProtocol interoperability](https://github.com/proofgrid-energy/proofgrid-stellar/issues/4)
- [Specify issuer key rotation and custody trust rules](https://github.com/proofgrid-energy/proofgrid-stellar/issues/5)
- [Bound manifest and evidence verification input sizes](https://github.com/proofgrid-energy/proofgrid-stellar/issues/6)
- [Refresh the documented synthetic Testnet lifecycle evidence](https://github.com/proofgrid-energy/proofgrid-stellar/issues/7)

These issues are published but have not been enrolled into Drips Wave or assigned.
