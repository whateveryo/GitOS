
export enum ScreenName {
  HOME = 'HOME',
  INTELLIGENT_HUB = 'INTELLIGENT_HUB',
  MULTITASKING = 'MULTITASKING',
  SETTINGS = 'SETTINGS',
  GITHUB = 'GITHUB',
  REPO_DETAILS = 'REPO_DETAILS',
  CODE_EDITOR = 'CODE_EDITOR',
  INSTALL_REPO = 'INSTALL_REPO',
  UNINSTALL_REPO = 'UNINSTALL_REPO',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
  actions?: { label: string; onClick: () => void }[];
}

export interface GitHubRepo {
  id: string;
  name: string;
  owner: string;
  description: string;
  lastUpdated: string;
  stars: number;
  forks: number;
  primaryLanguage: string;
  readmeContent: string;
  installed?: boolean;
  branches: string[];
  files: {
    path: string;
    content: string;
  }[];
}

export interface AppIconProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  badge?: number;
}
