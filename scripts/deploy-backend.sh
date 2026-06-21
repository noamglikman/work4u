#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-work4u}"
REGION="${AWS_REGION:-${REGION:-us-east-1}}"
TEMPLATE="${TEMPLATE:-infrastructure/template.yaml}"
OUTPUT_FILE="${OUTPUT_FILE:-docs/aws-outputs.generated.md}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command aws
require_command sam

echo "Checking AWS identity..."
aws sts get-caller-identity --region "$REGION" >/dev/null

echo "Deploying stack '$STACK_NAME' in region '$REGION' using '$TEMPLATE'..."
sam build --template-file "$TEMPLATE"
sam deploy \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --template-file .aws-sam/build/template.yaml \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
  --resolve-s3 \
  --no-confirm-changeset

echo "Writing CloudFormation outputs to $OUTPUT_FILE..."
mkdir -p "$(dirname "$OUTPUT_FILE")"
{
  echo "# Work4U AWS Outputs"
  echo
  echo "Generated from stack: $STACK_NAME"
  echo "Region: $REGION"
  echo
  echo '```text'
  aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]" \
    --output table
  echo '```'
} > "$OUTPUT_FILE"

echo "Backend deployment completed."
echo "Next: bash scripts/write-frontend-env.sh"
