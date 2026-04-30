#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ID="${PROJECT_ID:-mid-wifi}"
SERVICE_NAME="${SERVICE_NAME:-midwifery-backend}"
REGION="${REGION:-us-central1}"
IMAGE="gcr.io/$PROJECT_ID/$SERVICE_NAME"

if [ -z "${MONGODB_URI:-}" ] || [ -z "${SESSION_SECRET:-}" ]; then
  echo "Error: MONGODB_URI and SESSION_SECRET must be set in the environment."
  exit 1
fi

cd "$ROOT_DIR/server"

echo "Building backend container image..."
gcloud builds submit --tag "$IMAGE" .

echo "Deploying backend to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "MONGODB_URI=$MONGODB_URI,SESSION_SECRET=$SESSION_SECRET,CLIENT_URL=${CLIENT_URL:-https://mid-wifi.web.app}"

echo "Backend deployment complete."
