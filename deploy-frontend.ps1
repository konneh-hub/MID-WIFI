Param(
  [string]$ProjectId = 'mid-wifi'
)

$RootDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

Write-Host 'Building React frontend...'
Set-Location "$RootDir\client"
npm install
npm run build

Write-Host 'Deploying Firebase hosting...'
Set-Location $RootDir
firebase deploy --only hosting --project $ProjectId

Write-Host 'Frontend deployment complete.'
