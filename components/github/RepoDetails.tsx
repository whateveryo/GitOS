
import React, { useState } from 'react';
import { GitHubRepo, ScreenName } from '../../types';
import { GithubIcon } from '../../constants';

interface RepoDetailsProps {
  repo: GitHubRepo;
  installedRepoIds: Set<string>;
  onNavigate: (screen: ScreenName, data?: any) => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo, installedRepoIds, onNavigate }) => {
  const isInstalled = installedRepoIds.has(repo.id);

  const handleInstallClick = () => {
    onNavigate(ScreenName.INSTALL_REPO, repo);
  };

  const handleUninstallClick = () => {
    onNavigate(ScreenName.UNINSTALL_REPO, repo);
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        Repository Details
      </h2>

      <div className="max-w-3xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center space-x-3">
            <GithubIcon />
            <h3 className="text-xl font-bold font-sans">{repo.name}</h3>
          </div>
          <div className="flex space-x-2">
            {!isInstalled ? (
              <button
                onClick={handleInstallClick}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-sans text-sm"
              >
                Install
              </button>
            ) : (
              <button
                onClick={handleUninstallClick}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-sans text-sm"
              >
                Uninstall
              </button>
            )}
            <a
              href={`https://github.com/${repo.owner}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-sans text-sm"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
          <p><strong className="font-sans">Owner:</strong> <span className="font-sans">{repo.owner}</span></p>
          <p><strong className="font-sans">Description:</strong> <span className="font-sans">{repo.description}</span></p>
          <p><strong className="font-sans">Last Updated:</strong> <span className="font-sans">{repo.lastUpdated}</span></p>
          <p><strong className="font-sans">Stars:</strong> <span className="font-sans">{repo.stars}</span></p>
          <p><strong className="font-sans">Forks:</strong> <span className="font-sans">{repo.forks}</span></p>
          <p><strong className="font-sans">Language:</strong> <span className="font-sans">{repo.primaryLanguage}</span></p>
          <p><strong className="font-sans">Branches:</strong> <span className="font-sans">{repo.branches.join(', ')}</span></p>
        </div>

        <section className="mb-6">
          <h4 className="text-lg font-semibold mb-2 font-sans">README.md</h4>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-gray-900 dark:text-gray-100 text-sm font-mono">
            <pre>{repo.readmeContent}</pre>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-2 font-sans">Browse Code</h4>
          <button
            onClick={() => onNavigate(ScreenName.CODE_EDITOR, { repo, filePath: 'src/kernel/init.ts' })}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-sans"
          >
            View Example File (src/kernel/init.ts)
          </button>
        </section>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate(ScreenName.GITHUB)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
        >
          Back to Repos
        </button>
      </div>
    </div>
  );
};

export default RepoDetails;
