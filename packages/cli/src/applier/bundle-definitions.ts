// Bundle definitions — maps bundle name → list of skills/agents to install
// Expanded as more skills/agents are added (Mərhələ C-5+)

export const SKILL_BUNDLES: Record<string, string[]> = {
  foundation: [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
  ],
  developer: [
    'learning-keeper',
    'architect',
    'doc-writer',
    'test-writer',
    // C-5+: code-reviewer, simplify, verify, security-review, refactor, debugger
  ],
  marketer: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    // C-5+: seo-optimizer, aeo-specialist, copywriter-pro, email-sequence-builder, etc.
  ],
  creator: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    // C-5+: showrunner, screenwriter, character-designer, image-prompt-engineer, etc.
  ],
  founder: [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
    // C-5+: business-coach, growth-coach, ui-ux-pro-max, etc.
  ],
  'full-stack': [
    'learning-keeper',
    'multilingual-copywriter',
    'architect',
    'doc-writer',
    'test-writer',
    // C-5+: ALL skills (~85)
  ],
};

export const AGENT_BUNDLES: Record<string, string[]> = {
  foundation: [
    // Built-in: Explore, Plan, general-purpose (no install needed)
    // C-5+: code-reviewer, researcher
  ],
  developer: [
    // C-5+: code-explorer, code-architect, stack-tester, db-migrator,
    //       security-auditor, performance-profiler, refactor-planner, debugger,
    //       backend-engineer, frontend-engineer, qa-reviewer
  ],
  marketer: [
    // C-5+: 18 SEO sub-agents, content-marketer, social-media-manager,
    //       email-marketer, growth-hacker, paid-ads-strategist
  ],
  creator: [
    // C-5+: video-pipeline, storyboard-orchestrator, publishing-orchestrator,
    //       instagram-orchestrator, tiktok-orchestrator, youtube-orchestrator
  ],
  founder: [
    // C-5+: All C-Level advisors (10), business-analyst, growth-strategist,
    //       launch-orchestrator, decision-recorder
  ],
  'full-stack': [
    // C-5+: ALL ~75 agents
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
