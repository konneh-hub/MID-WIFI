#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ID="${PROJECT_ID:-mid-wifi}"

echo "Building React frontend..."
cd "$ROOT_DIR/client"
npm install
npm run build

echo "Deploying Firebase hosting..."
cd "$ROOT_DIR"
firebase deploy --only hosting --project "$PROJECT_ID"

echo "Frontend deployment complete."
