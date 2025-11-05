
import React, { useState } from 'react';
import { GitHubRepo, ScreenName } from '../../types';
import { CheckCircleIcon, ExclamationCircleIcon } from '../../constants';

interface InstallRepoProps {
  repo: GitHubRepo;
  onNavigate: (screen: ScreenName, data?: any) => void;
  onInstall: (repoId: string) => void;
}

const InstallRepo: React.FC<InstallRepoProps> = ({ repo, onNavigate, onInstall }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [installing, setInstalling] = useState(false);
  const [installComplete, setInstallComplete] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['core']); // Mock selection

  const mockDependencies = [
    { name: 'Node.js', status: 'Installed' },
    { name: 'Git LFS', status: 'Missing', optional: true },
    { name: 'TypeScript', status: 'Installed' },
  ];

  const handleStartInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      onInstall(repo.id);
      setInstalling(false);
      setInstallComplete(true);
    }, 3000); // Simulate installation time
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        Install Repository: {repo.name}
      </h2>

      <div className="max-w-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 space-y-6">
        {/* Step 1: Select Components */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-medium mb-4 font-sans">1. Select Components</h3>
            <div className="space-y-3">
              <label className="flex items-center text-gray-800 dark:text-gray-200 font-sans">
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('core')}
                  onChange={() => setSelectedComponents(prev => prev.includes('core') ? prev.filter(c => c !== 'core') : [...prev, 'core'])}
                  className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Core Application (Required)
              </label>
              <label className="flex items-center text-gray-800 dark:text-gray-200 font-sans">
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('docs')}
                  onChange={() => setSelectedComponents(prev => prev.includes('docs') ? prev.filter(c => c !== 'docs') : [...prev, 'docs'])}
                  className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Documentation
              </label>
              <label className="flex items-center text-gray-800 dark:text-gray-200 font-sans">
                <input
                  type="checkbox"
                  checked={selectedComponents.includes('examples')}
                  onChange={() => setSelectedComponents(prev => prev.includes('examples') ? prev.filter(c => c !== 'examples') : [...prev, 'examples'])}
                  className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                Example Code
              </label>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-sans text-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Check Dependencies */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-medium mb-4 font-sans">2. Check Dependencies</h3>
            <ul className="space-y-3">
              {mockDependencies.map((dep, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-sans">
                  <span>{dep.name}</span>
                  <span className={`flex items-center ${dep.status === 'Installed' ? 'text-green-600' : 'text-red-600'}`}>
                    {dep.status === 'Installed' ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
                    <span className="ml-1">{dep.status}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-sans">
              Missing optional dependencies will not prevent installation but may limit functionality.
            </p>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-sans text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-sans text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm & Install */}
        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-medium mb-4 font-sans">3. Confirm & Install</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300 font-sans">
              You are about to install <strong className="font-semibold">{repo.name}</strong>.
              This will make its components available within GitOS.
            </p>

            {!installing && !installComplete && (
              <button
                onClick={handleStartInstall}
                className="w-full px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold font-sans"
              >
                Confirm and Install
              </button>
            )}

            {installing && (
              <div className="text-center py-4">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mx-auto mb-4 animate-spin dark:border-gray-700 dark:border-t-blue-500"></div>
                <p className="text-lg font-sans text-gray-700 dark:text-gray-300">Installing...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">This may take a moment.</p>
              </div>
            )}

            {installComplete && (
              <div className="text-center py-4 text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl font-semibold font-sans">Installation Complete!</p>
                <p className="text-md text-gray-700 dark:text-gray-300 font-sans mt-2">
                  <strong className="font-semibold">{repo.name}</strong> has been successfully installed.
                </p>
                <button
                  onClick={() => onNavigate(ScreenName.REPO_DETAILS, repo)}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
                >
                  View Installed Repo
                </button>
              </div>
            )}

            {!installing && !installComplete && (
              <button
                onClick={() => setCurrentStep(2)}
                className="mt-4 w-full px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-sans text-sm"
              >
                Back
              </button>
            )}
          </div>
        )}
      </div>

      {!installing && installComplete && (
        <div className="mt-8 text-center">
          <button
            onClick={() => onNavigate(ScreenName.GITHUB)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
          >
            Back to Repositories
          </button>
        </div>
      )}

      {/* Basic loader style for demonstration */}
      <style>{`
        .loader {
          border-top-color: #3498db;
        }
      `}</style>
    </div>
  );
};

export default InstallRepo;
