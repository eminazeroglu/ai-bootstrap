#!/usr/bin/env bash
# ai-bootstrap install script
# Sets up ~/.claude/ with universal rules, skills, agents, knowledge
# Usage: ./install.sh

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOME_SRC="$SCRIPT_DIR/home"
CLAUDE_DIR="$HOME/.claude"
BACKUP_DIR="$HOME/.claude.bak.$(date +%Y%m%d-%H%M%S)"

# Banner
echo ""
echo -e "${BOLD}🧠 ai-bootstrap installer${NC}"
echo -e "${BLUE}   Personal AI infrastructure for Claude Code${NC}"
echo ""

# Sanity checks
if [ ! -d "$HOME_SRC" ]; then
  echo -e "${RED}✗ Error: home/ folder not found at $HOME_SRC${NC}"
  echo "  Run install.sh from the ai-bootstrap repo root."
  exit 1
fi

# Step 1: Backup existing ~/.claude/
if [ -d "$CLAUDE_DIR" ]; then
  echo -e "${YELLOW}⚠️  Existing ~/.claude/ found.${NC}"
  echo "    Backing up to: $BACKUP_DIR"
  mv "$CLAUDE_DIR" "$BACKUP_DIR"
  echo -e "${GREEN}✓ Backup complete${NC}"
  echo ""
fi

# Step 2: Create ~/.claude/ with symlinks
echo "📁 Setting up ~/.claude/ ..."
mkdir -p "$CLAUDE_DIR"

# Symlink CLAUDE.md (universal rules)
ln -sf "$HOME_SRC/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
echo "  ✓ CLAUDE.md → $HOME_SRC/CLAUDE.md"

# Symlink knowledge/
ln -sf "$HOME_SRC/knowledge" "$CLAUDE_DIR/knowledge"
echo "  ✓ knowledge/ → $HOME_SRC/knowledge/"

# Symlink skills/ (currently empty, populated by wizard)
ln -sf "$HOME_SRC/skills" "$CLAUDE_DIR/skills"
echo "  ✓ skills/ → $HOME_SRC/skills/"

# Symlink agents/
ln -sf "$HOME_SRC/agents" "$CLAUDE_DIR/agents"
echo "  ✓ agents/ → $HOME_SRC/agents/"

# Symlink hooks/
ln -sf "$HOME_SRC/hooks" "$CLAUDE_DIR/hooks"
echo "  ✓ hooks/ → $HOME_SRC/hooks/"

# Step 3: Copy settings.json (NOT symlink — user will customize)
if [ ! -f "$CLAUDE_DIR/settings.json" ]; then
  cp "$HOME_SRC/settings.json.template" "$CLAUDE_DIR/settings.json"
  echo "  ✓ settings.json (copied from template)"
fi

echo ""

# Step 4: Install ai-bootstrap-managed skills from templates
SKILLS_SRC="$SCRIPT_DIR/packages/templates/skills"
SKILLS_DST="$HOME_SRC/skills"

if [ -d "$SKILLS_SRC" ]; then
  echo "📦 Installing managed skills..."
  for skill_dir in "$SKILLS_SRC"/*/; do
    skill_name=$(basename "$skill_dir")
    if [ ! -e "$SKILLS_DST/$skill_name" ]; then
      ln -sf "$skill_dir" "$SKILLS_DST/$skill_name"
      echo "  ✓ $skill_name"
    fi
  done
fi

echo ""

# Step 5: Print next steps
echo -e "${BOLD}${GREEN}✓ ai-bootstrap installed${NC}"
echo ""
echo "Yoxla quraşdırmanı:"
echo "  ls -la ~/.claude/"
echo "  cat ~/.claude/CLAUDE.md | head -20"
echo ""
echo "Növbəti addım — wizard işə sal:"
echo "  npx ai-bootstrap init"
echo ""
echo "Köhnə config (varsa):"
if [ -d "$BACKUP_DIR" ]; then
  echo "  Backup: $BACKUP_DIR"
fi
echo ""
echo "Geri qaytarmaq üçün:"
echo "  $SCRIPT_DIR/uninstall.sh"
echo ""
