// ai-bootstrap shared types

export interface UserProfile {
  name: string;
  primaryLanguage: 'az' | 'en' | 'ru' | 'tr' | 'es' | string;
  otherLanguages: string[];
  role: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  country: string;
  goals: {
    sixMonth: string;
    twelveMonth: string;
    twentyFourMonth: string;
  };
}

export interface ProjectInfo {
  name: string;
  path: string;
  type: ProjectType;
  hasClaudeMd: boolean;
  hasDocsFolder: boolean;
  lastModified: Date;
}

export type ProjectType =
  | 'saas-fullstack-pro'
  | 'saas-ai-pro'
  | 'ai-studio'
  | 'brand-site'
  | 'social-ops'
  | 'data-platform'
  | 'unknown';

export interface SkillBundle {
  name: string;
  description: string;
  tiers: number[];
  skillCount: number;
}

export interface McpServer {
  id: string;
  name: string;
  category: string;
  official: boolean;
  requiresCredential: boolean;
  description: string;
}

export interface WizardState {
  profile?: UserProfile;
  projectPaths: string[];
  projects: ProjectInfo[];
  selectedBundles: {
    skills: string;
    agents: string;
    mcps: string;
  };
  memoryConfig: {
    storage: 'markdown-only' | 'markdown-sqlite' | 'markdown-mem0';
    autoLearn: boolean;
    syncToGithub: boolean;
    githubRepo?: string;
  };
}

export interface PermissionGate {
  action: string;
  description: string;
  required: boolean;
}
