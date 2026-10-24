# Prodigy ALevelPhysics

## Practical labs and saved evidence

`lab-notebook.js` preserves recorded practical evidence and reviews under course-scoped
`learn-<site>-lab-*` keys, which use the existing progress account sync. Apparatus animations
restart after a reload; completed readings, reconstructed graphs, student conclusions and
practical review scores remain. Results can be downloaded as CSV. Teacher student details
show completion, the 2-mark skills check and student-written evaluation. No database schema
or account permissions are changed. Authenticated sync depends on the existing account/backend
configuration; local saving works without signing in.

Biology investigations use simplified teaching models with units, controls, safety guidance,
repeats and uncertainty analysis. They do not replace real practical assessment or certify
the OCR Practical Endorsement. PAG 12 research activities are outside this update.

## Simplified subject layouts (24 October 2026)

The home screen shows unit names, followed by lesson names. Search, the course
selector and the downloadable progress report have been removed. Activity and
answer saving remain unchanged. Practice papers stay in the header; Tools holds
account access, assignments, theme settings and the full lab collection. Sign-in
opens on request rather than interrupting the initial unit chooser.

`simple-layout.js` moves existing lesson nodes into Learn, Practice and Lab tabs
without replacing inputs or changing assessment IDs. Lab appears only when the
lesson has a simulation or practical block. Timed papers remain uninterrupted.
Keyboard users can change tabs with arrows/Home/End. Lesson goals and the original
introduction are available at the end of Learn. `simple-layout.css` supplies the
compact, responsive presentation. The same presentation assets are deployed across all 15 subjects. Maths uses Explore rather than Lab, while KS3 retains its existing slides, definition cards and practice views. Optional subject choices are in Tools; year and tier selectors remain visible.

Validation: `node --test platform/tests/physics-simple-layout.test.mjs` verifies
all published assessment contracts, answer persistence, tab navigation and lab
placement. The shared platform suite also covers existing marking and assignments.

Run `node platform/scripts/audit-simple-layout.cjs` to compare every live lesson and assessment against the existing question catalogue across all subjects.
