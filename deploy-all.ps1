$RootDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

Write-Host 'Deploying frontend...'
Set-Location $RootDir
.\deploy-frontend.ps1

Write-Host 'Deploying backend...'
.\deploy-backend.ps1

Write-Host 'Full deployment complete.'
