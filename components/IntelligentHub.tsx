
import React, { useEffect, useState, useCallback } from 'react';
import { generateGeminiContent } from '../services/geminiService';
import { GEMINI_PROMPT_SUGGESTIONS, CloseIcon } from '../constants';

interface IntelligentHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntelligentHub: React.FC<IntelligentHubProps> = ({ isOpen, onClose }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateGeminiContent('Provide 3-4 short, concise, and distinct suggestions for a user\'s "Intelligent Interaction Hub". Ensure each suggestion is a single sentence or a very short phrase. Do not number them or add any introductory/concluding remarks. Separate each suggestion with a newline character.', GEMINI_PROMPT_SUGGESTIONS);
      const newSuggestions = response.split('\n').filter(s => s.trim() !== '');
      setSuggestions(newSuggestions);
    } catch (err) {
      setError('Failed to load suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    if (isOpen && suggestions.length === 0 && !isLoading && !error) {
      fetchSuggestions();
    }
  }, [isOpen, suggestions.length, isLoading, error, fetchSuggestions]);

  const recentApps = [
    { name: 'Messaging', icon: '💬' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Camera', icon: '📸' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-gray-900 bg-opacity-75 flex justify-end transition-opacity duration-300">
      <div
        className="relative w-full sm:w-96 bg-gray-100 dark:bg-gray-800 shadow-lg p-6 flex flex-col transition-transform duration-300 ease-in-out transform translate-x-0"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing hub
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-sans">
            Intelligent Hub
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
            aria-label="Close Intelligent Hub"
          >
            <CloseIcon />
          </button>
        </div>

        <section className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 font-sans">
            Suggested Actions
          </h3>
          {isLoading && (
            <div className="text-gray-600 dark:text-gray-400 animate-pulse font-sans">Loading suggestions...</div>
          )}
          {error && (
            <div className="text-red-500 text-sm font-sans">{error}</div>
          )}
          {!isLoading && !error && suggestions.length === 0 && (
            <div className="text-gray-600 dark:text-gray-400 font-sans">No suggestions available.</div>
          )}
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer font-sans"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 font-sans">
            Recently Used Apps
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {recentApps.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer font-sans"
              >
                <span className="text-2xl mb-1">{app.icon}</span>
                {app.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IntelligentHub;
