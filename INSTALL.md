# Work4U - technical installation handoff

This package contains the Work4U source code, AWS infrastructure definition,
installation scripts, API contract, and technical documentation required to
deploy the system in a clean AWS account.

## Delivery contents

- `backend/` - Python AWS Lambda source code.
- `frontend/` - React, Vite, and TypeScript web application.
- `infrastructure/template.yaml` - AWS SAM/CloudFormation template for AWS Learner Lab.
- `infrastructure/template-prod.yaml` - SAM template for a regular AWS account.
- `openapi/work4u-api.openapi.yaml` - API Gateway OpenAPI contract.
- `scripts/` - deployment, build, seed, cleanup, and packaging scripts.
- `docs/aws-installation-guide.md` - full AWS installation procedure.
- `docs/developer-maintenance.md` - developer maintenance and API documentation.
- `docs/repository-access.md` - source repository access details.
- `docs/Work4U_מדריך_למשתמש (1).docx` - end-user manual.
- `docs/Work4U_מדריך_מנהל.docx` - administrator manual.

## AWS CloudShell installation sequence

Run the following commands from the project root inside AWS CloudShell.

If installing from the ZIP delivery:

```bash
unzip Work4U-source-delivery.zip
cd Work4U-source-delivery
```

If installing from Git:

```bash
git clone https://github.com/noamglikman/work4u.git
cd work4u
```

Then run:

```bash
aws sts get-caller-identity
bash scripts/deploy-backend.sh
bash scripts/write-frontend-env.sh
bash scripts/seed-data.sh
bash scripts/build-frontend.sh
```

The frontend production build is created at:

```text
frontend/dist/
```

For the complete deployment procedure, validation checklist, admin setup,
maintenance commands, and cleanup procedure, use:

```text
docs/aws-installation-guide.md
```

## Build delivery ZIP

```bash
bash scripts/package-release.sh
```

Output:

```text
dist/Work4U-source-delivery.zip
```

The packaging script excludes local and heavy development artifacts, including:

```text
.git
.vscode
.idea
node_modules
.aws-sam
dist
build
.env
.DS_Store
*.Zone.Identifier
~$*
```

## Source repository

```text
https://github.com/noamglikman/work4u.git
```

Grant the receiving technical team or examiner read access before delivery.
