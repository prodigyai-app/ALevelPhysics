-- The validation function uses only its argument and literal course IDs.
alter function public.valid_site(text) set search_path = '';
