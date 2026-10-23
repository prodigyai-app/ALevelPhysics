# Shared assignments and marking

This is the maintained backend and client source for all twelve Prodigy revision courses. The source lives in the ALevelPhysics repository; `scripts/integrate.py` builds and copies the shared browser assets into every course. Existing accounts, class memberships, progress and deterministic checkers remain in place.

## Teacher and student workflow

Teachers open a lesson or paper and choose **Assign this lesson or paper**, or use **Assignments → New assignment** to choose any subject. Select a class, the whole class or selected students, a due date, optional instructions and the marking mode. There is no time picker. Deadlines run through the selected calendar date in `Europe/London`, including daylight-saving changes.

Assignments shows work across subjects. Teachers can view each pupil's status, answers and marks, edit the due date/instructions, archive assignments, reopen submissions and record reviewed marks. AI suggestions, deterministic marks, self-marks and teacher reviews are labelled separately. The first submitted answers and marks are retained when work is reopened. “First submission” does not claim an invigilated first attempt: the revision materials and self-mark schemes are openly available.

Students open assigned work from their list. Written answers are isolated from independent practice, saved to a signed-in student's assignment and retained locally if a network save fails. A submission requires every required question to have an answer and a completion confirmation. Pages without assessment questions use an explicitly labelled completion confirmation. Submitted answers are locked in the assignment view until reopened. Do not use these practice scores as high-stakes examination outcomes.

Independent practice uses the same optional AI feedback. AI feedback remains provisional. Accepting a suggestion adds it to the practice score; editing the answer invalidates that accepted suggestion. Submitting an assignment records completion immediately and, when a provider is configured, starts marking longer answers in the background. The submission view has a Refresh marks button. Background work is bounded to 110 seconds with three concurrent requests; remaining/failed/visual answers fall back to self-marking or teacher review. Existing self-mark schemes remain available in every mode, including when no key exists, the provider fails, the quota is reached or a graph/diagram needs human checking. A matching final numerical value does not establish method marks.

Psychology Paper 3 assignments retain the chosen option combination. The essay workshop retains its selected topic; GCSE Maths retains its selected tier. Content requirements and mark schemes are snapshotted from the trusted published course catalogue when an assignment is created.

## Activate the shared backend once

Project: **prodigy-learning**, `daeircjyoixeseglhmuh`.

1. Review and run the files in `supabase/migrations/` in timestamp order in the project's SQL Editor. The first adds three tables, indexes and one service-only quota function; the second adds Psychology to the existing site's validation function while preserving all nine previous course IDs; the third pins that function's search path. The deployed structures and function signature were verified in the SQL Editor. The backend expects `auth.users(id uuid)`, `public.classes(id uuid)`, `profiles(id,role,username,display_name)` and `memberships(class_id,user_id)`. Inspect those first if deploying to another project.
2. Deploy the **learning-platform** Edge Function from `supabase/functions/learning-platform/`. Keep **Verify JWT enabled**. A self-contained equivalent for the Dashboard editor is generated at `deploy/learning-platform.ts`; use this complete file rather than copying only `index.ts`.
3. Leave the AI key absent initially. Signed-in assignments should work, while longer answers use existing self-marking.
4. When ready, add **one** provider secret in [Edge Function Secrets](https://supabase.com/dashboard/project/daeircjyoixeseglhmuh/functions/secrets):

   - `OPENAI_API_KEY`: OpenAI API key. Default model: `gpt-4.1-mini`; override with `OPENAI_MODEL`.
   - **or** `ANTHROPIC_API_KEY`: Claude API key. Default model: `claude-haiku-5-5`; override with `ANTHROPIC_MODEL`.

   Add `MARKING_PROVIDER=openai` or `anthropic` to explicitly choose a provider. The default `auto` chooses OpenAI when both keys exist, then Anthropic. It never retries an answer with a different provider after a provider error.

Keys belong only in Supabase server secrets. Never paste them into course config.js, a browser, committed source, this README or an issue. There is deliberately no key-entry form for students or teachers. A new secret is read on subsequent function invocations; no website rebuild is necessary.

The server also needs the standard injected `SUPABASE_URL` plus legacy `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`, or the modern `SUPABASE_PUBLISHABLE_KEYS` / `SUPABASE_SECRET_KEYS` dictionaries. No administrator key is delivered to the client.

The CLI equivalent, after authenticating to the intended project, is `supabase link --project-ref daeircjyoixeseglhmuh`, `supabase db push --linked`, then `supabase functions deploy learning-platform`. Inspect the CLI help for the installed version before use. This project pins Supabase CLI 2.121.0.

## Access and marking safeguards

- All three added tables have RLS enabled and deny direct access to `anon` and `authenticated`. Only the authenticated Edge Function's service role can query/write them. There are no public SECURITY DEFINER functions.
- Every request checks the session with Supabase Auth and reads the trusted profile role. Teacher actions verify ownership of the class or assignment. Recipients must be current members of a teacher-owned class. Students can access only assigned work; independent AI responses are not exposed to class teachers.
- Course/site IDs resolve through a fixed allowlist. The service fetches only the known published assessment catalogues, never a client-supplied URL or mark scheme. Existing assignments preserve their scheme even if course content changes.
- Marking sends the question, scheme and answer to the selected provider, without account IDs, class names, student names or email fields. Student-authored answers could themselves contain personal information; the UI asks students to avoid it. OpenAI requests use `store:false`.
- AI responses must validate against the mark total, criterion count, exact quoted answer evidence and level rubric. Point criteria cannot be counted twice; essays are marked holistically. Visual questions fall back to human marking. No AI result claims teacher verification.
- Evidence quoting instructions require contiguous answer excerpts and zero-based criterion indexes. Differences in whitespace or straight/curly quotation marks are resolved back to the original answer excerpt before validation; changed words, added ellipses and mathematical operators are still rejected. Server diagnostics log only allowlisted provider error codes and validation categories, never API keys, raw provider responses or student answers.
- Default AI caps are **40 requests per user per UTC day** and **1,000 per project per UTC day**, atomically reserved in Postgres. Configure `MARKING_DAILY_USER_LIMIT` and `MARKING_DAILY_GLOBAL_LIMIT` to change them. Cache hits reuse a previous assessment without another provider request. Failed requests count towards the daily allowance; there are no automatic paid retries. Configure the provider account's own spending limit as well.
- Production CORS permits the thirteen subject domains and `prodigyai-app.github.io`. Optional `ALLOW_LOCAL_PREVIEW=true` also permits localhost previews. Authentication and authorisation are still required.
- Submission/review updates use a revision token to reject concurrent overwrites. The first submission is kept separately from later work.

## Build and verify

From this directory, install the pinned dependencies (`pnpm install --frozen-lockfile`). Then:

```text
node --test tests/*.test.mjs
python scripts/integrate.py
node scripts/build-catalogs.cjs
python scripts/build-dashboard-function.py
```

`build-catalogs.cjs` runs only owned local course code with all external resources blocked. It omits repaint work and observers, not curriculum or question registration. Larger science sites can take several minutes under JSDOM. Pass repository names to build selected subjects. Rebuild a course's catalogue whenever its question content changes. The catalogue contains the same public indicative schemes that are already available on the revision pages; it contains no student data.

Run each course's existing tests before publishing. The platform suite tests client assignment/independent workflows, access enforcement, date boundaries, numeric checking, submission/reopening, both provider adapters, no-key/error fallback, schema privileges and concurrent AI quota reservations. Provider tests use mocked responses and no real key or student data. Complete a real provider smoke test with a synthetic answer after configuring a key.

Official references: [Supabase function secrets](https://supabase.com/docs/guides/functions/secrets), [function authentication](https://supabase.com/docs/guides/functions/auth), [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [Claude Messages](https://platform.claude.com/docs/en/api/messages/create).

Sociology (AQA 7192) adds 72 revision lessons, all sixteen two-option Paper 2 combinations and contextualised original papers. Option selections and essay topics are retained in assignment URLs. The Maths graph plotter is a dedicated toolkit lesson; it has no exam mark attached. Course menus are reconciled from the shared subject allowlist by course-links.js.

Every answer field offers an optional local calculator-style Maths keyboard, including dynamically added working steps. Its Unicode powers, roots and fractions remain in saved answers. The same bounded notation converter is included in numerical self-checks, graph expressions and server-side marking. Maintain math-notation.js and its identical normaliseMath export in assessment-core.js together; the keyboard tests assert parity. Ordinary typing remains available. Credentials, class management and teacher feedback fields do not receive a keyboard.

Further Maths (Edexcel 9FM0) adds 74 lessons across Core Pure and all eight optional modules. Route controls validate the ten standard two-option pairs; all modules remain available. Two 75-mark Core Pure revision assessments reuse the lesson bank and eight shorter optional-module assessments explicitly state their actual marks. No unseen-mock claim is made. GCSE Maths adds 20 depth lessons, a 97-statement navigation map and tier-dependent completion recalculation while preserving answers.

Step-by-step Maths working is canonicalised into newline-separated answer text for submission and AI feedback. An empty line array takes precedence over stale legacy text. Editing any working line invalidates an accepted provisional AI mark; assignment line inputs lock after submission and independent working is restored on exit.

AQA A-level PE (`alevel-pe`, ALevelPE) adds the thirteenth course. Its original 105-mark papers and 66 lessons use the same roles, marking fallback and assignment service. The PE allowlist migration preserves all existing course IDs. Shared subject-icons.js updates decorative brand, unit and lesson navigation illustrations without touching teaching diagrams.
