# Work4U - technical delivery and installation

This repository contains the Work4U source code and AWS deployment assets.
It is intended for a technical team that needs to install the system in a clean
AWS account, preferably AWS Learner Lab.

The recommended installation path uses AWS CloudShell inside the AWS Console.
That means the reviewer does not need to install AWS CLI or AWS SAM CLI on a
personal computer.

## What is included

- `backend/` - Python AWS Lambda source code.
- `frontend/` - React + Vite + TypeScript web application.
- `infrastructure/template.yaml` - AWS SAM/CloudFormation IaC template for AWS Learner Lab.
- `infrastructure/template-prod.yaml` - production-style SAM template that creates its own IAM policies.
- `openapi/work4u-api.openapi.yaml` - API Gateway/OpenAPI contract.
- `scripts/` - installation, build, seed, cleanup, and packaging scripts.
- `docs/aws-installation-guide.md` - detailed AWS installation guide in Hebrew.
- `docs/developer-maintenance.md` - developer maintenance guide and API interface documentation.
- `docs/repository-access.md` - repository URL and access note.
- User and admin manuals:
  - `docs/Work4U_מדריך_למשתמש (1).docx`
  - `docs/Work4U_מדריך_מנהל.docx`

## Fast installation path with AWS CloudShell

Open AWS Learner Lab, start the lab, open the AWS Console, and launch
AWS CloudShell. Upload and unzip the delivery ZIP, or clone the repository if
you have read access. Then run the commands from the repository root inside
CloudShell.

If you use the ZIP delivery:

```bash
unzip Work4U-source-delivery.zip
cd Work4U-source-delivery
```

If you use Git:

```bash
git clone https://github.com/noamglikman/work4u.git
cd work4u
```

```bash
aws sts get-caller-identity
bash scripts/deploy-backend.sh
bash scripts/write-frontend-env.sh
bash scripts/seed-data.sh
bash scripts/build-frontend.sh
```

After that, the production frontend build is in:

```text
frontend/dist/
```

For a full explanation, CloudShell flow, AWS Learner Lab notes, admin-user setup,
verification steps, maintenance, and cleanup, read:

```text
docs/aws-installation-guide.md
```

## Build the delivery ZIP

```bash
bash scripts/package-release.sh
```

The ZIP is created under:

```text
dist/Work4U-source-delivery.zip
```

The packaging script intentionally excludes heavy or local-only folders such as
`.git`, `.vscode`, `node_modules`, `.aws-sam`, `dist`, and operating-system
metadata files.

## Repository

Source repository:

```text
https://github.com/noamglikman/work4u.git
```

Make sure the customer or examiner receives read access before delivery.
