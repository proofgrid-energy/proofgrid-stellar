// SPDX-License-Identifier: MPL-2.0
import {Account} from '@stellar/stellar-sdk';
import {statusKey,decodeStatus,buildStatusTransaction,encodeStatus} from './index.mjs';
const HORIZON='https://horizon-testnet.stellar.org';
async function request(path,options={}){const r=await fetch(HORIZON+path,{...options,signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Stellar testnet HTTP '+r.status);return r.json();}
export async function testnetLookup(issuer,id) {
 const account=await request('/accounts/'+encodeURIComponent(issuer));
 const raw=account.data?.[statusKey(id)];return raw===undefined?null:decodeStatus(Buffer.from(raw,'base64'));
}
/** Only testnet; caller provides its own signing key. No secrets are logged. */
export async function submitTestnetStatus(manifest,keypair,state='active',successor) {
 if(keypair.publicKey()!==manifest.issuer)throw Error('Wrong signing account');
 const account=await request('/accounts/'+manifest.issuer);
 const prior=account.data?.[statusKey(manifest.id)];
 if(state==='active'&&prior!==undefined)throw Error('Attestation ID already exists');
 if(state!=='active'){
   if(prior===undefined)throw Error('Cannot update an unissued attestation');
   const decoded=decodeStatus(Buffer.from(prior,'base64'));if(decoded.state!=='active'||decoded.commitment!==manifest.commitment)throw Error('Only matching active attestations can transition');
 }
 if(state==='superseded'){
   const next=account.data?.[statusKey(successor)];if(!next||decodeStatus(Buffer.from(next,'base64')).state!=='active')throw Error('Successor must already be active under the same issuer');
 }
 encodeStatus(manifest,state,successor);
 const tx=buildStatusTransaction(new Account(manifest.issuer,account.sequence),manifest,state,successor);tx.sign(keypair);
 const result=await request('/transactions',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({tx:tx.toXDR()})});
 return {hash:result.hash,ledger:result.ledger};
}
