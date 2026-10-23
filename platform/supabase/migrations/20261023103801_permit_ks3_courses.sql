-- Extend the existing course validator only; retain the existing grants and RLS.
create or replace function public.valid_site(s text)
returns boolean language sql immutable set search_path = ''
as $$ select s in ('alevel-physics','gcse-physics','gcse-maths','gcse-chemistry','alevel-chemistry','alevel-maths','alevel-further-maths','alevel-pe','gcse-biology','alevel-biology','gcse-combined','alevel-psychology','alevel-sociology','ks3-science','ks3-maths'); $$;
