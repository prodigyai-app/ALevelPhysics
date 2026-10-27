/* Reject runtimes affected by the October 2026 Node/TLS advisories. */
const minimum={22:[23,4],24:[22,1],26:[12,1]};
function patched(version){const [major,minor,patch]=version.replace(/^v/,'').split('.').map(Number),m=minimum[major];return !!m&&(minor>m[0]||(minor===m[0]&&patch>=m[1]));}
function check(){if(!patched(process.versions.node))throw Error('Use patched Node 22.23.4, 24.22.1 or 26.12.1 (or later in those release lines). On Windows run scripts/use-patched-node.ps1. Current: '+process.version);}
module.exports={patched,check};if(require.main===module)check();
