-- Additive shared platform. Existing accounts/classes/progress are unchanged.
-- The Edge Function authenticates every request and owns all writes. No client
-- table privileges or SECURITY DEFINER functions are needed.
begin;
create table public.learning_assignments (
 id uuid primary key default gen_random_uuid(),
 teacher_id uuid not null references auth.users(id) on delete cascade,
 class_id uuid not null references public.classes(id) on delete cascade,
 site text not null check(site in ('alevel-physics','alevel-chemistry','alevel-biology','alevel-maths','alevel-psychology','gcse-physics','gcse-chemistry','gcse-biology','gcse-maths','gcse-combined')),
 page_id text not null check(length(page_id) between 1 and 180),
 title text not null check(length(title) between 1 and 250),
 due_date date not null,
 instructions text not null default '' check(length(instructions)<=2000),
 context jsonb not null default '{}',
 questions jsonb not null check(jsonb_typeof(questions)='array'),
 recipient_ids uuid[] not null check(cardinality(recipient_ids) between 1 and 500),
 marking_mode text not null default 'review' check(marking_mode in ('automatic','review')),
 archived boolean not null default false,
 created_at timestamptz not null default now()
);
create index learning_assignments_teacher on public.learning_assignments(teacher_id,due_date);
create index learning_assignments_recipients on public.learning_assignments using gin(recipient_ids);
create table public.learning_submissions (
 assignment_id uuid not null references public.learning_assignments(id) on delete cascade,
 student_id uuid not null references auth.users(id) on delete cascade,
 answers jsonb not null default '{}',
 marks jsonb not null default '{}',
 marking_status text not null default 'self' check(marking_status in ('self','pending','complete','partial')),
 teacher_reviews jsonb not null default '{}',
 first_answers jsonb,
 first_marks jsonb,
 first_submitted_at timestamptz,
 submitted_at timestamptz,
 started_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 revision uuid not null default gen_random_uuid(),
 read_confirmed boolean not null default false,
 primary key(assignment_id,student_id),
 check(octet_length(answers::text)<=2000000)
);
create index learning_submissions_student on public.learning_submissions(student_id);
create table public.learning_marking_attempts (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 site text not null,
 question_id text not null,
 assignment_id uuid references public.learning_assignments(id) on delete cascade,
 answer_hash text not null,
 state text not null default 'pending' check(state in ('pending','complete','failed')),
 result jsonb,
 provider text not null,
 model text not null,
 created_at timestamptz not null default now()
);
create unique index learning_marking_cache on public.learning_marking_attempts(user_id,site,question_id,answer_hash,coalesce(assignment_id,'00000000-0000-0000-0000-000000000000'::uuid));
create index learning_marking_budget on public.learning_marking_attempts(created_at,user_id);
alter table public.learning_assignments enable row level security;
alter table public.learning_submissions enable row level security;
alter table public.learning_marking_attempts enable row level security;
revoke all on public.learning_assignments,public.learning_submissions,public.learning_marking_attempts from public,anon,authenticated;
grant select,insert,update,delete on public.learning_assignments,public.learning_submissions,public.learning_marking_attempts to service_role;
-- Invoker function runs only as service_role. Advisory lock makes the quota
-- atomic across concurrent requests and keeps both user and global daily caps.
create function public.learning_reserve_mark(p_user uuid,p_site text,p_question text,p_hash text,p_assignment uuid,p_provider text,p_model text,p_user_limit int,p_global_limit int)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare prior public.learning_marking_attempts; fresh public.learning_marking_attempts; day_start timestamptz:=date_trunc('day',now() at time zone 'UTC') at time zone 'UTC';
begin
 perform pg_advisory_xact_lock(87658420261022);
 select * into prior from public.learning_marking_attempts where user_id=p_user and site=p_site and question_id=p_question and answer_hash=p_hash and assignment_id is not distinct from p_assignment;
 if found then return to_jsonb(prior); end if;
 if p_user_limit not between 1 and 200 or p_global_limit not between 1 and 100000 then raise exception 'Invalid quota'; end if;
 if (select count(*) from public.learning_marking_attempts where user_id=p_user and created_at>=day_start)>=p_user_limit or (select count(*) from public.learning_marking_attempts where created_at>=day_start)>=p_global_limit then return jsonb_build_object('limited',true); end if;
 insert into public.learning_marking_attempts(user_id,site,question_id,answer_hash,assignment_id,provider,model) values(p_user,p_site,p_question,p_hash,p_assignment,p_provider,p_model) returning * into fresh;
 return to_jsonb(fresh);
end $$;
revoke all on function public.learning_reserve_mark(uuid,text,text,text,uuid,text,text,int,int) from public,anon,authenticated;
grant execute on function public.learning_reserve_mark(uuid,text,text,text,uuid,text,text,int,int) to service_role;
commit;
