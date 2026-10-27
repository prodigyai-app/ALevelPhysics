# Revision build runtime

For Node.js, npm or npx work in this workspace, use the patched runtime launcher:

`platform/scripts/use-patched-node.ps1 node <arguments>`

Replace `node` with `npm` or `npx` as needed. The launcher uses verified Node 24.22.1 and sets PATH for child tools. The shell may inject an older bundled Node; do not use that runtime for builds or network tools. Minimum patched release lines: 22.23.4, 24.22.1, 26.12.1.
