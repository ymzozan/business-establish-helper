/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS verification script. */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const dotenv = require('dotenv');
require('@next/env').loadEnvConfig(process.cwd(), true);
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
const base = 'http://127.0.0.1:3000';
const marker = `verification-${crypto.randomUUID()}`;
const ids = [];
const cookies = new Map();
function keepCookies(response) {
  for (const value of response.headers.getSetCookie()) {
    const part = value.split(';')[0];
    const i = part.indexOf('=');
    cookies.set(part.slice(0, i), part.slice(i + 1));
  }
}
function cookieHeader() { return [...cookies].map(([key, value]) => `${key}=${value}`).join('; '); }
(async () => {
  const invalid = await fetch(`${base}/api/applications`, {method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
  assert.equal(invalid.status,400);
  for (const type of ['NEW_BUSINESS','WHOLESALE','REPAIR']) {
    const notes = `${marker}\n${type === 'NEW_BUSINESS' ? '55 m² · Modern · Vitrin ve montaj' : type === 'WHOLESALE' ? 'Küpe · 14 ayar · 250 gram' : '14 ayar yüzük ölçü değişimi'}`;
    const response = await fetch(`${base}/api/applications`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,sectorSlug:'kuyumcu',firstName:'Sistem',lastName:'Testi',phone:'05000000000',email:'verification@example.com',city:'Test',answers:[],notes})});
    assert.equal(response.status,201,`${type}: create failed`);
    const result=await response.json(); ids.push(result.id);
    const saved=await db.application.findUniqueOrThrow({where:{id:result.id}});
    assert.equal(saved.type,type); assert.equal(saved.notes,notes);
    console.log(`${type}: API create and database persistence PASS`);
  }
  const denied=await fetch(`${base}/api/applications/${ids[0]}`); assert.equal(denied.status,401);
  const credentials=dotenv.parse(fs.readFileSync('.env.admin.local'));
  const csrfResponse=await fetch(`${base}/api/auth/csrf`);keepCookies(csrfResponse);
  const {csrfToken}=await csrfResponse.json();
  const login=await fetch(`${base}/api/auth/callback/credentials`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Cookie':cookieHeader(),'X-Auth-Return-Redirect':'1'},body:new URLSearchParams({csrfToken,email:credentials.ADMIN_EMAIL,password:credentials.ADMIN_PASSWORD,callbackUrl:`${base}/panel`}),redirect:'manual'});keepCookies(login);
  const session=await fetch(`${base}/api/auth/session`,{headers:{Cookie:cookieHeader()}});
  const data=await session.json();assert.equal(data.user?.role,'ADMIN','Administrator login failed');
  const listing=await fetch(`${base}/api/applications`,{headers:{Cookie:cookieHeader()}});assert.equal(listing.status,200);
  const applications=await listing.json();assert(ids.every(id=>applications.some(a=>a.id===id)));
  const update=await fetch(`${base}/api/applications/${ids[0]}`,{method:'PATCH',headers:{Cookie:cookieHeader(),'Content-Type':'application/json'},body:JSON.stringify({status:'IN_PROGRESS'})});assert.equal(update.status,200);
  const changed=await db.application.findUniqueOrThrow({where:{id:ids[0]}});assert.equal(changed.status,'IN_PROGRESS');
  console.log('Administrator login, request listing, status update and anonymous access denial PASS');
})().catch(e=>{console.error(e.name,e.message);process.exitCode=1;}).finally(async()=>{
  if(ids.length) { const removed=await db.application.deleteMany({where:{id:{in:ids},email:'verification@example.com',notes:{startsWith:marker}}}); console.log(`${removed.count} test-only records removed`); }
  await db.$disconnect();
});
