import test from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {readFileSync,readdirSync} from 'node:fs';
const migrations=new URL('../supabase/migrations/',import.meta.url);
test('database rejects direct client reads/writes and reserves AI budget atomically',async()=>{
 const db=new PGlite();try{
  await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create table public.classes(id uuid primary key);grant usage on schema public,auth to service_role,anon,authenticated;grant select on auth.users to service_role;`);
  for(const file of readdirSync(migrations).filter(f=>f.endsWith('.sql')))await db.exec(readFileSync(new URL(file,migrations),'utf8'));
  await db.exec(`insert into auth.users values('11111111-1111-4111-8111-111111111111');insert into public.classes values('22222222-2222-4222-8222-222222222222');set role authenticated;`);
  for(const table of ['learning_assignments','learning_submissions','learning_marking_attempts']){
   await assert.rejects(db.query('select * from public.'+table),/permission denied/);
   await assert.rejects(db.query('delete from public.'+table),/permission denied/);
  }
  await assert.rejects(db.query(`select public.learning_reserve_mark('11111111-1111-4111-8111-111111111111','test','q','hash',null,'openai','fake',1,1)`),/permission denied/);
  await db.exec('reset role;set role service_role;');
  const reserve=hash=>db.query(`select public.learning_reserve_mark('11111111-1111-4111-8111-111111111111','test','q','${hash}',null,'openai','fake',1,1) as ticket`);
  const first=(await reserve('one')).rows[0].ticket,again=(await reserve('one')).rows[0].ticket,limited=(await reserve('two')).rows[0].ticket;
  assert.equal(first.id,again.id);assert.equal(limited.limited,true);
  await db.exec('reset role;');const rls=await db.query(`select relname,relrowsecurity from pg_class where relname in ('learning_assignments','learning_submissions','learning_marking_attempts')`);assert.ok(rls.rows.every(r=>r.relrowsecurity));
 }finally{await db.close();}
});
