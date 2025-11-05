
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ScreenName, ThemeMode, AppNotification, GitHubRepo } from './types';
import HomeEnvironment from './components/HomeEnvironment';
import IntelligentHub from './components/IntelligentHub';
import MultitaskingView from './components/MultitaskingView';
import Settings from './components/Settings';
import GitHubIntegration from './components/github/GitHubIntegration';
import RepoDetails from './components/github/RepoDetails';
import CodeEditor from './components/github/CodeEditor';
import InstallRepo from './components/github/InstallRepo';
import UninstallRepo from './components/github/UninstallRepo';
import FooterNav from './components/FooterNav';
import NotificationsContainer from './components/NotificationsContainer';
import { MOCK_GITHUB_REPOS } from './constants';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.HOME);
  const [screenData, setScreenData] = useState<any>(null); // For passing data to specific screens (e.g., selected repo)
  const [isIntelligentHubOpen, setIsIntelligentHubOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(ThemeMode.DARK); // Default to dark theme as per XFCE aesthetic
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [installedRepos, setInstalledRepos] = useState<GitHubRepo[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Apply theme to the document body
    const root = document.documentElement;
    if (theme === ThemeMode.DARK) {
      root.classList.add('dark');
      document.body.classList.remove('bg-gray-100');
      document.body.classList.add('bg-gray-900');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
      document.body.classList.add('bg-gray-100');
    }
  }, [theme]);

  // Simulate app launch/exit animations
  const handleNavigate = useCallback(<T,>(screen: ScreenName, data?: T) => {
    // Clear any existing animation timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const appContent = document.getElementById('app-content');
    if (appContent) {
      appContent.classList.add('animate-slide-out'); // Start exit animation

      timeoutRef.current = window.setTimeout(() => {
        setCurrentScreen(screen);
        setScreenData(data);
        appContent.classList.remove('animate-slide-out');
        appContent.classList.add('animate-slide-in'); // Start entry animation
        timeoutRef.current = window.setTimeout(() => {
          appContent.classList.remove('animate-slide-in');
        }, 300); // Duration of slide-in animation
      }, 300); // Duration of slide-out animation
    } else {
      setCurrentScreen(screen);
      setScreenData(data);
    }
    setIsIntelligentHubOpen(false); // Close hub on navigation
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT));
  }, []);

  const addNotification = useCallback((notification: Omit<AppNotification, 'id'> & { timeout?: number }) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { ...notification, id }]);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleInstallRepo = useCallback((repoId: string) => {
    const repoToInstall = MOCK_GITHUB_REPOS.find(repo => repo.id === repoId);
    if (repoToInstall && !installedRepos.some(repo => repo.id === repoId)) {
      setInstalledRepos(prev => [...prev, { ...repoToInstall, installed: true }]);
      addNotification({ message: `Repository "${repoToInstall.name}" installed.`, type: 'success', timeout: 3000 });
    }
  }, [installedRepos, addNotification]);

  const handleUninstallRepo = useCallback((repoId: string) => {
    const repoToUninstall = installedRepos.find(repo => repo.id === repoId);
    if (repoToUninstall) {
      setInstalledRepos(prev => prev.filter(repo => repo.id !== repoId));
      addNotification({ message: `Repository "${repoToUninstall.name}" uninstalled.`, type: 'info', timeout: 3000 });
    }
  }, [installedRepos, addNotification]);

  const getInstalledRepoIds = useCallback(() => new Set(installedRepos.map(repo => repo.id)), [installedRepos]);

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.HOME:
        return <HomeEnvironment onNavigate={handleNavigate} installedReposCount={installedRepos.length} />;
      case ScreenName.MULTITASKING:
        return <MultitaskingView onNavigate={handleNavigate} />;
      case ScreenName.SETTINGS:
        return <Settings currentTheme={theme} onToggleTheme={toggleTheme} onNavigate={handleNavigate} />;
      case ScreenName.GITHUB:
        return <GitHubIntegration repos={MOCK_GITHUB_REPOS} onNavigate={handleNavigate} installedRepoIds={getInstalledRepoIds()} />;
      case ScreenName.REPO_DETAILS:
        return screenData && <RepoDetails repo={screenData} installedRepoIds={getInstalledRepoIds()} onNavigate={handleNavigate} />;
      case ScreenName.CODE_EDITOR:
        return screenData && <CodeEditor repo={screenData.repo} initialFilePath={screenData.filePath} onNavigate={handleNavigate} />;
      case ScreenName.INSTALL_REPO:
        return screenData && <InstallRepo repo={screenData} onNavigate={handleNavigate} onInstall={handleInstallRepo} />;
      case ScreenName.UNINSTALL_REPO:
        return screenData && <UninstallRepo repo={screenData} onNavigate={handleNavigate} onUninstall={handleUninstallRepo} />;
      default:
        return <HomeEnvironment onNavigate={handleNavigate} installedReposCount={installedRepos.length} />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden">
      {/* Main app content area */}
      <main id="app-content" className="flex-1 flex flex-col relative transition-transform duration-300 ease-in-out">
        {renderScreen()}
      </main>

      {/* Footer Navigation */}
      <FooterNav
        onNavigate={handleNavigate}
        onToggleIntelligentHub={() => setIsIntelligentHubOpen(prev => !prev)}
        currentScreen={currentScreen}
      />

      {/* Intelligent Hub */}
      <IntelligentHub
        isOpen={isIntelligentHubOpen}
        onClose={() => setIsIntelligentHubOpen(false)}
      />

      {/* Notifications */}
      <NotificationsContainer notifications={notifications} onDismiss={dismissNotification} />

      {/* Global animations for app transitions */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s forwards ease-out;
        }
        .animate-slide-out {
          animation: slide-out 0.3s forwards ease-in;
        }
      `}</style>
    </div>
  );
};

export default App;
