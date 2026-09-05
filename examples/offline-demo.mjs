// SPDX-License-Identifier: MPL-2.0
import {readFileSync} from 'node:fs';import {Keypair} from '@stellar/stellar-sdk';import {createAttestation,verifyAttestation,encodeStatus,decodeStatus} from '../src/index.mjs';
const record=JSON.parse(readFileSync(new URL('./record.json',import.meta.url)));const key=Keypair.random(),m=createAttestation(record,key),trust={[key.publicKey()]:{enabled:true,manufacturers:['dyness'],schema_versions:['0.1']}};
for(const state of ['active','revoked'])console.log(JSON.stringify({mode:'offline simulated ledger (not live verification)',...await verifyAttestation(record,m,trust,async()=>decodeStatus(encodeStatus(m,state)))}));
