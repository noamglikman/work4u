#!/usr/bin/env bash
set -euo pipefail

PACKAGE_NAME="${PACKAGE_NAME:-Work4U-source-delivery.zip}"
PACKAGE_ROOT="${PACKAGE_ROOT:-Work4U-source-delivery}"
OUT_DIR="${OUT_DIR:-dist}"
STAGE_DIR="${STAGE_DIR:-$OUT_DIR/package-stage}"
OUT_FILE="$OUT_DIR/$PACKAGE_NAME"

if ! command -v zip >/dev/null 2>&1 && ! command -v python3 >/dev/null 2>&1; then
  echo "Missing required command: zip or python3" >&2
  exit 1
fi

rm -rf "$STAGE_DIR"
mkdir -p "$STAGE_DIR/$PACKAGE_ROOT"
mkdir -p "$OUT_DIR"

copy_path() {
  local source="$1"
  local target="$STAGE_DIR/$PACKAGE_ROOT/$source"
  mkdir -p "$(dirname "$target")"
  cp -R "$source" "$target"
}

copy_path "INSTALL.md"
copy_path "README.md"
copy_path "api-contract.md"
copy_path "backend"
copy_path "frontend"
copy_path "infrastructure"
copy_path "openapi"
copy_path "scripts"

mkdir -p "$STAGE_DIR/$PACKAGE_ROOT/docs"
cp "docs/aws-installation-guide.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/"
cp "docs/repository-access.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/"
cp "docs/developer-maintenance.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/"
cp "docs/developer-maintenance-he.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true
cp "docs/CODE_WALKTHROUGH.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true
cp "docs/PROJECT_OVERVIEW.md" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true
cp "docs/Work4U_Technical_System_Documentation.docx" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true
cp "docs/Work4U_מדריך_למשתמש (1).docx" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true
cp "docs/Work4U_מדריך_מנהל.docx" "$STAGE_DIR/$PACKAGE_ROOT/docs/" 2>/dev/null || true

find "$STAGE_DIR/$PACKAGE_ROOT" \
  -name ".git" -o \
  -name ".vscode" -o \
  -name ".idea" -o \
  -name ".DS_Store" -o \
  -name ".env" -o \
  -name "node_modules" -o \
  -name ".aws-sam" -o \
  -name "dist" -o \
  -name "build" -o \
  -name "*.Zone.Identifier" -o \
  -name "~$*" \
  | while read -r unwanted; do
      rm -rf "$unwanted"
    done

rm -f "$OUT_FILE"
if command -v zip >/dev/null 2>&1; then
  (
    cd "$STAGE_DIR"
    zip -qr "../$PACKAGE_NAME" "$PACKAGE_ROOT"
  )
else
  python3 - "$STAGE_DIR" "$PACKAGE_ROOT" "$OUT_FILE" <<'PY'
import os
import sys
import zipfile

stage_dir, package_root, out_file = sys.argv[1:]
root_path = os.path.join(stage_dir, package_root)

with zipfile.ZipFile(out_file, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for current_root, _, files in os.walk(root_path):
        for file_name in files:
            full_path = os.path.join(current_root, file_name)
            relative_path = os.path.relpath(full_path, stage_dir)
            archive.write(full_path, relative_path)
PY
fi

rm -rf "$STAGE_DIR"

echo "Created $OUT_FILE"
