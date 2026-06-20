// Bundle definitions — maps bundle name → list of skills/agents to install

const FOUNDATION_CORE = [
  'learning-keeper', 'multilingual-copywriter', 'architect', 'doc-writer', 'test-writer',
  'code-reviewer', 'security-auditor', 'simplify', 'verify', 'refactor',
];

const PRODUCT_UX_FULL = [
  'product-manager', 'ux-researcher', 'landing-page-builder', 'accessibility-auditor',
  'experiment-designer', 'analytics-expert', 'ui-ux-pro-max',
];

const MARKETING_FULL = [
  'seo-optimizer', 'aeo-specialist', 'copywriter-pro', 'email-sequence-builder', 'growth-strategist',
  'content-strategist', 'conversion-optimizer', 'paid-ads-strategist',
];

const SOCIAL_FULL = [
  'instagram-expert', 'tiktok-expert', 'youtube-expert', 'linkedin-expert', 'social-strategist',
  'cross-platform-strategist', 'community-manager',
];

const CREATOR_SUITE = [
  'showrunner', 'screenwriter', 'character-designer', 'location-designer', 'director',
  'storyboard-builder', 'image-prompt-engineer', 'image-validator', 'video-prompt-engineer',
  'composer', 'lyricist', 'suno-prompt-engineer', 'elevenlabs', 'youtube-thumbnail-designer',
];

const GRAPHIC_DESIGN = [
  'brand-identity-designer', 'logo-designer', 'color-palette-builder',
  'typography-system-designer', 'brand-kit-builder',
];

const COACHING = ['business-coach', 'growth-coach', 'life-coach', 'psychologist', 'journal-keeper'];
const PRODUCTIVITY_FULL = ['inbox-triage', 'meeting-notes', 'decision-maker', 'knowledge-base-builder', 'process-mapper'];
const ADVANCED_ENG = ['rag-architect', 'mcp-server-builder', 'ci-cd-builder', 'kubernetes-operator', 'incident-commander', 'chaos-engineer', 'migration-architect'];
const C_LEVEL = ['ceo-advisor', 'cto-advisor', 'cfo-advisor', 'cmo-advisor', 'cro-advisor', 'coo-advisor', 'chro-advisor', 'ciso-advisor', 'gc-advisor', 'founder-mode'];
const VERTICAL = ['legal-researcher', 'healthcare-compliance', 'finance-analyst', 'e-commerce-optimizer', 'real-estate-analyzer'];
const MULTILINGUAL = ['cultural-translator', 'multilingual-content'];

export const SKILL_BUNDLES: Record<string, string[]> = {
  foundation: [...FOUNDATION_CORE],
  developer: ['learning-keeper', 'architect', 'doc-writer', 'test-writer', 'code-reviewer', 'security-auditor', 'simplify', 'verify', 'refactor', ...ADVANCED_ENG, 'cto-advisor'],
  marketer: ['learning-keeper', 'multilingual-copywriter', 'doc-writer', ...MARKETING_FULL, ...SOCIAL_FULL, 'product-manager', 'landing-page-builder'],
  creator: ['learning-keeper', 'multilingual-copywriter', 'doc-writer', ...SOCIAL_FULL, ...CREATOR_SUITE, 'copywriter-pro', 'growth-strategist', 'brand-identity-designer'],
  founder: [...FOUNDATION_CORE, ...PRODUCT_UX_FULL, ...MARKETING_FULL, ...SOCIAL_FULL, ...COACHING, ...PRODUCTIVITY_FULL, ...C_LEVEL].filter((v, i, a) => a.indexOf(v) === i),
  'full-stack': [...FOUNDATION_CORE, ...PRODUCT_UX_FULL, ...MARKETING_FULL, ...SOCIAL_FULL, ...CREATOR_SUITE, ...GRAPHIC_DESIGN, ...COACHING, ...PRODUCTIVITY_FULL, ...ADVANCED_ENG, ...C_LEVEL, ...VERTICAL, ...MULTILINGUAL].filter((v, i, a) => a.indexOf(v) === i),
};

// ════ AGENTS ════

const FOUNDATION_AGENTS = ['code-reviewer', 'researcher'];

const ENGINEERING_AGENTS = [
  'code-explorer', 'code-architect', 'security-auditor', 'performance-profiler',
  'refactor-planner', 'debugger', 'devops-engineer', 'backend-engineer', 'frontend-engineer',
  'data-engineer', 'ai-ml-engineer', 'stack-tester', 'db-migrator', 'qa-reviewer',
];

const SEO_AGENTS = [
  'seo-technical', 'seo-content', 'seo-schema', 'seo-aeo', 'seo-local', 'seo-maps',
  'seo-backlinks', 'seo-ecommerce', 'seo-international', 'seo-spa', 'seo-semantic',
  'seo-drift', 'seo-google-api', 'seo-brief', 'seo-programmatic', 'seo-competitor',
  'seo-sxo', 'seo-image',
];

const MARKETING_AGENTS = [
  'content-marketer', 'social-media-manager', 'email-marketer', 'growth-hacker',
  'competitive-intel', 'market-researcher',
];

const SOCIAL_PLATFORM_AGENTS = [
  'instagram-orchestrator', 'tiktok-orchestrator', 'youtube-orchestrator',
  'linkedin-orchestrator', 'twitter-orchestrator',
];

const CREATOR_AGENTS = [
  'video-pipeline', 'publishing-orchestrator', 'storyboard-orchestrator',
  'research-orchestrator', 'content-calendar-orchestrator', 'sound-designer',
];

const PRODUCT_AGENTS = [
  'product-manager-agent', 'ux-researcher-agent', 'product-strategist-agent',
  'designer-agent', 'analyst-agent',
];

const C_LEVEL_AGENTS = [
  'ceo-agent', 'cto-agent', 'cfo-agent', 'cmo-agent', 'cro-agent',
  'coo-agent', 'chro-agent', 'ciso-agent', 'gc-agent', 'founder-mode-agent',
];

const VERTICAL_AGENTS = [
  'legal-researcher-agent', 'healthcare-compliance-agent', 'finance-analyst-agent',
  'education-curriculum', 'ecommerce-optimizer-agent', 'real-estate-agent',
  'gaming-balance-agent', 'fintech-compliance',
];

const BUSINESS_AGENTS = ['launch-orchestrator', 'business-analyst', 'decision-recorder'];

export const AGENT_BUNDLES: Record<string, string[]> = {
  foundation: [...FOUNDATION_AGENTS],
  developer: [...FOUNDATION_AGENTS, ...ENGINEERING_AGENTS],
  marketer: [...FOUNDATION_AGENTS, ...SEO_AGENTS, ...MARKETING_AGENTS, ...SOCIAL_PLATFORM_AGENTS, ...BUSINESS_AGENTS],
  creator: [...FOUNDATION_AGENTS, ...CREATOR_AGENTS, ...SOCIAL_PLATFORM_AGENTS],
  founder: [...FOUNDATION_AGENTS, ...ENGINEERING_AGENTS, ...PRODUCT_AGENTS, ...C_LEVEL_AGENTS, ...BUSINESS_AGENTS],
  'full-stack': [
    ...FOUNDATION_AGENTS, ...ENGINEERING_AGENTS, ...SEO_AGENTS,
    ...MARKETING_AGENTS, ...SOCIAL_PLATFORM_AGENTS, ...CREATOR_AGENTS,
    ...PRODUCT_AGENTS, ...C_LEVEL_AGENTS, ...VERTICAL_AGENTS, ...BUSINESS_AGENTS,
  ].filter((v, i, a) => a.indexOf(v) === i),
};

export interface InstallPlan {
  skills: string[];
  agents: string[];
}

export function resolvePlan(skillBundle: string, agentBundle: string): InstallPlan {
  return {
    skills: SKILL_BUNDLES[skillBundle] ?? SKILL_BUNDLES.foundation,
    agents: AGENT_BUNDLES[agentBundle] ?? AGENT_BUNDLES.foundation,
  };
}
