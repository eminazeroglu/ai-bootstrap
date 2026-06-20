// Bundle definitions — maps bundle name → list of skills/agents to install
// Expanded as more skills/agents are added (Mərhələ C-5+)

export const SKILL_BUNDLES: Record<string, string[]> = {
  foundation: [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
    'code-reviewer',
    'security-auditor',
    'simplify',
    'verify',
    'refactor',
  ],
  developer: [
    'learning-keeper',
    'architect',
    'doc-writer',
    'test-writer',
    'code-reviewer',
    'security-auditor',
    'simplify',
    'verify',
    'refactor',
    // C-7+: debugger, performance-profiler, devops-engineer
  ],
  marketer: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    // C-6+: seo-optimizer, aeo-specialist, copywriter-pro, email-sequence-builder, etc.
  ],
  creator: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    // C-6+: showrunner, screenwriter, character-designer, image-prompt-engineer, etc.
  ],
  founder: [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
    'code-reviewer',
    'security-auditor',
    'simplify',
    'verify',
    'refactor',
    // C-7+: business-coach, growth-coach, ui-ux-pro-max, etc.
  ],
  'full-stack': [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
    'code-reviewer',
    'security-auditor',
    'simplify',
    'verify',
    'refactor',
    // C-7+: ALL skills (~85)
  ],
};

export const AGENT_BUNDLES: Record<string, string[]> = {
  foundation: [
    'code-reviewer',
    // C-6+: researcher (deep-research as agent)
  ],
  developer: [
    'code-reviewer',
    // C-6+: code-explorer, code-architect, stack-tester, db-migrator,
    //       security-auditor, performance-profiler, refactor-planner, debugger
  ],
  marketer: [
    // C-6+: 18 SEO sub-agents, content-marketer, social-media-manager, etc.
  ],
  creator: [
    // C-6+: video-pipeline, storyboard-orchestrator, publishing-orchestrator
  ],
  founder: [
    'code-reviewer',
    // C-6+: All C-Level advisors (10), business-analyst, etc.
  ],
  'full-stack': [
    'code-reviewer',
    // C-6+: ALL ~75 agents
  ],
};

export interface InstallPlan {
  skills: string[];
  agents: string[];
}

export function resolvePlan(
  skillBundle: string,
  agentBundle: string,
): InstallPlan {
  return {
    skills: SKILL_BUNDLES[skillBundle] ?? SKILL_BUNDLES.foundation,
    agents: AGENT_BUNDLES[agentBundle] ?? AGENT_BUNDLES.foundation,
  };
}
