-- Keep only the pre-signup class lookup available anonymously.
-- Existing authenticated teacher/student RPCs retain their ownership checks.
begin;
do $migration$
declare signature text; target regprocedure;
begin
 foreach signature in array array['public.is_teacher()','public.in_class(uuid)','public.owns_class(uuid)','public.teaches(uuid)'] loop
  target:=to_regprocedure(signature);
  if target is not null then
   execute format('revoke execute on function %s from public, anon',target);
   execute format('grant execute on function %s to authenticated, service_role',target);
  end if;
 end loop;
 foreach signature in array array['public.handle_new_user()','public.check_class_code(text)'] loop
  target:=to_regprocedure(signature);
  if target is not null then execute format('revoke execute on function %s from public, anon, authenticated',target);end if;
 end loop;
 target:=to_regprocedure('public.class_info(text)');
 if target is not null then
  execute format('revoke execute on function %s from public',target);
  execute format('grant execute on function %s to anon, authenticated, service_role',target);
 end if;
end $migration$;
-- Future functions must receive deliberate grants, rather than PUBLIC execute.
alter default privileges for role postgres in schema public revoke execute on functions from public;
commit;
