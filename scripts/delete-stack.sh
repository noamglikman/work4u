#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-work4u}"
REGION="${AWS_REGION:-${REGION:-us-east-1}}"

echo "Deleting CloudFormation stack '$STACK_NAME' in region '$REGION'..."
aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION"
echo "Stack deleted."
