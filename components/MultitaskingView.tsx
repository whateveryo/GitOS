
import React from 'react';
import { CloseIcon } from '../constants';
import { ScreenName } from '../types';

interface MultitaskingViewProps {
  onNavigate: (screen: ScreenName) => void;
}

interface MockApp {
  id: string;
  name: string;
  icon: string;
  thumbnail: string;
}

const MOCK_OPEN_APPS: MockApp[] = [
  { id: '1', name: 'GitOS-Core', icon: '💻', thumbnail: 'https://picsum.photos/400/200?random=1' },
  { id: '2', name: 'Browser', icon: '🌐', thumbnail: 'https://picsum.photos/400/200?random=2' },
  { id: '3', name: 'Music Player', icon: '🎵', thumbnail: 'https://picsum.photos/400/200?random=3' },
  { id: '4', name: 'Photos', icon: '🖼️', thumbnail: 'https://picsum.photos/400/200?random=4' },
];

const MultitaskingView: React.FC<MultitaskingViewProps> = ({ onNavigate }) => {
  const handleCloseApp = (id: string) => {
    // In a real OS, this would close the app. Here, just log.
    console.log(`Closing app: ${id}`);
    // Potentially remove from local state if this view managed dynamic open apps
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 font-sans text-center">
        Multitasking View
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow max-w-4xl mx-auto w-full">
        {MOCK_OPEN_APPS.map((app) => (
          <div
            key={app.id}
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col overflow-hidden group"
          >
            <div
              className="relative w-full h-32 sm:h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${app.thumbnail})` }}
              onClick={() => { /* In a real OS, switch to this app */ }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-5xl">{app.icon}</span>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-lg font-medium font-sans">{app.name}</span>
              <button
                onClick={() => handleCloseApp(app.id)}
                className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors"
                aria-label={`Close ${app.name}`}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        ))}
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

export default MultitaskingView;
