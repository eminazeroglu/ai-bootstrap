// Preset definitions — v0.6.0 architecture
//
// A preset = full project starter:
//   - Skills to install (project scope)
//   - Agents to install (project scope)
//   - MCPs to suggest (user scope; user may already have them)
//   - Folder structure to scaffold
//   - CLAUDE.md template
//   - Wizard questions specific to this preset
//
// Presets REPLACE the bundle abstraction in user-facing CLI.
// Bundles still exist internally (resolvePlan) for sharing skill lists.

export type PresetId = 'saas-development' | 'social-page' | 'ai-studio';

export interface PresetDefinition {
  id: PresetId;
  label: string;
  description: string;
  skills: string[];
  agents: string[];
  mcps: string[];
}

// ════════════════════════════════════════════════════════════
//  SaaS Development — full-stack SaaS startup
// ════════════════════════════════════════════════════════════

export const SAAS_DEVELOPMENT: PresetDefinition = {
  id: 'saas-development',
  label: 'SaaS Development',
  description: 'Fullstack SaaS (web + mobile + API + DB). Backend/frontend/devops + product + marketing + scale C-Level.',
  skills: [
    // Engineering core
    'architect', 'code-reviewer', 'doc-writer', 'test-writer', 'refactor',
    'simplify', 'verify', 'security-auditor',
    // Advanced engineering
    'rag-architect', 'ci-cd-builder', 'mcp-server-builder', 'migration-architect',
    'incident-commander', 'chaos-engineer', 'kubernetes-operator',
    // Dev specialists (v0.6.0 new)
    'frontend-developer', 'backend-developer', 'devops-developer', 'mobile-developer',
    // Product / UX
    'product-manager', 'ux-researcher', 'ui-ux-pro-max', 'landing-page-builder',
    'accessibility-auditor', 'analytics-expert', 'experiment-designer',
    // Brand for landing
    'brand-identity-designer', 'brand-kit-builder', 'logo-designer',
    'color-palette-builder', 'typography-system-designer',
    'copywriter-pro', 'conversion-optimizer',
    // Marketing & growth
    'seo-optimizer', 'aeo-specialist', 'email-sequence-builder', 'growth-strategist',
    'content-strategist', 'paid-ads-strategist',
    // Distribution
    'linkedin-expert',
    // Docs / Knowledge
    'knowledge-base-builder',
    // I18n
    'multilingual-copywriter', 'multilingual-content', 'cultural-translator',
    // Operations
    'process-mapper', 'decision-maker', 'meeting-notes', 'inbox-triage',
    // Strategic C-Level
    'cto-advisor', 'cfo-advisor', 'cmo-advisor', 'cro-advisor', 'coo-advisor',
    'ciso-advisor', 'gc-advisor', 'chro-advisor', 'founder-mode',
    // Finance / coaching
    'finance-analyst', 'business-coach',
  ],
  agents: [
    // Engineering
    'code-architect', 'code-explorer', 'backend-engineer', 'frontend-engineer',
    'devops-engineer', 'db-migrator', 'data-engineer', 'ai-ml-engineer',
    // Quality
    'code-reviewer', 'security-auditor', 'qa-reviewer', 'stack-tester',
    'performance-profiler',
    // Planning
    'refactor-planner', 'debugger', 'decision-recorder',
    // Marketing
    'email-marketer', 'content-marketer', 'growth-hacker', 'competitive-intel',
    'market-researcher',
    // SEO suite
    'seo-technical', 'seo-content', 'seo-schema', 'seo-aeo', 'seo-local',
    'seo-backlinks', 'seo-ecommerce', 'seo-international', 'seo-spa',
    'seo-semantic', 'seo-drift', 'seo-google-api', 'seo-brief', 'seo-programmatic',
    'seo-competitor', 'seo-sxo', 'seo-image', 'seo-maps',
    // Business
    'business-analyst', 'analyst-agent', 'launch-orchestrator',
    // Strategic
    'cfo-agent', 'cmo-agent', 'ciso-agent', 'gc-agent', 'cto-agent',
    'product-manager-agent', 'product-strategist-agent', 'ux-researcher-agent',
    'designer-agent',
  ],
  mcps: [
    'github', 'postgres', 'supabase', 'vercel', 'sentry', 'stripe', 'linear',
    'notion', 'openai', 'anthropic', 'brave-search', 'posthog', 'ga4', 'figma',
    'playwright', 'browserbase', 'hubspot', 'atlassian', 'slack', 'discord',
    'elevenlabs', 'perplexity',
  ],
};

// ════════════════════════════════════════════════════════════
//  Social Page — personal social brand workflow
// ════════════════════════════════════════════════════════════

export const SOCIAL_PAGE: PresetDefinition = {
  id: 'social-page',
  label: 'Social Page',
  description: 'Sosial brand idarəsi (Instagram/TikTok/YouTube/LinkedIn). Gündəlik kontent yaratma + strateji + analitika.',
  skills: [
    // Brand strategy
    'brand-identity-designer', 'brand-kit-builder', 'logo-designer',
    'color-palette-builder', 'typography-system-designer',
    // Creator craft
    'showrunner', 'screenwriter', 'character-designer', 'location-designer',
    'director', 'storyboard-builder', 'image-prompt-engineer', 'image-validator',
    'video-prompt-engineer', 'composer', 'lyricist', 'suno-prompt-engineer',
    'elevenlabs', 'youtube-thumbnail-designer',
    // Film production (v0.6.0 new)
    'editor', 'colorist', 'art-director', 'cinematographer',
    // Copy + language
    'copywriter-pro', 'multilingual-copywriter', 'multilingual-content',
    'cultural-translator',
    // Platform expertise
    'instagram-expert', 'tiktok-expert', 'youtube-expert', 'linkedin-expert',
    'social-strategist', 'cross-platform-strategist', 'community-manager',
    // Marketing & growth
    'seo-optimizer', 'aeo-specialist', 'content-strategist', 'growth-strategist',
    'conversion-optimizer', 'paid-ads-strategist', 'email-sequence-builder',
    // Operations
    'analytics-expert', 'decision-maker', 'meeting-notes', 'inbox-triage',
    'learning-keeper',
    // Creator wellbeing
    'psychologist', 'life-coach', 'growth-coach', 'journal-keeper',
    // Strategic monetization
    'cmo-advisor', 'founder-mode',
  ],
  agents: [
    // Content orchestrators
    'storyboard-orchestrator', 'research-orchestrator',
    'content-calendar-orchestrator', 'sound-designer', 'video-pipeline',
    'publishing-orchestrator',
    // Platform orchestrators
    'instagram-orchestrator', 'tiktok-orchestrator', 'youtube-orchestrator',
    'linkedin-orchestrator', 'twitter-orchestrator',
    // Marketing
    'content-marketer', 'social-media-manager', 'email-marketer',
    'growth-hacker', 'competitive-intel', 'market-researcher',
    // Design
    'designer-agent',
    // Analytics
    'analyst-agent', 'business-analyst',
    // Research
    'researcher',
    // Strategic
    'cmo-agent',
  ],
  mcps: [
    // Social platforms
    'instagram', 'tiktok', 'youtube', 'linkedin', 'twitter', 'meta',
    // Audio
    'elevenlabs', 'spotify',
    // Visual
    'figma',
    // Research
    'youtube-transcript', 'perplexity', 'brave-search', 'firecrawl', 'tavily',
    // Productivity
    'notion', 'airtable',
    // AI gen
    'openai', 'replicate', 'anthropic',
    // Comms
    'telegram',
  ],
};

// ════════════════════════════════════════════════════════════
//  AI Studio — AI content production studio (client work / personal)
// ════════════════════════════════════════════════════════════

export const AI_STUDIO: PresetDefinition = {
  id: 'ai-studio',
  label: 'AI Studio',
  description: 'AI ilə video / şəkil / musiqi production studio. Müştəri sifarişləri + şəxsi eksperimentlər. Sosial nəşr yoxdur.',
  skills: [
    // Creator craft
    'showrunner', 'screenwriter', 'character-designer', 'location-designer',
    'director', 'storyboard-builder', 'image-prompt-engineer', 'image-validator',
    'video-prompt-engineer', 'composer', 'lyricist', 'suno-prompt-engineer',
    'elevenlabs', 'youtube-thumbnail-designer',
    // Film production (v0.6.0 new)
    'editor', 'colorist', 'art-director', 'cinematographer',
    // Brand (client work)
    'brand-identity-designer', 'brand-kit-builder', 'logo-designer',
    'color-palette-builder', 'typography-system-designer',
    // Copy
    'copywriter-pro', 'multilingual-copywriter', 'multilingual-content',
    'cultural-translator',
    // Operations
    'analytics-expert', 'decision-maker', 'meeting-notes', 'learning-keeper',
    'journal-keeper', 'growth-coach',
    // Business (client management)
    'business-coach', 'finance-analyst', 'cmo-advisor',
  ],
  agents: [
    // Content orchestrators
    'storyboard-orchestrator', 'research-orchestrator', 'sound-designer',
    'video-pipeline',
    // Design
    'designer-agent',
    // Research
    'researcher',
    // Marketing (studio self-promotion)
    'content-marketer', 'market-researcher', 'competitive-intel',
    // Analytics
    'analyst-agent', 'business-analyst',
  ],
  mcps: [
    // Audio
    'elevenlabs', 'spotify',
    // Visual
    'figma', 'replicate', 'youtube-transcript',
    // AI
    'openai', 'anthropic', 'perplexity',
    // Research
    'brave-search', 'firecrawl', 'tavily',
    // Productivity
    'notion', 'airtable',
    // Client comms
    'telegram', 'slack',
  ],
};

// ════════════════════════════════════════════════════════════
//  Public catalog
// ════════════════════════════════════════════════════════════

export const PRESETS: Record<PresetId, PresetDefinition> = {
  'saas-development': SAAS_DEVELOPMENT,
  'social-page': SOCIAL_PAGE,
  'ai-studio': AI_STUDIO,
};

export function getPreset(id: PresetId): PresetDefinition {
  return PRESETS[id];
}

export function listPresets(): PresetDefinition[] {
  return Object.values(PRESETS);
}
