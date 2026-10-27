import test from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {readFileSync,readdirSync} from 'node:fs';
const migrations=new URL('../supabase/migrations/',import.meta.url);
test('database rejects direct client reads/writes and reserves AI budget atomically',async()=>{
 const db=new PGlite();try{
  await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key);create table public.classes(id uuid primary key);grant usage on schema public,auth to service_role,anon,authenticated;grant select on auth.users to service_role;`);
  for(const file of readdirSync(migrations).filter(f=>f.endsWith('.sql')))await db.exec(readFileSync(new URL(file,migrations),'utf8'));
  const sites=await db.query("select public.valid_site('ks3-science') as ks3science, public.valid_site('ks3-maths') as ks3maths, public.valid_site('alevel-pe') as pe, public.valid_site('alevel-further-maths') as further, public.valid_site('gcse-maths') as gcse, public.valid_site('alevel-sociology') as sociology, public.valid_site('not-a-course') as unknown");assert.deepEqual(sites.rows[0],{ks3science:true,ks3maths:true,pe:true,further:true,gcse:true,sociology:true,unknown:false});
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


test('account helpers reject anonymous calls while signup lookup and signed-in policies retain access',async()=>{
 const db=new PGlite();try{
  await db.exec(`create role anon;create role authenticated;create role service_role;grant usage on schema public to anon,authenticated,service_role;
   create function public.is_teacher() returns boolean language sql security definer as 'select false';
   create function public.in_class(uuid) returns boolean language sql security definer as 'select false';
   create function public.owns_class(uuid) returns boolean language sql security definer as 'select false';
   create function public.teaches(uuid) returns boolean language sql security definer as 'select false';
   create function public.handle_new_user() returns text language sql security definer as 'select null::text';
   create function public.check_class_code(text) returns text language sql security definer as 'select null::text';
   create function public.class_info(text) returns jsonb language sql security definer as 'select null::jsonb';`);
  await db.exec(readFileSync(new URL('20261027175726_restrict_account_function_execution.sql',migrations),'utf8'));
  await db.exec('set role anon');
  for(const call of ['is_teacher()','in_class(null)','owns_class(null)','teaches(null)','handle_new_user()','check_class_code(null)'])await assert.rejects(db.query('select public.'+call),/permission denied/);
  assert.equal((await db.query('select public.class_info(null) as info')).rows[0].info,null);
  await db.exec('reset role;set role authenticated');
  assert.equal((await db.query('select public.is_teacher() as teacher')).rows[0].teacher,false);
  await assert.rejects(db.query('select public.handle_new_user()'),/permission denied/);
  await db.exec('reset role');
 }finally{await db.close();}
});
