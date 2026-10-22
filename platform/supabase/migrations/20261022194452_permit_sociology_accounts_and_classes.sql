-- Preserve all existing subject IDs while enabling Sociology accounts, classes and progress.
create or replace function public.valid_site(s text)
returns boolean language sql immutable set search_path = ''
as $$ select s in ('alevel-physics','gcse-physics','gcse-maths','gcse-chemistry','alevel-chemistry','alevel-maths','gcse-biology','alevel-biology','gcse-combined','alevel-psychology','alevel-sociology'); $$;
