Param(
  [string]$ProjectId = 'mid-wifi',
  [string]$ServiceName = 'midwifery-backend',
  [string]$Region = 'us-central1'
)

$RootDir = Split-Path -Path $MyInvocation.MyCommand.Path -Parent

if (-not $env:MONGODB_URI -or -not $env:SESSION_SECRET) {
  Write-Error 'MONGODB_URI and SESSION_SECRET must be set in the environment.'
  exit 1
}

Set-Location "$RootDir\server"

Write-Host 'Building backend container image...'
gcloud builds submit --tag "gcr.io/$ProjectId/$ServiceName" .

$ClientUrl = if ($env:CLIENT_URL) { $env:CLIENT_URL } else { 'https://mid-wifi.web.app' }

Write-Host 'Deploying backend to Cloud Run...'
gcloud run deploy $ServiceName `
  --image "gcr.io/$ProjectId/$ServiceName" `
  --region $Region `
  --platform managed `
  --allow-unauthenticated `
  --set-env-vars "MONGODB_URI=$env:MONGODB_URI,SESSION_SECRET=$env:SESSION_SECRET,CLIENT_URL=$ClientUrl"

Write-Host 'Backend deployment complete.'
