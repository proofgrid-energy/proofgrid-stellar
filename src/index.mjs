// SPDX-License-Identifier: MPL-2.0
import {createHash,randomBytes,timingSafeEqual} from 'node:crypto';
import canonicalize from 'canonicalize';
import {Keypair,Networks,Operation,TransactionBuilder} from '@stellar/stellar-sdk';
import {validateEvidence} from '@proofgrid/core';
export const PROTOCOL='proofgrid-attestation/0.1';
export const NETWORK=Networks.TESTNET;
const hex=(s,n)=>typeof s==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(s);
function jsonOnly(value,seen=new Set()) {
 if(typeof value==='number'&&!Number.isFinite(value))throw Error('Non-finite JSON number');
 if(typeof value==='string'&&!value.isWellFormed())throw Error('Malformed Unicode');
 if(value===null||['string','number','boolean'].includes(typeof value))return;
 if(typeof value!=='object'||(!Array.isArray(value)&&Object.getPrototypeOf(value)!==Object.prototype&&Object.getPrototypeOf(value)!==null)||seen.has(value))throw Error('Expected acyclic plain JSON');
 seen.add(value);for(const [k,v] of Object.entries(value)){if(!k.isWellFormed())throw Error('Malformed Unicode key');jsonOnly(v,seen);}seen.delete(value);
}
function digest(record,m) {
 jsonOnly(record);
 const text=canonicalize({protocol:PROTOCOL,network:NETWORK,schema_version:'0.1',id:m.id,issuer:m.issuer,salt:m.salt,record});
 return createHash('sha256').update(text,'utf8').digest('hex');
}
const signedBytes=commitment=>Buffer.from(PROTOCOL+'\0'+commitment,'utf8');
function checkManifest(m) {
 if(!m||Object.keys(m).sort().join(',')!=='commitment,id,issuer,network,protocol,salt,schema_version,signature'||m.protocol!==PROTOCOL||m.network!==NETWORK||m.schema_version!=='0.1'||!hex(m.id,32)||!hex(m.salt,64)||!hex(m.commitment,64)||typeof m.signature!=='string')throw Error('Invalid manifest');
 const signature=Buffer.from(m.signature,'base64');if(signature.length!==64||signature.toString('base64')!==m.signature||!Keypair.fromPublicKey(m.issuer).verify(signedBytes(m.commitment),signature))throw Error('Invalid signature');
}
/** Private output: keep manifest salt and record off-chain. */
export function createAttestation(record,keypair) {
 jsonOnly(record);if(!validateEvidence(record).valid)throw Error('Unsupported or invalid core evidence');
 const m={protocol:PROTOCOL,network:NETWORK,schema_version:'0.1',id:randomBytes(16).toString('hex'),issuer:keypair.publicKey(),salt:randomBytes(32).toString('hex')};
 const commitment=digest(record,m);return {...m,commitment,signature:Buffer.from(keypair.sign(signedBytes(commitment))).toString('base64')};
}
export function statusKey(id) {if(!hex(id,32))throw Error('Invalid attestation ID');return 'pg1:'+id;}
/** Public data: format version, state, commitment, optional random successor ID. */
export function encodeStatus(manifest,state='active',successor) {
 checkManifest(manifest);const codes={active:0,revoked:1,superseded:2};if(!Object.hasOwn(codes,state))throw Error('Unknown state');
 if(state==='superseded'&&(!hex(successor,32)||successor===manifest.id))throw Error('Supersession needs a distinct random ID');
 if(state!=='superseded'&&successor!==undefined)throw Error('Only supersession accepts successor');
 return Buffer.concat([Buffer.from([1,codes[state]]),Buffer.from(manifest.commitment,'hex'),...(state==='superseded'?[Buffer.from(successor,'hex')]:[])]);
}
export function decodeStatus(bytes) {
 const b=Buffer.from(bytes);if(![34,50].includes(b.length)||b[0]!==1||b[1]>2||(b[1]===2)!==(b.length===50))throw Error('Unsupported status entry');
 return {state:['active','revoked','superseded'][b[1]],commitment:b.subarray(2,34).toString('hex'),...(b[1]===2?{successor:b.subarray(34).toString('hex')}:{})};
}
export function buildStatusTransaction(account,manifest,state='active',successor) {
 if(account.accountId()!==manifest.issuer)throw Error('Transaction account must be the issuer');
 return new TransactionBuilder(account,{fee:'100',networkPassphrase:NETWORK}).addOperation(Operation.manageData({name:statusKey(manifest.id),value:encodeStatus(manifest,state,successor)})).setTimeout(60).build();
}
/** lookup must provide current trusted testnet ledger data; no record or salt is sent. */
export async function verifyAttestation(record,manifest,trust,lookup) {
 try {checkManifest(manifest);jsonOnly(record);if(!validateEvidence(record).valid)throw Error('Invalid evidence');if(!timingSafeEqual(Buffer.from(digest(record,manifest),'hex'),Buffer.from(manifest.commitment,'hex')))throw Error('Evidence commitment mismatch');}
 catch(error){return {status:'invalid',reason:error.message};}
 const authority=trust&&Object.hasOwn(trust,manifest.issuer)?trust[manifest.issuer]:undefined;
 if(authority?.enabled!==true||!Array.isArray(authority.manufacturers)||!Array.isArray(authority.schema_versions)||!authority.manufacturers.includes(record.asset.manufacturer)||!authority.schema_versions.includes(record.schema_version))return {status:'untrusted_issuer',reason:'Issuer is not enabled for this manufacturer/schema in consumer policy'};
 let entry;try{entry=await lookup(manifest.issuer,manifest.id);}catch{return {status:'unknown',reason:'Ledger lookup unavailable'};}
 if(!entry)return {status:'unknown',reason:'No current ledger entry'};
 if(!['active','revoked','superseded'].includes(entry.state)||entry.commitment!==manifest.commitment||(entry.state==='superseded'&&(!hex(entry.successor,32)||entry.successor===manifest.id)))return {status:'invalid',reason:'Ledger status does not match attestation'};
 return {status:entry.state==='active'?'verified':entry.state,...(entry.successor?{successor:entry.successor}:{}),reason:'Signature and consumer trust policy checked against supplied current ledger status; not physical verification'};
}
export {testnetLookup,submitTestnetStatus} from './testnet.mjs';
