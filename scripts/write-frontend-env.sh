#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-work4u}"
REGION="${AWS_REGION:-${REGION:-us-east-1}}"
ENV_FILE="${ENV_FILE:-frontend/.env}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

stack_output() {
  local key="$1"
  aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue | [0]" \
    --output text
}

require_command aws

API_BASE_URL="$(stack_output ApiBaseUrl)"
USER_POOL_ID="$(stack_output UserPoolId)"
USER_POOL_CLIENT_ID="$(stack_output UserPoolClientId)"
S3_BUCKET="$(stack_output VenueImagesBucketName)"

if [[ -z "$API_BASE_URL" || "$API_BASE_URL" == "None" ]]; then
  echo "Could not read ApiBaseUrl from stack '$STACK_NAME'." >&2
  exit 1
fi

cat > "$ENV_FILE" <<EOF_ENV
VITE_USE_MOCK=false
VITE_API_BASE_URL=${API_BASE_URL}
VITE_AWS_REGION=${REGION}
VITE_COGNITO_USER_POOL_ID=${USER_POOL_ID}
VITE_COGNITO_USER_POOL_CLIENT_ID=${USER_POOL_CLIENT_ID}
VITE_S3_BUCKET=${S3_BUCKET}
EOF_ENV

echo "Wrote $ENV_FILE"
