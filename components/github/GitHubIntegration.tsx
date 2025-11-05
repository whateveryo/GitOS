
import React from 'react';
import { GitHubRepo, ScreenName } from '../../types';
import { ChevronRightIcon } from '../../constants';

interface GitHubIntegrationProps {
  repos: GitHubRepo[];
  onNavigate: (screen: ScreenName, data?: any) => void;
  installedRepoIds: Set<string>;
}

const GitHubIntegration: React.FC<GitHubIntegrationProps> = ({ repos, onNavigate, installedRepoIds }) => {
  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        GitHub Integration
      </h2>

      <div className="max-w-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-xl font-medium mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 font-sans">
          Your Repositories
        </h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {repos.map((repo) => (
            <li key={repo.id} className="py-3 sm:py-4">
              <button
                onClick={() => onNavigate(ScreenName.REPO_DETAILS, repo)}
                className="flex items-center justify-between w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2 transition-colors"
              >
                <div className="flex-1 text-left">
                  <p className="text-lg font-medium font-sans flex items-center">
                    {repo.name}
                    {installedRepoIds.has(repo.id) && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-green-700 bg-green-100 dark:text-green-200 dark:bg-green-800 rounded-full font-sans">
                        Installed
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">{repo.owner} / {repo.primaryLanguage}</p>
                </div>
                <ChevronRightIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate(ScreenName.HOME)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default GitHubIntegration;
