#!/usr/bin/env bash
set -euo pipefail

REGION="${AWS_REGION:-${REGION:-us-east-1}}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Missing required command: python3" >&2
  exit 1
fi

if ! command -v aws >/dev/null 2>&1; then
  echo "Missing required command: aws" >&2
  exit 1
fi

echo "Checking AWS identity..."
aws sts get-caller-identity --region "$REGION" >/dev/null

echo "Seeding Work4U venues in region $REGION..."
AWS_REGION="$REGION" python3 scripts/seed_known_workspaces.py

echo "Seed completed."
