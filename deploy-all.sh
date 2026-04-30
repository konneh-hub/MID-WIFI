#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Deploying frontend..."
cd "$ROOT_DIR"
./deploy-frontend.sh

echo "Deploying backend..."
./deploy-backend.sh

echo "Full deployment complete."
