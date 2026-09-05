// SPDX-License-Identifier: MPL-2.0
// Explicit opt-in command: publishes only synthetic testnet commitments and status.
import assert from 'node:assert/strict';import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';import {Keypair} from '@stellar/stellar-sdk';import {createAttestation,verifyAttestation,testnetLookup,submitTestnetStatus} from '../src/index.mjs';
const record=JSON.parse(readFileSync(new URL('./record.json',import.meta.url)));const key=Keypair.random();
console.log('Funding a new ephemeral TESTNET account; no real funds or private evidence.');
const funded=await fetch('https://friendbot.stellar.org/?addr='+key.publicKey(),{signal:AbortSignal.timeout(30000)});if(!funded.ok)throw Error('Friendbot HTTP '+funded.status);await funded.json();
const trust={[key.publicKey()]:{enabled:true,manufacturers:['dyness'],schema_versions:['0.1']}};
const first=createAttestation(record,key),next=createAttestation({...record,record_id:'synthetic-successor'},key);const transactions=[];
transactions.push(await submitTestnetStatus(first,key));console.log('Issued first commitment.');assert.equal((await verifyAttestation(record,first,trust,testnetLookup)).status,'verified');
transactions.push(await submitTestnetStatus(next,key));console.log('Issued successor commitment.');
transactions.push(await submitTestnetStatus(first,key,'superseded',next.id));assert.equal((await verifyAttestation(record,first,trust,testnetLookup)).status,'superseded');console.log('Independent lookup confirms supersession.');
transactions.push(await submitTestnetStatus(next,key,'revoked'));assert.equal((await verifyAttestation({...record,record_id:'synthetic-successor'},next,trust,testnetLookup)).status,'revoked');console.log('Independent lookup confirms revocation.');
assert.equal((await verifyAttestation({...record,record_id:'altered'},first,trust,testnetLookup)).status,'invalid');assert.equal((await verifyAttestation(record,first,{},testnetLookup)).status,'untrusted_issuer');
mkdirSync('.local-checks',{recursive:true});const report={network:'testnet',checked_at:new Date().toISOString(),issuer:key.publicKey(),transactions,checks:['active verified','supersession verified','revocation verified','tampering rejected','unknown issuer rejected'],note:'Only synthetic random commitments and state were published; private keys discarded. Testnet may reset.'};writeFileSync('.local-checks/testnet-result.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
