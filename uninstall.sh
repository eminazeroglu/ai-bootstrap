#!/usr/bin/env bash
# ai-bootstrap uninstall script
# Removes ai-bootstrap symlinks from ~/.claude/ and restores latest backup (if exists)
# Usage: ./uninstall.sh

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

CLAUDE_DIR="$HOME/.claude"

echo ""
echo -e "${BOLD}🧠 ai-bootstrap uninstaller${NC}"
echo ""

# Confirmation
read -p "$(echo -e "${YELLOW}Bütün ai-bootstrap symlink-ləri ~/.claude/-dən silinəcək. Davam edək? [y/N]: ${NC}")" -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Ləğv edildi."
  exit 0
fi

# Find latest backup
LATEST_BACKUP=$(ls -1dt "$HOME"/.claude.bak.* 2>/dev/null | head -n 1 || true)

if [ -d "$CLAUDE_DIR" ]; then
  # Pre-uninstall backup of current state (in case user added stuff)
  PRE_UNINSTALL_BAK="$HOME/.claude.pre-uninstall.$(date +%Y%m%d-%H%M%S)"
  echo "📁 Cari ~/.claude/ backup edirəm → $PRE_UNINSTALL_BAK"
  mv "$CLAUDE_DIR" "$PRE_UNINSTALL_BAK"
fi

# Restore latest backup if exists
if [ -n "$LATEST_BACKUP" ] && [ -d "$LATEST_BACKUP" ]; then
  echo "♻️  Köhnə backup tapıldı: $LATEST_BACKUP"
  read -p "$(echo -e "${BLUE}Köhnə config-i bərpa edək? [Y/n]: ${NC}")" -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    cp -R "$LATEST_BACKUP" "$CLAUDE_DIR"
    echo -e "${GREEN}✓ Bərpa edildi: $LATEST_BACKUP → $CLAUDE_DIR${NC}"
  else
    echo "Bərpa olmadı. ~/.claude/ indi boşdur."
  fi
else
  echo "Köhnə backup tapılmadı. ~/.claude/ boşdur."
fi

echo ""
echo -e "${GREEN}✓ ai-bootstrap uninstall edildi${NC}"
echo ""
echo "Saxlanılan backup-lar:"
ls -1d "$HOME"/.claude.bak.* "$HOME"/.claude.pre-uninstall.* 2>/dev/null || true
echo ""
