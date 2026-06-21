#!/usr/bin/env bash
set -euo pipefail

if ! command -v npm >/dev/null 2>&1; then
  echo "Missing required command: npm" >&2
  exit 1
fi

cd frontend

if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

npm run typecheck
npm run smoke
npm run build

echo "Frontend build completed at frontend/dist"
