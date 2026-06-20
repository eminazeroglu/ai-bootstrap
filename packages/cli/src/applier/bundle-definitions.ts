// Bundle definitions — maps bundle name → list of skills/agents to install
// Expanded as more skills/agents are added (Mərhələ C-7+)

const FOUNDATION_CORE = [
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
];

const PRODUCT_UX = [
  'product-manager',
  'ux-researcher',
  'landing-page-builder',
  'accessibility-auditor',
];

const MARKETING = [
  'seo-optimizer',
  'aeo-specialist',
  'copywriter-pro',
  'email-sequence-builder',
  'growth-strategist',
];

const SOCIAL = [
  'instagram-expert',
  'tiktok-expert',
  'youtube-expert',
  'linkedin-expert',
];

export const SKILL_BUNDLES: Record<string, string[]> = {
  foundation: [...FOUNDATION_CORE],
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
  ],
  marketer: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    ...MARKETING,
    ...SOCIAL,
    'product-manager',
    'landing-page-builder',
  ],
  creator: [
    'learning-keeper',
    'multilingual-copywriter',
    'doc-writer',
    ...SOCIAL,
    'copywriter-pro',
    'growth-strategist',
    // C-8+: showrunner, screenwriter, character-designer, image-prompt-engineer, etc.
  ],
  founder: [
    ...FOUNDATION_CORE,
    ...PRODUCT_UX,
    ...MARKETING,
    ...SOCIAL,
  ],
  'full-stack': [
    ...FOUNDATION_CORE,
    ...PRODUCT_UX,
    ...MARKETING,
    ...SOCIAL,
    // C-8+: creator suite, design, coaching, advanced eng (~60 more)
  ],
};

export const AGENT_BUNDLES: Record<string, string[]> = {
  foundation: ['code-reviewer'],
  developer: ['code-reviewer'],
  marketer: [],
  creator: [],
  founder: ['code-reviewer'],
  'full-stack': ['code-reviewer'],
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
