
import React, { useState } from 'react';
import { GitHubRepo, ScreenName } from '../../types';
import { CheckCircleIcon, ExclamationCircleIcon } from '../../constants';

interface UninstallRepoProps {
  repo: GitHubRepo;
  onNavigate: (screen: ScreenName, data?: any) => void;
  onUninstall: (repoId: string) => void;
}

const UninstallRepo: React.FC<UninstallRepoProps> = ({ repo, onNavigate, onUninstall }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uninstalling, setUninstalling] = useState(false);
  const [uninstallComplete, setUninstallComplete] = useState(false);

  const mockImpacts = [
    'Associated desktop entry will be removed.',
    'Any GitOS widgets from this repo will be deactivated.',
    'Cached data for this repository will be cleared.',
  ];

  const handleStartUninstall = () => {
    setUninstalling(true);
    setTimeout(() => {
      onUninstall(repo.id);
      setUninstalling(false);
      setUninstallComplete(true);
    }, 2000); // Simulate uninstallation time
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        Uninstall Repository: {repo.name}
      </h2>

      <div className="max-w-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 space-y-6">
        {/* Step 1: Review Impact */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl font-medium mb-4 font-sans">1. Review Potential Impact</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300 font-sans">
              Uninstalling <strong className="font-semibold">{repo.name}</strong> will result in the following:
            </p>
            <ul className="space-y-2 list-disc list-inside text-gray-800 dark:text-gray-200">
              {mockImpacts.map((impact, index) => (
                <li key={index} className="flex items-center text-sm font-sans">
                  <ExclamationCircleIcon className="text-yellow-500 mr-2 flex-shrink-0" />
                  {impact}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-semibold font-sans">
              This action cannot be undone.
            </p>
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-sans text-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Confirm Uninstall */}
        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-medium mb-4 font-sans">2. Confirm Uninstallation</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300 font-sans">
              Are you sure you want to uninstall <strong className="font-semibold">{repo.name}</strong>?
            </p>

            {!uninstalling && !uninstallComplete && (
              <button
                onClick={handleStartUninstall}
                className="w-full px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold font-sans"
              >
                Confirm and Uninstall
              </button>
            )}

            {uninstalling && (
              <div className="text-center py-4">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mx-auto mb-4 animate-spin dark:border-gray-700 dark:border-t-red-500"></div>
                <p className="text-lg font-sans text-gray-700 dark:text-gray-300">Uninstalling...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">Removing components and data.</p>
              </div>
            )}

            {uninstallComplete && (
              <div className="text-center py-4 text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl font-semibold font-sans">Uninstallation Complete!</p>
                <p className="text-md text-gray-700 dark:text-gray-300 font-sans mt-2">
                  <strong className="font-semibold">{repo.name}</strong> has been successfully uninstalled.
                </p>
                <button
                  onClick={() => onNavigate(ScreenName.GITHUB)}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md font-sans"
                >
                  Back to Repositories
                </button>
              </div>
            )}

            {!uninstalling && !uninstallComplete && (
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-4 w-full px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-sans text-sm"
              >
                Back
              </button>
            )}
          </div>
        )}
      </div>

      {!uninstalling && uninstallComplete && (
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
          border-top-color: #ef4444; /* Red for uninstall */
        }
      `}</style>
    </div>
  );
};

export default UninstallRepo;
