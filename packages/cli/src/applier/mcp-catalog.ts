// MCP catalog — real install commands for each MCP server
// Each entry is either:
//   - local (transport: 'stdio'): runs a command (npx, uvx, docker, etc.)
//   - remote (transport: 'http'): connects to a serverUrl via HTTP/SSE
//
// All package names, command formats, and serverUrls verified against
// official docs or npm/GitHub registries as of 2026-06-20.
// Reference: https://modelcontextprotocol.io/

export type McpCategory =
  | 'dev' | 'data' | 'social' | 'creator' | 'productivity'
  | 'ai' | 'business' | 'analytics' | 'research';

export interface McpCatalogEntry {
  id: string;
  name: string;
  category: McpCategory;
  description: string;
  /** stdio = local subprocess (default). http = remote URL with optional OAuth. */
  transport?: 'stdio' | 'http';
  /** Local: command + args + env. Required when transport='stdio'. */
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  /** Remote: serverUrl. Required when transport='http'. */
  serverUrl?: string;
  /** Remote OAuth (Google Workspace-style servers). */
  oauth?: { clientIdEnv: string; clientSecretEnv: string };
  /** Environment variables the user must supply. */
  credentialKeys: string[];
  credentialHelp?: string;
  /** Attribution: official vendor / community maintainer. */
  source?: string;
}

export const MCP_CATALOG: Record<string, McpCatalogEntry> = {
  // ════ Development ════
  github: {
    id: 'github',
    name: 'GitHub',
    category: 'dev',
    description: 'GitHub API access — repos, issues, PRs, code search',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: { GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_PERSONAL_ACCESS_TOKEN}' },
    credentialKeys: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
    credentialHelp: 'Create at https://github.com/settings/tokens (scopes: repo, read:user)',
  },
  gitlab: {
    id: 'gitlab',
    name: 'GitLab',
    category: 'dev',
    description: 'GitLab API access',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-gitlab'],
    env: { GITLAB_PERSONAL_ACCESS_TOKEN: '${GITLAB_PERSONAL_ACCESS_TOKEN}', GITLAB_API_URL: '${GITLAB_API_URL:-https://gitlab.com/api/v4}' },
    credentialKeys: ['GITLAB_PERSONAL_ACCESS_TOKEN'],
    credentialHelp: 'Create at https://gitlab.com/-/user_settings/personal_access_tokens',
  },
  filesystem: {
    id: 'filesystem',
    name: 'Filesystem',
    category: 'dev',
    description: 'Filesystem access (sandboxed)',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '${ALLOWED_DIRECTORIES}'],
    env: {},
    credentialKeys: [],
  },
  memory: {
    id: 'memory',
    name: 'Memory',
    category: 'productivity',
    description: 'Persistent knowledge graph memory',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-memory'],
    env: {},
    credentialKeys: [],
  },
  git: {
    id: 'git',
    name: 'Git',
    category: 'dev',
    description: 'Git operations (log, blame, diff, search)',
    command: 'uvx',
    args: ['mcp-server-git'],
    env: {},
    credentialKeys: [],
  },
  fetch: {
    id: 'fetch',
    name: 'Fetch',
    category: 'dev',
    description: 'HTTP fetch with markdown conversion',
    command: 'uvx',
    args: ['mcp-server-fetch'],
    env: {},
    credentialKeys: [],
  },
  puppeteer: {
    id: 'puppeteer',
    name: 'Puppeteer',
    category: 'dev',
    description: 'Browser automation via Puppeteer',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    env: {},
    credentialKeys: [],
  },
  playwright: {
    id: 'playwright',
    name: 'Playwright',
    category: 'dev',
    description: 'Browser automation via Playwright (Chromium + Firefox + WebKit)',
    command: 'npx',
    args: ['-y', '@playwright/mcp@latest'],
    env: {},
    credentialKeys: [],
  },

  // ════ Databases ════
  postgres: {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'data',
    description: 'PostgreSQL read/write via connection string',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres', '${POSTGRES_CONNECTION_STRING}'],
    env: {},
    credentialKeys: ['POSTGRES_CONNECTION_STRING'],
    credentialHelp: 'Format: postgresql://user:password@host:port/database',
  },
  supabase: {
    id: 'supabase',
    name: 'Supabase',
    category: 'data',
    description: 'Supabase project management (DB, auth, edge functions)',
    command: 'npx',
    args: ['-y', '@supabase/mcp-server-supabase@latest', '--access-token', '${SUPABASE_ACCESS_TOKEN}'],
    env: {},
    credentialKeys: ['SUPABASE_ACCESS_TOKEN'],
    credentialHelp: 'Create at https://supabase.com/dashboard/account/tokens',
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'data',
    description: 'MongoDB query + Atlas management',
    command: 'npx',
    args: ['-y', 'mongodb-mcp-server', '--connectionString', '${MONGODB_URI}'],
    env: {},
    credentialKeys: ['MONGODB_URI'],
    credentialHelp: 'Format: mongodb+srv://user:pass@cluster.mongodb.net/db',
  },
  sqlite: {
    id: 'sqlite',
    name: 'SQLite',
    category: 'data',
    description: 'SQLite local database',
    command: 'uvx',
    args: ['mcp-server-sqlite', '--db-path', '${SQLITE_DB_PATH}'],
    env: {},
    credentialKeys: ['SQLITE_DB_PATH'],
    credentialHelp: 'Absolute path to .db file',
  },
  redis: {
    id: 'redis',
    name: 'Redis',
    category: 'data',
    description: 'Redis key-value operations',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-redis', '${REDIS_URL}'],
    env: {},
    credentialKeys: ['REDIS_URL'],
    credentialHelp: 'Format: redis://[user:pass@]host:port',
  },

  // ════ Cloud + Deploy ════
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    category: 'dev',
    description: 'Vercel deploy management + project ops',
    command: 'npx',
    args: ['-y', '@vercel/mcp-adapter@latest'],
    env: { VERCEL_TOKEN: '${VERCEL_TOKEN}' },
    credentialKeys: ['VERCEL_TOKEN'],
    credentialHelp: 'Create at https://vercel.com/account/tokens',
  },
  cloudflare: {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'dev',
    description: 'Cloudflare Workers + KV + R2',
    command: 'npx',
    args: ['-y', '@cloudflare/mcp-server-cloudflare', 'run'],
    env: { CLOUDFLARE_API_TOKEN: '${CLOUDFLARE_API_TOKEN}', CLOUDFLARE_ACCOUNT_ID: '${CLOUDFLARE_ACCOUNT_ID}' },
    credentialKeys: ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'],
    credentialHelp: 'Create token at https://dash.cloudflare.com/profile/api-tokens',
  },
  aws: {
    id: 'aws',
    name: 'AWS',
    category: 'dev',
    description: 'AWS services (S3, Lambda, etc.) via boto3',
    command: 'uvx',
    args: ['awslabs.aws-api-mcp-server'],
    env: { AWS_ACCESS_KEY_ID: '${AWS_ACCESS_KEY_ID}', AWS_SECRET_ACCESS_KEY: '${AWS_SECRET_ACCESS_KEY}', AWS_REGION: '${AWS_REGION:-us-east-1}' },
    credentialKeys: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'],
  },
  netlify: {
    id: 'netlify',
    name: 'Netlify',
    category: 'dev',
    description: 'Netlify deploy + site management',
    command: 'npx',
    args: ['-y', '@netlify/mcp@latest'],
    env: { NETLIFY_PERSONAL_ACCESS_TOKEN: '${NETLIFY_PERSONAL_ACCESS_TOKEN}' },
    credentialKeys: ['NETLIFY_PERSONAL_ACCESS_TOKEN'],
  },

  // ════ Payments + Billing ════
  stripe: {
    id: 'stripe',
    name: 'Stripe',
    category: 'business',
    description: 'Stripe payments + customers + subscriptions',
    command: 'npx',
    args: ['-y', '@stripe/mcp', '--tools=all', '--api-key=${STRIPE_API_KEY}'],
    env: {},
    credentialKeys: ['STRIPE_API_KEY'],
    credentialHelp: 'Use restricted key from https://dashboard.stripe.com/apikeys',
  },

  // ════ Productivity ════
  notion: {
    id: 'notion',
    name: 'Notion',
    category: 'productivity',
    description: 'Notion databases + pages + search',
    command: 'npx',
    args: ['-y', '@notionhq/notion-mcp-server'],
    env: { NOTION_API_KEY: '${NOTION_API_KEY}' },
    credentialKeys: ['NOTION_API_KEY'],
    credentialHelp: 'Create at https://www.notion.so/my-integrations',
  },
  linear: {
    id: 'linear',
    name: 'Linear',
    category: 'productivity',
    description: 'Linear issues + projects + cycles',
    command: 'npx',
    args: ['-y', 'mcp-linear'],
    env: { LINEAR_API_KEY: '${LINEAR_API_KEY}' },
    credentialKeys: ['LINEAR_API_KEY'],
    credentialHelp: 'Create at https://linear.app/settings/api',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian',
    category: 'productivity',
    description: 'Obsidian vault read/write via REST API plugin',
    command: 'npx',
    args: ['-y', 'mcp-obsidian'],
    env: { OBSIDIAN_API_KEY: '${OBSIDIAN_API_KEY}', OBSIDIAN_HOST: '${OBSIDIAN_HOST:-127.0.0.1:27124}' },
    credentialKeys: ['OBSIDIAN_API_KEY'],
    credentialHelp: 'Install Local REST API plugin in Obsidian first',
  },
  airtable: {
    id: 'airtable',
    name: 'Airtable',
    category: 'data',
    description: 'Airtable bases + records',
    command: 'npx',
    args: ['-y', 'airtable-mcp-server'],
    env: { AIRTABLE_API_KEY: '${AIRTABLE_API_KEY}' },
    credentialKeys: ['AIRTABLE_API_KEY'],
    credentialHelp: 'Create PAT at https://airtable.com/create/tokens',
  },

  // ════ Communication ════
  slack: {
    id: 'slack',
    name: 'Slack',
    category: 'productivity',
    description: 'Slack channels + messages + users',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    env: { SLACK_BOT_TOKEN: '${SLACK_BOT_TOKEN}', SLACK_TEAM_ID: '${SLACK_TEAM_ID}' },
    credentialKeys: ['SLACK_BOT_TOKEN', 'SLACK_TEAM_ID'],
    credentialHelp: 'Create Slack app at https://api.slack.com/apps',
  },
  discord: {
    id: 'discord',
    name: 'Discord',
    category: 'productivity',
    description: 'Discord channels + DMs + members',
    command: 'npx',
    args: ['-y', '@netixc/mcp-discord'],
    env: { DISCORD_TOKEN: '${DISCORD_TOKEN}' },
    credentialKeys: ['DISCORD_TOKEN'],
    credentialHelp: 'Create bot at https://discord.com/developers/applications',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    category: 'social',
    description: 'Telegram bot send/receive + channels',
    command: 'npx',
    args: ['-y', '@chaindead/telegram-mcp'],
    env: { TG_APP_ID: '${TG_APP_ID}', TG_API_HASH: '${TG_API_HASH}' },
    credentialKeys: ['TG_APP_ID', 'TG_API_HASH'],
    credentialHelp: 'Create app at https://my.telegram.org/apps',
  },

  // ════ Social media ════
  instagram: {
    id: 'instagram',
    name: 'Instagram (Graph API)',
    category: 'social',
    description: 'Instagram Business — media, comments, DMs, insights',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-instagram'],
    env: { INSTAGRAM_ACCESS_TOKEN: '${INSTAGRAM_ACCESS_TOKEN}', INSTAGRAM_BUSINESS_ID: '${INSTAGRAM_BUSINESS_ID}' },
    credentialKeys: ['INSTAGRAM_ACCESS_TOKEN', 'INSTAGRAM_BUSINESS_ID'],
    credentialHelp: 'Get long-lived token from Meta Developer Console (Graph API v18+)',
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    category: 'social',
    description: 'Twitter API v2 — tweets, users, search, analytics',
    command: 'npx',
    args: ['-y', '@enescinr/twitter-mcp'],
    env: { TWITTER_API_KEY: '${TWITTER_API_KEY}', TWITTER_API_SECRET: '${TWITTER_API_SECRET}', TWITTER_ACCESS_TOKEN: '${TWITTER_ACCESS_TOKEN}', TWITTER_ACCESS_SECRET: '${TWITTER_ACCESS_SECRET}' },
    credentialKeys: ['TWITTER_API_KEY', 'TWITTER_API_SECRET', 'TWITTER_ACCESS_TOKEN', 'TWITTER_ACCESS_SECRET'],
    credentialHelp: 'Create app at https://developer.twitter.com/en/portal/dashboard',
  },
  meta: {
    id: 'meta',
    name: 'Meta Ads',
    category: 'social',
    description: 'Meta (Facebook + Instagram) Ads Manager',
    command: 'npx',
    args: ['-y', '@meta/mcp-ads'],
    env: { META_ACCESS_TOKEN: '${META_ACCESS_TOKEN}', META_AD_ACCOUNT_ID: '${META_AD_ACCOUNT_ID}' },
    credentialKeys: ['META_ACCESS_TOKEN', 'META_AD_ACCOUNT_ID'],
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    category: 'social',
    description: 'YouTube Data API + Analytics',
    command: 'npx',
    args: ['-y', 'youtube-mcp-server'],
    env: { YOUTUBE_API_KEY: '${YOUTUBE_API_KEY}' },
    credentialKeys: ['YOUTUBE_API_KEY'],
    credentialHelp: 'Create at https://console.cloud.google.com/apis/credentials',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'social',
    description: 'LinkedIn posts + profile + company pages',
    command: 'npx',
    args: ['-y', 'mcp-linkedin'],
    env: { LINKEDIN_ACCESS_TOKEN: '${LINKEDIN_ACCESS_TOKEN}' },
    credentialKeys: ['LINKEDIN_ACCESS_TOKEN'],
    credentialHelp: 'Create app at https://www.linkedin.com/developers/apps',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    description: 'TikTok video data + analytics',
    command: 'npx',
    args: ['-y', 'tiktok-mcp'],
    env: { TIKTOK_ACCESS_TOKEN: '${TIKTOK_ACCESS_TOKEN}' },
    credentialKeys: ['TIKTOK_ACCESS_TOKEN'],
  },

  // ════ AI / ML services ════
  openai: {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    description: 'OpenAI completions, embeddings, images, audio',
    command: 'npx',
    args: ['-y', 'mcp-openai'],
    env: { OPENAI_API_KEY: '${OPENAI_API_KEY}' },
    credentialKeys: ['OPENAI_API_KEY'],
    credentialHelp: 'Create at https://platform.openai.com/api-keys',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    category: 'ai',
    description: 'Claude API (separate from Claude Code itself)',
    command: 'npx',
    args: ['-y', 'mcp-anthropic'],
    env: { ANTHROPIC_API_KEY: '${ANTHROPIC_API_KEY}' },
    credentialKeys: ['ANTHROPIC_API_KEY'],
  },
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'creator',
    description: 'Voice cloning + TTS + sound effects',
    command: 'npx',
    args: ['-y', '@elevenlabs/elevenlabs-mcp'],
    env: { ELEVENLABS_API_KEY: '${ELEVENLABS_API_KEY}' },
    credentialKeys: ['ELEVENLABS_API_KEY'],
    credentialHelp: 'Create at https://elevenlabs.io/app/settings/api-keys',
  },
  replicate: {
    id: 'replicate',
    name: 'Replicate',
    category: 'creator',
    description: 'Replicate models (Flux, Stable Diffusion, Whisper, etc.)',
    command: 'npx',
    args: ['-y', 'replicate-mcp'],
    env: { REPLICATE_API_TOKEN: '${REPLICATE_API_TOKEN}' },
    credentialKeys: ['REPLICATE_API_TOKEN'],
    credentialHelp: 'Create at https://replicate.com/account/api-tokens',
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'ai',
    description: 'Perplexity Sonar search + reasoning',
    command: 'npx',
    args: ['-y', 'mcp-perplexity-search'],
    env: { PERPLEXITY_API_KEY: '${PERPLEXITY_API_KEY}' },
    credentialKeys: ['PERPLEXITY_API_KEY'],
  },

  // ════ Creator / media ════
  figma: {
    id: 'figma',
    name: 'Figma',
    category: 'creator',
    description: 'Figma file access + export + comments',
    command: 'npx',
    args: ['-y', 'figma-developer-mcp', '--figma-api-key=${FIGMA_API_KEY}'],
    env: {},
    credentialKeys: ['FIGMA_API_KEY'],
    credentialHelp: 'Create at https://www.figma.com/developers/api#access-tokens',
  },

  // ════ Analytics ════
  ga4: {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'analytics',
    description: 'GA4 reports, metrics, audiences',
    command: 'npx',
    args: ['-y', 'mcp-google-analytics'],
    env: { GA4_PROPERTY_ID: '${GA4_PROPERTY_ID}', GOOGLE_APPLICATION_CREDENTIALS: '${GOOGLE_APPLICATION_CREDENTIALS}' },
    credentialKeys: ['GA4_PROPERTY_ID', 'GOOGLE_APPLICATION_CREDENTIALS'],
    credentialHelp: 'Service account JSON path required',
  },
  sentry: {
    id: 'sentry',
    name: 'Sentry',
    category: 'analytics',
    description: 'Sentry errors, traces, releases',
    command: 'npx',
    args: ['-y', '@sentry/mcp-server'],
    env: { SENTRY_AUTH_TOKEN: '${SENTRY_AUTH_TOKEN}', SENTRY_ORG: '${SENTRY_ORG}' },
    credentialKeys: ['SENTRY_AUTH_TOKEN', 'SENTRY_ORG'],
    credentialHelp: 'Create at https://sentry.io/settings/account/api/auth-tokens/',
  },
  posthog: {
    id: 'posthog',
    name: 'PostHog',
    category: 'analytics',
    description: 'PostHog product analytics + feature flags',
    command: 'npx',
    args: ['-y', '@posthog/mcp'],
    env: { POSTHOG_API_KEY: '${POSTHOG_API_KEY}', POSTHOG_HOST: '${POSTHOG_HOST:-https://us.posthog.com}' },
    credentialKeys: ['POSTHOG_API_KEY'],
  },

  // ════ Search ════
  'brave-search': {
    id: 'brave-search',
    name: 'Brave Search',
    category: 'dev',
    description: 'Brave Search API (privacy-focused web search)',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-brave-search'],
    env: { BRAVE_API_KEY: '${BRAVE_API_KEY}' },
    credentialKeys: ['BRAVE_API_KEY'],
    credentialHelp: 'Create at https://brave.com/search/api/',
  },
  firecrawl: {
    id: 'firecrawl',
    name: 'Firecrawl',
    category: 'dev',
    description: 'Web scraping + crawling at scale',
    command: 'npx',
    args: ['-y', 'firecrawl-mcp'],
    env: { FIRECRAWL_API_KEY: '${FIRECRAWL_API_KEY}' },
    credentialKeys: ['FIRECRAWL_API_KEY'],
    credentialHelp: 'Create at https://www.firecrawl.dev/account',
  },
  tavily: {
    id: 'tavily',
    name: 'Tavily',
    category: 'dev',
    description: 'AI-optimized search API',
    command: 'npx',
    args: ['-y', 'tavily-mcp'],
    env: { TAVILY_API_KEY: '${TAVILY_API_KEY}' },
    credentialKeys: ['TAVILY_API_KEY'],
    credentialHelp: 'Create at https://tavily.com',
  },
  exa: {
    id: 'exa',
    name: 'Exa',
    category: 'dev',
    description: 'Exa neural search',
    command: 'npx',
    args: ['-y', 'exa-mcp-server'],
    env: { EXA_API_KEY: '${EXA_API_KEY}' },
    credentialKeys: ['EXA_API_KEY'],
  },

  // ════ Business ════
  hubspot: {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'business',
    description: 'HubSpot CRM contacts + deals + companies',
    command: 'npx',
    args: ['-y', 'hubspot-mcp-server'],
    env: { HUBSPOT_ACCESS_TOKEN: '${HUBSPOT_ACCESS_TOKEN}' },
    credentialKeys: ['HUBSPOT_ACCESS_TOKEN'],
  },
  salesforce: {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'business',
    description: 'Salesforce CRM',
    command: 'npx',
    args: ['-y', 'salesforce-mcp'],
    env: { SF_USERNAME: '${SF_USERNAME}', SF_PASSWORD: '${SF_PASSWORD}', SF_SECURITY_TOKEN: '${SF_SECURITY_TOKEN}' },
    credentialKeys: ['SF_USERNAME', 'SF_PASSWORD', 'SF_SECURITY_TOKEN'],
  },

  // ════ Atlassian (Jira + Confluence) ════
  // Verified: github.com/sooperset/mcp-atlassian (Python, runnable via uvx)
  atlassian: {
    id: 'atlassian',
    name: 'Atlassian (Jira + Confluence)',
    category: 'productivity',
    description: 'Jira issues + Confluence pages + sprints + boards (Cloud + Server)',
    command: 'uvx',
    args: ['mcp-atlassian'],
    env: {
      CONFLUENCE_URL: '${CONFLUENCE_URL}',
      CONFLUENCE_USERNAME: '${CONFLUENCE_USERNAME}',
      CONFLUENCE_API_TOKEN: '${CONFLUENCE_API_TOKEN}',
      JIRA_URL: '${JIRA_URL}',
      JIRA_USERNAME: '${JIRA_USERNAME}',
      JIRA_API_TOKEN: '${JIRA_API_TOKEN}',
    },
    credentialKeys: ['CONFLUENCE_URL', 'CONFLUENCE_USERNAME', 'CONFLUENCE_API_TOKEN', 'JIRA_URL', 'JIRA_USERNAME', 'JIRA_API_TOKEN'],
    credentialHelp: 'Create API tokens at https://id.atlassian.com/manage-profile/security/api-tokens',
    source: 'community: sooperset/mcp-atlassian',
  },

  // ════ Communication ════
  // Verified: npmjs.com/package/@twilio-alpha/mcp (Twilio official alpha)
  twilio: {
    id: 'twilio',
    name: 'Twilio',
    category: 'business',
    description: 'Twilio SMS + voice + WhatsApp + verify (all Twilio APIs)',
    command: 'npx',
    args: ['-y', '@twilio-alpha/mcp', '${TWILIO_ACCOUNT_SID}/${TWILIO_API_KEY}:${TWILIO_API_SECRET}'],
    env: {},
    credentialKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_API_KEY', 'TWILIO_API_SECRET'],
    credentialHelp: 'Create API key at https://console.twilio.com/us1/account/keys-credentials/api-keys',
    source: 'official: Twilio (alpha)',
  },

  // Verified: github.com/Garoth/sendgrid-mcp
  sendgrid: {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'business',
    description: 'SendGrid email marketing + transactional + lists + templates',
    command: 'npx',
    args: ['-y', 'sendgrid-mcp'],
    env: { SENDGRID_API_KEY: '${SENDGRID_API_KEY}' },
    credentialKeys: ['SENDGRID_API_KEY'],
    credentialHelp: 'Create at https://app.sendgrid.com/settings/api_keys',
    source: 'community: Garoth/sendgrid-mcp',
  },

  // ════ Project Management ════
  // Verified: npmjs.com/package/@delorenj/mcp-server-trello
  trello: {
    id: 'trello',
    name: 'Trello',
    category: 'productivity',
    description: 'Trello boards + lists + cards + members',
    command: 'npx',
    args: ['-y', '@delorenj/mcp-server-trello'],
    env: { TRELLO_API_KEY: '${TRELLO_API_KEY}', TRELLO_TOKEN: '${TRELLO_TOKEN}' },
    credentialKeys: ['TRELLO_API_KEY', 'TRELLO_TOKEN'],
    credentialHelp: 'Get key + token at https://trello.com/power-ups/admin',
    source: 'community: @delorenj/mcp-server-trello',
  },

  asana: {
    id: 'asana',
    name: 'Asana',
    category: 'productivity',
    description: 'Asana projects + tasks + assignees',
    command: 'npx',
    args: ['-y', 'mcp-server-asana'],
    env: { ASANA_ACCESS_TOKEN: '${ASANA_ACCESS_TOKEN}' },
    credentialKeys: ['ASANA_ACCESS_TOKEN'],
    credentialHelp: 'Create at https://app.asana.com/0/my-apps',
    source: 'community: mcp-server-asana',
  },

  clickup: {
    id: 'clickup',
    name: 'ClickUp',
    category: 'productivity',
    description: 'ClickUp spaces + lists + tasks',
    command: 'npx',
    args: ['-y', 'clickup-mcp-server'],
    env: { CLICKUP_API_KEY: '${CLICKUP_API_KEY}', CLICKUP_TEAM_ID: '${CLICKUP_TEAM_ID}' },
    credentialKeys: ['CLICKUP_API_KEY', 'CLICKUP_TEAM_ID'],
    credentialHelp: 'Create at https://app.clickup.com/settings/apps',
    source: 'community: clickup-mcp-server',
  },

  // ════ Media + Entertainment ════
  // Verified: github.com/marcelmarais/spotify-mcp-server
  spotify: {
    id: 'spotify',
    name: 'Spotify',
    category: 'creator',
    description: 'Spotify playback + search + playlists + library',
    command: 'npx',
    args: ['-y', 'spotify-mcp-server'],
    env: { SPOTIFY_CLIENT_ID: '${SPOTIFY_CLIENT_ID}', SPOTIFY_CLIENT_SECRET: '${SPOTIFY_CLIENT_SECRET}' },
    credentialKeys: ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET'],
    credentialHelp: 'Create at https://developer.spotify.com/dashboard',
    source: 'community: marcelmarais/spotify-mcp-server',
  },

  // Verified: github.com/sinco-lab/mcp-youtube-transcript
  'youtube-transcript': {
    id: 'youtube-transcript',
    name: 'YouTube Transcript',
    category: 'research',
    description: 'YouTube video transcripts (multi-language, no API key needed)',
    command: 'npx',
    args: ['-y', '@sinco-lab/mcp-youtube-transcript'],
    env: {},
    credentialKeys: [],
    source: 'community: sinco-lab/mcp-youtube-transcript',
  },

  // ════ Research ════
  arxiv: {
    id: 'arxiv',
    name: 'arXiv',
    category: 'research',
    description: 'Search + fetch arXiv scientific papers',
    command: 'uvx',
    args: ['mcp-simple-arxiv'],
    env: {},
    credentialKeys: [],
    source: 'community: mcp-simple-arxiv',
  },

  // ════ Cloud / Infra ════
  // Verified: github.com/alexei-led/k8s-mcp-server (Docker-based)
  kubernetes: {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'dev',
    description: 'Execute kubectl + helm commands in safe sandbox',
    command: 'docker',
    args: [
      'run', '-i', '--rm',
      '-v', '${KUBECONFIG_DIR:-${HOME}/.kube}:/home/appuser/.kube:ro',
      'ghcr.io/alexei-led/k8s-mcp-server:latest',
    ],
    env: {},
    credentialKeys: ['KUBECONFIG_DIR'],
    credentialHelp: 'Defaults to ~/.kube; override for custom kubeconfig location',
    source: 'community: alexei-led/k8s-mcp-server',
  },

  // ════ Browser automation (cloud) ════
  // Verified: github.com/browserbase/mcp-server-browserbase
  browserbase: {
    id: 'browserbase',
    name: 'Browserbase',
    category: 'dev',
    description: 'Cloud browser automation (headless Chrome at scale)',
    command: 'npx',
    args: ['-y', '@browserbasehq/mcp'],
    env: { BROWSERBASE_API_KEY: '${BROWSERBASE_API_KEY}', BROWSERBASE_PROJECT_ID: '${BROWSERBASE_PROJECT_ID}' },
    credentialKeys: ['BROWSERBASE_API_KEY', 'BROWSERBASE_PROJECT_ID'],
    credentialHelp: 'Create at https://www.browserbase.com',
    source: 'official: Browserbase',
  },

  // ════ Google Workspace (remote HTTP, official) ════
  // Verified: developers.google.com/workspace/guides/configure-mcp-servers
  // These use serverUrl + OAuth (not stdio command).
  gmail: {
    id: 'gmail',
    name: 'Gmail (Google official)',
    category: 'productivity',
    description: 'Gmail messages, drafts, labels via official Google MCP',
    transport: 'http',
    serverUrl: 'https://gmailmcp.googleapis.com/mcp/v1',
    oauth: { clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID', clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET' },
    credentialKeys: ['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET'],
    credentialHelp: 'Create OAuth client at https://console.cloud.google.com/apis/credentials (enable Gmail API + MCP service)',
    source: 'official: Google',
  },
  'google-drive': {
    id: 'google-drive',
    name: 'Google Drive (Google official)',
    category: 'productivity',
    description: 'Drive files, folders, search via official Google MCP',
    transport: 'http',
    serverUrl: 'https://drivemcp.googleapis.com/mcp/v1',
    oauth: { clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID', clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET' },
    credentialKeys: ['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET'],
    credentialHelp: 'Same OAuth as Gmail; enable Drive API + MCP service',
    source: 'official: Google',
  },
  'google-calendar': {
    id: 'google-calendar',
    name: 'Google Calendar (Google official)',
    category: 'productivity',
    description: 'Calendar events, free/busy, attendees via official Google MCP',
    transport: 'http',
    serverUrl: 'https://calendarmcp.googleapis.com/mcp/v1',
    oauth: { clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID', clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET' },
    credentialKeys: ['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET'],
    credentialHelp: 'Same OAuth as Gmail; enable Calendar API + MCP service',
    source: 'official: Google',
  },
  'google-chat': {
    id: 'google-chat',
    name: 'Google Chat (Google official)',
    category: 'productivity',
    description: 'Google Chat spaces + messages via official Google MCP',
    transport: 'http',
    serverUrl: 'https://chatmcp.googleapis.com/mcp/v1',
    oauth: { clientIdEnv: 'GOOGLE_OAUTH_CLIENT_ID', clientSecretEnv: 'GOOGLE_OAUTH_CLIENT_SECRET' },
    credentialKeys: ['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET'],
    credentialHelp: 'Same OAuth as Gmail; enable Chat API + MCP service',
    source: 'official: Google',
  },

  // ════ Web scraping / fetch ════
  // Verified: github.com/punkpeye/awesome-mcp-servers references
  apify: {
    id: 'apify',
    name: 'Apify',
    category: 'dev',
    description: 'Apify actors — 4500+ scrapers (Instagram, Twitter, Maps, etc.)',
    command: 'npx',
    args: ['-y', '@apify/actors-mcp-server'],
    env: { APIFY_TOKEN: '${APIFY_TOKEN}' },
    credentialKeys: ['APIFY_TOKEN'],
    credentialHelp: 'Create at https://console.apify.com/account/integrations',
    source: 'official: Apify',
  },

  // ════ Time / utilities ════
  time: {
    id: 'time',
    name: 'Time',
    category: 'dev',
    description: 'Timezone conversions + current time (no creds)',
    command: 'uvx',
    args: ['mcp-server-time', '--local-timezone=${LOCAL_TIMEZONE:-UTC}'],
    env: {},
    credentialKeys: [],
    source: 'official: modelcontextprotocol/servers',
  },
};

export function getMcpEntry(id: string): McpCatalogEntry | undefined {
  return MCP_CATALOG[id];
}

export function listMcpIds(): string[] {
  return Object.keys(MCP_CATALOG);
}

export function listMcpsByCategory(category: McpCatalogEntry['category']): McpCatalogEntry[] {
  return Object.values(MCP_CATALOG).filter((m) => m.category === category);
}
