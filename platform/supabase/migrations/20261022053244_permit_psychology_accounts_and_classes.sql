-- Preserve all existing course IDs and permit the new Psychology course.
-- The deployed function's existing argument name is s (verified in the SQL Editor).
create or replace function public.valid_site(s text)
returns boolean language sql immutable
as $$ select s in ('alevel-physics','gcse-physics','gcse-maths','gcse-chemistry','alevel-chemistry','alevel-maths','gcse-biology','alevel-biology','gcse-combined','alevel-psychology'); $$;
