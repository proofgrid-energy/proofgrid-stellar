# October 9 submission verification

Executed October 7, 2026 in the shared Linux workspace. Baseline source revision:
`daea1e55779bca2442ffa4796ef08ec975f56e4d`. Preparation changes affect documentation/governance and, where noted,
CI checks; no runtime implementation or public API was changed.

## Local results

Runtime: Node v24.15.0.

- `npm ci --ignore-scripts --no-audit --no-fund`: dependencies installed from
  the lockfile. Install used available Node 22 (engine warnings); runtime tests
  below used supported Node 24.
- `npm test`: pinned core artifact check passed; 23 tests passed.
- `npm run demo`: simulated verified/revoked lifecycle passed.
- `npm run demo:testnet`: live synthetic Testnet lifecycle passed October 7.
  See [current lifecycle report](testnet-result-2026-10-07.json), issuer
  `GB3R2WMQIFOEXHFYBOD7WZ3ZDRMBBAMDC3KRPCVY7IBNKGRZTRGZUGPP`,
  ledgers 5072870–5072873. Active, superseded and revoked observations matched;
  altered evidence and unknown issuer were rejected. Only synthetic commitments
  and public status were published; the ephemeral key was not saved or logged.
- Historical September evidence remains in testnet-result.json. Testnet can
  reset; these records establish observed behavior at the stated time only.

## Review and publication

- `git diff --check`: passed after preparation edits.
- CI YAML parsed locally. A syntax parse does not replace GitHub execution.
- Six engineering issues were published with bounded acceptance criteria and
  proposed complexity; links are in WAVE_BACKLOG.md. No Wave labels/enrollment
  or contributor assignments were performed.
- Maintainer EthTobi were owner-confirmed; GitHub contact and
  anytime availability apply. GitHub App coverage/application slots still
  require dashboard confirmation.
- Changes will be proposed through a fork PR because the available account
  cannot push directly to the organization's protected branch. Merge decisions
  remain with maintainers. Recheck the final PR checks before applying.
