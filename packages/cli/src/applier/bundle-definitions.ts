// Bundle definitions — maps bundle name → list of skills/agents to install

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
  'social-strategist',
];

const CREATOR_SUITE = [
  'showrunner',
  'screenwriter',
  'character-designer',
  'location-designer',
  'director',
  'storyboard-builder',
  'image-prompt-engineer',
  'image-validator',
  'video-prompt-engineer',
  'composer',
  'lyricist',
  'suno-prompt-engineer',
  'elevenlabs',
  'youtube-thumbnail-designer',
];

const GRAPHIC_DESIGN = [
  'brand-identity-designer',
  'logo-designer',
  'color-palette-builder',
  'typography-system-designer',
  'brand-kit-builder',
];

const COACHING = [
  'business-coach',
  'growth-coach',
  'life-coach',
  'psychologist',
  'journal-keeper',
];

const PRODUCTIVITY = [
  'inbox-triage',
  'meeting-notes',
  'decision-maker',
  'knowledge-base-builder',
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
    ...CREATOR_SUITE,
    'copywriter-pro',
    'growth-strategist',
    'brand-identity-designer',
  ],
  founder: [
    ...FOUNDATION_CORE,
    ...PRODUCT_UX,
    ...MARKETING,
    ...SOCIAL,
    ...COACHING,
    ...PRODUCTIVITY,
    'business-coach',
  ].filter((v, i, a) => a.indexOf(v) === i),  // dedupe
  'full-stack': [
    ...FOUNDATION_CORE,
    ...PRODUCT_UX,
    ...MARKETING,
    ...SOCIAL,
    ...CREATOR_SUITE,
    ...GRAPHIC_DESIGN,
    ...COACHING,
    ...PRODUCTIVITY,
  ].filter((v, i, a) => a.indexOf(v) === i),  // dedupe
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
