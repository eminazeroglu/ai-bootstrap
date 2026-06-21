// ai-bootstrap help — comprehensive guide.
// `--help` shows brief; `help` shows the full tour.

import chalk from 'chalk';

export function runHelpCommand(): void {
  console.log(`
${chalk.bold.cyan('ai-bootstrap')} ${chalk.dim('— Personal AI infrastructure for Claude Code')}

${chalk.bold('Necə işləyir')}

  ai-bootstrap iki yerdə skill və agent quraşdırır:
    1. ${chalk.cyan('User scope')} (${chalk.dim('~/.claude/skills/')})
       Hər layihədə, hər session-da yüklənir. Universal əsas.
    2. ${chalk.cyan('Project scope')} (${chalk.dim('<layihə>/.claude/skills/')})
       Yalnız o layihədə yüklənir. Layihəyə xas dəst.

  Hər ikisi ${chalk.cyan('pool')}-dan symlink edir:
    ${chalk.dim('~/.claude/skills-pool/')}   ← bütün skill-lər bir dəfə saxlanır (3-4 MB)
    ${chalk.dim('~/.claude/agents-pool/')}   ← bütün agent-lər bir dəfə

  ${chalk.bold('Nəticə:')} ${chalk.green('10 layihə = 1 dəfə disk, 10 layihəyə link')}

${chalk.bold('İlk istifadə (3 addım)')}

  ${chalk.cyan('npm install -g @azerogluemin/ai-bootstrap')}   ${chalk.dim('# qlobal install')}
  ${chalk.cyan('ai-bootstrap')}                                ${chalk.dim('# 3 sual, foundation + free MCPs quraşdırır')}
  ${chalk.cyan('cd ~/Projects/yeni-layihə && ai-bootstrap new')}  ${chalk.dim('# layihə bundle')}

${chalk.bold('Komandalar')}

${chalk.bold.cyan('  Setup')}
    ${chalk.cyan('ai-bootstrap')}                          User-scope setup (3 sual)
    ${chalk.cyan('ai-bootstrap new')}                       Layihə setup (3 sual, multi-bundle)
    ${chalk.cyan('ai-bootstrap update')}                    Yeni versiyaya yenilə (pool sinxron)
    ${chalk.cyan('ai-bootstrap doctor')}                    Sağlamlıq yoxla

${chalk.bold.cyan('  Skill + Agent idarəsi')}
    ${chalk.cyan('ai-bootstrap add')}                       ${chalk.dim('İnteraktiv multi-select siyahı')}
    ${chalk.cyan('ai-bootstrap add <name1> <name2>')}        Konkret skill/agent əlavə
    ${chalk.cyan('ai-bootstrap add --bundle creator')}        Bütün bundle əlavə
    ${chalk.cyan('ai-bootstrap remove <name>')}              Sil (alias: rm)
    ${chalk.cyan('ai-bootstrap list')}                       Bu scope-da quraşdırılanlar
    ${chalk.cyan('ai-bootstrap list --all')}                 User + bu layihə yan-yana

${chalk.bold.cyan('  MCP servers')}
    ${chalk.cyan('ai-bootstrap mcp list')}                  63 mövcud server siyahısı
    ${chalk.cyan('ai-bootstrap mcp add github notion')}      Manual MCP əlavə
    ${chalk.cyan('ai-bootstrap mcp installed')}              Quraşdırılan MCP-lər
    ${chalk.cyan('ai-bootstrap mcp credentials')}            Token-ləri əlavə et

${chalk.bold.cyan('  Backup (opsional)')}
    ${chalk.cyan('ai-bootstrap backup init')}                Git remote bağla
    ${chalk.cyan('ai-bootstrap backup sync')}                Dəyişiklikləri push
    ${chalk.cyan('ai-bootstrap backup pull')}                Yeni maşında bərpa
    ${chalk.cyan('ai-bootstrap backup status')}              Son sinx + remote

${chalk.bold.cyan('  Layihə skan')}
    ${chalk.cyan('ai-bootstrap scan ~/MyJobs')}              Mövcud layihələri tap

${chalk.bold.cyan('  Telemetry (default OFF)')}
    ${chalk.cyan('ai-bootstrap telemetry on/off/status')}    Anonim usage data

${chalk.bold.cyan('  Meta')}
    ${chalk.cyan('ai-bootstrap --version')}                  Versiya
    ${chalk.cyan('ai-bootstrap --help')}                     Qısa kömək
    ${chalk.cyan('ai-bootstrap help')}                       Bu tam kömək

${chalk.bold('Tipik axın')}

  ${chalk.dim('# 1) Maşına bir dəfə:')}
  ${chalk.cyan('npm install -g @azerogluemin/ai-bootstrap')}
  ${chalk.cyan('ai-bootstrap')}                                ${chalk.dim('# foundation + free MCPs')}
  ${chalk.cyan('ai-bootstrap mcp add github instagram brave-search')}
  ${chalk.cyan('ai-bootstrap mcp credentials')}                ${chalk.dim('# token-ləri əlavə')}

  ${chalk.dim('# 2) Yeni AI Creator layihə:')}
  ${chalk.cyan('mkdir -p ~/Projects/ai-content && cd ~/Projects/ai-content')}
  ${chalk.cyan('ai-bootstrap new')}                            ${chalk.dim('# creator bundle seç')}
  ${chalk.cyan('claude')}

  ${chalk.dim('# 3) Yeni SaaS layihə:')}
  ${chalk.cyan('mkdir -p ~/Projects/saas && cd ~/Projects/saas')}
  ${chalk.cyan('ai-bootstrap new')}                            ${chalk.dim('# developer bundle seç')}
  ${chalk.cyan('claude')}

  ${chalk.dim('# 4) Layihənin yarısında əlavə skill lazım oldu:')}
  ${chalk.cyan('cd ~/Projects/saas')}
  ${chalk.cyan('ai-bootstrap add')}                            ${chalk.dim('# interaktiv siyahı, multi-select')}
  ${chalk.cyan('# yaxud')}
  ${chalk.cyan('ai-bootstrap add showrunner image-prompt-engineer')}

${chalk.bold('Ətraflı')}

  Docs:  ${chalk.cyan('https://github.com/eminazeroglu/ai-bootstrap')}
  npm:   ${chalk.cyan('https://www.npmjs.com/package/@azerogluemin/ai-bootstrap')}
  Issue: ${chalk.cyan('https://github.com/eminazeroglu/ai-bootstrap/issues')}
`);
}
