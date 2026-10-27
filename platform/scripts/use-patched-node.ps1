param(
    [ValidateSet('node', 'npm', 'npx')]
    [string]$Tool = 'node'
)

$ErrorActionPreference = 'Stop'
$taskToolArguments = @($args)
$taskNodeDirectory = Join-Path $env:LOCALAPPDATA 'Programs\ProdigyNode\node-v24.22.1-win-x64'
$taskNodeExecutable = Join-Path $taskNodeDirectory 'node.exe'
if (-not (Test-Path -LiteralPath $taskNodeExecutable)) {
    throw 'Install the verified official Node 24.22.1 runtime in LOCALAPPDATA\Programs\ProdigyNode first.'
}
$taskNodeVersion = & $taskNodeExecutable --version
if ($taskNodeVersion -ne 'v24.22.1') {
    throw "Unexpected project Node runtime: $taskNodeVersion"
}

# Child build tools inherit the patched runtime, even if the parent shell injects another Node.
$env:Path = $taskNodeDirectory + [IO.Path]::PathSeparator + $env:Path
$taskCommand = if ($Tool -eq 'node') { $taskNodeExecutable } else { Join-Path $taskNodeDirectory ($Tool + '.cmd') }
& $taskCommand @taskToolArguments
exit $LASTEXITCODE
