
import { GitHubRepo } from './types';
import React from 'react';

// New interface for icon props to allow className to be passed
interface IconProps {
  className?: string;
}

// Gemini API Configuration
export const GEMINI_MODEL = 'gemini-2.5-flash';
export const GEMINI_PROMPT_SUGGESTIONS = `
You are a helpful assistant for a conceptual mobile operating system called GitOS.
Provide 3-4 short, concise, and distinct suggestions for a user's "Intelligent Interaction Hub".
These suggestions should be very brief and might relate to common phone usage, productivity, or quick actions.
For example:
- "Check your calendar for upcoming events"
- "Reply to unread messages"
- "Start a timer for 15 minutes"

Ensure each suggestion is a single sentence or a very short phrase.
Do not number them or add any introductory/concluding remarks.
Separate each suggestion with a newline character.
`;

// Mock GitHub Repositories
export const MOCK_GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 'git-os-core',
    name: 'GitOS-Core',
    owner: 'GitOS-Dev',
    description: 'The core framework and essential components for GitOS.',
    lastUpdated: '2024-07-28',
    stars: 1250,
    forks: 320,
    primaryLanguage: 'TypeScript',
    readmeContent: '# GitOS-Core\n\nThis repository contains the fundamental building blocks of the GitOS operating system, including the kernel, system services, and core UI components.',
    installed: false,
    branches: ['main', 'dev', 'feature/new-ui'],
    files: [
      { path: 'src/kernel/init.ts', content: 'console.log("GitOS Kernel Initialized");\n// More kernel code...' },
      { path: 'src/ui/components/Shell.tsx', content: 'import React from "react";\nconst Shell: React.FC = () => <div>GitOS Shell</div>;\nexport default Shell;' },
      { path: 'README.md', content: '# GitOS-Core\n\nThis repository contains the fundamental building blocks of the GitOS operating system, including the kernel, system services, and core UI components.' },
    ],
  },
  {
    id: 'git-os-terminal',
    name: 'GitOS-Terminal',
    owner: 'GitOS-Dev',
    description: 'An advanced terminal emulator for GitOS with ZSH integration.',
    lastUpdated: '2024-07-25',
    stars: 890,
    forks: 180,
    primaryLanguage: 'Rust',
    readmeContent: '# GitOS-Terminal\n\nYour gateway to powerful command-line interactions on GitOS. Features include tabbed browsing, customizable themes, and robust plugin support.',
    installed: false,
    branches: ['main', 'beta'],
    files: [
      { path: 'src/main.rs', content: 'fn main() { println!("Hello from GitOS Terminal!"); }' },
      { path: 'config/default.toml', content: '[theme]\ncolors = ["#282a36", "#f8f8f2"]' },
      { path: 'README.md', content: '# GitOS-Terminal\n\nYour gateway to powerful command-line interactions on GitOS. Features include tabbed browsing, customizable themes, and robust plugin support.' },
    ],
  },
  {
    id: 'git-os-file-manager',
    name: 'GitOS-FileManager',
    owner: 'GitOS-Dev',
    description: 'A modern and efficient file manager for GitOS, inspired by Ranger and Nemo.',
    lastUpdated: '2024-07-20',
    stars: 700,
    forks: 150,
    primaryLanguage: 'Python',
    readmeContent: '# GitOS-FileManager\n\nManage your files with ease. Features include dual-pane view, cloud integration, and advanced search.',
    installed: false,
    branches: ['main'],
    files: [
      { path: 'src/file_manager.py', content: 'print("GitOS File Manager starting...")\n# Python code for file management' },
      { path: 'README.md', content: '# GitOS-FileManager\n\nManage your files with ease. Features include dual-pane view, cloud integration, and advanced search.' },
    ],
  },
  {
    id: 'git-os-browser',
    name: 'GitOS-Browser',
    owner: 'GitOS-Dev',
    description: 'A lightweight and secure web browser built for GitOS.',
    lastUpdated: '2024-07-18',
    stars: 950,
    forks: 210,
    primaryLanguage: 'C++',
    readmeContent: '# GitOS-Browser\n\nA fast and privacy-focused web browser for the GitOS ecosystem.',
    installed: false,
    branches: ['main', 'security-patch'],
    files: [
      { path: 'src/browser_engine.cpp', content: '#include <iostream>\nint main() { std::cout << "Loading web page..." << std::endl; return 0; }' },
      { path: 'README.md', content: '# GitOS-Browser\n\nA fast and privacy-focused web browser for the GitOS ecosystem.' },
    ],
  },
];


// App Icons - Using SVG for subtle iconography
// Added IconProps to each component to correctly handle the `className` prop.
export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const GithubIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017 2 16.292 4.84 19.882 8.875 21.334c.461.085.626-.2.626-.448 0-.22-.008-.813-.01-1.603-4.148.898-5.004-1.996-5.004-1.996-.676-1.724-1.65-2.185-1.65-2.185-1.345-.92.103-.903.103-.903 1.493.105 2.28 1.53 2.28 1.53 1.325 2.278 3.487 1.623 4.324 1.24.136-.967.518-1.623.945-2.003-3.3-.372-6.763-1.65-6.763-7.364 0-1.623.58-2.95 1.528-3.995-.153-.373-.665-1.892.144-3.943 0 0 1.245-.401 4.068 1.525.9-.251 1.85-.377 2.79-.382 1-.005 1.99.127 2.9.382 2.812-1.926 4.056-1.525 4.056-1.525.813 2.051.301 3.57.147 3.943.95.976 1.527 2.37 1.527 3.995 0 5.727-3.468 6.992-6.782 7.35.53.461 1.012 1.375 1.012 2.775 0 2.003-.01 3.622-.01 4.105 0 .248.163.538.631.447C19.167 19.878 22 16.287 22 12.017 22 6.484 17.523 2 12 2Z" clipRule="evenodd" />
  </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 0 002 2z" />
  </svg>
);

export const FileManagerIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MultitaskingIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
